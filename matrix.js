// 1. Criar o Canvas com tamanho fixo gigante (cobre console, tela inteira e tudo mais)
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

// Força o tamanho interno do desenho a ser gigante e estático de primeira
const LARGURA_FIXA = 3840; // Resolução 4K para garantir nitidez em qualquer monitor
const ALTURA_FIXA = 2160;
canvas.width = LARGURA_FIXA;
canvas.height = ALTURA_FIXA;

const alphabet = "0101010101010101";
const fontSize = 16;
const columns = LARGURA_FIXA / fontSize;
const rainDrops = Array.from({ length: columns }).fill(1);

// Variáveis para controlar a velocidade da chuva de forma precisa
let lastTime = 0;
const fps = 15; // Deixa o efeito bem mais lento e cadenciado (estilo cinema)
const nextFrame = 1000 / fps;
let timer = 0;

function drawMatrix(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Rastro preto suave
        ctx.fillRect(0, 0, LARGURA_FIXA, ALTURA_FIXA);

        ctx.fillStyle = '#00ff00'; // Verde Matrix puro
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

    // Mantém a animação rodando de forma nativa e estável
    requestAnimationFrame(drawMatrix);
}

// 2. Remove todos os fundos e travas do Google de forma definitiva
const style = document.createElement('style');
style.innerHTML = `
  * {
    background-color: transparent !important;
    background-image: none !important;
  }
`;
document.head.appendChild(style);

// Inicia a animação de forma ultra estável (SEM NENHUM EVENTO DE RESIZE PARA NÃO REINICIAR)
requestAnimationFrame(drawMatrix);
console.log("Modo Matrix Cinema Estabilizado!");
