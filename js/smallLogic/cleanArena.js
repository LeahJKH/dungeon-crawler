import { elements } from "../module.js";
export function cleanArena() {
    elements.enemyPlace.style.display = "flex";
    elements.act.style.display = "flex";
    elements.goForward.style.display = "none";
    elements.bossFight.style.display = "none";
    elements.goblinFight.style.display = "none";
    elements.enemyBar.style.display = "flex";
  }