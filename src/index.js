import Model from "./model/Model.js";
import MainAxis from "./model/shapes/MainAxis.js";
import InitTransformControls from "./ui/transform-controls.js";


function Initialize() {
  const canvas = document.getElementById('transformation-canvas')
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const ctx = canvas.getContext('2d');

  const rect_width = 100;
  const model_0 = new Model("gray", rect_width, 0, 0, 0, 0, 0);
  const axis = new MainAxis();
  window.addEventListener('resize', (event) => {
    // console.log(event);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    Render();
  })


  Render();
  InitTransformControls(model_0, Render);

  function Render() {
    ctx.fillStyle = "#F3CFCF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // canvas는 상단이 (-) 축이다.
    // 하지만 과제의 그래프는 상단이 (+) 축이다.
    // 그러므로 y축 방향을 뒤집기 위해, World 좌표계의 y축 방향을 반전시킨다
    let mat = new DOMMatrix([1, 0, 0, -1, 0, 0]);

    // canvas 좌측 하단이 원점이 되도록 만들기 위한 수평이동.
    mat.translateSelf(0, -canvas.height);

    // 이제 canvas 중앙이 (0,0)이 되도록 만들어야 한다.
    // canvas의 가로 및 세로 길이의 절반만큼 수평이동한다.
    mat.translateSelf(canvas.offsetWidth / 2, canvas.offsetHeight / 2);
    ctx.save();

    axis.On_ScreenSizeChanged(canvas.width, canvas.height);
    axis.Render(ctx);

    const org_matrix = new DOMMatrix(mat);
    model_0.UpdateTransformMatrix(mat, org_matrix);
    model_0.Render(ctx);
    // model_0.GetPoints();

    ctx.restore();
  }
}

Initialize();

// SolveD();



// ctx.fillRect(25,25, 50, 50);