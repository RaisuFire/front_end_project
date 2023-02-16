const __main = () => {
  let types = {
    "line": false,
    "rect": false,
    "ellipse": false,
    "round_rect": false,
  }
  let paint = new Paint(types)
  let control = new Control(paint)

  // function roundedRect(ctx, x, y, width, height, radius) {
  //   ctx.beginPath();
  //   ctx.moveTo(x, y + radius);
  //   ctx.arcTo(x, y + height, x + radius, y + height, radius);
  //   ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  //   ctx.arcTo(x + width, y, x + width - radius, y, radius);
  //   ctx.arcTo(x, y, x, y + radius, radius);
  //   ctx.stroke();
  // }
  //
  // roundedRect(paint.context, 100, 100, 100, 100, 20)

  paint.registerAction("line", () => {
    control.drawLine()
  })

  paint.registerAction("rect", () => {
    control.drawRect()
  })

  paint.registerAction("ellipse", () => {
    control.drawEllipse()
  })

  paint.registerAction("round_rect", () => {
    control.drawRoundRect()
  })

}

__main()