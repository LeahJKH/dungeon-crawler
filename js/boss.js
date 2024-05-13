import { elements, enemies, player } from "./module.js";

document.addEventListener("DOMContentLoaded", function () {
  function initializeGame() {
    redoInv();
    player.name = sessionStorage.getItem("userName");
    player.gender = sessionStorage.getItem("userGender");
    elements.statInv.innerHTML += `<p>Name: ${player.name}</p>`;
    elements.statInv.innerHTML += `<p>gender: ${player.gender}</p>`;
    updateUI();
  }
  
  const emilNxtBtn = document.getElementById("emil-next");
  const emilDialogBox = document.querySelector("#emil-dialogbox");
  const emilDialog = document.querySelector("#emil-dialog");
  const bossMusic = new Audio("./sound/Emil_Bossmusic.wav");
  let index = 0;
  let emilDialogArr = [ `din skrøpelige sak tror du kan slå meg? pathetic`, `du burde gå tilbake en modul`, `alt du har gjort hadde jeg gjort anderledes`, `du har ikke bare en skill issue du er en skill issue`, `skal du liksom slå meg?`, `du kan ikke engang CSS`, `jeg skal faile deg på alle portfolione du lager`, `ikke som om di var god fra starten av`, `*evil emil latter*`, `go ahead viss meg hva du kan`, `kansje du ikke blir kicket`]
  emilDialog.textContent = emilDialogArr[0]

  emilNxtBtn.addEventListener("click", function () {
    index++;
    emilDialog.textContent = emilDialogArr[index]
    if (index >= emilDialogArr.length) {
      emilDialogBox.style.display = "none";
      bossMusic.play();
    }
  });

  let currentEnemy = enemies.bossEmil;
  function redoInv() {
    elements.playerDmg = document.querySelector("#player-damage");
    elements.pHel = document.querySelector("#player-health");
    elements.pHeal = document.querySelector("#player-healing");

    elements.playerDmg.textContent = `Damage: ${player.damage}`;
    elements.pHel.textContent = `Health: ${player.maxHealth}`;
    elements.pHeal.textContent = `Healing: ${player.healing}`;
  }

  
  // Character and enemy data


  let levelUp = player.level * 10;

  // Function to reset player and enemy health
  function resetHealth(entity) {
    entity.health = entity.maxHealth;
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
  function startFight() {
    elements.enemyPlace.src = currentEnemy.img;
    elements.enemyBar.max = currentEnemy.maxHealth;
    elements.enemyBar.value = currentEnemy.health;
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
  startFight(enemies.bossEmil);

  function runAway() {
    location.href = "./game.html";
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
    resetHealth(enemy);
    currentEnemy = null;
    checkLevel();
    location.href = "./game.html";
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
  initializeGame()
});
