 
var dash = location.href.split("=").pop();

if(!dash == ''){
  document.getElementById("frame").src = "https://app.powerbi.com/view?r=" +dash
}

