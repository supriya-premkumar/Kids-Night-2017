function openWindow(){
  var level
  if (document.getElementById('easy').checked){
    level = "easy";
  };
  if (document.getElementById('medium').checked){
    level = "medium";
  };
  if (document.getElementById('difficult').checked){
    level = "hard";
  };

  var throttle=60;
  var xhr = new XMLHttpRequest();
  var url = "http://127.0.0.1:8080";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
    }
  };
  var data = JSON.stringify({"throttle": throttle,"difficulty_level": level,"reset":true});
  xhr.send(data);
  window.open("../html/output.html");
}

var dial = $(".dial .inner");
	var gauge_value = $(".gauge .value");

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
