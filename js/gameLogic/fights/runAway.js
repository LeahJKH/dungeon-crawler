import { currentEnemy } from "../game.js";
import { removeArena } from "../../smallLogic/removeArena.js";
import { resetHealth } from "../../smallLogic/resetHealth.js";
export function runAway() {
    removeArena();
    resetHealth(currentEnemy);
    currentEnemy = null;
    bossMusic.pause();
  }