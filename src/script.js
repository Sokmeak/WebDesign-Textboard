function updateSpeedValue() {
  const speed = document.getElementById("speed").value;
  document.getElementById("speedValue").innerText = speed;
}

var elemCan = document.createElement("canvas");
elemCan.id = "c";
var body = document.getElementsByTagName("body");

// Optionally, set an initial value on page load
document.addEventListener("DOMContentLoaded", () => {
  updateSpeedValue();
});

document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.querySelector("button");
  const content = document.querySelector("#content");

  generateButton.addEventListener("click", function () {
    content.style.display = "none";
    const myText = document.getElementById("inputText").value;

    document.body.appendChild(elemCan);
    // for display

    (function () {
      "use strict";

      var c = document.getElementById("c");
      var ctx = c.getContext("2d");
      var w = (c.width = window.innerWidth);
      var h = (c.height = window.innerHeight);
      var img;
      var loc = [];
      var P = function (x, y, h) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.h = h;
        this.r = 3 + Math.random() * 5;
        this.vx = Math.random() * 2 - 1;
        this.vy = -1 + Math.random() * -2;
        this.a = 1;
        this.as = 0.6 + Math.random() * 0.1;
        this.s = 1;
        this.ss = 0.98;
      };
      P.prototype = {
        constructor: P,
        update: function () {
          this.x += this.vx;
          this.y += this.vy;
          this.a *= this.as;
          this.s *= this.ss;
          this.h += 0.5;

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
          // ctx.fillStyle = "hsla(" + this.h + ", 100%, 50%," + this.a + ")";
          ctx.fillStyle = "hsla(60, 100%, 50%," + this.a + ")";
          ctx.translate(this.x, this.y);
          ctx.scale(this.s, this.s);
          ctx.beginPath();
          ctx.arc(0, 0, this.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        },
      };

      ctx.font = "140px Verdana";
      ctx.textAlign = "center";
      ctx.baseline = "middle";

      ctx.fillText(myText, w / 2, h / 2 + 50);
      img = ctx.getImageData(0, 0, w, h).data;

      ctx.clearRect(0, 0, w, h);

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

      var ctr = 900;
      var ps = [];
      var h = Math.random() * 360;

      for (var i = 0; i < ctr; i++) {
        var lc = loc[Math.floor(Math.random() * loc.length)];
        var p = new P(lc.x, lc.y, h);
        ps.push(p);
      }

      requestAnimationFrame(function loop() {
        requestAnimationFrame(loop);

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        ctx.globalCompositeOperation = "lighter";

        for (var i = 0, len = ps.length; i < len; i++) {
          p = ps[i];
          p.update();
          p.render(ctx);
        }
      });
    })();

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  //   (function () {
  //     ("use strict");

  //     var c = document.getElementById("c");
  //     var ctx = c.getContext("2d");
  //     var w = (c.width = window.innerWidth);
  //     var h = (c.height = window.innerHeight);
  //     var img;
  //     var loc = [];

  //     class P {
  //       constructor(x, y, h) {
  //         this.x = x;
  //         this.y = y;
  //         this.ox = x;
  //         this.oy = y;
  //         this.h = h;
  //         this.r = 3 + Math.random() * 5;
  //         this.vx = Math.random() * 2 - 1;
  //         this.vy = -1 + Math.random() * -2;
  //         this.a = 1;
  //         this.as = 0.6 + Math.random() * 0.1;
  //         this.s = 1;
  //         this.ss = 0.98;
  //       }
  //       update() {
  //         this.x += this.vx;
  //         this.y += this.vy;
  //         this.a *= this.as;
  //         this.s *= this.ss;
  //         this.h += 0.5;

  //         if (this.y < 0 || this.a < 0.01 || this.s < 0.01) {
  //           this.x = this.ox;
  //           this.y = this.oy;
  //           this.a = 1;
  //           this.s = 1;

  //           this.r = 3 + Math.random() * 5;
  //           this.vx = Math.random() * 2 - 1;
  //           this.vy = -1 + Math.random() * -2;
  //           this.as = 0.6 + Math.random() * 0.1;
  //         }
  //       }
  //       render(ctx) {
  //         ctx.save();
  //         ctx.fillStyle = "hsla(60, 100%, 50%," + this.a + ")";
  //         ctx.translate(this.x, this.y);
  //         ctx.scale(this.s, this.s);
  //         ctx.beginPath();
  //         // ctx.arc(0, 0, this.r, 0, Math.PI * 2);
  //         ctx.fill();
  //         ctx.restore();
  //       }
  //     }

  //     // Draw the normal text
  //     ctx.font = "140px Verdana";
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "middle";
  //     // ctx.fillStyle = "red"; // Change text color to red
  //     ctx.fillStyle = "green"; // Red color in HSLA format
  //     ctx.fillText(myText, w / 2, h / 2 + 50);

  //     // Get image data of the text
  //     img = ctx.getImageData(0, 0, w, h).data;

  //     ctx.clearRect(0, 0, w, h);

  //     for (var y = 0; y < h; y += 1) {
  //       for (var x = 0; x < w; x += 1) {
  //         var idx = (x + y * w) * 4;
  //         var r = img[idx];
  //         var g = img[idx + 1];
  //         var b = img[idx + 2];
  //         var a = img[idx + 3];
  //         if (r > 200 && g > 200 && b < 50) {
  //           loc.push({ x: x, y: y });
  //         }
  //       }
  //     }

  //     if (loc.length > 0) {
  //       var ctr = 900;
  //       var ps = [];

  //       for (var i = 0; i < ctr; i++) {
  //         var lc = loc[Math.floor(Math.random() * loc.length)];
  //         var p = new P(lc.x, lc.y, 60);
  //         ps.push(p);
  //       }

  //       requestAnimationFrame(function loop() {
  //         requestAnimationFrame(loop);

  //         ctx.globalCompositeOperation = "source-over";
  //         ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  //         ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  //         // Draw the normal text again to ensure it's visible
  //         ctx.globalCompositeOperation = "source-over";
  //         ctx.fillStyle = "green";
  //         ctx.fillText(myText, w / 2, h / 2 + 50);

  //         ctx.globalCompositeOperation = "lighter";

  //         for (var i = 0, len = ps.length; i < len; i++) {
  //           var p = ps[i];
  //           p.update();
  //           p.render(ctx);
  //         }
  //       });
  //     }
  //   })();
  // });

  document.addEventListener("dblclick", function () {
    document.body.removeChild(elemCan);
    content.style.display = "flex";
  });
});

