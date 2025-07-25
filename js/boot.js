
   document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");

    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let current = 0;
      const increment = target / 100;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + "+";
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target + "+";
        }
      };

      updateCount();
    });
  });

    document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");

    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const isK = counter.getAttribute("data-format") === "K";
      let count = 0;
      const increment = target / 100;
      
      const update = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.textContent = isK ? target + "K" : target;
        }
      };

      update();
    });
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