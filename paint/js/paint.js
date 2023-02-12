class Paint {
    constructor (types) {
        this.actions = {}
        this.types = types
        this.canvas = document.querySelector("#id-canvas");
        this.context = this.canvas.getContext("2d");

        window.addEventListener("mousedown", (e) => {
            let target = e.target
            // 一次只能有一个事件
            for (let k of Object.keys(this.types)) {
                if (target.id == k) {
                    this.types[k] = true
                    this.actions[k]()
                }
            }
        })
    }

    registerAction = (type, callback) => {
        this.actions[type] = callback
    }

    getCursorPosition = (canvas, event) => {
        if (!canvas) {
            return
        }
        let rect = canvas.getBoundingClientRect()
        let x = event.clientX - rect.left
        let y = event.clientY - rect.top
        return {x, y}
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