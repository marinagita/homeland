// Бургер-меню
const burger = document.querySelector('.burger');
const nav = document.querySelectorAll('.nav-item');

burger.addEventListener('click', () => {
    nav.forEach(item => {
        item.style.display = item.style.display === 'block' ? 'none' : 'block';
    });
});


// Модальное окно для кнопки "Read More"
const readMoreButtons = document.querySelectorAll('.button, .button2');
readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Thanks for your interest! More details are coming soon.');
    });

});


// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// Переменные для модального окна подписки
const subscribeModal = document.getElementById('subscribeModal');
const closeBtn = document.querySelector('.close');
const subscriptionForm = document.getElementById('subscribeForm');
const emailInput = document.getElementById('emailInput');
const subscriptionMessage = document.getElementById('subscriptionMessage');
let isModalShown = false;

// Таймер для показа модального окна
let scrollTimer;

// Отслеживаем прокрутку
window.addEventListener('scroll', () => {
    if (!isModalShown && !scrollTimer) {
        scrollTimer = setTimeout(() => {
            if (!isModalShown) {
                subscribeModal.style.display = 'block';
                isModalShown = true;
            }
        }, 5000); // Задержка 15 секунд
    }
});

// Закрытие модального окна
closeBtn.addEventListener('click', () => {
    subscribeModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === subscribeModal) {
        subscribeModal.style.display = 'none';
    }
});

// Отправка формы подписки
subscriptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    if (validateEmail(email)) {
        subscriptionMessage.textContent = 'Thank you for subscribing!';
        subscriptionMessage.style.color = 'green';
        emailInput.value = '';
        setTimeout(() => {
            subscribeModal.style.display = 'none';
        }, 2000); // Закрываем модальное окно через 2 секунды
    } else {
        subscriptionMessage.textContent = 'Please enter a valid email address.';
        subscriptionMessage.style.color = 'red';
    }
});

// Валидация email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Таймер обратного отсчёта
const eventDate = new Date('2025-12-31T00:00:00');
const timerElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
};

function updateTimer() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').innerText = 'Event Started!';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerElements.days.textContent = days.toString().padStart(2, '0');
    timerElements.hours.textContent = hours.toString().padStart(2, '0');
    timerElements.minutes.textContent = minutes.toString().padStart(2, '0');
    timerElements.seconds.textContent = seconds.toString().padStart(2, '0');
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();