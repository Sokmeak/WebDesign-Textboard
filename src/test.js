function updateSpeedValue() {
    const speed = document.getElementById("speed").value;
    document.getElementById("speedValue").innerText = speed;
  }
  
  
  var elemDiv = document.createElement("div");
  elemDiv.id = "myDiv";
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

      let myfont = document.getElementById("font-selector").value;
      const myText = document.getElementById("inputText").value;
      
      if (myfont === "Jacquard") {
        myfont = "'Jacquard 12', system-ui";
      } 
     else if (myfont === "Sevillana") {
        myfont = "'Sevillana', cursive";
      }
      else if (myfont === "danfo") {
        myfont = "'Danfo', cursive";
      }
      else if (myfont === "jersey25") {
        myfont = "'Jersey 25 Charted', cursive";
      }
      else if (myfont === "pacifico") {
        myfont = "'Pacifico', cursive";
      }
      else if (myfont === "poetsen-one") {
        myfont = "'Poetsen One', sans-serif";
      } 
     else if (myfont === "dancing-script") {
        myfont = "'Dancing Script', cursive";
      }
      else if (myfont === "lobster") {
        myfont = "'Lobster', cursive";
      }
      else if (myfont === "audiowide") {
        myfont = "'Audiowide', cursive";
      }
      else if (myfont === "jersey-15") {
        myfont = "'Jersey 15', cursive";
      }
      else if (myfont === "rubik-moonrocks") {
        myfont = "'Rubik Moonrocks', cursive";
      }
      else if (myfont === "workbench") {
        myfont = "'Workbench', cursive";
      }
     
    
        elemDiv.innerHTML = myText;
        elemDiv.style.backgroundColor = "gray";
        elemDiv.style.display = "flex";
        elemDiv.style.justifyContent = "center";
        elemDiv.style.alignItems = "center";
        elemDiv.style.fontSize = "40px";

        elemDiv.style.fontFamily = myfont;
        
        

    

        elemDiv.style.color = "blue";

      document.body.appendChild(elemDiv);
      // for display
  
      
  
    document.addEventListener("dblclick", function () {
      document.body.removeChild(elemDiv);
      content.style.display = "flex";
    });
  });
});
