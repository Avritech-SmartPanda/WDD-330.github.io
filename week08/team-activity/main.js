import CharactersList from './api.js';
//on load grab the array and insert it into the page
const list = new CharactersList('list');
window.addEventListener('load', () => {
  list.fetchData();
});

