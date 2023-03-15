class Circle extends Shape {
    constructor (x, y, radius, startAngle, endAngle) {
        super()
        this.x = x
        this.y = y
        this.radius = radius
        this.startAngle = startAngle ? startAngle : 0
        this.endAngle = endAngle ? endAngle : Math.PI * 2
    }

    render(ctx) {
        super.render()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.stroke()
    }
}