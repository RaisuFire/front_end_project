const State = {
    Create: 0,
    Edit: 1,
    Complete: 2,
}

const Line = () => {
    let l = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        state: State.Create
    }

    l.setPoint1 = (x, y) => {
        l.x1 = x
        l.y1 = y
    }

    l.setPoint2 = (x, y) => {
        l.x2 = x
        l.y2 = y
    }

    l.setState = (state) => {
        l.state = state
    }

    l.render = (ctx) => {
        ctx.beginPath()
        ctx.moveTo(l.x1, l.y1)
        ctx.lineTo(l.x2, l.y2)
        ctx.closePath()
        ctx.stroke()
    }
    
    return l
}

const Paint = () => {
    let paint = {
        actions: {},
        // 点击按钮时候，获取事件状态
        types: {
            "line": true,
        },
    }
    let canvas = document.querySelector("#id-canvas");
    let context = canvas.getContext("2d");

    paint.canvas = canvas
    paint.context = context

    paint.registerAction = (type, callback) => {
        paint.actions[type] = callback
    }

    paint.getCursorPosition = (canvas, event) => {
        if (!canvas) {
            return
        }
        let rect = canvas.getBoundingClientRect()
        let x = event.clientX - rect.left
        let y = event.clientY - rect.top
        return {x, y}
    }

    // canvas.addEventListener("mousedown", (e) => {
    //     paint.getCursorPosition(canvas, e)
    // })

    window.addEventListener("mousedown", (e) => {
        let target = e.target
        // 一次只能有一个事件
        for (let k of Object.keys(paint.types)) {
            if (target.id == k) {
                paint.types[k] = true
                paint.actions[k]()
            }
        }
    })

    paint.renderCanvas = (objs) => {
        paint.clear()

        context.save()
        paint.renderObjects(objs)
        context.restore()
    }

    paint.clear = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    paint.renderObjects = (objs) => {
        for (let o of objs) {
            o.render(context)
        }
    }

    // setInterval(() => {
    //     //regi
    //     let actions = Object.keys(paint.actions)
    //     for (let i = 0; i < actions.length; i++) {
    //         let key = actions[i]
    //         if(paint.types[key]) {
    //             // 如果点击按钮, 调用注册的 action
    //             paint.actions[key]()
    //         }
    //     }
    //
    //
    //     // update
    //     paint.update()
    //
    //     //clear
    //     paint.clear()
    //
    //     //render
    //     paint.render()
    //
    // }, 2000)
    return paint
}

const __main = () => {
    let objects = []
    let paint = Paint()

    paint.registerAction("line", () => {
        let line = {}
        paint.canvas.addEventListener("mousedown", (e) => {
            line = Line()
            let p = paint.getCursorPosition(paint.canvas, e)
            line.setPoint1(p.x, p.y)
            line.setState(State.Edit)
        })

        paint.canvas.addEventListener("mousemove", (e) => {
            let p = paint.getCursorPosition(paint.canvas, e)
            if (line.state != State.Edit) {
                return
            }
            line.setPoint2(p.x, p.y)
            paint.renderCanvas(objects)
            line.render(paint.context)
        })

        paint.canvas.addEventListener("mouseup", (e) => {
            let p = paint.getCursorPosition(paint.canvas, e)
            if (line.state == State.Edit) {
                line.setPoint2(p.x, p.y)
                line.setState(State.Complete)
                objects.push(line)
            }
            paint.renderCanvas(objects)
        })

    })

    paint.update = () => {

    }

    paint.clear = () => {
        paint.context.clearRect(0, 0, paint.canvas.width, paint.canvas.height)
    }

    paint.render = () => {

    }

}

__main()