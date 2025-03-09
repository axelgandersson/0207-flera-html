let currentIndex = 0;

function updateCarousel() {
  const cards = document.querySelectorAll(".project-card");
  const carousel = document.getElementById("proj");
  const cardWidth = cards[0].offsetWidth;
  const gap = parseInt(window.getComputedStyle(carousel).gap);
  const additionalOffset = cardWidth / 2; // Adjust this value as needed

  cards.forEach((card, index) => {
    if (index === currentIndex) {
      card.classList.add("active");
      card.classList.remove("inactive");
    } else {
      card.classList.remove("active");
      card.classList.add("inactive");
    }
  });

  const offset = -(currentIndex * (cardWidth + gap)) + additionalOffset;
  carousel.style.transform = `translateX(${offset}px)`;
}

function moveCarousel(direction) {
  const cards = document.querySelectorAll(".project-card");
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = cards.length - 1;
  } else if (currentIndex >= cards.length) {
    currentIndex = 0;
  }
  updateCarousel();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCarousel();
});
