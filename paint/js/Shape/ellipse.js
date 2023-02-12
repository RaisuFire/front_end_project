class Ellipse extends Shape {
    constructor (x, y, radiusX, radiusY, rotation, startAngle, endAngle) {
        super()
        this.x = x
        this.y = y
        this.radiusX = radiusX ? radiusX : 0
        this.radiusY = radiusY ? radiusY : 0
        this.rotation = rotation ? rotation : 0
        this.startAngle = startAngle ? startAngle : 0
        this.endAngle = endAngle ? endAngle : 2 * Math.PI

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