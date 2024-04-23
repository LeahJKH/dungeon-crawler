import { elements, player, enemies } from "./module.js";






  function redoInv() {
    elements.playerDmg = document.querySelector("#player-damage");
    elements.pHel = document.querySelector("#player-health");
    elements.pHeal = document.querySelector("#player-healing");

    elements.playerDmg.textContent = `Damage: ${player.damage}`;
    elements.pHel.textContent = `Health: ${player.maxHealth}`;
    elements.pHeal.textContent = `Healing: ${player.healing}`;
  }

  const bossMusic = new Audio("./sound/Emil_Bossmusic.wav");
  // Character and enemy data
 

  let currentEnemy = null;
  let levelUp = player.level * 10;

  // Function to reset player and enemy health
  function resetHealth(entity) {
    entity.health = entity.maxHealth;
  }

  initializeGame();

  function initializeGame() {
    redoInv();
    player.name = sessionStorage.getItem("userName");
    player.gender = sessionStorage.getItem("userGender");
    elements.statInv.innerHTML += `<p>Name: ${player.name}</p>`;
    elements.statInv.innerHTML += `<p>gender: ${player.gender}</p>`;
    player.xp = 0;
    player.level = 1;
    player.damage = 10;
    player.health = 100;
    player.maxHealth = 100;
    resetHealth(player);
    updateUI();
    currentEnemy = null;
  }

  function cleanArena() {
    elements.enemyPlace.style.display = "flex";
    elements.act.style.display = "flex";
    elements.goForward.style.display = "none";
    elements.bossFight.style.display = "none";
    elements.goblinFight.style.display = "none";
    elements.enemyBar.style.display = "flex";
  }
  function removeArena() {
    elements.enemyPlace.style.display = "none";
    elements.act.style.display = "none";
    elements.goForward.style.display = "flex";
    elements.bossFight.style.display = "flex";
    elements.goblinFight.style.display = "flex";
    elements.enemyBar.style.display = "none";
  }

  // Update the UI with player and enemy data
  function updateUI() {
    elements.takeDamage.value = player.health;
    elements.barHealth.textContent = `${player.health}/${player.maxHealth}`;
    elements.statLevel.textContent = `LVL: ${player.level}`;
    elements.experience.textContent = `XP ${player.xp}/${levelUp}`;
    elements.goldPage.textContent = `Gold: ${player.gold}`;
    redoInv();
  }

  // Handle fight start
  function startFight(enemy) {
    currentEnemy = enemy;
    elements.enemyPlace.src = enemy.img;
    elements.enemyBar.max = enemy.maxHealth;
    elements.enemyBar.value = enemy.health;
  }

  // Handle player's attack
  function playerAttack() {
    if (currentEnemy) {
      currentEnemy.health -= player.damage;
      elements.enemyBar.value = currentEnemy.health;

      if (currentEnemy.health <= 0) {
        handleEnemyDefeat(currentEnemy);
      } else {
        handleEnemyAttack(currentEnemy);
      }
    }
  }
  function getEnemy() {
    let enemyNum = Math.floor(Math.random() * 2 + 1);
    checkWho(enemyNum);
  }
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
  function runAway() {
    removeArena();
    resetHealth(currentEnemy);
    currentEnemy = null;
    bossMusic.pause();
  }
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

  // Check player's level and update stats
  function checkLevel() {
    while (levelUp <= player.xp) {
      player.level += 1;
      levelUp = player.level * 10;
      player.damage += 5;
      player.healing += 5;
      player.maxHealth += 10;
    }
    updateUI();
  }

  // Event listeners

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

