globalColor = null;
operator = '-';
distance = 10;
function PatternMachine(id) {
  this.id = id;
  this.launch = function() {
    let canvas = document.createElement('canvas');
    document.querySelector('body').append(canvas);

    // let canvas = document.querySelector('canvas');
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
    let color = null;

    if (!globalColor) {
      color = '#'+Math.floor(Math.random()*16777215).toString(16);
      globalColor = hexToComplimentary(color);
    } else {
      color = globalColor;
      globalColor = null;
    }

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

          // c.globalAlpha = .1;

          c.stroke();

          i+= distance;

          if (i < drop) {
            // window.requestAnimationFrame(pattern);
          } else {
            i = 0;

            if (!globalColor) {
              color = '#'+Math.floor(Math.random()*16777215).toString(16);
              globalColor = hexToComplimentary(color);
            } else {
              color = globalColor;
              globalColor = null;
            }

            //uncomment for asymetry
            // drop = eval(drop + operator + 75);

            if (drop < 0) {
              drop = x + y;
              operator = '+';

            } else if (drop > x + y) {
              operator = '-';
            }
          }
      }

    setInterval(function() {
      distance = Math.floor(Math.random() * 1000);
      pattern();
    }, 6);

  }
}
function hexToComplimentary(hex){

    // Convert hex to rgb
    // Credit to Denis http://stackoverflow.com/a/36253499/4939630
    var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';

    // Get array of RGB values
    rgb = rgb.replace(/[^\d,]/g, '').split(',');

    var r = rgb[0], g = rgb[1], b = rgb[2];

    // Convert RGB to HSL
    // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2.0;

    if(max == min) {
        h = s = 0;  //achromatic
    } else {
        var d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

        if(max == r && g >= b) {
            h = 1.0472 * (g - b) / d ;
        } else if(max == r && g < b) {
            h = 1.0472 * (g - b) / d + 6.2832;
        } else if(max == g) {
            h = 1.0472 * (b - r) / d + 2.0944;
        } else if(max == b) {
            h = 1.0472 * (r - g) / d + 4.1888;
        }
    }

    h = h / 6.2832 * 360.0 + 0;

    // Shift hue to opposite side of wheel and convert to [0-1] value
    h+= 180;
    if (h > 360) { h -= 360; }
    h /= 360;

    // Convert h s and l values into r g and b values
    // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
    if(s === 0){
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    // Convert r b and g values to hex
    rgb = b | (g << 8) | (r << 16);
    return "#" + (0x1000000 | rgb).toString(16).substring(1);
}
// new PatternMachine().launch();
new PatternMachine().launch();
