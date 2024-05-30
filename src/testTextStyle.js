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
  var body = document.getElementsByTagName("body")[0]; // Fix: select the first body element

  generateButton.addEventListener("click", function () {
    let myfont = document.getElementById("font-selector").value;

    if (myfont === "Jacquard") {
      myfont = "'Jacquard 12', system-ui";
    } else if (myfont === "Sevillana") {
      myfont = "'Sevillana', cursive";
    } else if (myfont === "danfo") {
      myfont = "'Danfo', cursive";
    } else if (myfont === "jersey25") {
      myfont = "'Jersey 25 Charted', cursive";
    } else if (myfont === "pacifico") {
      myfont = "'Pacifico', cursive";
    }
    if (myfont === "poetsen-one") {
      myfont = "'Poetsen One', sans-serif";
    } else if (myfont === "dancing-script") {
      myfont = "'Dancing Script', cursive";
    } else if (myfont === "lobster") {
      myfont = "'Lobster', cursive";
    } else if (myfont === "audiowide") {
      myfont = "'Audiowide', cursive";
    } else if (myfont === "jersey-15") {
      myfont = "'Jersey 15', cursive";
    } else if (myfont === "rubik-moonrocks") {
      myfont = "'Rubik Moonrocks', cursive";
    } else if (myfont === "workbench") {
      myfont = "'Workbench', cursive";
    }

    content.style.display = "none";
    const myText = document.getElementById("inputText").value;
    body.appendChild(canvas);

    const textColor = document.getElementById("textColorPicker").value;
    const frame = document.getElementById("frame-selector").value;
    const frameColorSelected = document.getElementById(
      "frame-color-selector"
    ).value;
    const fontSize = document.getElementById("fontSize-selector").value;
    let backGround = document.getElementById("backgroundColorPicker").value;

    var myFramecolor = "";

    if (frameColorSelected == "Gold") {
      myFramecolor = "#fac123";
    } else if (frameColorSelected == "Silvar") {
      myFramecolor = "#C0C0C0";
    } else if (frameColorSelected == "Nature") {
      myFramecolor = "#2ECA52";
    }

    (function () {
      "use strict";

      // Set up the canvas
      var c = document.getElementById("c");
      var ctx = c.getContext("2d");
      var w = (c.width = window.innerWidth);
      var h = (c.height = window.innerHeight);
      var img;
      var loc = [];
      var fixedHue = 0; // Set the fixed hue value here (0 for red)

      // Particle constructor
      var P = function (x, y) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.h = fixedHue; // Use fixed hue for consistent color
        this.r = 3 + Math.random() * 5;
        this.vx = Math.random() * 2 - 1;
        this.vy = -1 + Math.random() * -2;
        this.a = 1;
        this.as = 0.6 + Math.random() * 0.1;
        this.s = 1;
        this.ss = 0.98;
      };

      // Particle prototype
      P.prototype = {
        constructor: P,
        update: function () {
          this.x += this.vx;
          this.y += this.vy;
          this.a *= this.as;
          this.s *= this.ss;

          if (this.y < 0 || this.a < 0.01 || this.s < 0.01) {
            this.x = this.ox;
            this.y = this.oy;
            this.a = 1;
            this.s = 1;

            this.r = 3 + Math.random() * 5;
            this.vx = Math.random() * 2 - 1;
            this.vy = -1 + Math.random() * -2;
            this.as = 0.6 + Math.random() * 0.1;
          }
        },
        render: function (ctx) {
          ctx.save();
          ctx.fillStyle = textColor;
          ctx.translate(this.x, this.y);
          ctx.scale(this.s, this.s);
          ctx.beginPath();
          ctx.arc(0, 0, this.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        },
      };

      // Draw initial text
      ctx.font = " " + fontSize + "px " + myfont;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(myText, w / 2, h / 2 + 50);

      // Get image data
      img = ctx.getImageData(0, 0, w, h).data;
      ctx.clearRect(0, 0, w, h);

      // Collect pixel locations of the text
      for (var y = 0; y < h; y += 1) {
        for (var x = 0; x < w; x += 1) {
          var idx = (x + y * w) * 4 - 1;
          if (img[idx] > 0) {
            loc.push({
              x: x,
              y: y,
            });
          }
        }
      }

      // Create particles
      var ctr = 10000;
      var ps = [];
      for (var i = 0; i < ctr; i++) {
        var lc = loc[Math.floor(Math.random() * loc.length)];
        var p = new P(lc.x, lc.y);
        ps.push(p);
      }

      // Animation loop
      requestAnimationFrame(function loop() {
        requestAnimationFrame(loop);

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0, 0,0.3)";

        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        ctx.globalCompositeOperation = "lighter";

        for (var i = 0, len = ps.length; i < len; i++) {
          var p = ps[i];
          p.update();
          p.render(ctx);
        }
      });
    })();
    document.addEventListener("dblclick", function () {
      document.body.removeChild(canvas);
      content.style.display = "flex";
      canvas.style.background = ""; // clear color background
    });
  });
});

function hexToRGB(hex) {
  // Remove the '#' symbol if present
  hex = hex.replace("#", "");

  // Convert the hex code to decimal values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the RGB values as an object
  return {
    r: r,
    g: g,
    b: b,
  };
}
