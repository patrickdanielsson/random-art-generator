document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        const canvas = document.getElementById('canvas');
        const height = document.body.clientHeight;
        const width  = document.body.clientWidth;

        let num = random(2, 10);
        for (let iteration=1; iteration <= num; iteration++) {
            let rectHeight = randomPixel(height/10, height/(random(1, iteration) + 1));
            let rectWidth  = randomPixel(width/10, width/(random(1, iteration) + 1));

            let rectRadius     = randomBoolean(2);
            let rectRadiusBoth = randomBoolean(2);

            let tilt = randomDegree(0, 180, 22.5);
            let opacity = Math.random();
            let color = `${random(50, 255, 5)},${random(50, 255, 5)},${random(50, 255, 5)}`;

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

        function random(min, max, res=1)        { return Math.floor((Math.random() * (max - min) + min) / res) * res; }
        function randomDegree(min, max, res=10) { return random(min, max, res) + "deg"; }
        function randomPixel(min, max, res=10)  { return random(min, max, res) + "px"; }
        function randomBoolean(bias=1)          { return !!Math.round(Math.random() * bias); }
    }
};
