function flatten(array){
  var flat = [];
  for (var i = 0, l = array.length; i < l; i++){
    var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
    if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]); }
  }
  return flat;
}

window.onload = function() {
  var grammarElement = document.querySelector("#grammar");
  grammarElement.parentNode.removeChild(grammarElement);

  var Parser = PEG.buildParser(grammarElement.textContent)

  var goods = document.querySelectorAll(".good")
  for (var i = 0; i < goods.length; i++) {
    try {
      var ast = Parser.parse(goods[i].textContent);
      var str = JSON.stringify(ast);
      goods[i].innerHTML += "\n<em style='color:gray'>&#8627; " + str + "</em>";

    } catch (err) {
      goods[i].innerHTML += "\n<em style='color:red;'>&#8627; " + err.message + "</em>";

    }
  }

  var bads = document.querySelectorAll(".bad")
  for (var i = 0; i < bads.length; i++) {
    try {
      var ast = Parser.parse(bads[i].textContent);
      var str = JSON.stringify(ast);
      bads[i].innerHTML += "\n<em style='color:red;'>&#8627; " + str + "</em>";

    } catch (err) {
      bads[i].innerHTML += "\n<em style='color:gray'>&#8627; " + err.message + "</em>";

    }
  }
}

setTimeout(function() { window.location.reload(true) }, 1000);