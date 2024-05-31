function updateSpeedValue() {
  const speed = document.getElementById("speed").value;
  document.getElementById("speedValue").innerText = speed;
}

// Function to set initial values on page load
function setInitialValues() {
  updateSpeedValue();
}

// Function to handle the canvas setup and text animation
function generateCanvasContent() {
  const generateButton = document.querySelector("button");
  const content = document.querySelector("#content");

  let animationId;

  var textColor = "";

  generateButton.addEventListener("click", function () {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    let canvas = document.getElementById("c");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "c";
      document.body.appendChild(canvas);
    }

    const textStle = document.getElementById("text-style-selector").value;

    const myFont = getSelectedFont();
    const myText = document.getElementById("inputText").value;
    const textColor = document.getElementById("textColorPicker").value;
    const frame = document.getElementById("frame-selector").value;
    const frameColorSelected = document.getElementById(
      "frame-color-selector"
    ).value;
    const fontSize = document.getElementById("fontSize-selector").value;
    const backGround = document.getElementById("backgroundColorPicker").value;

    const myFrameColor = getFrameColor(frameColorSelected);

    content.style.display = "none";
    setupCanvas(canvas, frame, myFrameColor, backGround);
    const ctx = canvas.getContext("2d");
    const speed = parseInt(document.getElementById("speed").value, 10) * 2;

    let animation = document.getElementById("animation-selector").value;

    if (animation == "Normal") {
      animationId = drawNormal(
        ctx,
        myText,
        myFont,
        textColor,
        fontSize,
        canvas.width,
        canvas.height,
        speed
      );
    } else if (animation == "Wave") {
      animationId = drawWave(
        ctx,
        myText,
        myFont,
        textColor,
        fontSize,
        canvas.width,
        canvas.height,
        speed
      );
    } else if (animation == "Drift") {
      animationId = DrawanimateDrift(
        ctx,
        myText,
        myFont,
        textColor,
        fontSize,
        canvas.width,
        canvas.height,
        speed
      );
    }
  });

  document.addEventListener("dblclick", function () {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    content.style.display = "flex";
    document.body.removeChild(canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  });
}

// Function to get the selected font from the dropdown

function getSelectedFont() {
  let myFont = document.getElementById("font-selector").value;
  switch (myFont) {
    case "Jacquard":
      return "'Jacquard 12', system-ui";
    case "Sevillana":
      return "'Sevillana', cursive";
    case "danfo":
      return "'Danfo', cursive";
    case "jersey25":
      return "'Jersey 25 Charted', cursive";
    case "pacifico":
      return "'Pacifico', cursive";
    case "poetsen-one":
      return "'Poetsen One', sans-serif";
    case "dancing-script":
      return "'Dancing Script', cursive";
    case "lobster":
      return "'Lobster', cursive";
    case "audiowide":
      return "'Audiowide', cursive";
    case "jersey-15":
      return "'Jersey 15', cursive";
    case "rubik-moonrocks":
      return "'Rubik Moonrocks', cursive";
    case "workbench":
      return "'Workbench', cursive";
    default:
      return myFont;
  }
}

// Function to get the frame color based on the selected option

function getFrameColor(frameColorSelected) {
  switch (frameColorSelected) {
    case "Gold":
      return "#fac123";
    case "Silvar":
      return "#C0C0C0";
    case "Nature":
      return "#2ECA52";
    default:
      return "";
  }
}

// Function to set up the canvas properties
function setupCanvas(canvas, frame, myFrameColor, backGround) {
  canvas.style.border = `10px ${frame} ${myFrameColor}`;
  canvas.style.background = backGround;
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;
}

// Function to animate the text on the canvas
function drawNormal(ctx, myText, myFont, textColor, fontSize, w, h, speed) {
  let xPos = w;
  ctx.font = `bold ${fontSize}px ${myFont}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillText(myText, xPos, h / 2);
    xPos -= speed;

    if (xPos + ctx.measureText(myText).width < 0) {
      xPos = w;
    }
    animationId = requestAnimationFrame(draw);
  }

  draw();
  return animationId;
}

function drawWave(ctx, myText, myFont, textColor, fontSize, w, h, speed) {
  let xPos = w;
  ctx.font = `bold ${fontSize}px ${myFont}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  function draw() {
    ctx.clearRect(0, 0, w, h);
    let yPos = h / 2 + Math.sin(xPos * 0.02) * 40;
    ctx.fillText(myText, xPos, yPos);
    xPos -= speed;

    if (xPos + ctx.measureText(myText).width < 0) {
      xPos = w;
    }
    animationId = requestAnimationFrame(draw);
  }

  draw();
  return animationId;
}

function DrawanimateDrift(
  ctx,
  myText,
  myFont,
  textColor,
  fontSize,
  w,
  h,
  speed
) {
  let xPos = w;
  ctx.font = `bold ${fontSize}px ${myFont}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  ctx.font = `bold ${fontSize}px ${myFont}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  let waveFrequency = 0.01;
  let waveAmplitude = fontSize / 2;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    let yPos = h / 2 + Math.sin(xPos * waveFrequency) * waveAmplitude;
    ctx.fillText(myText, xPos, yPos);
    xPos -= speed;

    if (xPos + ctx.measureText(myText).width < 0) {
      xPos = w;
    }

    animationId = requestAnimationFrame(draw);
  }

  draw();
  return animationId;
}

function drawSkate(ctx, myText, myFont, textColor, fontSize, w, h, speed) {
  let xPos = w;
  ctx.font = `bold ${fontSize}px ${myFont}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  function draw() {
    ctx.clearRect(0, 0, w, h);
    let yPos = h / 2 + Math.sin(xPos * 0.02) * 40;
    ctx.fillText(myText, xPos, yPos);
    xPos -= speed;

    if (xPos + ctx.measureText(myText).width < 0) {
      xPos = w;
    }
    animationId = requestAnimationFrame(draw);
  }

  draw();
  return animationId;
}
// Add event listeners for DOMContentLoaded and initialize the page
document.addEventListener("DOMContentLoaded", function () {
  setInitialValues();
  generateCanvasContent();
});
