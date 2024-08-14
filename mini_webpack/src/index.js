const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAstSync } = require('@babel/core')

const log = console.log.bind(console)

const gidGenerator = (() => {
    let id = 0
    let f = () => {
        id++
        return id
    }
    return f
})()

const resolvePath = (base, relativePath) => {
    let abs = path.resolve(base, relativePath)
    return abs
}

const astForCode = (code) => {
    let ast = parser.parse(code, {
        sourceType: 'module',
    })
    return ast
}

const codeForAst = (ast, sourceCode) => {
    let r = transformFromAstSync(ast, sourceCode, {
        presets: ['@babel/preset-env'],
    })
    return r.code
}

const moduleTemplate = (graph, mapping) => {
    let g = graph
    let m = JSON.stringify(mapping)
    let s = `
    ${g.id}: [
        function(require, module, exports) {
            ${g.code}
        },
        ${m}
    ],
    `
    return s
}

const moduleFromGraph = (graph) => {
    let modules = ''
    Object.values(graph).forEach(g => {
        let ds = g.dependencies

        let o = {}
        // log('ds in graph', ds)
        Object.entries(ds).forEach(([k, v]) => {
            o[k] = graph[v].id

            log('o in entries', o)
        })

        modules += moduleTemplate(g, o)
    })
    return modules
}

const bundleTemplate = (module) => {
    let s = `(function(modules) {
    const require = (id) => {
        let [fn, mapping] = modules[id]

        const localRequire = (name) => {
            return require(mapping[name])
        }

        const localModule = {
            exports: {

            }
        }

        fn(localRequire, localModule, localModule.exports)

        return localModule.exports
    }

    require(1)
})({${module}})`
    return s
}

const saveBundle = (bundle, file) => {
    fs.writeFileSync(file, bundle)
}

const collectedDeps = (entry) => {
    let s = fs.readFileSync(entry, 'utf8')
    let ast = astForCode(s)

    let l = []
    traverse(ast, {
        ImportDeclaration(path) {
            let module = path.node.source.value
            l.push(module)
        }
    })
    log('l', l)
    let o = {}
    l.forEach(e => {
        let directory = path.dirname(entry)
        let p = resolvePath(directory, e)

        o[e] = p
    })
    log('o', o)
    return o
}

const parsedEntry = (entry) => {
    let o = {}
    let id = gidGenerator()
    let ds = collectedDeps(entry)
    let s = fs.readFileSync(entry, 'utf8')
    let ast = astForCode(s)

    let es5Code = codeForAst(ast, s)


    o[entry] = {
        id: id,
        dependencies: ds,
        code: es5Code,
        content: s,
    }

    Object.values(ds).forEach(d => {
        let r = parsedEntry(d)
        Object.assign(o, r)
    })

    return o
}

const bundle = (entry) => {
    let graph = parsedEntry(entry)
    log('graph', graph)
    let module = moduleFromGraph(graph)
    let bundle = bundleTemplate(module)
    let file = 'dist/gua_bundle.js'
    saveBundle(bundle, file)
}

module.exports = bundle
