class Control {
    constructor (paint) {
        this.paint = paint
        this.objects = []
    }

    drawLine() {
        let line = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        canvas.addEventListener('mousedown', (e) => {
            line = new Line()
            let p = getCursorPosition(canvas, e)
            line.setPoint1(p)
            line.setState(State.Edit)
        })

        canvas.addEventListener('mousemove', (e) => {
            let p = getCursorPosition(canvas, e)
            if (line.state != State.Edit) {
                return
            }
            line.setPoint2(p)
            this.paint.renderCanvas(this.objects)
            line.render(context)
        })

        canvas.addEventListener('mouseup', (e) => {
            let p = getCursorPosition(canvas, e)
            if (line.state == State.Edit) {
                line.setPoint2(p)
                line.setState(State.Complete)
                this.objects.push(line)
            }
            line.log()
            this.paint.renderCanvas(this.objects)
        })
    }

    drawRect() {
        let rect = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        canvas.addEventListener('mousedown', (e) => {
            rect = new Rect()
            let p = getCursorPosition(canvas, e)
            rect.setPoint1(p)
            rect.setState(State.Edit)
        })

        canvas.addEventListener('mousemove', (e) => {
            let p = getCursorPosition(canvas, e)
            if (rect.state != State.Edit) {
                return
            }
            rect.setPoint2(p)
            this.paint.renderCanvas(this.objects)
            rect.render(context)
        })

        canvas.addEventListener('mouseup', (e) => {
            let p = getCursorPosition(canvas, e)
            if (rect.state == State.Edit) {
                rect.setPoint2(p)
                rect.setState(State.Complete)
                this.objects.push(rect)
            }
            this.paint.renderCanvas(this.objects)
        })

    }

    drawEllipse() {
        let ellipse = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        canvas.addEventListener('mousedown', (e) => {
            let p = getCursorPosition(canvas, e)
            ellipse = new Ellipse(p.x, p.y)
            ellipse.setState(State.Edit)
        })

        canvas.addEventListener('mousemove', (e) => {
            let p = getCursorPosition(canvas, e)
            if (ellipse.state != State.Edit) {
                return
            }
            let radiusX = Math.abs(ellipse.x - p.x)
            let radiusY = Math.abs(ellipse.y - p.y)
            ellipse.setRadiusX(radiusX)
            ellipse.setRadiusY(radiusY)
            this.paint.renderCanvas(this.objects)
            ellipse.render(context)
        })

        canvas.addEventListener('mouseup', (e) => {
            let p = getCursorPosition(canvas, e)
            if (ellipse.state == State.Edit) {
                let radiusX = Math.abs(ellipse.x - p.x)
                let radiusY = Math.abs(ellipse.y - p.y)
                ellipse.setRadiusX(radiusX)
                ellipse.setRadiusY(radiusY)
                ellipse.setState(State.Complete)
                this.objects.push(ellipse)
            }
            this.paint.renderCanvas(this.objects)
        })

    }

    drawRoundRect() {
        let roundRect = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        canvas.addEventListener('mousedown', (e) => {
            let p = getCursorPosition(canvas, e)
            roundRect = new RoundRect(p.x, p.y)
            roundRect.setState(State.Edit)
        })

        canvas.addEventListener('mousemove', (e) => {
            let p = getCursorPosition(canvas, e)
            if (roundRect.state != State.Edit) {
                return
            }
            let w = Math.abs(roundRect.x - p.x)
            let h = Math.abs(roundRect.y - p.y)
            let r = (w + h) / 10
            roundRect.setWidth(w)
            roundRect.setHeight(h)
            roundRect.setRadius(r)
            this.paint.renderCanvas(this.objects)
            roundRect.render(context)
        })

        canvas.addEventListener('mouseup', (e) => {
            let p = getCursorPosition(canvas, e)
            if (roundRect.state == State.Edit) {
                let w = Math.abs(roundRect.x - p.x)
                let h = Math.abs(roundRect.y - p.y)
                let r = (w + h) / 10
                roundRect.setWidth(w)
                roundRect.setHeight(h)
                roundRect.setRadius(r)
                roundRect.setState(State.Complete)
                this.objects.push(roundRect)
            }
            this.paint.renderCanvas(this.objects)
        })

    }

}