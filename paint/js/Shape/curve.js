class Curve extends Shape{
    constructor () {
        super()
        this.x1 = 0
        this.y1 = 0
        this.x2 = 0
        this.y2 = 0
        this.x = 0
        this.x = 0
    }

    setPointBegin(point) {
        this.x1 = point.x
        this.y1 = point.y
    }

    setPointEnd(point) {
        this.x2 = point.x
        this.y2 = point.y
    }

    setPointControl(point) {
        this.x = point.x
        this.y = point.y
    }

    render(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.quadraticCurveTo(this.x, this.y, this.x2, this.y2)
        ctx.closePath()
        ctx.stroke()
    }
}