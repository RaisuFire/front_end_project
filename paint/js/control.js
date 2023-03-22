class Control {
    constructor (paint) {
        this.paint = paint
        this.objects = []

        this.registerAction()
    }

    drawLine() {
        let line = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        let that = this

        canvas.onmousedown = (e) => {
            line = new Line()
            let p = getCursorPosition(canvas, e)
            line.setPoint1(p)
            line.setState(State.Edit)
        }

        canvas.onmousemove = (e) => {
            let p = getCursorPosition(canvas, e)
            if (line.state != State.Edit) {
                return
            }
            line.setPoint2(p)
            that.paint.renderCanvas(that.objects)
            line.render(context)
        }

        canvas.onmouseup = (e) => {
            let p = getCursorPosition(canvas, e)
            if (line.state == State.Edit) {
                line.setPoint2(p)
                line.setState(State.Complete)
                that.objects.push(line)
            }
            line = {}
            that.paint.renderCanvas(that.objects)
        }
    }

    drawRect() {
        let rect = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        canvas.onmousedown = (e) => {
            rect = new Rect()
            let p = getCursorPosition(canvas, e)
            rect.setPoint1(p)
            rect.setState(State.Edit)
        }

        canvas.onmousemove = (e) => {
            let p = getCursorPosition(canvas, e)
            if (rect.state != State.Edit) {
                return
            }
            rect.setPoint2(p)
            this.paint.renderCanvas(this.objects)
            rect.render(context)
        }

        canvas.onmouseup = (e) => {
            let p = getCursorPosition(canvas, e)
            if (rect.state == State.Edit) {
                rect.setPoint2(p)
                rect.setState(State.Complete)
                this.objects.push(rect)
            }
            this.paint.renderCanvas(this.objects)
        }
    }

    drawEllipse() {
        let ellipse = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        canvas.onmousedown = (e) => {
            let p = getCursorPosition(canvas, e)
            ellipse = new Ellipse(p.x, p.y)
            ellipse.setState(State.Edit)
        }

        canvas.onmousemove = (e) => {
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
        }

        canvas.onmouseup = (e) => {
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
        }
    }

    drawRoundRect() {
        let roundRect = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        canvas.onmousedown = (e) => {
            let p = getCursorPosition(canvas, e)
            roundRect = new RoundRect(p.x, p.y)
            roundRect.setState(State.Edit)
        }

        canvas.onmousemove = (e) => {
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
        }

        canvas.onmouseup = (e) => {
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
        }
    }

    drawCircle() {
        let circle = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        canvas.onmousedown = (e) => {
            let p = getCursorPosition(canvas, e)
            circle = new Circle()
            circle.x = p.x
            circle.y = p.y
            circle.setState(State.Edit)
        }

        canvas.onmousemove = (e) => {
            let p = getCursorPosition(canvas, e)
            if (circle.state != State.Edit) {
                return
            }
            let w = Math.abs(circle.x - p.x)
            let h = Math.abs(circle.y - p.y)
            let radius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2))
            circle.radius = radius
            this.paint.renderCanvas(this.objects)
            circle.render(context)
        }

        canvas.onmouseup = (e) => {
            let p = getCursorPosition(canvas, e)
            if (circle.state == State.Edit) {
                let w = Math.abs(circle.x - p.x)
                let h = Math.abs(circle.y - p.y)
                let radius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2))
                circle.radius = radius
                circle.setState(State.Complete)
                this.objects.push(circle)
            }
            this.paint.renderCanvas(this.objects)
        }
    }

    drawCurve() {
        let curve = {}
        let canvas = this.paint.canvas
        let context = this.paint.context

        canvas.onmousedown = (e) => {
            let p = getCursorPosition(canvas, e)
            if (!curve.x1 && !curve.y1) {
                curve = new Curve()
                curve.setPointBegin(p)
            } else if (!curve.x2 && !curve.y2) {
                curve.setPointEnd(p)
            } else if (!curve.x && !curve.y) {
                curve.setPointControl(p)
                curve.setState(State.Edit)
            }
        }

        canvas.onmousemove = (e) => {
            let p = getCursorPosition(canvas, e)
            if (curve.state != State.Edit) {
                return
            }
            curve.setPointControl(p)
            this.paint.renderCanvas(this.objects)
            curve.render(context)
        }

        canvas.onmouseup = (e) => {
            let p = getCursorPosition(canvas, e)
            if (curve.state == State.Edit) {
                curve.setPointControl(p)
                curve.setState(State.Complete)
                this.objects.push(curve)
                curve = {}
            }
            this.paint.renderCanvas(this.objects)
        }
    }

    drawPencil() {
        let pencil = {}
        let canvas = this.paint.canvas
        let context = this.paint.context
        let p1 = null
        let p2 = null

        canvas.onmousedown = (e) => {
            pencil = new Pencil()
            pencil.setState(State.Edit)
            p1 = getCursorPosition(canvas, e)

        }

        canvas.onmousemove = (e) => {
            if (pencil.state != State.Edit) {
                return
            }

            let p = getCursorPosition(canvas, e)
            if (!p2) {
                p2 = JSON.parse(JSON.stringify(p))
            } else {
                p1 = JSON.parse(JSON.stringify(p2))
                p2 = JSON.parse(JSON.stringify(p))
            }
            let line = new Line([p1.x, p1.y, p2.x, p2.y])
            this.objects.push(line)
            this.paint.renderCanvas(this.objects)

        }

        canvas.onmouseup = (e) => {
            let p = getCursorPosition(canvas, e)
            if (pencil.state == State.Edit) {
                p1 = JSON.parse(JSON.stringify(p2))
                p2 = JSON.parse(JSON.stringify(p))
                let line = new Line([p1.x, p1.y, p2.x, p2.y])
                this.objects.push(line)
            }
            this.paint.renderCanvas(this.objects)
        }
    }

    drawAirbrush() {
        let airbrush = {}
        let canvas = this.paint.canvas

        canvas.onmousedown = (e) => {
            airbrush = new Airbrush()
            airbrush.setState(State.Edit)
        }

        canvas.onmousemove = (e) => {
            if (airbrush.state != State.Edit) {
                return
            }
            let p = getCursorPosition(canvas, e)
            // 在P点随机5个散落小圆
            for (let i = 0; i < 5; i++) {
                let ox = (Math.random() * 10 - 5) + p.x
                let oy = (Math.random() * 10 - 5) + p.y
                let circle = new Circle(ox, oy, 1)
                this.objects.push(circle)
            }
            this.paint.renderCanvas(this.objects)

        }

        canvas.onmouseup = (e) => {
            if (pencil.state == State.Edit) {
                let p = getCursorPosition(canvas, e)
                let circle = new Circle(p.x, p.y, 10)
                this.objects.push(circle)
            }
            this.paint.renderCanvas(this.objects)
        }
    }

    registerAction() {
        this.paint.registerAction('line', () => {
            this.drawLine()
        })

        this.paint.registerAction('rect', () => {
            this.drawRect()
        })

        this.paint.registerAction('ellipse', () => {
            this.drawEllipse()
        })

        this.paint.registerAction('round_rect', () => {
            this.drawRoundRect()
        })

        this.paint.registerAction('curve', () => {
            this.drawCurve()
        })

        this.paint.registerAction('pencil', () => {
            this.drawPencil()
        })

        this.paint.registerAction('circle', () => {
            this.drawCircle()
        })

        this.paint.registerAction('airbrush', () => {
            this.drawAirbrush()
        })
    }

}