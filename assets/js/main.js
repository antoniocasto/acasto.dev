document.addEventListener('click', function(e) {
  const dropdown = document.querySelector('.language-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.removeAttribute('open');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.querySelector('.side-menu');
  const closeMenu = document.querySelector('.close-menu');

  // Apri il side menu
  menuToggle.addEventListener('click', function() {
    sideMenu.classList.add('open');
  });

  // Chiudi il side menu
  closeMenu.addEventListener('click', function() {
    sideMenu.classList.remove('open');
  });

  // Chiudi il side menu cliccando fuori
  document.addEventListener('click', function(e) {
    if (sideMenu.classList.contains('open') &&
        !sideMenu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      sideMenu.classList.remove('open');
    }
  });

  // Se si ridimensiona lo schermo oltre 768px e il side menu è aperto, chiudilo
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && sideMenu.classList.contains('open')) {
      sideMenu.classList.remove('open');
    }
  });
});