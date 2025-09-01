export default function InitTransformControls(model_instance, action_render){
  // input
  const transform_instance = model_instance.GetTransform();
  const input_position_x = document.getElementById("input-position-x");
  const input_position_y = document.getElementById("input-position-y");
  const input_rotation = document.getElementById("input-rotation");
  const input_pivot_x = document.getElementById("input-pivot-x");
  const input_pivot_y = document.getElementById("input-pivot-y");
  const button_apply_transform = document.getElementById("button-apply-transform");

  input_position_x.addEventListener("input", Handle_Input);
  input_position_x.addEventListener("blur", Handle_Blur);

  input_position_y.addEventListener("input", Handle_Input);
  input_position_y.addEventListener("blur", Handle_Blur);

  input_rotation.addEventListener("input", Handle_Input);
  input_rotation.addEventListener("blur", Handle_Blur);

  input_pivot_x.addEventListener("blur", Handle_Blur);
  input_pivot_y.addEventListener("blur", Handle_Blur);



  // output
  const point_left_top = document.getElementById("point-left-top");
  const point_right_top = document.getElementById("point-right-top");
  const point_right_bottom = document.getElementById("point-right-bottom");
  const point_left_bottom = document.getElementById("point-left-bottom");


  Update_UI2Transform();
  Update_Transform2UI();

  button_apply_transform.addEventListener("click", (event) => {
    Update_UI2Transform();
    Update_Transform2UI()
  })


  function Update_UI2Transform() {
    const pos_x = parseFloat(input_position_x.value);
    const pos_y = parseFloat(input_position_y.value);
    const rotation = parseFloat(input_rotation.value);
    const pivot_x = parseFloat(input_pivot_x.value);
    const pivot_y = parseFloat(input_pivot_y.value);

    transform_instance.SetPosition(pos_x, pos_y);
    transform_instance.SetRotation(rotation);
    transform_instance.SetPivot(pivot_x, pivot_y);

    action_render();
  }


  function Update_Transform2UI() {
    const [point_LT, point_RT, point_RB, point_LB] = model_instance.GetPoints();

    // point_left_top.innerText = `${Math.round(point_LT.x)}, ${Math.round(point_LT.y)}`;
    // point_right_top.innerText = `${Math.round(point_RT.x)}, ${Math.round(point_RT.y)}`;
    // point_right_bottom.innerText = `${Math.round(point_RB.x)}, ${Math.round(point_RB.y)}`;
    // point_left_bottom.innerText = `${Math.round(point_LB.x)}, ${Math.round(point_LB.y)}`;
    
    point_left_top.innerText = `${point_LT.x.toFixed(2)}, ${point_LT.y.toFixed(2)}`;
    point_right_top.innerText = `${point_RT.x.toFixed(2)}, ${point_RT.y.toFixed(2)}`;
    point_right_bottom.innerText = `${point_RB.x.toFixed(2)}, ${point_RB.y.toFixed(2)}`;
    point_left_bottom.innerText = `${point_LB.x.toFixed(2)}, ${point_LB.y.toFixed(2)}`;

  }


  function Handle_Input(event) {
    let value = event.target.value;
    let values = value.split('.');

    if(values.length >= 2 && values[1].length >= 3){
      event.target.value = values[0] + "." + values[1].substr(0,2);
    }
  }

  function Handle_Blur(event){

    let value = event.target.value;
    let num = parseInt(value, 10);

    if(isNaN(num)){
      event.target.value = "0";
    }
  }
}