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

    let IsGradient = false;

    let getTextStyle = document.getElementById(
      "text-color-style-selector"
    ).value;

    if (getTextStyle == "Normal") {
      IsGradient = IsGradient;
    } else {
      IsGradient = !IsGradient;
    }

    // use the Gradient to display text drawing
    console.log(IsGradient);

    let canvas = document.getElementById("c");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "c";
      document.body.appendChild(canvas);
    }

    // const textStle = document.getElementById("text-color-style-selector").value;

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
        speed,
        IsGradient
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
        speed,
        IsGradient
      );
    } else if (animation == "Heavy Wave") {
      animationId = DrawHeavyWave(
        ctx,
        myText,
        myFont,
        textColor,
        fontSize,
        canvas.width,
        canvas.height,
        speed,
        IsGradient
      );
    } else if (animation == "Drop Down") {
      animationId = drawDropDown(
        ctx,
        myText,
        myFont,
        textColor,
        fontSize,
        canvas.width,
        canvas.height,
        speed,
        IsGradient
      );
    }
  });

  document.addEventListener("dblclick", function () {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    //canvasNode = document.getElementById("c");
    canvas = document.getElementById("c");
    document.body.removeChild(canvas);
    content.style.display = "flex";
    if(canvas){
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas just incase it exist
    }
    
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
    case "konkhmer-sleokchher-V":
      return "'Konkhmer Sleokchher', system-ui";
    case "noto-serif-khmer":
      return "'Noto Serif Khmer', serif";
    case "bayon":
      return "'Bayon', sans-serif";
    case "siemreap":
      return "'Siemreap', sans-serif";
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
function drawNormal(
  ctx,
  myText,
  myFont,
  textColor,
  fontSize,
  w,
  h,
  speed,
  IsGradient
) {
  let xPos = w;
  ctx.font = `bold ${fontSize}px ${myFont}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  let textStyle = IsGradient;

  function createTextGradient(ctx, text) {
    const textWidth = ctx.measureText(text).width;
    const gradient = ctx.createLinearGradient(0, 0, textWidth, 0);
    // Define color stops for the gradient
    gradient.addColorStop(0, textColor);
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1, "green");
    return gradient;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Create and set gradient as fill style
    const gradient = createTextGradient(ctx, myText, fontSize, textColor);
    if (textStyle) {
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = textColor;
    }

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

function drawWave(
  ctx,
  myText,
  myFont,
  textColor,
  fontSize,
  w,
  h,
  speed,
  IsGradient
) {
  let xPos = w;
  ctx.font = `bold ${fontSize}px ${myFont}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  let textStyle = IsGradient;

  function createTextGradient(ctx, text) {
    const textWidth = ctx.measureText(text).width;
    const gradient = ctx.createLinearGradient(0, 0, textWidth, 0);
    // Define color stops for the gradient
    gradient.addColorStop(0, textColor);
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1, "green");
    return gradient;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const gradient = createTextGradient(ctx, myText, fontSize, textColor);
    if (textStyle) {
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = textColor;
    }

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

function DrawHeavyWave(
  ctx,
  myText,
  myFont,
  textColor,
  fontSize,
  w,
  h,
  speed,
  IsGradient
) {
  let xPos = w;
  ctx.font = `bold ${fontSize}px ${myFont}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  let textStyle = IsGradient;

  function createTextGradient(ctx, text) {
    const textWidth = ctx.measureText(text).width;
    const gradient = ctx.createLinearGradient(0, 0, textWidth, 0);
    // Define color stops for the gradient
    gradient.addColorStop(0, textColor);
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1, "green");
    return gradient;
  }

  let waveFrequency = 0.01;
  let waveAmplitude = fontSize / 2;

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const gradient = createTextGradient(ctx, myText, fontSize, textColor);
    if (textStyle) {
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = textColor;
    }
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

// function drawBounce(
//   ctx,
//   myText,
//   myFont,
//   textColor,
//   fontSize,
//   w,
//   h,
//   speed,
//   IsGradient
// ) {
//   // store the text as an array
//   const letters = myText.split("");
//   let xPos = w;
//   const yPos = Array(letters.length).fill(fontSize / 2);
//   const ySpeed = Array(letters.length).fill(0);
//   const gravity = 1; // Gravity effect
//   const bounceFactor = 0.7; // Bounce reduction

//   ctx.font = `bold ${fontSize}px ${myFont}`;
//   ctx.textAlign = "left";
//   ctx.textBaseline = "middle";
//   let textStyle = IsGradient;

//   function createTextGradient(ctx, text) {
//     const textWidth = ctx.measureText(text).width;
//     const gradient = ctx.createLinearGradient(0, 0, textWidth, 0);
//     // Define color stops for the gradient
//     gradient.addColorStop(0, textColor);
//     gradient.addColorStop(0.5, "blue");
//     gradient.addColorStop(1, "green");
//     return gradient;
//   }

//   function draw() {
//     ctx.clearRect(0, 0, w, h);

//     const gradient = createTextGradient(ctx, myText);
//     if (textStyle) {
//       ctx.fillStyle = gradient;
//     } else {
//       ctx.fillStyle = textColor;
//     }

//     // Update position and speed for each letter
//     letters.forEach((letter, index) => {
//       ySpeed[index] += gravity;
//       yPos[index] += ySpeed[index];

//       // Bounce when hitting the bottom
//       if (yPos[index] + fontSize / 2 > h) {
//         yPos[index] = h - fontSize / 2;
//         ySpeed[index] *= -bounceFactor; // Reverse and reduce speed
//       }

//       // Bounce when hitting the top
//       if (yPos[index] - fontSize / 2 < 0) {
//         yPos[index] = fontSize / 2;
//         ySpeed[index] *= -bounceFactor; // Reverse and reduce speed
//       }

//       // Apply friction when bouncing
//       if (Math.abs(ySpeed[index]) < gravity) {
//         ySpeed[index] = 0;
//       }

//       ctx.fillText(
//         letter,
//         xPos + ctx.measureText(myText.slice(0, index)).width,
//         yPos[index]
//       );
//     });

//     xPos -= speed;
//     if (xPos + ctx.measureText(myText).width < 0) {
//       xPos = w;
//       yPos.fill(fontSize / 2); // Reset vertical positions
//       ySpeed.fill(0); // Reset vertical speeds
//     }

//     animationId = requestAnimationFrame(draw);
//   }

//   draw();
//   return animationId;
// }

function drawDropDown(
  ctx,
  myText,
  myFont,
  textColor,
  fontSize,
  w,
  h,
  speed,
  IsGradient
) {
  let xPos = w;
  let yPos = fontSize / 2; // Start at the top
  let ySpeed = 0;
  let gravity = 1; // Gravity effect
  let bounceFactor = 0.7; // Bounce reduction

  ctx.font = `bold ${fontSize}px ${myFont}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  let textStyle = IsGradient;

  function createTextGradient(ctx, text) {
    const textWidth = ctx.measureText(text).width;
    const gradient = ctx.createLinearGradient(0, 0, textWidth, 0);
    // Define color stops for the gradient
    gradient.addColorStop(0, textColor);
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1, "green");
    return gradient;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    const gradient = createTextGradient(ctx, myText);
    if (textStyle) {
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = textColor;
    }

    // Apply gravity
    ySpeed += gravity;
    yPos += ySpeed;

    // Bounce when hitting the bottom
    if (yPos + fontSize / 2 > h) {
      //yPos = h - fontSize/2;
      yPos = h - fontSize / 2;
      ySpeed *= -bounceFactor; // Reverse and reduce speed
    }

    // Bounce when hitting the top
    if (yPos - fontSize / 2 < 0) {
      //  yPos = fontSize / 2;
      yPos = h / 2;
      ySpeed *= -bounceFactor; // Reverse and reduce speed
    }

    // Apply friction when bouncing
    if (Math.abs(ySpeed) < gravity) {
      ySpeed = ySpeed--;
    }

    ctx.fillText(myText, xPos, yPos);

    xPos -= speed;
    if (xPos + ctx.measureText(myText).width < 0) {
      xPos = w;
      yPos = fontSize / 2; // Reset vertical position
      ySpeed = 0; // Reset vertical speed
    }

    animationId = requestAnimationFrame(draw);
  }

  draw();
  return animationId;
}

// let xPos = w;
// let yPos = h / 2;
// let ySpeed = 2; // Vertical speed for bouncing
// let direction = 1; // 1 means down, -1 means up
// ctx.font = `bold ${fontSize}px ${myFont}`;
// ctx.textAlign = "left";
// ctx.textBaseline = "middle";
// let textStyle = IsGradient;

// function createTextGradient(ctx, text) {
//   const textWidth = ctx.measureText(text).width;
//   const gradient = ctx.createLinearGradient(0, 0, textWidth, 0);
//   gradient.addColorStop(0, textColor);
//   gradient.addColorStop(0.5, "blue");
//   gradient.addColorStop(1, "green");
//   return gradient;
// }

// function draw() {
//   ctx.clearRect(0, 0, w, h);

//   // Create and set gradient as fill style
//   const gradient = createTextGradient(ctx, myText, fontSize, textColor);
//   if (textStyle) {
//     ctx.fillStyle = gradient;
//   } else {
//     ctx.fillStyle = textColor;
//   }

//   ctx.fillText(myText, xPos, yPos);
//   xPos -= speed;

//   // Update vertical position for bouncing effect
//   yPos += ySpeed * direction;
//   if (yPos > h - fontSize || yPos < fontSize) {
//     direction *= -1; // Reverse direction when hitting top or bottom
//   }

//   if (xPos + ctx.measureText(myText).width < 0) {
//     xPos = w;
//   }
//   animationId = requestAnimationFrame(draw);
// }

// draw();
// return animationId;

// Add event listeners for DOMContentLoaded and initialize the page
document.addEventListener("DOMContentLoaded", function () {
  setInitialValues();
  generateCanvasContent();
});
