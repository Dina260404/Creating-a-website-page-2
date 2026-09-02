// Бургер меню 
const burgerIcon = document.getElementById('burgerIcon');
const burgerMenu = document.getElementById('burgerMenu');
const burgerClose = document.getElementById('burgerClose');

// Создаем overlay
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

function openBurger() {
    burgerMenu.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (burgerIcon) burgerIcon.classList.add('active'); 
}

function closeBurger() {
    burgerMenu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (burgerIcon) burgerIcon.classList.remove('active'); 
}

if (burgerIcon) {
    burgerIcon.addEventListener('click', openBurger);
}

if (burgerClose) {
    burgerClose.addEventListener('click', closeBurger);
}

overlay.addEventListener('click', closeBurger);

// Закрытие при клике на ссылку в меню
const burgerLinks = document.querySelectorAll('.burger-nav a');
burgerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        closeBurger();
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Раздел в разработке');
            }
        }
    });
});

// Модальное окно с формой
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const formContainer = document.getElementById('formContainer');
const successContainer = document.getElementById('successContainer');
const callbackForm = document.getElementById('callbackForm');

// Функция открытия модального окна
function openModal() {
	if (modalOverlay) modalOverlay.classList.add('active');
	document.body.style.overflow = 'hidden';
	// Сбрасываем форму при открытии
	if (callbackForm) {
		callbackForm.reset();
	}
	if (formContainer) formContainer.style.display = 'block';
	if (successContainer) successContainer.style.display = 'none';
}

// Функция закрытия модального окна
function closeModal() {
	if (modalOverlay) modalOverlay.classList.remove('active');
	document.body.style.overflow = '';
}

// Все кнопки с классом "open-modal-btn" открывают модальное окно 
const modalButtons = document.querySelectorAll('.open-modal-btn');
modalButtons.forEach (function(btn) {
	btn.addEventListener('click', function(e) {
		e.preventDefault();
		if (burgerMenu && burgerMenu.classList.contains('open')) {
			closeBurger();
		}
		openModal();
	});
});

//Закрытие по крестику
if (modalClose) {
	modalClose.addEventListener('click', closeModal);
}

// Закрытие по клику на overlay
if (modalOverlay) {
	modalOverlay.addEventListener('click', function(e) {
		if (e.target === modalOverlay) {
			closeModal();
		}
	});
}

// Обработка отправки формы
if (callbackForm) {
	callbackForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const userName = document.getElementById('userName').value;
		const userPhone = document.getElementById('userPhone').value;
		const agreeCheckbox = document.getElementById('agreeCheckbox');
		
		// Валидация
		if (!userName.trim()) {
			alert('Пожалуйста, введите ваше имя');
			return;
		}
		if (!userPhone.trim()) {
			alert('Пожалуйста, введите ваш номер телефона');
			return;
		}
		if(!agreeCheckbox.checked) {
			alert('Пожалуйста, согласитесь на обработтку персональных данных');
			return;
		}
		
		// Меняем форму на сообщение об успехе
		if (formContainer) formContainer.style.display = 'none';
		if (successContainer) successContainer.style.display = 'block';
	});
}

// Карусель 1
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
const totalSlides = slides.length;

// Функция обновления карусели
function updateCarousel() {
	slides.forEach(slide => {
		slide.classList.remove('active');
	});
	slides[currentSlide].classList.add('active');
	const currentSlideElement = slides[currentSlide];
	const d5 = currentSlideElement.querySelector('.d5');
	const line2 = currentSlideElement.querySelector('.line2');
	const circle = currentSlideElement.querySelector('.circle');
	const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
	const isMobile = window.innerWidth < 768;
	if (isMobile) return;
	if (line2 && circle) {
		let line2Width, line2Right, circlePos;
		if (isTablet) {
			switch(currentSlide) {
				case 0:
					line2Width = 11;
					circlePos = 550;
					break;
				case 1: 
					line2Width = 70.25;
					circlePos = 600;
					break;
				case 2:
					line2Width = 140.5;
					circlePos = 675;
					break;
				default:
					line2Width = 11;
					circlePos = 550;
			}
			line2.style.width = line2Width + 'px';
			circle.style.left = circlePos + 'px';
		}
		else {
			switch(currentSlide) {
				case 0:
					line2Width = 20;
					line2Right = 460;
					circlePos = 447;
					break;
				case 1:
					line2Width = 130;
					line2Right = 350;
					circlePos = 349;
					break;
				case 2:
					line2Width = 230;
					line2Right = 250;
					circlePos = 247;
					break;
				default:
					line2Width = 20;
					circlePos = 447;
			}
			line2.style.width = line2Width + 'px';
			line2.style.right = line2Right + 'px';
			circle.style.right = circlePos + 'px';
		}
	}
}
//Переключение на следующий слайд
function nextSlide() {
	if (currentSlide < totalSlides - 1) {
		currentSlide++;
	}
	else {
		currentSlide = 0;
	}
	updateCarousel();
}
//Переключение на предыдущий слайд
function prevSlide() {
	if (currentSlide > 0) {
		currentSlide--;
	}
	else {
		currentSlide = totalSlides - 1;
	}
	updateCarousel();
}
//Назначение обработчиков на кнопки
if (prevBtn) {
	prevBtn.addEventListener('click', prevSlide);
}
if (nextBtn) {
	nextBtn.addEventListener('click', nextSlide);
}
// Свайпы для телефона
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
const carouselContainer = document.getElementById('main0');
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}
function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;   
    // Проверяем, что свайп горизонтальный (разница по X больше, чем по Y)
    const deltaX = touchEndX - touchStartX;
    const deltaY = Math.abs(touchEndY - touchStartY);
    // Минимальное расстояние для свайпа - 30px
    if (Math.abs(deltaX) < 30) return;
    // Отклонение по вертикали не должно превышать горизонтальное
    if (deltaY > Math.abs(deltaX) * 0.7) return;
    if (deltaX > 0) {
        // Свайп вправо - предыдущий слайд
        prevSlide();
    } else {
        // Свайп влево - следующий слайд
        nextSlide();
    }
}
// Назначаем обработчики свайпов на контейнер карусели
if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', handleTouchStart, false);
    carouselContainer.addEventListener('touchend', handleTouchEnd, false);
}
// Также добавляем свайпы на сами слайды для лучшей реакции
slides.forEach(slide => {
    slide.addEventListener('touchstart', handleTouchStart, false);
    slide.addEventListener('touchend', handleTouchEnd, false);
});
