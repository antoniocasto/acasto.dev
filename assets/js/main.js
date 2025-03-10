document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const closeMenu = document.querySelector('.close-menu');
  const filterTiles = document.querySelectorAll('.filter-tile');
  const postItems = document.querySelectorAll('.post-item');
  //const checkboxes = document.querySelectorAll('.category-checkbox');
  //const postItems = document.querySelectorAll('.post-item');

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
      // Se nessun filtro è selezionato, mostra tutti i post
      if (selectedFilters.length === 0) {
        item.style.display = '';
      } else {
        // Mostra il post se almeno una categoria selezionata è presente
        const match = selectedFilters.some(filter => categories.includes(filter));
        item.style.display = match ? '' : 'none';
      }
    });
  }
});