// Простая версия игры для тестирования
document.addEventListener('DOMContentLoaded', function() {
    const launchBtn = document.getElementById('launch-game-btn');
    const gameModal = document.getElementById('game-modal');
    const closeBtn = document.getElementById('close-game-btn');
    
    if (launchBtn && gameModal) {
        launchBtn.addEventListener('click', function() {
            console.log('Запуск игры...');
            gameModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            initSimpleGame();
        });
    }
    
    if (closeBtn && gameModal) {
        closeBtn.addEventListener('click', function() {
            gameModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Закрытие по клику вне окна
    gameModal.addEventListener('click', function(e) {
        if (e.target === gameModal) {
            gameModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

// Простая игра для тестирования
function initSimpleGame() {
    console.log('Инициализация простой игры...');
    
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const menuScreen = document.getElementById('menu-screen');
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            menuScreen.classList.add('hidden');
            startSimpleGame();
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            const pauseScreen = document.getElementById('pause-screen');
            pauseScreen.classList.toggle('show');
        });
    }
    
    document.getElementById('resume-btn').addEventListener('click', function() {
        document.getElementById('pause-screen').classList.remove('show');
    });
    
    document.getElementById('restart-btn').addEventListener('click', function() {
        document.getElementById('pause-screen').classList.remove('show');
        menuScreen.classList.remove('hidden');
    });
    
    document.getElementById('menu-btn').addEventListener('click', function() {
        document.getElementById('pause-screen').classList.remove('show');
        menuScreen.classList.remove('hidden');
    });
}

function startSimpleGame() {
    console.log('Простая игра запущена!');
    
    // Простая логика игры
    let score = 0;
    const scoreElement = document.getElementById('score');
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    
    // Простой игровой цикл
    setInterval(() => {
        score++;
        if (scoreElement) scoreElement.textContent = score;
    }, 1000);
}
