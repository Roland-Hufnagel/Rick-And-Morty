import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPages = 1; // need to make it let
let page = 1;
let searchQuery = "";
const url = `https://rickandmortyapi.com/api/character`;

fetchCharacters(url); //first fetch

async function fetchCharacters(url) {
  cardContainer.innerHTML = "";
  const response = await fetch(url);
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

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters(url + "?page=" + page + "&name=" + searchQuery);
  }
});
nextButton.addEventListener("click", () => {
  if (page < maxPages) {
    page++;
    fetchCharacters(url + "?page=" + page + "&name=" + searchQuery);
  }
});
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  fetchCharacters(url + "?page=" + page + "&name=" + searchQuery);
});
