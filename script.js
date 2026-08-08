/* =========================================================
   ToolVerse — Main JavaScript
   Handles: sticky navbar, mobile menu, smooth scroll spy,
   scroll reveal animations, FAQ accordion, back-to-top,
   scroll progress bar, dynamic footer year.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. STICKY NAVBAR ---------- */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });


  /* ---------- 2. MOBILE MENU TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-menu__cta');

  const closeMobileMenu = () => {
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  const openMobileMenu = () => {
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // Close mobile menu on resize to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMobileMenu();
  });


  /* ---------- 3. SCROLL SPY (active nav link) ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });


  /* ---------- 4. SCROLL REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Slight stagger for elements revealing together
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ---------- 5. FAQ ACCORDION ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items (single-open accordion)
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ---------- 6. BACK TO TOP BUTTON ---------- */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ---------- 7. SCROLL PROGRESS BAR ---------- */
  const scrollProgress = document.getElementById('scrollProgress');

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  };
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);


  /* ---------- 8. DYNAMIC FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ---------- 9. SMOOTH SCROLL FOR ALL ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const offset = document.getElementById('navbar').offsetHeight;
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset + 1;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

});
