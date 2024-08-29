import { elements } from "../../module.js";
import enemies from "../../info/monsters.js"
function checkWho(num) {
    if (num === 1) {
      startFight(enemies.frankStats);
      elements.enemyPlace.style.left = "35%";
    } else if (num === 2) {
      startFight(enemies.randO);
      elements.enemyPlace.style.left = "35%";
      elements.enemyPlace.style.width = "400px";
    } else if (num === 4) {
      startFight(enemies.gobelin);
      elements.enemyPlace.style.left = "40%";
      bossMusic.play();
    } else {
      console.log("error with enemy");
    }
  }