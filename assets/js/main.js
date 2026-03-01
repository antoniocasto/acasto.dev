document.addEventListener('DOMContentLoaded', function () {
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);

  const themeToggle = document.getElementById('theme-toggle');
  const themeIconSvg = document.querySelector('.theme-icon');
  const themeIconUse = document.querySelector('.theme-icon use');
  const overlay = document.querySelector('.theme-overlay');
  const rootElement = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const currentTheme = savedTheme || systemTheme;
  const iconSprite = themeIconUse ? themeIconUse.getAttribute('href').split('#')[0] : '';

  const applyThemeClass = (isDark) => {
    if (rootElement) {
      rootElement.classList.toggle('dark-theme', isDark);
    }
    document.body.classList.toggle('dark-theme', isDark);
  };

  const setThemeIcon = (theme) => {
    if (!themeIconUse) return;
    const iconId = theme === 'dark' ? 'icon-sun' : 'icon-moon';
    const href = iconSprite ? `${iconSprite}#${iconId}` : `#${iconId}`;
    themeIconUse.setAttribute('href', href);
    themeIconUse.setAttribute('xlink:href', href);
  };

  if (currentTheme === 'dark') {
    applyThemeClass(true);
    if (themeToggle) themeToggle.checked = true;
    setThemeIcon('dark');
  } else {
    applyThemeClass(false);
    setThemeIcon('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      const duration = prefersReducedMotion ? 0 : 600;

      if (overlay && !prefersReducedMotion) {
        const scaleFactor = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 10;
        overlay.style.setProperty('--overlay-scale', scaleFactor);
        overlay.classList.add('expand');
      }

      setTimeout(() => {
        if (this.checked) {
          applyThemeClass(true);
          localStorage.setItem('theme', 'dark');
          setThemeIcon('dark');
        } else {
          applyThemeClass(false);
          localStorage.setItem('theme', 'light');
          setThemeIcon('light');
        }

        if (themeIconSvg && !prefersReducedMotion) {
          themeIconSvg.classList.add('rotate-animation');
          setTimeout(() => themeIconSvg.classList.remove('rotate-animation'), 500);
        }

        if (overlay) {
          overlay.classList.remove('expand');
        }
      }, duration);
    });
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const closeMenu = document.querySelector('.close-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  const filterTiles = document.querySelectorAll('.filter-tile');
  const postItems = document.querySelectorAll('.post-item');
  const sideMenuLinks = sideMenu ? sideMenu.querySelectorAll('a[href]') : [];
  const certificateCarousels = document.querySelectorAll('[data-certificates-carousel]');

  let lastFocusedElement = null;

  const getFocusableElements = () => {
    if (!sideMenu) return [];
    return Array.from(
      sideMenu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
  };

  const handleMenuKeydown = (event) => {
    if (!sideMenu || !sideMenu.classList.contains('open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeSideMenu();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const openSideMenu = () => {
    if (!sideMenu || sideMenu.classList.contains('open')) return;

    lastFocusedElement = document.activeElement;
    sideMenu.classList.add('open');
    sideMenu.setAttribute('aria-hidden', 'false');
    if (menuOverlay) menuOverlay.classList.add('open');
    document.body.classList.add('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', handleMenuKeydown);

    const focusableElements = getFocusableElements();
    const initialFocusTarget = closeMenu || focusableElements[0] || sideMenu;
    initialFocusTarget.focus();
  };

  const closeSideMenu = () => {
    if (!sideMenu || !sideMenu.classList.contains('open')) return;

    sideMenu.classList.remove('open');
    sideMenu.setAttribute('aria-hidden', 'true');
    if (menuOverlay) menuOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', handleMenuKeydown);

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    } else if (menuToggle) {
      menuToggle.focus();
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      if (sideMenu && sideMenu.classList.contains('open')) {
        closeSideMenu();
      } else {
        openSideMenu();
      }
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener('click', function (event) {
      event.stopPropagation();
      closeSideMenu();
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', function () {
      closeSideMenu();
    });
  }

  sideMenuLinks.forEach((link) => {
    link.addEventListener('click', function () {
      closeSideMenu();
    });
  });

  document.addEventListener('click', function (event) {
    if (!sideMenu || !menuToggle) return;
    if (sideMenu.classList.contains('open') && !sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeSideMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 769 && sideMenu && sideMenu.classList.contains('open')) {
      closeSideMenu();
    }
  });

  certificateCarousels.forEach((carousel) => {
    const track = carousel.querySelector('[data-certificates-track]');
    const prevButton = carousel.querySelector('[data-certificates-prev]');
    const nextButton = carousel.querySelector('[data-certificates-next]');
    const slides = Array.from(track ? track.querySelectorAll('[data-certificate-slide]') : []);

    if (!track || !prevButton || !nextButton) return;

    const hasMultipleSlides = slides.length > 1;
    const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
    const autoplayDelay = 5000;
    let autoplayTimer = null;

    const getClosestSlideIndex = () => {
      if (!slides.length) return 0;

      const currentLeft = track.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Infinity;

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetLeft - currentLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const scrollToSlide = (index, behavior = scrollBehavior) => {
      if (!slides.length) return;
      const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
      track.scrollTo({
        left: slides[safeIndex].offsetLeft,
        behavior
      });
    };

    const updateButtons = () => {
      if (!hasMultipleSlides) {
        prevButton.disabled = true;
        nextButton.disabled = true;
        return;
      }

      const currentIndex = getClosestSlideIndex();
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === slides.length - 1;
    };

    const moveTrack = (direction, loop) => {
      if (!slides.length) return;

      const currentIndex = getClosestSlideIndex();
      let targetIndex = currentIndex + direction;

      if (loop) {
        if (targetIndex < 0) targetIndex = slides.length - 1;
        if (targetIndex >= slides.length) targetIndex = 0;

        const wrappedToStart = direction > 0 && currentIndex === slides.length - 1 && targetIndex === 0;
        const wrappedToEnd = direction < 0 && currentIndex === 0 && targetIndex === slides.length - 1;
        scrollToSlide(targetIndex, wrappedToStart || wrappedToEnd ? 'auto' : scrollBehavior);
        return;
      }

      targetIndex = Math.max(0, Math.min(targetIndex, slides.length - 1));
      scrollToSlide(targetIndex);
    };

    const stopAutoplay = () => {
      if (autoplayTimer !== null) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const startAutoplay = () => {
      if (!hasMultipleSlides || prefersReducedMotion) return;
      stopAutoplay();
      autoplayTimer = window.setInterval(() => {
        moveTrack(1, true);
      }, autoplayDelay);
    };

    prevButton.addEventListener('click', () => {
      stopAutoplay();
      moveTrack(-1, false);
      startAutoplay();
    });

    nextButton.addEventListener('click', () => {
      stopAutoplay();
      moveTrack(1, false);
      startAutoplay();
    });

    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stopAutoplay();
        moveTrack(-1, false);
        startAutoplay();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        stopAutoplay();
        moveTrack(1, false);
        startAutoplay();
      }
    });

    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    track.addEventListener('focusin', stopAutoplay);
    track.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (!track.contains(document.activeElement)) {
          startAutoplay();
        }
      }, 0);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
    startAutoplay();
  });

  filterTiles.forEach((tile) => {
    tile.addEventListener('click', function () {
      const isSelected = tile.classList.toggle('selected');
      tile.setAttribute('aria-pressed', String(isSelected));
      filterPosts();
    });
  });

  function filterPosts() {
    const selectedFilters = Array.from(filterTiles)
      .filter((tile) => tile.classList.contains('selected'))
      .map((tile) => tile.getAttribute('data-value'));

    postItems.forEach((item) => {
      const categories = (item.getAttribute('data-categories') || '').split(',').filter(Boolean);
      if (!selectedFilters.length) {
        item.style.display = '';
        return;
      }

      const match = selectedFilters.some((filter) => categories.includes(filter));
      item.style.display = match ? '' : 'none';
    });
  }
});
