var level = "easy"
function openWindow(){
  if (document.getElementById('easy').checked){
    level = "easy";
  };
  if (document.getElementById('medium').checked){
    level = "medium";
  };
  if (document.getElementById('difficult').checked){
    level = "hard";
  };

  var throttle=50;
  var xhr = new XMLHttpRequest();
  var url = "http://127.0.0.1:8080";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(document.getElementById("score"));
    }
  };
  var data = JSON.stringify({"throttle": throttle,"difficulty_level": level,"reset":true});
  xhr.send(data);
  window.open("../html/output.html");
}

function init(){
  setTimeout("init()",1000);
  render_results();
}

function render_results(){
  var throttle = document.getElementById("throttle").value;
  document.getElementById("percent").innerHTML=throttle;
  var url = "http://127.0.0.1:8080";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        document.getElementById("score").innerHTML = parseInt(json["score"])%1000;
        rotate_guage(json["frequency"]);
    }
  };
  var data = JSON.stringify({"throttle":parseInt(throttle),"difficulty_level":level});
  xhr.send(data);
}
function rotate_guage(freq) {
  console.log(freq);
  var dial = $(".dial .inner");
	var gauge_value = $(".gauge .value");

		function rotateDial()
		{
			var deg = 0;
			var value = Math.round((freq*100)%60);
			deg = (value * 177.5) / 100;

			gauge_value.html(value);

			dial.css({'transform': 'rotate('+deg+'deg)'});
		    dial.css({'-ms-transform': 'rotate('+deg+'deg)'});
		    dial.css({'-moz-transform': 'rotate('+deg+'deg)'});
		    dial.css({'-o-transform': 'rotate('+deg+'deg)'});
		    dial.css({'-webkit-transform': 'rotate('+deg+'deg)'});
		}
    rotateDial();

}
		// function rotateDial()
		// {
		// 	var deg = 0;
		// 	var value = Math.round(Math.random()*100);
		// 	deg = (value * 177.5) / 100;
    //
		// 	gauge_value.html(value + "%");
    //
		// 	dial.css({'transform': 'rotate('+deg+'deg)'});
		//     dial.css({'-ms-transform': 'rotate('+deg+'deg)'});
		//     dial.css({'-moz-transform': 'rotate('+deg+'deg)'});
		//     dial.css({'-o-transform': 'rotate('+deg+'deg)'});
		//     dial.css({'-webkit-transform': 'rotate('+deg+'deg)'});
		// }

		// setInterval(rotateDial, 2000);
