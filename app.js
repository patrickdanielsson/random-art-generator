document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        const canvas = document.getElementById('canvas');
        const height = document.body.clientHeight;
        const width  = document.body.clientWidth;

        let rectHeight = randomPixel(height/10, height/2);
        let rectWidth  = randomPixel(width/10, width/2);

        let tilt = randomDegree(0, 180, 22.5);
        let opacity = Math.random();
        let color = `${random(50, 255, 5)},${random(50, 255, 5)},${random(50, 255, 5)}`;

        let rectBackground = `linear-gradient(${tilt}, rgba(${color}, ${opacity}), rgba(${color}, 0))`

        let inc = random(10, 180);
        for (let i=inc, j=360; j > 0; j--) {
            let rect = document.createElement('div');
            rect.style.position = "absolute";
            rect.style.height = rectHeight;
            rect.style.width  = rectWidth;
            rect.style.background = rectBackground;

            rect.style.transformOrigin = "top left";
            rect.style.transform = `rotate(${i}deg)`;

            canvas.appendChild(rect);

            if (i === 0) break;
            i = (i + inc) % 360;
        }

        function random(min, max, res=10)    { return Math.floor((Math.random() * (max - min) + min) / res) * res; }
        function randomDegree(min, max, res) { return random(min, max, res) + "deg"; }
        function randomPixel(min, max, res)  { return random(min, max, res) + "px"; }
    }
};
