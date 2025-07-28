const testimonials = [
    {
        quote: `We start our journey together by signing a clear, transparent agreement that outlines every detail of the project. During this step, we walk you through all the terms, timelines, costs, and deliverables to ensure you feel informed, comfortable, and excited to begin building your dream home with us.`,
        name: "Agreement Signing",
        designation: "Step 1",
        src: "image/agreement.jpg",
    },
    {
        quote: `Before construction begins, we perform a comprehensive soil test to analyze your land’s composition, strength, and load-bearing capacity. This crucial step ensures that the foundation design is perfectly suited to your site conditions, providing maximum safety, durability, and peace of mind for the structure we’re about to build.`,
        name: "Soil Testing",
        designation: "Step 2",
        src: "image/soiltest.jpg",
    },
    {
        quote: `To mark this exciting milestone, we organize a heartfelt groundbreaking ceremony — a time-honored tradition that symbolizes new beginnings. Together, we break ground on your project site, creating cherished memories as we officially commence construction on your dream home.`,
        name: "Groundbreaking Ceremony",
        designation: "Step 3",
        src: "image/groundbreaking.avif",
    },
    {
        quote: `Precision is key to a structurally sound home. At this stage, we carefully mark the column positions on site, based on your approved floor plan. This ensures that the structural framework aligns perfectly with the design, laying the groundwork for a home that is both safe and true to your vision.`,
        name: "Column Marking",
        designation: "Step 4",
        src: "image/concetre.jpg",
    },
    {
        quote: `A strong home starts with a strong foundation. We excavate the site to the required depth, prepare the base, and pour reinforced concrete footings and slabs to create a rock-solid base for the entire structure. This step is executed with utmost precision and quality control, ensuring your home stands firm for generations.`,
        name: "Foundation Work",
        designation: "Step 5",
        src: "image/foundation.avif",
    },
    {
        quote: `We then construct the temporary roof shuttering framework, which serves as a mold to shape and support the roof slab as it cures. This step is executed with accuracy to guarantee the roof’s strength, levelness, and structural integrity — protecting your home from the elements for years to come.`,
        name: "Roof Shuttering",
        designation: "Step 6",
        src: "image/construction-silhouette.jpg",
    },
    {
        quote: `With the shuttering in place, we pour high-grade concrete to form the roof slab. This critical step strengthens the entire structural system, ensuring your home is well-protected and resilient against both weather and time.`,
        name: "Roof Concrete",
        designation: "Step 7",
        src: "image/roofshuttering.jpg",
    },
    {
        quote: `Once the main structure is complete, we begin crafting the spaces within. Partition walls are built to define each room as per your approved floor plan, shaping your home into a comfortable, functional, and personalized living space.`,
        name: "Partition Walls",
        designation: "Step 8",
        src: "image/partition.jpg",
    },
    {
        quote: `Next, we bring your interiors to life by installing key finishes and fittings. Flooring, tiling, electrical wiring, plumbing, sanitary fixtures, and other essential services are carefully installed — blending comfort, utility, and aesthetics seamlessly into your home.`,
        name: "Interior Installations",
        designation: "Step 9",
        src: "image/installing.avif",
    },
    {
        quote: `The final step is where your vision becomes reality. We install doors, windows, final fixtures, and add the finishing touches that make your home complete. Once every detail is perfected, we proudly hand over the keys and celebrate with you and your loved ones in a warm housewarming ceremony.`,
        name: "Finishing & Handover",
        designation: "Step 10",
        src: "image/finish.jpg",
    },
];




        let activeIndex = 0;
        const imageContainer = document.getElementById('image-container');
        const nameElement = document.getElementById('name');
        const designationElement = document.getElementById('designation');
        const quoteElement = document.getElementById('quote');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        function updateTestimonial(direction) {
            const oldIndex = activeIndex;
            activeIndex = (activeIndex + direction + testimonials.length) % testimonials.length;

            testimonials.forEach((testimonial, index) => {
                let img = imageContainer.querySelector(`[data-index="${index}"]`);
                if (!img) {
                    img = document.createElement('img');
                    img.src = testimonial.src;
                    img.alt = testimonial.name;
                    img.classList.add('testimonial-image');
                    img.dataset.index = index;
                    imageContainer.appendChild(img);
                }

                const offset = index - activeIndex;
                const absOffset = Math.abs(offset);
                const zIndex = testimonials.length - absOffset;
                const opacity = index === activeIndex ? 1 : 0.7;
                const scale = 1 - (absOffset * 0.15);
                const translateY = offset === -1 ? '-20%' : offset === 1 ? '20%' : '0%';
                const rotateY = offset === -1 ? '15deg' : offset === 1 ? '-15deg' : '0deg';

                img.style.zIndex = zIndex;
                img.style.opacity = opacity;
                img.style.transform = `translateY(${translateY}) scale(${scale}) rotateY(${rotateY})`;
            });

            nameElement.textContent = testimonials[activeIndex].name;
            designationElement.textContent = testimonials[activeIndex].designation;
            quoteElement.innerHTML = testimonials[activeIndex].quote.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');

            animateWords();
        }

        function animateWords() {
            const words = quoteElement.querySelectorAll('.word');
            words.forEach((word, index) => {
                word.style.opacity = '0';
                word.style.transform = 'translateY(10px)';
                word.style.filter = 'blur(10px)';
                setTimeout(() => {
                    word.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out, filter 0.2s ease-in-out';
                    word.style.opacity = '1';
                    word.style.transform = 'translateY(0)';
                    word.style.filter = 'blur(0)';
                }, index * 20);
            });
        }

        function handleNext() {
            updateTestimonial(1);
        }

        function handlePrev() {
            updateTestimonial(-1);
        }

        prevButton.addEventListener('click', handlePrev);
        nextButton.addEventListener('click', handleNext);

        // Initial setup
        updateTestimonial(0);

        // Autoplay functionality
        const autoplayInterval = setInterval(handleNext, 5000);

        // Stop autoplay on user interaction
        [prevButton, nextButton].forEach(button => {
            button.addEventListener('click', () => {
                clearInterval(autoplayInterval);
            });
        });
        
