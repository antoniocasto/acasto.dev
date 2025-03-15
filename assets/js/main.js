document.addEventListener('DOMContentLoaded', function () {
  // Theme handling
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  // Other variables
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const closeMenu = document.querySelector('.close-menu');
  const filterTiles = document.querySelectorAll('.filter-tile');
  const postItems = document.querySelectorAll('.post-item');

  // Set theme based on user preference
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) themeToggle.checked = true;
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Open side menu when burger button is clicked
  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    sideMenu.classList.add('open');
  });

  // Close side menu when close button is clicked
  closeMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    sideMenu.classList.remove('open');
  });

  // Close side menu when clicking outside
  document.addEventListener('click', function (e) {
    if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      sideMenu.classList.remove('open');
    }
  });

  // Close side menu on window resize if above mobile breakpoint
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 769 && sideMenu.classList.contains('open')) {
      sideMenu.classList.remove('open');
    }
  });

  filterTiles.forEach(tile => {
    tile.addEventListener('click', function() {
      // Toggle dello stato selezionato
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