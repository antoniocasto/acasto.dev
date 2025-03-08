document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.removeAttribute('open');
    }
  });