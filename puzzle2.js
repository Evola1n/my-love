const puzzle = document.getElementById('puzzle');
const positions = [];

for (let i = 0; i < 16; i++) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    const x = (i % 4) * 100;
    const y = Math.floor(i / 4) * 100;
    piece.style.backgroundPosition = `-${x}px -${y}px`;
    piece.setAttribute('data-index', i);
    positions.push(i);
    puzzle.appendChild(piece);
}

// Перемешиваем позиции
positions.sort(() => Math.random() - 0.5);

// Устанавливаем перемешанные позиции
const pieces = document.querySelectorAll('.piece');
pieces.forEach((piece, index) => {
    const pos = positions[index];
    piece.style.left = `${(pos % 4) * 100}px`;
    piece.style.top = `${Math.floor(pos / 4) * 100}px`;
});

// Событие перетаскивания
let selectedPiece = null;

pieces.forEach(piece => {
    piece.addEventListener('click', () => {
        if (selectedPiece) {
            // Меняем позиции
            const tempLeft = selectedPiece.style.left;
            const tempTop = selectedPiece.style.top;

            selectedPiece.style.left = piece.style.left;
            selectedPiece.style.top = piece.style.top;

            piece.style.left = tempLeft;
            piece.style.top = tempTop;

            selectedPiece = null;

            // Проверяем, собран ли пазл
            checkPuzzle();
        } else {
            selectedPiece = piece;
        }
    });
});

function checkPuzzle() {
    let isComplete = true;
    pieces.forEach(piece => {
        const index = parseInt(piece.getAttribute('data-index'));
        const x = parseInt(piece.style.left);
        const y = parseInt(piece.style.top);
        const correctX = (index % 4) * 100;
        const correctY = Math.floor(index / 4) * 100;
        if (x !== correctX || y !== correctY) {
            isComplete = false;
        }
    });
    if (isComplete) {
        setTimeout(() => {
            alert('Пазл собран! Перейди к следуещему этапу.');
            window.location.href = 'secret.html';
        }, 200);
    }
}
