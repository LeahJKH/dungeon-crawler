import elements from "../module.js"
export let currentEnemy = null

elements.escape.addEventListener("click", function () {
    runAway(currentEnemy);
  });
  elements.goForward.addEventListener("click", () => {
    if (!currentEnemy) {
      getEnemy();
      cleanArena();
    }
  });
  elements.bossFight.addEventListener("click", () => {
    if (!currentEnemy) {
      location.href = "./boss.html";
    }
  });
  elements.goblinFight.addEventListener("click", () => {
    if (!currentEnemy) {
      startFight(enemies.gobelin);
      checkWho(4);
      cleanArena();
    }
  });
  elements.attack.addEventListener("click", playerAttack);
  elements.invBtn.addEventListener("click", () => {
    elements.inventory.style.display = "flex";
    elements.invBtn.style.display = "none";
  });
  elements.closeBtn.addEventListener("click", () => {
    elements.inventory.style.display = "none";
    elements.invBtn.style.display = "flex";
  });
  elements.healed.addEventListener("click", () => {
    player.health += player.healing;
    player.health -= currentEnemy.damage;
    if (player.health <= 0) {
      location.href = "./gameover.html";
    }
    updateUI();
  });
  elements.godMode.addEventListener("click", () => {
    player.health = 10000000000000;
    player.maxHealth = 10000000000000;
    updateUI();
  });
  elements.instantKill.addEventListener("click", () => {
    player.damage = 10000000000000;
    updateUI();
  });