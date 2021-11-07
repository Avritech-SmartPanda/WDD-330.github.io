const baseUrl = "https://swapi.dev/api/";
let films = [];
let starships = [];
let vehicles = [];
let planets = [];

export default class CharactersList {
  constructor(elementId) {
    this.category = 'people';
    this.key = elementId;
    this.page = 1;
    this.list = [];
    this.parentElement = document.getElementById(elementId);
    this.url = `${baseUrl}${this.category}/?page=`;
    this.backButton = this.buildBackButton();
    this.prevButton = document.getElementById("prev");
    this.nextButton = document.getElementById("next");
  }
  fetchData() {
    fetch(`${this.url}${this.page}`)
      .then(res => res.json())
      .then(data => {
        this.getData(data)
      });
  }

  getData(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
    data.results.forEach(el => {
      this.list.push(el);
    });
    this.routeToPage(data);
    console.log(data);
    this.showList();
  }

  showList() {
    const data = JSON.parse(localStorage.getItem(this.key));
    // clear our parent element.
    this.parentElement.innerHTML = '';
    // fill the parent element with the new list.
    this.list.forEach(el => {
      this.parentElement.appendChild(renderOneItem(el));
    });
    this.backButton.classList.add('hide');
    this.addListListeners();

  }

  showOneItem(itemName) {
    const item = this.list.find(item => item.name === itemName);
    this.parentElement.innerHTML = '';
    this.parentElement.appendChild(renderOneFullItem(item));
    this.backButton.classList.remove('hide');
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
        this.page = el.id;
        document.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
        document.getElementById(el.id).classList.add('active');
        this.fetchData();
      });
    })
  }

  routeToPage(data) {
    //Do not display next button if this is the first page; otherwise add an event listener to it.
    if (data.previous == null) {
      this.prevButton.classList.add('hide')
    } else {
      this.prevButton.classList.remove('hide')
      this.prevButton.onclick = () => this.getPrevious();
    }

    //Do not display next button if this is the last page; otherwise add an event listener to it.
    if (data.next == null) {
      this.nextButton.classList.add('hide');
    } else {
      this.nextButton.classList.remove('hide');
      this.nextButton.onclick = () => this.getNext();
      
    }
  }

  buildBackButton() {
    const backButton = document.createElement("button");
    backButton.textContent = "Return to List";
    backButton.setAttribute('class', 'backBtn');
    backButton.addEventListener('click', () => { this.showList() });
    this.parentElement.before(backButton);
    return backButton;
  }

  // Getting the previous page's results
  getPrevious() {
    this.page = this.page - 1;
    this.fetchData();
  }

  // Getting the next page's results
  getNext() {
    this.page = this.page + 1;
    this.fetchData();
  }
}


function buildPagination() {
  let paginator = document.getElementById("pagination");
  for (let i = 1; i < 10; i++) {
    let link = document.createElement("a");
    link.setAttribute('id', i)
    link.innerHTML = i;
    paginator.appendChild(link);
  }
};




function renderOneItem(person) {
  const li = document.createElement('li');
  li.innerHTML = `<div class="personCard">${person.name} </div>`;
  return li;
}

function renderOneFullItem(item) {
  for (let i = 0; i < item.films.length; i++) {
    getFilms(item.films[i])
  }
  for (let i = 0; i < item.starships.length; i++) {
    getShips(item.starships[i])
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
      films.push(movie);
      const parent = document.getElementById('films');
      parent.appendChild(renderMovie(movie));
    })
}
function getShips(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('starships', JSON.stringify(data));
      const ship = JSON.parse(localStorage.getItem('starships'));
      starships.push(ship);
      const parent = document.getElementById('starships');
      parent.appendChild(renderShip(ship));
    })
}





function renderMovie(item) {
  const li = document.createElement('li');
  li.innerHTML = `
<div class="card"> 
<h4>${item.title}</h4>
<p> Episode ${item.episode_id}</p>
<!--<p> Director: ${item.director}</p>
<p> Producer: ${item.producer}</p>-->
<p> Release Date: ${item.release_date}</p>
<p>  ${item.opening_crawl}</p>
</div> 
`
  return li;
}
function renderShip(ship) {
  const li = document.createElement('li');
  li.innerHTML = `
<div class="card"> 
<h4>${ship.name} - ${ship.starship_class}</h4>
<p> Model: ${ship.model}</p>
<p> MGLT: ${ship.MGLT}</p>
<p> Cargo Capacity: ${ship.cargo_capacity}</p>
<p> Consumables: ${ship.consumables}</p>
<p> Passengers: ${ship.passengers}</p>
</div> 
`
  return li;
}




















buildPagination();