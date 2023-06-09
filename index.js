import createButton from "./components/nav-button/nav-button.js";
import createPagination from "./components/nav-pagination/nav-pagination.js";
import createCharacterCard from "./components/card/card.js";
import createSearchBar from "./components/search-bar/search-bar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
//const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
//const prevButton = document.querySelector('[data-js="button-prev"]');
//const nextButton = document.querySelector('[data-js="button-next"]');
//const pagination = document.querySelector('[data-js="pagination"]');

const prevButton = createButton("PREVIOUS", () => {
  if (page > 1) {
    page--;
    fetchCharacters(page, searchQuery);
  }
});
const nextButton = createButton("NEXT", () => {
  if (page < maxPages) {
    page++;
    fetchCharacters(page, searchQuery);
  }
});
const pagination = createPagination();
navigation.append(prevButton, pagination, nextButton);

const searchBar = createSearchBar(handleSubmit);
searchBarContainer.append(searchBar);

// States
let maxPages = 1; // need to make it let
let page = 1;
let searchQuery = "";
const url = `https://rickandmortyapi.com/api/character`;

fetchCharacters(page, searchQuery); //first fetch

async function fetchCharacters(page, searchString) {//  Die Methode selbst soll sich um die Implementierung kümmern. Darum
  cardContainer.innerHTML = "";//                       wird der String in der fetch-Funktion gebaut statt in den Aufrufen!
  const response = await fetch(`${url}?page=${page}&name=${searchString}`);
  console.log("response: ", response);
  const data = await response.json(); // json() ist eine Methode, die nur auf ein Response-Objekt ausgeführt werden kann.
  console.log("data: ", data); //        sie liest den Response aus und liefert aus dem Response-Body das fertige JS-Objekt
  maxPages = data.info.pages;

  data.results.map((result) => {
    const newCard = createCharacterCard(
      result.image,
      result.name,
      result.status,
      result.type,
      result.episode.length
    );
    cardContainer.append(newCard);
  });

  pagination.textContent = `${page} / ${maxPages}`;
}

// prevButton.addEventListener("click", () => {
//   if (page > 1) {
//     page--;
//     fetchCharacters(url + "?page=" + page + "&name=" + searchQuery);
//   }
// });
// nextButton.addEventListener("click", () => {
//   if (page < maxPages) {
//     page++;
//     fetchCharacters(url + "?page=" + page + "&name=" + searchQuery);
//   }
// });
// searchBar.addEventListener("submit", (event) => {
//   event.preventDefault();
//   searchQuery = event.target.elements.query.value;
//   page = 1;
//   fetchCharacters(url + "?page=" + page + "&name=" + searchQuery);
// });
function handleSubmit(event) {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  fetchCharacters(page, searchQuery);
}
