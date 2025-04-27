// Initialize AOS (Animate On Scroll) library
AOS.init({
    once: true, // Whether animation should happen only once - while scrolling down
    // Optional: You might want to adjust offset/duration slightly for dark theme visibility
    // offset: 100,
    // duration: 600,
});

// Add scroll listener for header background change
const header = document.querySelector('.header');
const scrollThreshold = 50; // Pixels to scroll before changing header

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Optional: Smooth scroll for anchor links (if not handled by CSS `scroll-behavior`)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Check if the link is just the scroll indicator or a real nav link
        if (this.getAttribute('href') === '#') return;

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            // Consider header height for accurate scrolling
            const headerOffset = header ? header.offsetHeight : 0; // Check if header exists
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Scroll indicator click functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
const heroSection = document.querySelector('#hero');
const nextSection = heroSection ? heroSection.nextElementSibling : null; // Find the next section dynamically

if (scrollIndicator && nextSection) {
    scrollIndicator.addEventListener('click', () => {
        const headerOffset = header ? header.offsetHeight : 0;
        const elementPosition = nextSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

         window.scrollTo({
             top: offsetPosition,
             behavior: 'smooth'
         });
    });
}

// Animated Counter Functionality
const statsSection = document.querySelector('#stats');
const counters = document.querySelectorAll('.stat-number');
const animationDuration = 1500; // Duration in milliseconds (e.g., 1.5 seconds)

const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: '0px',
    threshold: 0.3 // Trigger when 30% of the section is visible
};

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target'); // Get target value
    const increment = target / (animationDuration / 16); // Calculate increment per frame (approx 60fps)
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target; // Ensure final value is exact
            // Optional: Add suffix like '+' or '%' if needed based on data attribute
            if (counter.dataset.suffix) {
                counter.innerText += counter.dataset.suffix;
            }
        }
    };
    requestAnimationFrame(updateCounter);
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Check if the section is intersecting and hasn't been animated yet
        if (entry.isIntersecting && !statsSection.classList.contains('animated')) {
            counters.forEach(counter => {
                animateCounter(counter);
            });
            statsSection.classList.add('animated'); // Mark as animated
            observer.unobserve(statsSection); // Stop observing once animated
        }
    });
}, observerOptions);

// Start observing the stats section if it exists
if (statsSection) {
    statsObserver.observe(statsSection);
}

//metodologia

  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.toggle-more');
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const card = this.closest('.methodology-card');
        const detail = card.querySelector('.methodology-detail');
        detail.classList.toggle('visible');

        const icon = this.querySelector('i');
        icon.classList.toggle('bx-chevron-down');
        icon.classList.toggle('bx-chevron-up');
      });
    });
  });




function toggleDetail(button) {
  const allCards = document.querySelectorAll('.methodology-card');
  const currentCard = button.closest('.methodology-card');

  const isAlreadyExpanded = currentCard.classList.contains('expanded');

  // Cerrar todas
  allCards.forEach(card => {
    card.classList.remove('expanded');
    const btn = card.querySelector('.methodology-button');
    if (btn) {
      btn.innerHTML = "Ver Más <i class='bx bx-chevron-down'></i>";
    }
  });

  // Expandir solo si no estaba ya expandida
  if (!isAlreadyExpanded) {
    currentCard.classList.add('expanded');
    button.innerHTML = "Ver Menos <i class='bx bx-chevron-up'></i>";
  }
}


function toggleContent(contentId) {
    const content = document.getElementById(contentId);
    content.classList.toggle('open');
  }

  

 













  






