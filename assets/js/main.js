document.addEventListener('DOMContentLoaded', function () {
  // Theme management
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const overlay = document.querySelector('.theme-overlay');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Set theme based on saved preference
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) themeToggle.checked = true;
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    if (themeIcon) themeIcon.textContent = '🌙';
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
          document.body.classList.add('dark-theme');
          localStorage.setItem('theme', 'dark');
          if (themeIcon) {
            themeIcon.textContent = '☀️';
            themeIcon.classList.add('rotate-animation');
            setTimeout(() => themeIcon.classList.remove('rotate-animation'), 500);
          }
        } else {
          document.body.classList.remove('dark-theme');
          localStorage.setItem('theme', 'light');
          if (themeIcon) {
            themeIcon.textContent = '🌙';
            themeIcon.classList.add('rotate-animation');
            setTimeout(() => themeIcon.classList.remove('rotate-animation'), 500);
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
  const filterTiles = document.querySelectorAll('.filter-tile');
  const postItems = document.querySelectorAll('.post-item');

  // Menu toggle event listener
  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      sideMenu.classList.add('open');
    });
  }

  // Close menu event listener
  if (closeMenu) {
    closeMenu.addEventListener('click', function (e) {
      e.stopPropagation();
      sideMenu.classList.remove('open');
    });
  }

  // Close side menu when clicking outside
  document.addEventListener('click', function (e) {
    if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      sideMenu.classList.remove('open');
    }
  });

  // Close side menu on window resize if width >= 769px
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 769 && sideMenu.classList.contains('open')) {
      sideMenu.classList.remove('open');
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