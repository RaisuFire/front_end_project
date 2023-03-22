class Paint {
    constructor (callback) {
        this.actions = {}
        // this.types = ['line', 'rect', 'ellipse', 'round_rect']
        this.canvas = document.querySelector("#id-canvas")
        this.context = this.canvas.getContext("2d")
        this.control = null
        this.callback = callback
        this.callback(this)

        window.addEventListener("mousedown", (e) => {
            let target = e.target
            // 一次只能有一个事件
            console.log("actions", this.actions[target.id])
            for (let t of Types) {
                if (target.id == t) {
                    this.actions[t]()
                }
            }
        })
    }

    setControl(c) {
        this.control = c
    }

    registerAction = (type, callback) => {
        this.actions[type] = callback
    }

    renderCanvas = (objs) => {
        this.clear()

        this.context.save()
        this.renderObjects(objs)
        this.context.restore()
    }

    clear = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    renderObjects = (objs) => {
        for (let o of objs) {
            o.render(this.context)
        }
    }
}