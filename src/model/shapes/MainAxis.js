

export default class MainAxis {

  constructor() {
    // this.axis_x = new Axis();
    // this.axis_y = new Axis();
    this.axis_x = new Axis_X();
    this.axis_y = new Axis_Y();
  }

  On_ScreenSizeChanged(width, height, org_matrix) {
    this.center_x = width / 2;
    this.center_y = height / 2;

    // console.log(new DOMMatrix(org_matrix).transformPoint(new DOMPoint(1, 0)));

    this.axis_x.SetScreenData(width, height, new DOMMatrix(org_matrix));
    this.axis_y.SetScreenData(width, height, new DOMMatrix(org_matrix));

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
    this.org_matrix = new DOMMatrix([1, 0, 0, -1, 0, 0]);
    this.SetUnitLength(50);
  }

  SetScreenData(width, height, org_matrix) {
    this.width = width;
    this.height = height;
    this.org_matrix = org_matrix;
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


    ctx.textAlign = "center"
    const bias = 5;

    let size_ = Math.sqrt(this.org_matrix.a * this.org_matrix.a + this.org_matrix.b * this.org_matrix.b)
    const mat_rightSide = new DOMMatrix(this.org_matrix);
    const mat_leftSide = new DOMMatrix(this.org_matrix);

    let drawing_pos_x = this.width / 2 / size_;
    let label_number = 0;
    // console.log(size_x);
    // console.log(this.org_matrix);

    while (drawing_pos_x < this.width / size_) {
      drawing_pos_x += this.unit_length;
      label_number += this.unit_length;
      const label_number_txt = label_number.toString();

      // console.log(this.org_matrix);

      let textWidth = ctx.measureText(label_number_txt).width;
      let textHeight = ctx.measureText(label_number_txt).actualBoundingBoxAscent +
        ctx.measureText(label_number_txt).actualBoundingBoxDescent;

      // right side
      mat_rightSide.translateSelf(this.unit_length, 0);
      ctx.setTransform(mat_rightSide);

      // 점선 출력
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -bias / size_);
      ctx.stroke();
      // const text_x = drawing_pos_x;
      // const text_y = this.height / 2 + 2 * textHeight;

      // 라벨 출력
      const tmp_mat = mat_rightSide.scale(1 / size_, -1 / size_);
      ctx.setTransform(tmp_mat);
      ctx.fillText(label_number_txt, 0, bias / size_ + textHeight);


      // left side
      mat_leftSide.translateSelf(-this.unit_length, 0);
      ctx.setTransform(mat_leftSide);

      // 점선 출력
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -bias / size_);
      ctx.stroke();

      // 라벨 출력
      const tmp_left_mat = mat_leftSide.scale(1 / size_, -1 / size_);
      ctx.setTransform(tmp_left_mat);
      ctx.fillText(-label_number_txt, 0, bias / size_ + textHeight);


      // const mirrored_text_x = this.width - text_x;
      // ctx.beginPath();
      // ctx.moveTo(mirrored_text_x, this.height / 2);
      // ctx.lineTo(mirrored_text_x, this.height / 2 - bias);
      // ctx.stroke();
      // ctx.fillText((-label_number).toString(), mirrored_text_x, text_y);
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
    this.org_matrix = new DOMMatrix([1, 0, 0, -1, 0, 0]);
    this.SetUnitLength(50);
  }

  SetScreenData(width, height, org_matrix) {
    this.width = width;
    this.height = height;
    this.org_matrix = org_matrix;
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


    ctx.textAlign = "right"
    const bias = 3;

    let size_ = Math.sqrt(this.org_matrix.c * this.org_matrix.c + this.org_matrix.d * this.org_matrix.d)
    const mat_upSide = new DOMMatrix(this.org_matrix);
    const mat_downSide = new DOMMatrix(this.org_matrix);


    let drawing_pos_y = this.height / 2 / size_;
    let label_number = 0;

    while (drawing_pos_y < this.height / size_) {
      drawing_pos_y += this.unit_length;
      label_number += this.unit_length;

      const label_number_txt = label_number.toString();

      // down side
      mat_downSide.translateSelf(0, -this.unit_length);
      ctx.setTransform(mat_downSide);

      // 점선 출력
      ctx.beginPath();
      ctx.moveTo(-bias / size_, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();

      // 라벨 출력
      const tmp_down_mat = mat_downSide.scale(1 / size_, -1 / size_);
      ctx.setTransform(tmp_down_mat);
      ctx.fillText(-label_number_txt, - bias / size_, 0);

      // up side
      mat_upSide.translateSelf(0, this.unit_length, 0);
      ctx.setTransform(mat_upSide);

      // 점선 출력
      // const mirrored_text_y = this.height - drawing_pos_y;
      ctx.beginPath();
      ctx.moveTo(0 - bias / size_, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();

      // 라벨 출력
      const tmp_up_mat = mat_upSide.scale(1 / size_, -1 / size_);
      ctx.setTransform(tmp_up_mat);
      ctx.fillText(label_number_txt, - bias / size_, 0);
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