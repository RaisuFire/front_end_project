const { SyncHook } = require('tapable')
const path = require('path')
const fs = require('fs')
const Compilation = require('./Complication')
const fileDependencySet = new Set()

class Compiler {
    constructor(options) {
        this.options = options
        this.hooks = {
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }
    }

    run(callback) {
        this.hooks.run.call()
        const onCompiled = (err, stats, fileDependencies) => {
            const { assets } = stats
            this.hooks.emit.call()
            for(const filename in assets) {
                if(!fs.existsSync(this.options.output.path)) {
                    fs.mkdirSync(this.options.output.path)
                }
                let filePath = path.join(this.options.output.path, filename)
                fs.writeFileSync(filePath, assets[filename], 'utf8')
            }
            callback(err, {
                toJson: () => stats,
            });
            [...fileDependencies].forEach(fileDependency => {
                if(!fileDependencySet.has(fileDependency)) {
                    fs.watch(fileDependency, () => this.compile(onCompiled))
                    fileDependencySet.add(fileDependency)
                }
            })
            this.hooks.done.call()
        }
        this.compile(onCompiled)
    }

    compile(callback) {
        const compilation = new Compilation(this.options)
        compilation.build(callback)
    }
}

module.exports = Compiler

