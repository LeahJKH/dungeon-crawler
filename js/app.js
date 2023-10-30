import { elements } from "./module.js";

elements.startGame.addEventListener("click", initializeGame);

function initializeGame() {
  location.href = "./game.html";
  sessionStorage.setItem("userName", elements.nameEr.value);
  sessionStorage.setItem("userGender", elements.gender.value);
}
