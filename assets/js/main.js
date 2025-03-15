document.addEventListener('DOMContentLoaded', function () {
  // Gestione del tema
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const overlay = document.querySelector('.theme-overlay');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Imposta il tema in base alla preferenza salvata
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) themeToggle.checked = true;
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    if (themeIcon) themeIcon.textContent = '🌙';
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      // Calcola il fattore di scala: usa il raggio (10px) come divisore
      const scaleFactor = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 10;
      if (overlay) {
        overlay.style.setProperty('--overlay-scale', scaleFactor);
        overlay.classList.add('expand');
      }
      
      // Dopo 600ms (durata dell'animazione), applica il tema
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
        // Rimuove la classe per poter riutilizzare l'animazione al prossimo cambio
        if (overlay) {
          overlay.classList.remove('expand');
        }
      }, 600);
    });
  }

  // Gestione del menu e side menu (rimane invariato)
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const closeMenu = document.querySelector('.close-menu');
  const filterTiles = document.querySelectorAll('.filter-tile');
  const postItems = document.querySelectorAll('.post-item');

  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      sideMenu.classList.add('open');
    });
  }
  if (closeMenu) {
    closeMenu.addEventListener('click', function (e) {
      e.stopPropagation();
      sideMenu.classList.remove('open');
    });
  }
  document.addEventListener('click', function (e) {
    if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      sideMenu.classList.remove('open');
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 769 && sideMenu.classList.contains('open')) {
      sideMenu.classList.remove('open');
    }
  });
  filterTiles.forEach(tile => {
    tile.addEventListener('click', function() {
      tile.classList.toggle('selected');
      filterPosts();
    });
  });
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