const Line = () => {
    let l = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
    }

    l.render = (context) => {
        context.beginPath();
        context.moveTo(l.x1, l.y1);
        context.lineTo(l.x2, l.y2);
        context.fill();
        context.closePath()
    }
    
    return l
}

const Paint = () => {
    let paint = {
        actions: {},
        types: {},
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

    canvas.addEventListener("mousedown", (e) => {
        paint.getCursorPosition(canvas, e)
    })

    // window.addEventListener("mousedown", (e) => {
    //     let target = e.target
    //     if (target.tagName == "CANVAS") {
    //         paint.getCursorPosition(canvas, e)
    //     } else if (target.id == "id-line") {
    //         paint.types["line"] = true
    //     } else {
    //
    //     }
    //     console.log("paint", paint.types)
    //     // paint.getCursorPosition(canvas, e)
    // })

    paint.renderCanvas = () => {
        paint.clear()

        context.save()
        paint.renderObjects()
        context.restore()

    }

    paint.clear = () => {
        context.clearRect(0, 0, canvas.width, canvas.height``)
    }

    paint.renderObjects = (obj) => {
        obj.render()
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
    // 点击按钮获取事件， 一次只能获取一个事件

    let paint = Paint()
    let line = Line()

    let idLine = document.querySelector("#id-line")

    paint.registerAction("line", () => {
        let p = paint.getCursorPosition()
        console.log("p", p)
        // console.log("x,y", x, y)
        // line.render()
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