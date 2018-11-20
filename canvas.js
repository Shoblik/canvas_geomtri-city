var canvas = document.querySelector('canvas');
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
//
// c.fillRect(100, 100, 100, 100);
// console.dir(c);


// Line
const x = canvas.width;
const y = canvas.height;
let drop = x + y;
// const colorArr = ['#F8B195', '#F67280', '#C06C84', '#6C5B7B', '#355C7D'];
// let colorIndex = 0;
let color = '#'+Math.floor(Math.random()*16777215).toString(16);
let i = 0;

function pattern() {

      c.beginPath();

      //bottom right to top left
      c.moveTo(x, (i * -1) + y);
      c.lineTo((i * -1) + x, y);

      //top left to bottom right
      c.moveTo(0, i);
      c.lineTo(i, 0);

      //bottom left to top right
      c.moveTo(0, y - i);
      c.lineTo(0 + i, y);

      //top right to bottom left
      c.moveTo(x - i, 0);
      c.lineTo(x, 0 + i);

      // //top to bottom
      c.moveTo(0, i);
      c.lineTo(x, i);
      //
      // //bottom to top
      c.moveTo(0, y - i);
      c.lineTo(x, y - i);
      //
      // //lefttoright
      c.moveTo(i, 0);
      c.lineTo(i, y);
      //
      // //righttoleft
      c.moveTo(x - i, 0);
      c.lineTo(x - i, y);

      c.strokeStyle = color;

      c.stroke();

      i+= 10;

      if (i < drop) {
        // window.requestAnimationFrame(pattern);
      } else {
        i = 0;
        color = '#'+Math.floor(Math.random()*16777215).toString(16);
        drop -= 75;
        if (drop < 0) {
          drop = x + y;
        }
      }
      console.log(i);
  }

setInterval(function() {
  pattern();
}, 2);
