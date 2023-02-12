class Line extends Shape{
    constructor (points) {
        super()
        if (!points) {
            points = [0,0,0,0]
        }

        this.x1 = points[0]
        this.y1 = points[1]
        this.x2 = points[2]
        this.y1 = points[2]
    }

    setPoint1(point) {
        this.x1 = point.x
        this.y1 = point.y
    }

    setPoint2(point) {
        this.x2 = point.x
        this.y2 = point.y
    }

    render (ctx) {
        // this.log()
        super.render()
        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x2, this.y2)
        ctx.closePath()
        ctx.stroke()
    }
}