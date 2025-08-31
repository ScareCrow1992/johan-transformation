

export default class MainAxis {

  constructor() {
    // this.axis_x = new Axis();
    // this.axis_y = new Axis();
    this.axis_x = new Axis_X();
    this.axis_y = new Axis_Y();
  }

  On_ScreenSizeChanged(width, height) {
    this.center_x = width / 2;
    this.center_y = height / 2;

    this.axis_x.SetScreenData(width, height);
    this.axis_y.SetScreenData(width, height);

    // this.axis_x.SetRange(new Point(0, this.center_y), new Point(width, this.center_y));
    // this.axis_y.SetRange(new Point(this.center_x, height), new Point(this.center_x, 0));

  }

  Render(ctx) {
    // const center_x = ctx.
    ctx.save();

    ctx.fillStyle = "black";
    ctx.strokeStyle = "black"
    ctx.beginPath();
    ctx.arc(this.center_x, this.center_y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    this.axis_x.Render(ctx);
    this.axis_y.Render(ctx);
    // this.axis_x.Render(ctx);
    // this.axis_y.Render(ctx);

    ctx.restore();
  }
}


class Axis_X {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.unit_length = 0;
    this.SetUnitLength(50);
  }

  SetScreenData(width, height) {
    this.width = width;
    this.height = height;
  }

  SetUnitLength(unit_length) {
    this.unit_length = unit_length;
  }

  Render(ctx) {
    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray"
    ctx.beginPath();
    ctx.moveTo(0, this.height / 2);
    ctx.lineTo(this.width, this.height / 2);
    ctx.stroke();

    this.#RenderUnitNumbers(ctx);

    ctx.restore();
  }


  #RenderUnitNumbers(ctx) {
    if (this.unit_length === 0)
      return;

    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray"

    let drawing_pos_x = this.width / 2;
    let label_number = 0;

    ctx.textAlign = "center"
    const bias = 5;
    while (drawing_pos_x < this.width) {
      drawing_pos_x += this.unit_length;
      label_number += this.unit_length;

      const label_number_txt = label_number.toString();
      let textWidth = ctx.measureText(label_number_txt).width;
      let textHeight = ctx.measureText(label_number_txt).actualBoundingBoxAscent + 
                        ctx.measureText(label_number_txt).actualBoundingBoxDescent;
      
                        
      // right side
      ctx.beginPath();
      ctx.moveTo(drawing_pos_x, this.height / 2);
      ctx.lineTo(drawing_pos_x, this.height / 2 - bias);
      ctx.stroke();
      const text_x = drawing_pos_x;
      const text_y = this.height / 2 + 2 * textHeight;
      ctx.fillText(label_number_txt, text_x, text_y);

      // left side
      const mirrored_text_x = this.width - text_x;
      ctx.beginPath();
      ctx.moveTo(mirrored_text_x, this.height / 2);
      ctx.lineTo(mirrored_text_x, this.height / 2 - bias);
      ctx.stroke();
      ctx.fillText((-label_number).toString(), mirrored_text_x, text_y);
    }


    // console.log(step_cnt);

    ctx.restore();
  }
}




class Axis_Y {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.unit_length = 0;
    this.SetUnitLength(50);
  }

  SetScreenData(width, height) {
    this.width = width;
    this.height = height;
  }

  SetUnitLength(unit_length) {
    this.unit_length = unit_length;
  }

  Render(ctx) {
    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray"
    ctx.beginPath();
    ctx.moveTo(this.width / 2, this.height);
    ctx.lineTo(this.width / 2, 0);
    ctx.stroke();

    this.#RenderUnitNumbers(ctx);
    ctx.restore();
  }


  #RenderUnitNumbers(ctx) {
    if (this.unit_length === 0)
      return;

    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray"

    let drawing_pos_y = this.height / 2;
    let label_number = 0;

    ctx.textAlign = "right"
    const bias = 5;
    while (drawing_pos_y < this.height) {
      drawing_pos_y += this.unit_length;
      label_number += this.unit_length;

      const label_number_txt = label_number.toString();
      let textWidth = ctx.measureText(label_number_txt).width;
      let textHeight = ctx.measureText(label_number_txt).actualBoundingBoxAscent + 
                        ctx.measureText(label_number_txt).actualBoundingBoxDescent;
      
                        
      // down side
      ctx.beginPath();
      ctx.moveTo(this.width / 2 - bias, drawing_pos_y);
      ctx.lineTo(this.width / 2, drawing_pos_y);
      ctx.stroke();
      const text_x = (this.width / 2) - bias * 2;
      const text_y = drawing_pos_y + textHeight / 2;
      ctx.fillText((-label_number).toString(), text_x, text_y);

      // up side
      const mirrored_text_y = this.height - drawing_pos_y;
      ctx.beginPath();
      ctx.moveTo(this.width / 2 - bias, mirrored_text_y);
      ctx.lineTo(this.width / 2, mirrored_text_y);
      ctx.stroke();
      ctx.fillText(label_number_txt, text_x, mirrored_text_y);
    }

    ctx.restore();
  }
}



/*
class Axis {
  constructor() {
    this.point_from = new Point(0, 0);
    this.point_to = new Point(0, 0);
    this.unit_length = 0;
    this.SetUnitLength(50);
  }

  SetRange(from, to) {
    this.point_from = from;
    this.point_to = to;
  }

  SetUnitLength(unit_length) {
    this.unit_length = unit_length;
  }

  Render(ctx) {
    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray"
    ctx.beginPath();
    ctx.moveTo(this.point_from.x, this.point_from.y);
    ctx.lineTo(this.point_to.x, this.point_to.y);
    ctx.stroke();

    if (this.unit_length !== 0) {
      this.#RenderUnitNumbers(ctx)

    }

    ctx.restore();
  }


  #RenderUnitNumbers(ctx) {
    // const step_cnt = 

  }
}
*/