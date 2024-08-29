import { elements } from "../../module";
import { currentEnemy } from "../game";

export function startFight(enemy) {
    currentEnemy = enemy;
    elements.enemyPlace.src = enemy.img;
    elements.enemyBar.max = enemy.maxHealth;
    elements.enemyBar.value = enemy.health;
  }