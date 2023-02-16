class Pen extends Shape {
    constructor () {
        super()
        this.x = x
        this.y = y


    }

    setX(x) {
        this.x = x
    }

    setY(y) {
        this.y = y
    }

    setRadiusX(radiusX) {
        this.radiusX = radiusX
    }

    setRadiusY(radiusY) {
        this.radiusY = radiusY
    }

    render(ctx) {
        super.render()
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle)
        ctx.stroke()
    }
}