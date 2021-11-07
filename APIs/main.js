function getJSON(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showPeople(url = "https://swapi.dev/api/people") {
  getJSON(url)
  .then(peopleList => {
    //Building the list of 10 Star Wars people
    const div = document.querySelector("div.people");
    div.innerHTML = " ";
    peopleList.results.forEach(person => {
      let personCard = renderOnePerson(person);
      div.append(personCard);
    })
    
    //Finding the next and previous buttons
    const previousButton = document.querySelector("#previous"); 
    const nextButton = document.querySelector("#next");
    
    //If this is the first page and there are no previous pages, disable the previous button; otherwise add an event listener to it.
    if (peopleList.previous == null) {
      previousButton.disabled = true;
    } else {
      previousButton.disabled = false;
      previousButton.onclick = () => getPrevious();
    }
    
    //If this is the last page and there are no next pages, disable the next button; otherwise add an event listener to it.
    if (peopleList.next == null) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
      nextButton.onclick = () => getNext();
    }

    //Function for getting the previous page's results
    function getPrevious() {
      console.log(peopleList.previous);
      showPeople(peopleList.previous);
    }
    
    //Function for getting the next page's results
    function getNext() {
      console.log(peopleList.next);
      showPeople(peopleList.next);
    }

   //Function for rendering each Star Wars person in the HTML
   function renderOnePerson(person) {
     let newDiv = document.createElement("div");
     newDiv.classList.add("personCard");
     newDiv.innerHTML = 
     `<h2>${person.name}</h2>
      <p>Gender: ${person.gender}</p>
      <p>Height: ${person.height}</p>
      <p>Mass: ${person.mass}</p>
      <div class="hidden">
      <p>Eye Color: ${person.eye_color}</p>
      <p>Hair Color: ${person.hair_color}</p>
      <p>Skin Color: ${person.skin_color}</p>
      </div>`;
      newDiv.addEventListener("click", () => {
        const hiddenDiv = newDiv.querySelector("div");
        hiddenDiv.classList.toggle("hidden");
      });
     return newDiv;
   }

  })
}

function getPageUrls() {
  let pageDiv = document.querySelector("#pages");
  for(let i=1; i < 10; i++) {
    let link = document.createElement("a");
    link.addEventListener("click", () => showPeople("https://swapi.dev/api/people/?page=" + i));
    link.innerHTML = i;
    pageDiv.append(link);
  }

}

showPeople();
getPageUrls();