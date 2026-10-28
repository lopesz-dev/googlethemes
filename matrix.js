
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '-1';
canvas.style.background = 'black';


const LARGURA_FIXA = 3840; 
const ALTURA_FIXA = 2160;
canvas.width = LARGURA_FIXA;
canvas.height = ALTURA_FIXA;

const alphabet = "0101010101010101";
const fontSize = 16;
const columns = LARGURA_FIXA / fontSize;
const rainDrops = Array.from({ length: columns }).fill(1);


let lastTime = 0;
const fps = 15; 
const nextFrame = 1000 / fps;
let timer = 0;

function drawMatrix(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; 
        ctx.fillRect(0, 0, LARGURA_FIXA, ALTURA_FIXA);

        ctx.fillStyle = '#00ff00'; 
        ctx.font = 'bold ' + fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > ALTURA_FIXA && Math.random() > 0.98) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
        timer = 0;
    } else {
        timer += deltaTime;
    }

    
    requestAnimationFrame(drawMatrix);
}


const style = document.createElement('style');
style.innerHTML = `
  * {
    background-color: transparent !important;
    background-image: none !important;
  }
`;
document.head.appendChild(style);


requestAnimationFrame(drawMatrix);
console.log("by: lopesz.dev");
