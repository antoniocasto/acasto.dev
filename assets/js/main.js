document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const closeMenu = document.querySelector('.close-menu');
  const checkboxes = document.querySelectorAll('.category-checkbox');
  const postItems = document.querySelectorAll('.post-item');

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

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      filterPosts();
    });
  });

  function filterPosts() {
    const checkedValues = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    postItems.forEach(function (item) {
      const categories = item.getAttribute('data-categories').split(',');
      if (checkedValues.length === 0) {
        item.style.display = '';
      } else {
        const match = checkedValues.some(val => categories.includes(val));
        item.style.display = match ? '' : 'none';
      }
    });
  }
});