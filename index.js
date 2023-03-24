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
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  const response = await fetch("https://rickandmortyapi.com/api/character");
  console.log("response: ", response);
  const data = await response.json(); // json() ist eine Methode, die nur auf ein Response-Objekt ausgeführt werden kann.
  console.log("data: ", data); //        sie liest den Response aus und liefert aus dem Response-Body das fertige JS-Objekt
  return data;
}
const fetchedData = await fetchCharacters();
console.log("fetchedData.results: ", fetchedData.results);
fetchedData.results.map((result) => {
  const newCard = createCharacterCard(
    result.image,
    result.name,
    result.status,
    result.type,
    result.episode.length
  );
  cardContainer.append(newCard);
});
