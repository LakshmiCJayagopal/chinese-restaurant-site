window.addEventListener('scroll', () => {
  const ticker = document.querySelector('.hero-text-ticker-wrapper');
  if (!ticker) return;

  // Only apply scroll animation on desktop (width > 768px)
  if (window.innerWidth > 768) {
    const scrollY = window.scrollY || window.pageYOffset;
    const translateY = scrollY * 0.2; // Adjust for scroll speed
    ticker.style.transform = `translateY(${translateY}px)`;
  } else {
    // On mobile, keep it fixed at its original position
    ticker.style.transform = `translateY(0px)`;
  }
});


document.addEventListener('DOMContentLoaded', function() {
    const zMenuItems = document.querySelectorAll('.z-menu-item');
    const zImageSlides = document.querySelectorAll('.z-image-slide');
    const zMenuText = document.querySelector('.z-menu-text');
    let zCurrentImageIndex = 0;

    function zShowImage(index) {
        // Remove active and prev classes from all slides
        zImageSlides.forEach((slide, i) => {
            slide.classList.remove('z-active', 'z-prev');
            
            if (i === index) {
                // Add active class to new slide
                setTimeout(() => {
                    slide.classList.add('z-active');
                }, 50);
            } else if (i === zCurrentImageIndex) {
                // Add prev class to current slide
                slide.classList.add('z-prev');
            }
        });
        
        zCurrentImageIndex = index;
    }

    // Add hover event listeners to menu items
    zMenuItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            zShowImage(index);
        });
    });

    // Optional: Reset to first image when not hovering over any menu item
    zMenuText.addEventListener('mouseleave', () => {
        zShowImage(0);
    });

    // Initialize with first image
    zShowImage(0);
});

  const tabs = document.querySelectorAll('.v-tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('v-active'));
        tab.classList.add('v-active');
      });
    });

   const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const overlay = document.getElementById("mobileOverlay");

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.classList.toggle("open");
      mobileNav.classList.toggle("open");
      overlay.classList.toggle("show", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    overlay.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      mobileNav.classList.remove("open");
      overlay.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNav.classList.remove('open');
        overlay.classList.remove('show');
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });



      const sections = document.querySelectorAll('.approach-flex');
let ticking = false;
let lastScrollY = window.scrollY;

// Disable logic on mobile view
function isDesktopView() {
  return window.innerWidth > 768;
}

function updateStackAnimation() {
  if (!isDesktopView()) return; // skip animation on mobile

  const currentScrollY = window.scrollY;
  const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentScrollY;

  sections.forEach((section, index) => {
    if (index < sections.length - 1) {
      const current = section;
      const next = sections[index + 1];

      const currentRect = current.getBoundingClientRect();
      const nextRect = next.getBoundingClientRect();

      const triggerPoint = currentRect.top + currentRect.height * 0.6;
      const releasePoint = currentRect.top + currentRect.height * 0.4;

      if (scrollDirection === 'down' && nextRect.top <= triggerPoint) {
        current.classList.add('moved-up');
      } else if (scrollDirection === 'up' && nextRect.top > releasePoint) {
        current.classList.remove('moved-up');
      }
    }
  });

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateStackAnimation);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick, { passive: true });

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    requestTick();
  }, 150);
});
 
class TimelineParallax {
    constructor() {
        // Disable entirely on mobile
        if (window.innerWidth <= 768) return;

        this.wrapper = document.querySelector('.history-of-love-grid-wrapper');
        this.sections = document.querySelectorAll('.history-of-love-single');
        this.titleWraps = document.querySelectorAll('.history-of-love-title-wrap');
        this.distoryFlexes = document.querySelectorAll('.distory-flex');
        this.dots = document.querySelectorAll('.timeline-dot');

        if (!this.wrapper || this.sections.length === 0) return;

        this.mouseX = 0;
        this.windowWidth = window.innerWidth;
        this.maxOffset = 30;
        this.wrapperMaxOffset = 15;
        this.baseTransform = -18;

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseleave', this.resetPositions);
        window.addEventListener('resize', this.handleResize);
    }

    handleMouseMove = (e) => {
        this.mouseX = e.clientX;
        this.updateElements();
    };

    handleResize = () => {
        this.windowWidth = window.innerWidth;

        if (this.windowWidth <= 768) {
            this.resetPositions();
            this.unbindEvents();
        }
    };

    unbindEvents() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseleave', this.resetPositions);
        window.removeEventListener('resize', this.handleResize);
    }

    updateElements() {
        const centerX = this.windowWidth / 2;
        const normalized = (this.mouseX - centerX) / centerX;

        const wrapperOffset = -normalized * this.wrapperMaxOffset;
        this.wrapper.style.transform = `translateX(${this.baseTransform + wrapperOffset}%)`;

        this.sections.forEach((section, i) => {
            const offset = -normalized * this.maxOffset * (1 + i * 0.15);
            section.style.transform = `translateX(${offset}px)`;
        });

        this.titleWraps.forEach((title, i) => {
            const offset = -normalized * (this.maxOffset * 0.6) * (0.8 + i * 0.1);
            const yMatch = title.style.transform.match(/translateY\(([^)]+)\)/);
            const yValue = yMatch ? yMatch[1] : '0px';
            title.style.transform = `translateX(${offset}px) translateY(${yValue})`;
        });

        this.distoryFlexes.forEach((flex, i) => {
            const offset = -normalized * (this.maxOffset * 0.7) * (0.9 + i * 0.12);
            flex.style.transform = `translateX(${offset}px)`;
        });

        this.dots.forEach((dot) => {
            const rect = dot.getBoundingClientRect();
            const dotX = rect.left + rect.width / 2;
            const dotY = rect.top + rect.height / 2;
            const dist = Math.hypot(this.mouseX - dotX, window.innerHeight / 2 - dotY);
            const scale = Math.max(1, 2 - dist / 200);
            const dotOffset = -normalized * 5;

            dot.style.transform = `translate(${-3 + dotOffset}px, 0) scale(${scale})`;
        });
    }

    resetPositions = () => {
        if (this.wrapper) {
            this.wrapper.style.transform = `translateX(${this.baseTransform}%)`;
        }

        [...this.sections, ...this.titleWraps, ...this.distoryFlexes].forEach((el) => {
            if (el) el.style.transform = 'translateX(0px)';
        });

        this.dots.forEach((dot) => {
            if (dot) dot.style.transform = 'translate(-3px, 0) scale(1)';
        });
    };
}

document.addEventListener('DOMContentLoaded', () => {
    new TimelineParallax();
});

// numberssection
  const counters = document.querySelectorAll('.review-count-single');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const scrolls = entry.target.querySelectorAll('.digit-scroll');
        scrolls.forEach(scroll => {
          scroll.classList.add('animate');
        });
        obs.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));