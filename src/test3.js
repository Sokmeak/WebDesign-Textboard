/**
 * @ type HTMLCavasElement
 */

function updateSpeedValue() {
  const speed = document.getElementById("speed").value;
  document.getElementById("speedValue").innerText = speed;
}

// Optionally, set an initial value on page load
document.addEventListener("DOMContentLoaded", () => {
  updateSpeedValue();
});

// declare variables

document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.querySelector("button");
  const content = document.querySelector("#content");

  var canvas = document.createElement("canvas");
  canvas.id = "c";
  var body = document.getElementsByTagName("body");

  generateButton.addEventListener("click", function () {
    content.style.display = "none";
    const myText = document.getElementById("inputText").value;
    // var canvas = document.getElementById("c");
    document.body.appendChild(canvas);

    const textColor = document.getElementById("textColorPicker").value;
    const frame = document.getElementById("frame-selector").value;
    const fontSize = document.getElementById("fontSize-selector").value;
    let backGround = document.getElementById("backgroundColorPicker").value;
   
    const myFramecolor = "#edb005";
    canvas.style.border = "10px " + frame + myFramecolor;
    canvas.style.background = backGround;
    canvas.width = window.innerWidth - 20;
    console.log(canvas.width);
    canvas.height = window.innerHeight - 20;

    // for display

    var ctx = canvas.getContext("2d");

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    let w = canvas.width;
    let h = canvas.height;
    ctx.font = "bold " + fontSize + "px sans-serif";

    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.baseline = "middle";

    // ctx.font = "bold 40px serif "
    ctx.fillText(myText, w / 2, h / 2);
  });

  document.addEventListener("dblclick", function () {
    document.body.removeChild(canvas);
    content.style.display = "flex";
    canvas.style.background = ""; // clear color back ground 
  });
});
