// window.addEventListener("load", function () {
//   document.body.classList.add("loaded");
// });

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.nav-item.dropdown > .nav-link').forEach(function (dropdownLink) {
    dropdownLink.addEventListener('click', function (e) {
      const isDropdownShown = this.nextElementSibling?.classList.contains('show');
      const href = this.getAttribute('href');
      if (!isDropdownShown && href && href !== '#') {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
});

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const carousel = document.querySelector(".carousel");
const list = document.querySelector(".list");
const items = Array.from(document.querySelectorAll(".item"));
const runningTimeBar = document.querySelector(".carousel .timeRunning");

const TIME_RUNNING = 1500;
const TIME_AUTO_NEXT = 3500;

let transitionTimeout;
let autoNextTimeout;
let isAnimating = false;

const arrowsDiv = document.querySelector(".arrows");
const progressBarContainer = document.createElement("div");
progressBarContainer.className = "progress-bar-container";
const progressBar = document.createElement("div");
progressBar.className = "progress-bar";
progressBarContainer.appendChild(progressBar);
arrowsDiv.appendChild(progressBarContainer);

// Add data-item attribute to each title
items.forEach((item, index) => {
  item.querySelector(".title").setAttribute("data-item", index + 1);
});

// Event listeners
nextBtn.addEventListener("click", () => handleSliderNavigation("next"));
prevBtn.addEventListener("click", () => handleSliderNavigation("prev"));

// Reset progress bar animation
function resetAnimation() {
  if (!runningTimeBar) return;
  runningTimeBar.style.animation = "none";
  // Force reflow to restart animation
  runningTimeBar.offsetHeight;
  runningTimeBar.style.animation = `runningTime ${TIME_AUTO_NEXT / 1000}s linear forwards`;
}

// Main handler for slider next/prev
function handleSliderNavigation(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const sliderItems = list.querySelectorAll(".item");

  if (direction === "next") {
    list.appendChild(sliderItems[0]); // Move first to end
    carousel.classList.add("next");
  } else if (direction === "prev") {
    list.prepend(sliderItems[sliderItems.length - 1]); // Move last to start
    carousel.classList.add("prev");
  }

  afterSlideChange();
}

// Update after each slide shift
function afterSlideChange() {
  // Remove old number
  const slideNumberElement = document.querySelector(".slide-number");
  if (slideNumberElement) slideNumberElement.remove();

  const sliderItems = Array.from(list.querySelectorAll(".item"));
  const activeItem = parseInt(sliderItems[1].querySelector(".title").getAttribute("data-item"));
  const activeIndex = activeItem < 10 ? `0${activeItem}` : activeItem.toString();

  const div = document.createElement("div");
  div.classList.add("slide-number");
  div.textContent = `${activeIndex}/${sliderItems.length}`;
  arrowsDiv.appendChild(div);

  updateProgressBar();
  resetCarouselState();
}

// Update width of progress bar based on active slide
function updateProgressBar() {
  const totalSlides = items.length;
  const sliderItems = Array.from(list.querySelectorAll(".item"));
  const activeItem = parseInt(sliderItems[1].querySelector(".title").getAttribute("data-item"));
  const progressPercentage = (activeItem / totalSlides) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Reset state after each slide move
function resetCarouselState() {
  clearTimeout(transitionTimeout);
  clearTimeout(autoNextTimeout);

  transitionTimeout = setTimeout(() => {
    carousel.classList.remove("next");
    carousel.classList.remove("prev");
    isAnimating = false;
  }, TIME_RUNNING);

  autoNextTimeout = setTimeout(() => {
    nextBtn.click();
  }, TIME_AUTO_NEXT);

  resetAnimation();
}

// ✅ On DOM Load — adjust for slide 1 to appear centered
document.addEventListener("DOMContentLoaded", () => {
  // Move last slide to front so slide 1 comes in center
  list.prepend(list.children[list.children.length - 1]);
  afterSlideChange();
});

// ✅ On window load — start carousel auto-play
window.addEventListener("load", () => {
  carousel.classList.add("ready");
  setTimeout(() => {
    autoNextTimeout = setTimeout(() => {
      nextBtn.click();
    }, TIME_AUTO_NEXT);
  }, 500);
});





