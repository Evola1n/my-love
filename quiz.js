const correctAnswers = {
    q1: "Синди и Гледис",
    q2: "6",
    q3: "2006-08-12",
    q4: "ЛФА",
    q5: "2",
    q6: "Ember"
};

const form = document.getElementById('quizForm');
const checkBtn = document.getElementById('checkBtn');

checkBtn.addEventListener('click', function() {
    let allCorrect = true;

    for (let key in correctAnswers) {
        const options = form.elements[key];
        let answered = false;

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const label = option.parentElement;

            // Сбрасываем предыдущие классы
            label.classList.remove('correct', 'incorrect');

            if (option.checked) {
                answered = true;
                if (option.value === correctAnswers[key]) {
                    label.classList.add('correct');
                } else {
                    label.classList.add('incorrect');
                    allCorrect = false;
                }
            }
        }

        if (!answered) {
            allCorrect = false;
        }
    }

    if (allCorrect) {
        checkBtn.textContent = 'Перейти дальше';
        checkBtn.removeEventListener('click', arguments.callee);
        checkBtn.addEventListener('click', function() {
            window.location.href = 'puzzle1.html'; // Твоя следующая страница
        });
        alert('Поздравляю! Все ответы верны. 😊');
    } else {
        alert('Есть неправильные ответы или неотвеченные вопросы. Попробуй ещё раз!');
    }
});
