export default function createPagination(page, maxPages) {
  console.log(page, maxPages);
  const pagination = document.createElement("span");
  pagination.classList.add("navigation__pagination");
  pagination.textContent = "1 / 1";
  return pagination;
}
