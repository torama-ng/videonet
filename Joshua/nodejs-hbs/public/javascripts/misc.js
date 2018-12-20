(function () {
  var mainContent = document.querySelector('#wrapper'),
    pageContent = document.querySelector('#page-content-wrapper'),
    icon = document.querySelector('#menu-toggle');

  icon.addEventListener('click', function (e) {
    mainContent.classList.toggle('toggled');
    e.preventDefault();
  })

  // pageContent.addEventListener('click', (e) => {
  //   if (mainContent.classList.contains('toggled')) {
  //     mainContent.classList.toggle('toggled');
  //   }
  //   e.preventDefault();
  // })

})();