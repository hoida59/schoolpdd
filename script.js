// Обработка формы викторины
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script.js загружен!');
    
    // Элементы DOM
    const submitBtn = document.getElementById('submit-quiz-btn');
    const fioInput = document.getElementById('fio-input');
    const feedbackBtn = document.getElementById('feedback-btn');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = successModal.querySelector('.modal-close-btn');
    const modalOkBtn = document.getElementById('modal-ok-btn');
    const quizResult = document.getElementById('quiz-result');
    const launchBtn = document.getElementById('launch-game-btn');
    
    // Удаляем все обработчики событий перед добавлением новых
    submitBtn.replaceWith(submitBtn.cloneNode(true));
    const newSubmitBtn = document.getElementById('submit-quiz-btn');
    
    // Создаем сообщения об ошибках
    createErrorMessages();
    
    // Обработка отправки викторины
    newSubmitBtn.addEventListener('click', handleSubmit);
    
    // Обработка обратной связи
    feedbackBtn.addEventListener('click', function() {
        alert('Спасибо за обратную связь! Ваше мнение очень важно для нас.');
    });
    
    // Обработка модального окна
    modalCloseBtn.addEventListener('click', closeSuccessModal);
    modalOkBtn.addEventListener('click', closeSuccessModal);
    
    // Закрытие по клику вне окна
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
    
    // Анимация для радио-кнопок
    initRadioButtons();
    
    // Восстановление сохраненных данных
    restoreSavedData();
    
    // Дебаг информация
    console.log('Все элементы DOM найдены:', {
        submitBtn: !!newSubmitBtn,
        fioInput: !!fioInput,
        successModal: !!successModal
    });
});

// Функция создания сообщений об ошибках
function createErrorMessages() {
    const fioInput = document.getElementById('fio-input');
    const fioError = document.createElement('div');
    fioError.className = 'error';
    fioError.id = 'fio-error';
    fioError.textContent = 'Пожалуйста, введите ФИО и класс';
    fioInput.parentNode.appendChild(fioError);
    
    const question1 = document.querySelector('[name="question1"]').closest('.g-radio-group');
    const q1Error = document.createElement('div');
    q1Error.className = 'error';
    q1Error.id = 'q1-error';
    q1Error.textContent = 'Пожалуйста, выберите ответ';
    question1.parentNode.appendChild(q1Error);
    
    const question2 = document.querySelector('[name="question2"]').closest('.g-radio-group');
    const q2Error = document.createElement('div');
    q2Error.className = 'error';
    q2Error.id = 'q2-error';
    q2Error.textContent = 'Пожалуйста, выберите ответ';
    question2.parentNode.appendChild(q2Error);
}

// Обработчик отправки формы
function handleSubmit() {
    console.log('Нажата кнопка отправки');
    
    // Скрываем предыдущие ошибки
    hideAllErrors();
    
    // Проверка обязательных полей
    if (!validateForm()) {
        return;
    }
    
    // Сбор данных
    const formData = collectFormData();
    console.log('Собранные данные:', formData);
    
    // Проверка ответов
    const results = checkAnswers(formData);
    
    // Показ результатов
    showResults(formData, results);
}

// Валидация формы
function validateForm() {
    let isValid = true;
    
    // Проверка ФИО
    const fioInput = document.getElementById('fio-input');
    const fioError = document.getElementById('fio-error');
    if (!fioInput.value.trim()) {
        isValid = false;
        fioError.classList.add('show');
        fioInput.focus();
        fioInput.style.borderColor = '#ff3333';
    } else {
        fioInput.style.borderColor = '';
    }
    
    // Проверка первого вопроса
    const q1Checked = document.querySelector('input[name="question1"]:checked');
    const q1Error = document.getElementById('q1-error');
    if (!q1Checked) {
        isValid = false;
        q1Error.classList.add('show');
    }
    
    // Проверка второго вопроса
    const q2Checked = document.querySelector('input[name="question2"]:checked');
    const q2Error = document.getElementById('q2-error');
    if (!q2Checked) {
        isValid = false;
        q2Error.classList.add('show');
    }
    
    return isValid;
}

// Скрытие всех ошибок
function hideAllErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.classList.remove('show');
    });
}

// Сбор данных формы
function collectFormData() {
    return {
        fio: document.getElementById('fio-input').value.trim(),
        question1: document.querySelector('input[name="question1"]:checked')?.value,
        question2: document.querySelector('input[name="question2"]:checked')?.value,
        timestamp: new Date().toLocaleString('ru-RU')
    };
}

