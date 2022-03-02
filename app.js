document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        const canvas = document.getElementById('canvas');
        const height = document.body.clientHeight;
        const width  = document.body.clientWidth;

        const squaresRange = document.getElementById('squares');
        const flowerRange = document.getElementById('flower');
        const resetButton = document.getElementById('reset');

        function clearCanvas() {
            while(canvas.lastChild)
                canvas.removeChild(canvas.lastChild);
        }

        function generateSquares(numIteration) {
            for (let iteration=1; iteration <= numIteration; iteration++) {
                let size = random(height/15, height/(random(1, iteration) * 2));
                let rectHeight = size+"px";
                let rectWidth  = size+"px";
                let opacity = Math.random() / 2 + 0.25;
                let color = `${random(50, 200, 5)},${random(50, 200, 5)},${random(50, 200, 5)}`;
                let rectBackground = `rgba(${color}, ${opacity})`;

                let max = random(10, 20);
                for (let num=1; num <= max; num++) {
                    let rect = document.createElement('div');
                    rect.style.position = "absolute";
                    rect.style.height = rectHeight;
                    rect.style.width  = rectWidth;
                    rect.style.top  = randomPixel(-(height+size/2), +(height+size/2));
                    rect.style.left = randomPixel(-(width+size/2), +(width+size/2));
                    rect.style.backgroundColor = rectBackground;

                    rect.style.transform = `rotate(${randomDegree(0, 360, 15)})`;

                    canvas.appendChild(rect);
                }
            }
        }
        function generateFlower(numIteration) {
            for (let iteration=1; iteration <= numIteration; iteration++) {
                let rectHeight = randomPixel(height/10, height/(random(1, iteration) + 1));
                let rectWidth  = randomPixel(width/10, width/(random(1, iteration) + 1));

                let rectRadius     = randomBoolean(2);
                let rectRadiusBoth = randomBoolean(2);

                let tilt = randomDegree(0, 180, 22.5);
                let opacity = Math.random() / 2 + 0.5;
                let color = `${random(50, 255, 5)}, ${random(50, 255, 5)}, ${random(50, 255, 5)}`;
                let rectBackground = `linear-gradient(${tilt}, rgba(${color}, ${opacity}), rgba(${color}, 0))`
                let inc = random(10, 190, 12);
                let rotation = inc;
                for (let security=360; security > 0; security--) {
                    let rect = document.createElement('div');
                    rect.style.position = "absolute";
                    rect.style.height = rectHeight;
                    rect.style.width  = rectWidth;
                    if (rectRadius) {
                        rect.style.borderTopRightRadius = rectHeight;
                        if (rectRadiusBoth) rect.style.borderBottomLeftRadius = rectHeight;
                    }
                    rect.style.background = rectBackground;

                    rect.style.transformOrigin = "top left";
                    rect.style.transform = `rotate(${rotation}deg)`;

                    canvas.appendChild(rect);

                    if (rotation === 0)
                        break;
                    rotation = (rotation + inc) % 360;
                }
            }
        }
        function generateArt() {
            squaresRange.value = random(15, 35);
            flowerRange.value = random(2, 10);
            render();
        }
        function render() {
            clearCanvas();
            generateSquares(squaresRange.value);
            generateFlower(flowerRange.value);
        }

        squaresRange.addEventListener('change', render);
        flowerRange.addEventListener('change', render);
        resetButton.addEventListener('click', generateArt);

        generateArt();

        console.log("Squares Details:", squaresRange.value);
        console.log("Flowers Details", flowerRange.value);

        function random(min, max, res=1)        { return Math.floor((Math.random() * (max - min) + min) / res) * res; }
        function randomDegree(min, max, res=10) { return random(min, max, res) + "deg"; }
        function randomPixel(min, max, res=10)  { return random(min, max, res) + "px"; }
        function randomBoolean(bias=1)          { return !!Math.round(Math.random() * bias); }
        var rgbToHex = function (rgb) {
          var hex = Number(rgb).toString(16);
          if (hex.length < 2) {
            hex = "0" + hex;
          }
          return hex;
        };
        var fullColorHex = function(r,g,b) {
          var red = rgbToHex(r);
          var green = rgbToHex(g);
          var blue = rgbToHex(b);
          return red+green+blue;
        };
      }
    };
