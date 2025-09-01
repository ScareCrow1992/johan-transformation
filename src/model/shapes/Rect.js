export default class Rect{
  constructor(color, width){
    this.color = color;
    this.width = width;
  }

  Init(width_){
    this.width = width_;
  }

  GetWidth(){
    return this.width;
  }


  Render(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';

    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.width);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  RenderPivot(ctx) {
    ctx.save();
    
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred"

    
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    
    ctx.restore();
  }
}