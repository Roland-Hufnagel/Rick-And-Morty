export default function createButton(text, onClick) {
  const button = document.createElement("button");
  button.classList.add("button");
  //button.setAttribute("data-js", dataJS);
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}
