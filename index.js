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
let searchQuery = `https://rickandmortyapi.com/api/character?page=`;

fetchCharacters(); //first fetch

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  const response = await fetch(searchQuery + page);
  console.log("response: ", response);
  const data = await response.json(); // json() ist eine Methode, die nur auf ein Response-Objekt ausgeführt werden kann.
  console.log("data: ", data); //        sie liest den Response aus und liefert aus dem Response-Body das fertige JS-Objekt
  maxPages = data.info.pages;
  console.log("maxPages: ", maxPages);

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
    fetchCharacters();
  }
});
nextButton.addEventListener("click", () => {
  if (page < maxPages) {
    page++;
    fetchCharacters();
  }
});
