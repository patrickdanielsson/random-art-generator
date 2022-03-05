document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        const colorTheme = (new URLSearchParams(window.location.search)).get('theme');
        console.log("colorTheme", colorTheme);
        const detailRange = (new URLSearchParams(window.location.search)).get('level');
        console.log("detailRange", detailRange);

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

        var btc = ["242, 169, 0", "77, 77, 78", "255, 255, 255"];
        var eth = ["201, 157, 102", "60, 60, 61", "236, 240, 241"];
        var sol = ["0, 255, 163", "3, 225, 255", "220, 31, 255"];
        var xrp = ["0, 96, 151"];
        var xpr = ["117, 46, 235"];
        var bnb = ["250 211 56"];
        var xyo = ["75, 71, 132", "31, 26, 102", "255, 142, 86", "255, 114, 44"];
        var pride = ["255, 0, 24", "255, 165, 44", "255, 255, 65", "0, 128, 24", "0, 0, 249", "134, 0, 125"];
        var red = ["255, 0, 24"];
        var blue = ["0, 0, 249"];
        var orange = ["255, 165, 44"];
        var violet = ["134, 0, 125"];
        var yellow = ["255, 255, 65"];
        var green = ["0, 128, 24"];

        function generateSquares(numIteration) {
            for (let iteration=1; iteration <= numIteration; iteration++) {
                let size = random(height/15, height/(random(1, iteration) * 2));
                let rectHeight = size+"px";
                let rectWidth  = size+"px";
                let opacity = Math.random() / 2 + 0.25;
                let themeColor = colorTheme;
                let cryptoColor = themeColor[Math.floor(Math.random() * themeColor.length)];
                console.log("cryptoColor", cryptoColor);
                let color = `${cryptoColor}`;
//                let color = `${random(50, 200, 5)}, ${random(50, 200, 5)}, ${random(50, 200, 5)}`;
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
//                let cryptoColor = cryptoColors[Math.floor(Math.random() * cryptoColors.length)];
//                let color = `${cryptoColor}`;
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
            squaresRange.value = detailRange;
            flowerRange.value = detailRange;
            squaresRange.value = random(15, 35);
            flowerRange.value = random(2, 10);
            render();
        }
        function render() {
            clearCanvas();
//            generateSquares(squaresRange.value);
            generateFlower(flowerRange.value);
        }

        squaresRange.addEventListener('change', render);
        flowerRange.addEventListener('change', render);
        resetButton.addEventListener('click', generateArt);

        generateArt();

        function random(min, max, res=1)        { return Math.floor((Math.random() * (max - min) + min) / res) * res; }
        function randomDegree(min, max, res=10) { return random(min, max, res) + "deg"; }
        function randomPixel(min, max, res=10)  { return random(min, max, res) + "px"; }
        function randomBoolean(bias=1)          { return !!Math.round(Math.random() * bias); }
      }
    };