// function updateSpeedValue() {
//   const speed = document.getElementById("speed").value;
//   document.getElementById("speedValue").innerText = speed;
// }

// var elemDiv = document.createElement("canvas");
// elemDiv.id = "c";
// var body = document.getElementsByTagName("body")[0];

// document.addEventListener("DOMContentLoaded", () => {
//   updateSpeedValue();
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const generateButton = document.querySelector("button");
//   const content = document.querySelector("#content");

//   generateButton.addEventListener("click", function () {
//     content.style.display = "none";
//     const myText = document.getElementById("inputText").value;

//     document.body.appendChild(elemDiv);
//     // for display

//     (function () {
//       "use strict";

//       var c = document.getElementById("c");
//       var ctx = c.getContext("2d");
//       var w = (c.width = window.innerWidth);
//       var h = (c.height = window.innerHeight);

//       var textX = w; // start at the right edge
//       var speed = document.getElementById("speed").value;

//       function drawText() {
//         ctx.clearRect(0, 0, w, h); // clear the canvas
//         ctx.font = "140px Verdana";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText(myText, textX, h / 2); // draw the text
//       }

//       function update() {
//         speed = document.getElementById("speed").value; // get updated speed
//         textX -= speed; // move text to the left

//         if (textX < -ctx.measureText(myText).width) {
//           textX = w; // reset text position when it goes off screen
//         }
//       }

//       function loop() {
//         update();
//         drawText();
//         requestAnimationFrame(loop);
//       }

//       loop(); // start the animation

//       document.addEventListener("dblclick", function () {
//         document.body.removeChild(elemDiv);
//         content.style.display = "block";
//       });
//     })();
//   });
// });

// document.getElementById("speed").addEventListener("input", updateSpeedValue);
