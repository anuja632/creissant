

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

let autoNextTimeout;
let isAnimating = false;

// Create progress bar
const arrowsDiv = document.querySelector(".arrows");
const progressBarContainer = document.createElement("div");
progressBarContainer.className = "progress-bar-container";
const progressBar = document.createElement("div");
progressBar.className = "progress-bar";
progressBarContainer.appendChild(progressBar);
arrowsDiv.appendChild(progressBarContainer);

// Set data-item attributes
items.forEach((item, index) => {
  const title = item.querySelector(".title");
  if (title) {
    title.setAttribute("data-item", index + 1);
  }
});

// Button listeners
nextBtn.addEventListener("click", () => {
  clearTimeout(autoNextTimeout); // ✅ Cancel auto-play
  handleSliderNavigation("next");
});
prevBtn.addEventListener("click", () => {
  clearTimeout(autoNextTimeout);
  handleSliderNavigation("prev");
});

function handleSliderNavigation(direction) {
  if (isAnimating) return;
  isAnimating = true;
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  const sliderItems = list.querySelectorAll(".item");

  if (direction === "next") {
    list.appendChild(sliderItems[0]);
    carousel.classList.add("next");
  } else {
    list.prepend(sliderItems[sliderItems.length - 1]);
    carousel.classList.add("prev");
  }

  setTimeout(() => {
    updateSlideNumber();
    updateProgressBar();
    carousel.classList.remove("next", "prev");
    isAnimating = false;
    nextBtn.disabled = false;
    prevBtn.disabled = false;

    resetRunningBar(); // ✅ reset bar animation
    startAutoSlide();  // ✅ restart auto-play AFTER transition
  }, TIME_RUNNING);
}

function updateSlideNumber() {
  const oldNumber = document.querySelector(".slide-number");
  if (oldNumber) oldNumber.remove();

  const sliderItems = Array.from(list.querySelectorAll(".item"));
  const activeItem = parseInt(sliderItems[1].querySelector(".title").getAttribute("data-item"), 10);
  const activeIndex = activeItem < 10 ? `0${activeItem}` : `${activeItem}`;

  const div = document.createElement("div");
  div.classList.add("slide-number");
  div.textContent = `${activeIndex}/${items.length}`;
  arrowsDiv.appendChild(div);
}

function updateProgressBar() {
  const sliderItems = Array.from(list.querySelectorAll(".item"));
  const activeItem = parseInt(sliderItems[0].querySelector(".title").getAttribute("data-item"), 10);
  const progressPercentage = (activeItem / items.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

function resetRunningBar() {
  if (!runningTimeBar) return;
  runningTimeBar.style.animation = "none";
  runningTimeBar.offsetHeight;
  runningTimeBar.style.animation = `runningTime ${TIME_AUTO_NEXT / 1000}s linear forwards`;
}

function startAutoSlide() {
  autoNextTimeout = setTimeout(() => {
    nextBtn.click(); // simulate next slide
  }, TIME_AUTO_NEXT);
}

// Initial load setup
document.addEventListener("DOMContentLoaded", () => {
  list.prepend(list.children[list.children.length - 1]);
  updateSlideNumber();
  updateProgressBar();
  resetRunningBar();
  startAutoSlide(); // ✅ auto-slide starts on page load
});
