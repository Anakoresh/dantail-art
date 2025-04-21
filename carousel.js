const track = document.querySelector('.carousel-track');
const originalItems = Array.from(track.children);
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const titleElement = document.getElementById('carousel-title');

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.getElementById("close-modal");

let items = [];
let currentIndex = 2;  // Начинаем с первого оригинального элемента (после 2 клонов)

let autoScrollInterval;
let autoScrollPaused = false;
let autoScrollTimeout;

function setupCarousel() {
    const clonesBefore = originalItems.slice(-2).map(item => item.cloneNode(true));
    const clonesAfter = originalItems.slice(0, 2).map(item => item.cloneNode(true));

    track.innerHTML = '';
    clonesBefore.forEach(clone => track.appendChild(clone));
    originalItems.forEach(item => track.appendChild(item));
    clonesAfter.forEach(clone => track.appendChild(clone));

    items = Array.from(track.children);
    updateCarousel(false);
    setupClickHandlers();
}

function updateCarousel(animate = true) {
    items.forEach(item => item.classList.remove('active'));
    items[currentIndex].classList.add('active');

    const itemWidth = items[0].offsetWidth + 40;
    const containerWidth = document.querySelector('.carousel').offsetWidth;
    const offset = (containerWidth / 2) - (itemWidth / 2) - (itemWidth * currentIndex);

    track.style.transition = animate ? 'transform 0.4s ease' : 'none';
    track.style.transform = `translateX(${offset}px)`;

    const activeTitle = items[currentIndex].querySelector('h3')?.textContent || '';
    titleElement.textContent = activeTitle;
}

function handleLoop() {
    if (currentIndex <= 1) {
        setTimeout(() => {
            currentIndex = originalItems.length + 1;
            updateCarousel(false);
        }, 400);
    } else if (currentIndex >= items.length - 2) {
        setTimeout(() => {
            currentIndex = 2;
            updateCarousel(false);
        }, 400);
    }
}

function nextSlide() {
    currentIndex++;
    updateCarousel();
    setTimeout(handleLoop, 400);
}

function prevSlide() {
    currentIndex--;
    updateCarousel();
    setTimeout(handleLoop, 400);
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoScroll();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoScroll();
});

function setupClickHandlers() {
    items.forEach((item, index) => {
        item.onclick = () => {
            stopAutoScroll();
            if (index === currentIndex) {
                const imgSrc = item.querySelector('img')?.src;
                if (imgSrc) {
                    modalImg.src = imgSrc;
                    modal.style.display = "block";
                }
            } else {
                currentIndex = index;
                updateCarousel();
                setTimeout(handleLoop, 400);
            }
        };
    });
}

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

window.addEventListener('resize', () => updateCarousel(false));

function startAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
        nextSlide();
    }, 2500);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
    clearTimeout(autoScrollTimeout);
    autoScrollPaused = true;

    autoScrollTimeout = setTimeout(() => {
        autoScrollPaused = false;
        startAutoScroll();
    }, 10000); // 10 секунд ожидания
}

// Инициализация
setupCarousel();
startAutoScroll();