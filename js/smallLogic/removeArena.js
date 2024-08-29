import { elements } from "../module.js";
export function removeArena() {
    elements.enemyPlace.style.display = "none";
    elements.act.style.display = "none";
    elements.goForward.style.display = "flex";
    elements.bossFight.style.display = "flex";
    elements.goblinFight.style.display = "flex";
    elements.enemyBar.style.display = "none";
  }