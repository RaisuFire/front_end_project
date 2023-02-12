class RoundRect extends Shape {
    constructor (x, y, width, height, radius) {
        super()
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.radius = radius
    }

    setX(x) {
        this.x = x
    }

    setY(y) {
        this.y = y
    }

    setWidth(width) {
        this.width = width
    }

    setHeight(height) {
        this.height = height
    }

    setRadius(radius) {
        this.radius = radius
    }

    render(ctx) {
        super.render()
        ctx.beginPath();
          ctx.moveTo(x, y + radius);
          ctx.arcTo(x, y + height, x + radius, y + height, radius);
          ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
          ctx.arcTo(x + width, y, x + width - radius, y, radius);
          ctx.arcTo(x, y, x, y + radius, radius);
          ctx.stroke();
    }
    
}