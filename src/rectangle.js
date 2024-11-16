class Rectangle {
  constructor({
    id,
    xPos = 0,
    yPos = 0,
    width = 100,
    height = 50,
    color = "white",
  } = {}) {
    Object.assign(this, {
      xPos,
      yPos,
      width,
      height,
      color,
      id,
    });
  }

  draw(ctx, isMarked = false) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = isMarked ? "blue" : "black";
    ctx.strokeRect(this.xPos, this.yPos, this.width, this.height);
    ctx.restore();
  }

  verifyIfClickedInRect(mouseXpos, mouseYpos) {
    const isWithinXBounds =
      mouseXpos >= this.xPos && mouseXpos <= this.xPos + this.width;
    const isWithinYBounds =
      mouseYpos >= this.yPos && mouseYpos <= this.yPos + this.height;

    return {
      clicked: isWithinXBounds && isWithinYBounds,
      idRect: this.id,
    };
  }

  drawOption(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos + this.height / 2, 5, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.restore();
  }
}

export default Rectangle;
