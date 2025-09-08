export default class Transform {

  constructor(x, y, px, py, angle) {
    this.pos = {
      x: x,
      y: y
    };

    this.pivot = {
      x: px,
      y: py
    };

    this.angle = angle;

    this.matrix = new DOMMatrix([1,0,0,1,0,0]);
    this.pivot_matrix = new DOMMatrix([1,0,0,1,0,0]);
    this.matrix_by_org = new DOMMatrix([1,0,0,1,0,0]);

    this.children = [] // Transform[]
  }

  GetMatrix(){
    return new DOMMatrix(this.matrix);
  }


  SetPosition(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }


  SetPivot(x, y) {
    this.pivot.x = x;
    this.pivot.y = y;
  }

  SetRotation(angle) {
    this.angle = angle;
  }


  AddChild(child){
    this.children.push(child);
  }

  Update(parent_mat, org_matrix) {
    const tmp_mat = new DOMMatrix(parent_mat)

    tmp_mat.translateSelf(this.pos.x, this.pos.y);
    tmp_mat.rotateSelf(this.angle);

    this.pivot_matrix = new DOMMatrix(tmp_mat)

    tmp_mat.translateSelf(-this.pivot.x, -this.pivot.y);
    this.matrix = new DOMMatrix(tmp_mat);


    // tmp_org_matrix : world matrix
    // this.matrix : canvas matrix에 대한 사각형의 transform matrix
    // this.matrix_by_org : world matrix에 대한 사각형의 transform matrix
    const tmp_org_matrix = new DOMMatrix(org_matrix);
    this.matrix_by_org = tmp_org_matrix.invertSelf().multiply(this.matrix);

    this.children.forEach(child => child.Update(this.pivot_matrix, org_matrix))
  }




  ApplyMatrix(ctx){
    ctx.setTransform(this.matrix);
  }


  ApplyPivotMatrix(ctx){
    ctx.setTransform(this.pivot_matrix);
  }


}

