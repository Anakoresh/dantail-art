const reviewModal = document.getElementById("modal");
const reviewModalImg = document.getElementById("modal-img");
const closeReviewModal = document.getElementById("close-modal");
const reviews = document.querySelectorAll('.review-img');
let current = 0;

function activateNextReview() {
  reviews.forEach(img => img.classList.remove('active'));

  reviews[current].classList.add('active');

  current = (current + 1) % reviews.length;
}

activateNextReview();
setInterval(activateNextReview, 1000);

reviews.forEach((img, index) => {
  img.addEventListener('click', () => {
    reviewModal.style.display = 'block';
    reviewModalImg.src = img.src;
    current = index; // Устанавливаем текущий индекс на кликнутый элемент
  });
})

closeReviewModal.addEventListener('click', () => {
    reviewModal.style.display = "none";
});
window.addEventListener('click', (e) => {
    if (e.target === modal) reviewModal.style.display = "none";
});