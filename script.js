// Код для создания плавающих сердечек

const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let hearts = [];
let maxHearts = 50;

function Heart() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.5;

    this.draw = function() {
        ctx.fillStyle = `rgba(255,105,180,${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size * 2, this.y + this.size / 3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x - this.size * 2, this.y + this.size / 3, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.fill();
    };

    this.update = function() {
        this.y -= this.speedY;
        if (this.y < -10) {
            this.y = height + 10;
            this.x = Math.random() * width;
            this.size = Math.random() * 2 + 1;
            this.speedY = Math.random() * 1 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.5;
        }
        this.draw();
    };
}

function initHearts() {
    for (let i = 0; i < maxHearts; i++) {
        hearts.push(new Heart());
    }
}

function animateHearts() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(heart => heart.update());
    requestAnimationFrame(animateHearts);
}

initHearts();
animateHearts();

window.addEventListener('resize', function() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
// Инициализация AOS для анимаций
AOS.init({
    duration: 1200,
});

// Функция для запуска музыки при первом клике
function playAudio() {
    var audio = document.getElementById('bgMusic');
    audio.volume = 0.005; // Устанавливаем громкость на 10%
    audio.play();
    // Удаляем обработчик события после первого срабатывания
    document.removeEventListener('click', playAudio);
}

// Добавляем обработчик события клика на весь документ
document.addEventListener('click', playAudio);


