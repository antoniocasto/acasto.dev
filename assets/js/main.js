document.addEventListener('DOMContentLoaded', function () {
  const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setViewportHeight();

  // Theme management
  const themeToggle = document.getElementById('theme-toggle');
  const themeIconSvg = document.querySelector('.theme-icon');
  const themeIconUse = document.querySelector('.theme-icon use');
  const overlay = document.querySelector('.theme-overlay');
  const currentTheme = localStorage.getItem('theme') || 'light';
  const iconSprite = themeIconUse ? themeIconUse.getAttribute('href').split('#')[0] : '';
  const rootElement = document.documentElement;

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

  // Set theme based on saved preference
  if (currentTheme === 'dark') {
    applyThemeClass(true);
    if (themeToggle) themeToggle.checked = true;
    setThemeIcon('dark');
  } else {
    applyThemeClass(false);
    setThemeIcon('light');
  }

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      // Calculate scale factor using the radius (10px) as divisor
      const scaleFactor = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 10;
      if (overlay) {
        overlay.style.setProperty('--overlay-scale', scaleFactor);
        overlay.classList.add('expand');
      }

      // Apply theme after 600ms (animation duration)
      setTimeout(() => {
        if (this.checked) {
          applyThemeClass(true);
          localStorage.setItem('theme', 'dark');
          setThemeIcon('dark');
          if (themeIconSvg) {
            themeIconSvg.classList.add('rotate-animation');
            setTimeout(() => themeIconSvg.classList.remove('rotate-animation'), 500);
          }
        } else {
          applyThemeClass(false);
          localStorage.setItem('theme', 'light');
          setThemeIcon('light');
          if (themeIconSvg) {
            themeIconSvg.classList.add('rotate-animation');
            setTimeout(() => themeIconSvg.classList.remove('rotate-animation'), 500);
          }
        }
        // Remove class to reuse animation on next change
        if (overlay) {
          overlay.classList.remove('expand');
        }
      }, 600);
    });
  }

  // Menu and side menu management
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const closeMenu = document.querySelector('.close-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  const filterTiles = document.querySelectorAll('.filter-tile');
  const postItems = document.querySelectorAll('.post-item');

  const openSideMenu = () => {
    if (!sideMenu) return;
    sideMenu.classList.add('open');
    sideMenu.setAttribute('aria-hidden', 'false');
    if (menuOverlay) menuOverlay.classList.add('open');
    document.body.classList.add('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  };

  const closeSideMenu = () => {
    if (!sideMenu) return;
    sideMenu.classList.remove('open');
    sideMenu.setAttribute('aria-hidden', 'true');
    if (menuOverlay) menuOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  };

  // Menu toggle event listener
  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      openSideMenu();
    });
  }

  // Close menu event listener
  if (closeMenu) {
    closeMenu.addEventListener('click', function (e) {
      e.stopPropagation();
      closeSideMenu();
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', function () {
      closeSideMenu();
    });
  }

  // Close side menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!sideMenu || !menuToggle) return;
    if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      closeSideMenu();
    }
  });

  // Close side menu on window resize if width >= 769px
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 769 && sideMenu && sideMenu.classList.contains('open')) {
      closeSideMenu();
    }
  });

  // Filter tiles event listener
  filterTiles.forEach(tile => {
    tile.addEventListener('click', function() {
      tile.classList.toggle('selected');
      filterPosts();
    });
  });

  // Filter posts based on selected filters
  function filterPosts() {
    const selectedFilters = Array.from(filterTiles)
      .filter(tile => tile.classList.contains('selected'))
      .map(tile => tile.getAttribute('data-value'));
    postItems.forEach(item => {
      const categories = item.getAttribute('data-categories').split(',');
      if (selectedFilters.length === 0) {
        item.style.display = '';
      } else {
        const match = selectedFilters.some(filter => categories.includes(filter));
        item.style.display = match ? '' : 'none';
      }
    });
  }
});
