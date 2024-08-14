const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const types = require('babel-types')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default

function normalizePath(path) {
    return path.replace(/\\/g, '/')
}

const baseDir = normalizePath(process.cwd())

class Compilation {
    constructor(options) {
        this.options = options
        this.fileDependencies = new Set()
        this.modules = []
        this.chunks = []
        this.assets = {}
    }


    build(callback) {

        let entry = {}
        if(typeof this.options.entry === 'string') {
            entry.main = this.options.entry
        } else {
            entry = this.options.entry
        }

        for(let entryName in entry) {

            const entryFilePath = path.posix.join(baseDir, entry[entryName])
            this.fileDependencies.add(entryFilePath)
            const entryModule = this.buildModule(entryName, entryFilePath)

            const chunk = {
                name: entryName,
                entryModule,
                modules: this.modules.filter(module => module.names.includes(entryName)),
            }
            this.chunks.push(chunk)
        }

        this.chunks.forEach(chunk => {
            const filename = this.options.output.filename.replace('[name]', chunk.name)
            this.assets[filename] = getSource(chunk)
        })

        callback(
            null,
            {
                chunks: this.chunks,
                module: this.modules,
                assets: this.assets,
            },
            this.fileDependencies
        )
    }

    buildModule = (name, modulePath) => {
        const sourceCode = fs.readFileSync(modulePath, 'utf8')
        const { rules } = this.options.module
        const loaders = []
        rules.forEach(rule => {
            const { test } = rule
            if(modulePath.match(test)) {
                loaders.push(...rule.use)
            }
        })
        //使用配置的loader 对源码进行转换，得到最后的结果
        const transformedSourceCode = loaders.reduceRight((sourceCode, loader) => {
            return require(loader)(sourceCode)
        }, sourceCode)
        //当前模块的模块ID
        const moduleId = './' + path.posix.relative(baseDir, modulePath)
        const module = { id: moduleId, dependencies: [], names: [name] } //names=['entry1']
        const ast = parser.parse(transformedSourceCode, { sourceType: 'module' })
        traverse(ast, {
            CallExpression: ({ node }) => {
                if(node.callee.name === 'require') {
                    const depModuleName = node.arguments[0].value
                    const dirname = path.posix.dirname(modulePath)
                    const depModulePath = this.tryExtension(path.posix.join(dirname, depModuleName))
                    this.fileDependencies.add(depModulePath)
                    const depModuleId = './' + path.posix.relative(baseDir, depModulePath)
                    node.arguments = [types.stringLiteral(depModuleId)] // ./title => ./src/title.js
                    module.dependencies.push({ depModuleId, depModulePath })
                }
            },
        })
        const { code } = generator(ast)
        module._source = code
        module.dependencies.forEach(({ depModuleId, depModulePath }) => {
            const existModule = this.modules.find(module => module.id === depModuleId)
            if(existModule) {
                existModule.names.push(name)
            } else {
                let depModule = this.buildModule(name, depModulePath)
                this.modules.push(depModule)
            }
        })
        return module
    }
    tryExtension = modulePath => {
        if(fs.existsSync(modulePath)) {
            return modulePath
        }
        let extensions = ['.js']
        if(this.options.resolve && this.options.resolve.extensions) {
            extensions = this.options.resolve.extensions
        }
        for(let i = 0; i < extensions.length; i++) {
            let filePath = modulePath + extensions[i]
            if(fs.existsSync(filePath)) {
                return filePath
            }
        }
        throw new Error(`${modulePath}未找到`)
    }
}

function getSource(chunk) {
    return `
    (() => {
    var modules = ({
      ${chunk.modules.map(
        module => `
        "${module.id}":(module,exports,require)=>{
          ${module._source}
        }
      `)}
    });
    
    var cache = {};
    function require(moduleId) {
      var cachedModule = cache[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      var module = cache[moduleId] = {
        exports: {}
      };
      modules[moduleId](module, module.exports, require);
      return module.exports;
    }
    var exports = {};
    ${chunk.entryModule._source}
    })()
  `
}

module.exports = Compilation

