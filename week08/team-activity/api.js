const baseUrl = "https://swapi.dev/api/";
let list;
let page = 1;
let categories = ['planets', 'people', 'starships', 'vehicles', 'species', 'films'];
let films = [];

export default class CharactersList {
  constructor(elementId) {
    this.category = categories[1];
    this.key = elementId;
    this.parentElement = document.getElementById(elementId);
    this.url = `${baseUrl}${this.category}/?page=`;
    this.backButton = this.buildBackButton();
    
  }


  getData(data) {
    // return  
    localStorage.setItem(this.key, JSON.stringify(data));
    list = [];
    data.results.forEach(el => {
      list.push(NewItem(el));
    });
    this.showList();
    
  }





  fetchData() {
    fetch(`${this.url}${page}`)
      .then(res => res.json())
      .then(data => {
        this.getData(data)
      });
  }
  showList() {
    const data = JSON.parse(localStorage.getItem(this.key));
    // clear our parent element.
    this.parentElement.innerHTML = '';
    // fill the parent element with the new list.
    list.forEach(el => {
      this.parentElement.appendChild(renderOneItem(el));
    });
   
    this.addListListeners();
  }


  showOneItem(itemName) {
    const item = list.find(item => item.name === itemName);
    this.parentElement.innerHTML = '';
    this.parentElement.appendChild(renderOneFullItem(item));
  }

  addListListeners() {
    const newlist = Array.from(this.parentElement.children);
    newlist.forEach(el => {
      el.addEventListener('click', $event => {
        this.showOneItem($event.currentTarget.innerText);
      })
    })
    let paginator = document.getElementById("pagination");
    const pages = Array.from(paginator.children);
    pages.forEach(el => {
      el.addEventListener('click', () => {
        page = el.id
        this.fetchData();
      });
    })
  }


  buildBackButton() {
    const backButton = document.createElement("button");
    backButton.textContent = "Return to List";
    backButton.addEventListener('click', () => { this.showList() });
    this.parentElement.before(backButton);
    return backButton;
  }


 

}


function buildPagination() {
  let paginator = document.getElementById("pagination");
  for (let i = 1; i < 10; i++) {
    page = i;
    
    let link = document.createElement("a");
    link.setAttribute('id',i)
    link.innerHTML = page;
    paginator.appendChild(link);
  }

};
buildPagination()

function renderOneItem(person) {
  const li = document.createElement('li');
  li.innerHTML = `<div class="personCard">${person.name} </div>`;
  return li;
}

function renderOneFullItem(item) {
  for (let i = 0; i < item.films.length; i++) {
    getFilms(item.films[i])
  }
  const li = document.createElement('li');
  li.innerHTML = `
<h3>${item.name}</h3>
<div>
    <p>Height: ${item.height}</p>
    <p>Hair Color: ${item.hair_color}</p>
    <p>Eye Color: ${item.eye_color}</p>
    <p>Eye Color: ${item.skin_color}</p>
    <p>Gender: ${item.gender}</p>
    <p>Birth year: ${item.birth_year}</p>
    <p>Gender: ${item.gender}</p>
    <p>Height: ${item.height}</p>
    <p>Mass: ${item.mass}</p>
    <h3>Films</h3>
    <div id="films"> </div>
    <h3>Species</h3>
    <div id="species"></div>
    <h3>Star ships</h3>
    <div id="starships"></div>
    <h3>Vehicles</h3>
    <div id="vehicles"></div>
    <h3>Locations</h3>
    <div id="planets"></div>
</div>`;

  return li;
}

function getFilms(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('movies', JSON.stringify(data));
      const movie = JSON.parse(localStorage.getItem('movies'));
      films.push(Film(movie));
      const parent = document.getElementById('films');
      parent.appendChild(renderMovie(movie));
    })
    .catch(error => console.log('some error happen', error));
}





function renderMovie(item) {
  const li = document.createElement('li');
  li.innerHTML = `
<div class="filmCard"> 
<h4>${item.title}</h4>
<p> Episode ${item.episode_id}</p>
<!--<p> Director: ${item.director}</p>
<p> Producer: ${item.producer}</p>-->
<p> Release Date: ${item.release_date}</p>
<!-- <p> Edited: ${item.edited}</p>
 <p> Created: ${item.created}</p>-->
<p>  ${item.opening_crawl}</p>
</div> 
`
  return li;
}











function NewItem(item) {
  const newItem = {
    name: item.name,
    height: item.height,
    mass: item.mass,
    hair_color: item.hair_color,
    skin_color: item.skin_color,
    eye_color: item.eye_color,
    gender: item.gender,
    species: item.species,
    birth_year: item.birth_year,
    films: item.films,
    homeworld: item.homeworld,
    created: item.created,
    edited: item.edited,
    starships: item.starships,
    vehicles: item.vehicles
  }
  return newItem;
}


function Film(film) {
  const newFilm = {
    created: film.created,
    director: film.director,
    edited: film.edited,
    episode_id: film.episode_id,
    opening_crawl: film.opening_crawl,
    producer: film.producer,
    release_date: film.release_date,
    title: film.title
  }
  return newFilm;
}










