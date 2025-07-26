document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const isK = counter.getAttribute("data-format") === "K";
    let count = 0;
    const increment = target / 100;

    const update = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count) + (isK ? "K" : "+");
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + (isK ? "K" : "+");
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          // Reset before animation
          counter.textContent = "0";
          animateCounter(counter);
          // Optional: unobserve if you don't want to repeat
          // observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 } // triggers when 50% of the counter is visible
  );

  counters.forEach(counter => observer.observe(counter));
});

$(document).ready(function(){
  $("#successCarousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    // dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 }
    }
  });
});