(function () {
  var mainContent = document.querySelector('#wrapper'),
    icon = document.querySelector('#menu-toggle');

  icon.addEventListener('click', function (e) {
    mainContent.classList.toggle('toggled');
    e.preventDefault();
  })
})();