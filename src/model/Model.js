import Transform from "./core/Transform.js";
import Rect from "./shapes/Rect.js";

export default class Model{
  
  constructor(color, width, x, y, px, py, angle){
    this.shape = new Rect(color, width);
    this.transform = new Transform(x, y, px, py, angle);
  }

  GetTransform(){
    return this.transform;
  }

  // org_matrix : canvas 상단이 (+)축이며, 중앙이 원점이 되도록 보정된 transform 행렬
  UpdateTransformMatrix(parent_matrix, org_matrix){
    this.transform.Update(parent_matrix, org_matrix);
  }

  AddChild(child){
    this.transform.AddChild(child.transform);
  }


  Render(ctx){
    ctx.save();

    this.transform.ApplyMatrix(ctx);
    this.shape.Render(ctx);

    this.transform.ApplyPivotMatrix(ctx);
    this.shape.RenderPivot(ctx);


    ctx.restore();
  }


  GetPoints(){
    // canvas 중앙에 대한 model의 transform 행렬
    let mat = this.transform.matrix_by_org;
    const width = this.shape.GetWidth();

    const point_LB = new DOMPoint(0, 0);  // 좌측 하단
    const point_RB = new DOMPoint(width, 0);  // 우측 하단
    const point_LT = new DOMPoint(0, width);  // 좌측 상단
    const point_RT = new DOMPoint(width, width);  // 우측 상단

    // 각 꼭짓점의 기본좌표에 행렬곱을 수행하여, 좌표를 획득한다.
    const local_point_LB = mat.transformPoint(point_LB);
    const local_point_RB = mat.transformPoint(point_RB);
    const local_point_LT = mat.transformPoint(point_LT);
    const local_point_RT = mat.transformPoint(point_RT);


    return [local_point_LT, local_point_RT, local_point_RB, local_point_LB];
  }

}