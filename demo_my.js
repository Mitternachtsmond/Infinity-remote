(function(){
    var x= document.querySelector('ul');
    var boxes = x.querySelectorAll('button');
    var codes = {
      38: -3,
      40: 3, 
      39: 1,
      37: -1
//     };
//     console.log(x.offsetWidth );
//     console.log( x.firstElementChild.offsetWidth );
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].index = i;
    }
    function nishit(e) {
      var keycode = e.keyCode;
      if (codes[keycode]) {
        var t = e.target;
        if (t.index !== undefined) {
          if (boxes[t.index + codes[keycode]]) {
            boxes[t.index + codes[keycode]].focus();
          }
        }
      }
    }
    x.addEventListener('keyup', nishit);
  })();
