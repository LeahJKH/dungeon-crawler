import { elements } from "./module.js";

elements.startGame.addEventListener("click", initializeGame);

function initializeGame() {
  location.href = "./game.html";
  let name = sessionStorage.setItem("userName", elements.nameEr.value);
  let gender = sessionStorage.setItem("userGender", elements.gender.value);
}