// Проверка ответов
function checkAnswers(formData) {
    const correctAnswers = {
        question1: 'no',
        question2: 'enter-prohibited'
    };
    
    let score = 0;
    if (formData.question1 === correctAnswers.question1) score++;
    if (formData.question2 === correctAnswers.question2) score++;
    
    return {
        score,
        total: Object.keys(correctAnswers).length,
        correctAnswers
    };
}

// Показать результаты
function showResults(formData, results) {
    const percentage = Math.round((results.score / results.total) * 100);
    
    let resultText = '';
    if (results.score === results.total) {
        resultText = '🎉 Отлично! Все ответы правильные!';
    } else if (results.score >= results.total / 2) {
        resultText = '👍 Хорошо! Но есть ошибки.';
    } else {
        resultText = '📚 Нужно повторить правила дорожного движения.';
    }
    
    // Формируем детальные результаты
    const details = `
        <strong>Результаты:</strong><br>
        ✅ Правильных ответов: ${results.score} из ${results.total} (${percentage}%)<br><br>
        <strong>Правильные ответы:</strong><br>
        1. Если светофор сломан и мигает желтым, пешеход должен убедиться в безопасности, но уступить дорогу всем транспортным средствам. Ответ: <strong>Нет</strong><br>
        2. Знак означает: <strong>Въезд запрещен</strong>
    `;
    
    const quizResult = document.getElementById('quiz-result');
    quizResult.innerHTML = details;
    
    // Показываем модальное окно
    const successModal = document.getElementById('success-modal');
    successModal.classList.add('show');
    
    // Сохраняем результат
    saveResults(formData, results);
    
    // Активируем кнопку запуска игры
    activateGameButton();
}

// Сохранение результатов
function saveResults(formData, results) {
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    quizResults.push({
        ...formData,
        ...results,
        date: new Date().toISOString()
    });
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    
    // Сохраняем ФИО
    localStorage.setItem('quizFIO', formData.fio);
}

// Активация кнопки игры
function activateGameButton() {
    const launchBtn = document.getElementById('launch-game-btn');
    if (launchBtn) {
        launchBtn.style.animation = 'pulse 2s infinite';
        launchBtn.disabled = false;
        setTimeout(() => {
            launchBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

// Закрытие модального окна
function closeSuccessModal() {
    const successModal = document.getElementById('success-modal');
    successModal.classList.remove('show');
}

// Инициализация радио-кнопок
function initRadioButtons() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        // Удаляем старые обработчики
        radio.addEventListener('change', function() {
            const groupName = this.name;
            const labels = document.querySelectorAll(`input[name="${groupName}"]`);
            
            // Убираем выделение у всех
            labels.forEach(r => {
                const label = r.closest('.g-control-label');
                if (label) {
                    label.style.backgroundColor = '';
                }
            });
            
            // Добавляем к выбранной
            const selectedLabel = this.closest('.g-control-label');
            if (selectedLabel) {
                selectedLabel.style.backgroundColor = 'rgba(51, 142, 245, 0.1)';
            }
            
            // Скрываем ошибку для этого вопроса
            const errorId = groupName === 'question1' ? 'q1-error' : 'q2-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
    });
}

// Восстановление сохраненных данных
function restoreSavedData() {
    const fioInput = document.getElementById('fio-input');
    const savedFIO = localStorage.getItem('quizFIO');
    if (savedFIO) {
        fioInput.value = savedFIO;
    }
    
    // Автосохранение при вводе
    fioInput.addEventListener('input', function() {
        localStorage.setItem('quizFIO', this.value);
    });
    
    // Подсветка при фокусе
    fioInput.addEventListener('focus', function() {
        this.style.borderColor = '#338ef5';
        this.style.boxShadow = '0 0 0 3px rgba(51, 142, 245, 0.3)';
    });
    
    fioInput.addEventListener('blur', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });
}

// Утилиты для работы с формой
const FormUtils = {
    clearForm: function() {
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.value = '';
        });
        
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
            const label = radio.closest('.g-control-label');
            if (label) {
                label.style.backgroundColor = '';
            }
        });
        
        localStorage.removeItem('quizFIO');
        hideAllErrors();
    }
};

// Экспорт утилит
window.FormUtils = FormUtils;
