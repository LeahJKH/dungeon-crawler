document.addEventListener("DOMContentLoaded", function () {
  // Define HTML elements
  const elements = {
    logInn: document.getElementById("logg-inn"),
    gameify: document.getElementById("game"),
    startGame: document.getElementById("start-game"),
    inventory: document.querySelector("#menu-card"),
    attack: document.querySelector("#attack"),
    escape: document.querySelector("#run"),
    healed: document.querySelector("#heal"),
    goForward: document.querySelector("#forth"),
    act: document.querySelector("#actions"),
    invBtn: document.querySelector("#inv-btn"),
    closeBtn: document.querySelector("#close-btn"),
    statLevel: document.querySelector("#statlvl"),
    statInv: document.querySelector("#stats-el"),
    bossFight: document.querySelector("#boss-fight"),
    goblinFight: document.querySelector("#boss-fight2"),
    nameEr: document.querySelector("#nameify"),
    gender: document.querySelector("#gender-el"),
    goldPage: document.querySelector("#gold-el"),
    experience: document.querySelector("#xp-el"),
    takeDamage: document.querySelector("#health-bar"),
    enemyBar: document.querySelector("#enemy-bar"),
    enemyPlace: document.querySelector("#enemy-img"),
    instantKill: document.querySelector("#instant-kill"),
    godMode: document.querySelector("#godmode"),
  };
  const bossMusic = new Audio("./sound/Emil_Bossmusic.wav");
  // Character and enemy data
  const player = {
    name: "",
    gender: "",
    damage: 10,
    health: 100,
    maxHealth: 100,
    healing: 5,
    gold: 0,
    xp: 0,
    level: 1,
  };

  const enemies = {
    frankStats: {
      name: "Frank",
      damage: 5,
      health: 50,
      maxHealth: 50,
      gold: 5,
      xp: 5,
      img: "./images/Frank.png",
    },
    bossEmil: {
      name: "Emil",
      health: 1000,
      maxHealth: 1000,
      damage: 50,
      gold: 100,
      xp: 100,
      img: "./images/EmilBossTaunt.png",
    },
    randO: {
      name: "Joe",
      damage: 10,
      health: 100,
      maxHealth: 100,
      gold: 10,
      xp: 10,
      img: "./images/Joe.webp",
    },
    gobelin: {
      name: "Goblin",
      damage: 100,
      health: 250,
      maxHealth: 250,
      gold: 50,
      xp: 20,
      img: "./images/japaneseGoblin.png",
    },
  };

  let currentEnemy = null;
  let levelUp = player.level * 10;

  // Function to reset player and enemy health
  function resetHealth(entity) {
    entity.health = entity.maxHealth;
  }

  // Initialize the game
  // Initialize the game
  function initializeGame() {
    if ((elements.logInn.style.display = "flex")) {
      elements.logInn.style.display = "none";
    }
    if ((elements.gameify.style.display = "none")) {
      elements.gameify.style.display = "flex";
    }
    player.name = "";
    player.gender = "";
    if (elements.statInv) {
      elements.statInv.innerHTML = "";
    }
    player.xp = 0;
    player.level = 1;
    player.damage = 10;
    player.health = 100;
    player.maxHealth = 100;
    resetHealth(player);
    updateUI();
    if ((elements.act.style.display = "flex")) {
      elements.act.style.display = "none";
    }
    if ((elements.enemyPlace.style.display = "flex")) {
      elements.enemyPlace.style.display = "none";
    }
    currentEnemy = null;
  }
  function cleanArena() {
    if ((elements.enemyPlace.style.display = "none")) {
      elements.enemyPlace.style.display = "flex";
      elements.act.style.display = "flex";
      elements.goForward.style.display = "none";
    }
  }

  // Update the UI with player and enemy data
  function updateUI() {
    elements.takeDamage.value = player.health;
    elements.statLevel.textContent = `LVL: ${player.level}`;
    elements.experience.textContent = `XP ${player.xp}/${levelUp}`;
    elements.statInv.innerHTML = `<p>Name: ${player.name}</p>`;
    elements.statInv.innerHTML += `<p>Gender: ${player.gender}</p>`;
    elements.goldPage.textContent = `Gold: ${player.gold}`;
  }

  // Handle fight start
  function startFight(enemy) {
    currentEnemy = enemy;
    elements.act.style.display = "flex";
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
      frank = true;
      elements.enemyPlace.style.left = "35%";
    } else if (num === 2) {
      Joe = true;
      startFight(enemies.randO);
      elements.enemyPlace.style.left = "35%";
      elements.enemyPlace.style.width = "400px";
    } else if (num === 3) {
      emil = true;
      startFight(enemies.bossEmil);
      elements.enemyPlace.style.left = "40%";
      bossMusic.play();
    } else if (num === 4) {
      japaneseGoblin = true;
      startFight(enemies.gobelin);
      elements.enemyPlace.style.left = "40%";
      bossMusic.play();
    } else {
    }
    elements.enemyBar.style.display = "flex";
  }
  // Handle enemy's attack
  function handleEnemyAttack(enemy) {
    if (player.health > 0) {
      player.health -= enemy.damage;
      elements.takeDamage.value = player.health;
      updateUI();

      if (player.health <= 0) {
        Restarter();
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
    elements.enemyPlace.style.display = "none";
    elements.goForward.style.display = "flex";
    elements.bossFight.style.display = "flex";
    elements.enemyBar.style.display = "none";
    elements.act.style.display = "none";
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
  elements.startGame.addEventListener("click", initializeGame);
  elements.goForward.addEventListener("click", () => {
    if (!currentEnemy) {
      getEnemy();
      cleanArena();
    }
  });
  elements.bossFight.addEventListener("click", () => {
    if (!currentEnemy) {
      checkWho(3);

      cleanArena();
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
});
