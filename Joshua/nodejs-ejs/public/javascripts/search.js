const searchInput = document.getElementById('searchInput').value,
  search = document.getElementById('search');


search.addEventListener('click', (e) => {

  console.log(searchInput);

  e.preventDefault();
});