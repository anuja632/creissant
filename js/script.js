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

// Select DOM elements
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const carousel = document.querySelector(".carousel");
const list = document.querySelector(".list");
const items = Array.from(document.querySelectorAll(".item"));
const runningTimeBar = document.querySelector(".carousel .timeRunning");

// Timing configurations
const TIME_RUNNING = 1500; // Animation duration
const TIME_AUTO_NEXT = 3500; // Auto-slide interval

// Timeout and animation state
let transitionTimeout;
let autoNextTimeout;
let isAnimating = false; // Prevent spam clicks

// Create and append progress bar
const arrowsDiv = document.querySelector(".arrows");
const progressBarContainer = document.createElement("div");
progressBarContainer.className = "progress-bar-container";

const progressBar = document.createElement("div");
progressBar.className = "progress-bar";

progressBarContainer.appendChild(progressBar);
arrowsDiv.appendChild(progressBarContainer);

// Add data-item attributes
items.forEach((item, index) => {
  item.querySelector(".title").setAttribute("data-item", index + 1);
});

// Event listeners
nextBtn.addEventListener("click", () => handleSliderNavigation("next"));
prevBtn.addEventListener("click", () => handleSliderNavigation("prev"));

// Start auto-slide
autoNextTimeout = setTimeout(() => {
  nextBtn.click();
}, TIME_AUTO_NEXT);

// Initial animation and slide state
resetAnimation();
afterSlideChange();

// ==== Function Definitions ====

function resetAnimation() {
  runningTimeBar.style.animation = "none";
  runningTimeBar.offsetHeight; // Trigger reflow
  runningTimeBar.style.animation = `runningTime ${TIME_AUTO_NEXT / 1000}s linear forwards`;
}

function handleSliderNavigation(direction) {
  if (isAnimating) return; // Prevent rapid clicks
  isAnimating = true;

  const sliderItems = list.querySelectorAll(".item");

  if (direction === "next") {
    list.appendChild(sliderItems[0]);
    carousel.classList.add("next");
  } else if (direction === "prev") {
    list.prepend(sliderItems[sliderItems.length - 1]);
    carousel.classList.add("prev");
  }

  afterSlideChange();
}

function afterSlideChange() {
  const slideNumberElement = document.querySelector(".slide-number");
  if (slideNumberElement) slideNumberElement.remove();

  const sliderItems = Array.from(list.querySelectorAll(".item"));
  const activeItem = parseInt(
    sliderItems[1].querySelector(".title").getAttribute("data-item")
  );
  const activeIndex = activeItem < 10 ? `0${activeItem}` : activeItem.toString();

  const div = document.createElement("div");
  div.classList.add("slide-number");
  div.textContent = `${activeIndex}/${sliderItems.length}`;
  arrowsDiv.appendChild(div);

  console.log(`Current active slide original index: ${activeIndex}`);

  updateProgressBar();
  resetCarouselState();
}

function updateProgressBar() {
  const totalSlides = items.length;
  const sliderItems = Array.from(list.querySelectorAll(".item"));
  const activeItem = parseInt(
    sliderItems[1].querySelector(".title").getAttribute("data-item")
  );

  const progressPercentage = (activeItem / totalSlides) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

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

 
 const teamData = [
    {
      name: "Ralph Edwards",
      role: "Junior Worker",
      desc: "We adhere to strict quality control and use premium materials. Each member of our team brings specialized expertise, ensuring flawless execution and a seamless construction experience.",
      image: "image/team1.avif"
    },
    {
      name: "John Carter",
      role: "Senior Engineer",
      desc: "John is a civil engineer specializing in foundation and structural design. He ensures every structure stands the test of time.",
      image: "image/team2.avif"
    },
    {
      name: "Ajay Kumar",
      role: "Architect",
      desc: "Ajay crafts efficient layouts and stunning building facades. His design philosophy combines function and beauty.",
      image: "image/team3.jpg"
    },
    {
      name: "David Lee",
      role: "Project Manager",
      desc: "David oversees end-to-end project execution, client communication, and milestone deliveries with precision.",
      image: "image/team4.jpg"
    }
  ];

  function setProfile(index) {
    const selected = teamData[index];
    document.getElementById("profile-name").textContent = selected.name;
    document.getElementById("profile-role").textContent = selected.role;
    document.getElementById("profile-desc").textContent = selected.desc;
    document.getElementById("profile-img").src = selected.image;

    // Update active image
    const thumbnails = document.querySelectorAll(".team-thumbnails img");
    thumbnails.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  }

const reasons = document.querySelectorAll('.reason');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

reasons.forEach(reason => {
  observer.observe(reason);
});


