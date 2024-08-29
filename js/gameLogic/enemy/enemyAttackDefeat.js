import { player } from "../../module.js";
import { elements } from "../../module.js";
// Handle enemy's attack
  function handleEnemyAttack(enemy) {
    if (player.health > 0) {
      player.health -= enemy.damage;
      elements.takeDamage.value = player.health;
      updateUI();

      if (player.health <= 0) {
        location.href = "./gameover.html";
      }
    }
  }

  // Handle enemy defeat
  function handleEnemyDefeat(enemy) {
    player.gold += enemy.gold;
    player.xp += enemy.xp;
    levelUp = player.level * 10;
    updateUI();
    resetHealth(enemy);
    removeArena();
    bossMusic.pause();
    currentEnemy = null;
    checkLevel();
  }