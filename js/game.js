//!! Page switchers
const logInn = document.getElementById("logg-inn");
const gameify = document.getElementById("game");
const startGame = document.getElementById("start-game");

//!! Menu elements
const inventory = document.querySelector("#menu-card");
const attack = document.querySelector("#attack");
const escape = document.querySelector("#run");
const healed = document.querySelector("#heal");
const goForward = document.querySelector("#forth");
const act = document.querySelector("#actions");
const invBtn = document.querySelector("#inv-btn");
const closeBtn = document.querySelector("#close-btn");
const statLevel = document.querySelector("#statlvl");
const statInv = document.querySelector("#stats-el");
const bossFight = document.querySelector("#boss-fight");
const goblinFight = document.querySelector("#boss-fight2");

//!! Character elements
const nameEr = document.querySelector("#nameify");
const gender = document.querySelector("#gender-el");
const goldPage = document.querySelector("#gold-el");
const experience = document.querySelector("#xp-el");
const takeDamage = document.querySelector("#health-bar");
const enemyBar = document.querySelector("#enemy-bar");
const enemyPlace = document.querySelector("#enemy-img");

const instantKill = document.querySelector("#instant-kill");
const godMode = document.querySelector("#godmode");

const bossMusic = new Audio("./sound/Emil_Bossmusic.wav");

function Restarter() {
  logInn.style.display = "flex";
  gameify.style.display = "none";
  player.name = "";
  player.gender = "";
  statInv.innerHTML = "";
  player.xp = 0;
  player.level = 1;
  player.damage = 10;
  player.health = 100;
  player.maxHealth = 100;
  healthResetEn();
  redoInv();
  act.style.display = "none";
  enemy.style.display = "none";
}

startGame.addEventListener("click", function () {
  logInn.style.display = "none";
  gameify.style.display = "flex";
  act.style.display = "none";
  enemy.style.display = "none";
  goForward.style.display = "flex";
  bossFight.style.display = "flex";
  enemyBar.style.display = "none";
  takeDamage.value = player.health;
  statLevel.textContent = `LVL: ${player.level}`;
  experience.textContent = `XP ${player.xp}/${levelUp}`;
  player.name = nameEr.value;
  player.gender = gender.value;
  statInv.innerHTML += `<p>Name: ${player.name}</p>`;
  statInv.innerHTML += `<p>gender: ${player.gender}</p>`;
  healthResetEn();
  fightEndedDisplay();
  redoInv();
});
function getEnemy() {
  let enemyNum = Math.floor(Math.random() * 2 + 1);
  checkWho(enemyNum);
}

goForward.addEventListener("click", function () {
  fightDisplay();
  getEnemy();
});
bossFight.addEventListener("click", function () {
  fightDisplay();
  checkWho(3);
});
goblinFight.addEventListener("click", function () {
  fightDisplay();
  checkWho(4);
});

function checkWho(num) {
  if (num === 1) {
    fightStart(enemies.frankStats);
    frank = true;
    enemyPlace.style.left = "35%";
  } else if (num === 2) {
    Joe = true;
    fightStart(enemies.randO);
    enemyPlace.style.left = "35%";
    enemyPlace.style.width = "400px";
  } else if (num === 3) {
    emil = true;
    fightStart(enemies.bossEmil);
    enemyPlace.style.left = "40%";
    bossMusic.play();
  } else if (num === 4) {
    japaneseGoblin = true;
    fightStart(enemies.gobelin);
    enemyPlace.style.left = "40%";
    bossMusic.play();
  } else {
    console("broke again");
  }
  enemyBar.style.display = "flex";
}

function fightDisplay() {
  enemy.style.display = "flex";
  goForward.style.display = "none";
  bossFight.style.display = "none";
  goblinFight.style.display = "none";
}
function fightEndedDisplay() {
  enemy.style.display = "none";
  goForward.style.display = "flex";
  bossFight.style.display = "flex";
  enemyBar.style.display = "none";
  act.style.display = "none";
  goblinFight.style.display = "flex";
  bossMusic.pause();
  emil = false;
  frank = false;
  Joe = false;
  japaneseGoblin = false;
}

healed.addEventListener("click", function () {
  player.health += player.healing;
  takeDamage.value = player.health;
  attacked(enemy.damage);
});

// !! characters
let player = {
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
let enemies = {
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
    name: "goblin",
    damage: 100,
    health: 250,
    maxHealth: 250,
    gold: 50,
    xp: 20,
    img: "./images/japaneseGoblin.png",
  },
};

let emil = false;
let frank = false;
let Joe = false;
let japaneseGoblin = false;
let levelUp = player.level * 10;
redoInv();
function redoInv() {
  playerDmg = document.querySelector("#player-damage");
  pHel = document.querySelector("#player-health");
  pHeal = document.querySelector("#player-healing");

  playerDmg.textContent = `Damage: ${player.damage}`;
  pHel.textContent = `Health: ${player.maxHealth}`;
  pHeal.textContent = `Healing: ${player.healing}`;
}
// !! characters

function currhealth() {
  takeDamage.textContent = player.health;
  takeDamage.value = player.health;
  if (player.health <= 0) {
    console.log("game over");
  } else {
    return;
  }
}

invBtn.addEventListener("click", function () {
  inventory.style.display = "flex";
  invBtn.style.display = "none";
});
closeBtn.addEventListener("click", function () {
  inventory.style.display = "none";
  invBtn.style.display = "flex";
});

function fightStart(enemyT) {
  act.style.display = "flex";
  enemyPlace.src = enemyT.img;
  enemyBar.max = enemyT.maxHealth;
  enemyBar.value = enemyT.health;
  console.log(enemyBar.max, enemyBar.value);
}

attack.addEventListener("click", function () {
  redoInv();
  if (emil === true) {
    attacking(enemies.bossEmil);
  } else if (frank === true) {
    attacking(enemies.frankStats);
  } else if (Joe === true) {
    attacking(enemies.randO);
  } else if (Joe === true) {
    attacking(enemies.gobelin);
  } else {
    console.log("you broke it");
  }
});

function attacking(enemyT) {
  enemyT.health -= player.damage;
  enemyBar.value = enemyT.health;
  console.log(enemyT.health);
  checkIfDead(enemyT);
  attacked(enemyT);
}
function attacked(EnemyT) {
  if (player.health > 0) {
    player.health -= EnemyT.damage;
    takeDamage.value = player.health;
    redoInv();
  } else {
    console.log("gameover");
    Restarter();
  }
}
function checkIfDead(enemyT) {
  if (enemyT.health <= 0) {
    player.gold += enemyT.gold;
    player.xp += enemyT.xp;
    checkLevel();
    goldPage.textContent = `gold: ${player.gold}`;
    console.log(`${enemyT.name} died`);
    healthResetEn(EnemyT);
    fightEndedDisplay();
    redoInv();
  } else {
    return console.log("try again");
  }
}
function healthResetEn(EnemyT) {
  enemies.EnemyT.health = enemies.EnemyT.maxHealth;
}
function checkLevel() {
  while (levelUp <= player.xp) {
    player.level += 1;
    levelUp = player.level * 10;
    player.damage += 5;
    player.healing += 5;
    player.maxHealth += 10;
    console.log(player.damage);
    redoInv();
  }
  redoInv();
  experience.textContent = `XP: ${player.xp}/${levelUp}`;
  statLevel.textContent = `LVL: ${player.level}`;
}

godMode.addEventListener("click", function () {
  player.health = 10000000000000;
  player.maxHealth = 10000000000000;
  redoInv();
});
instantKill.addEventListener("click", function () {
  player.damage = 10000000000000;
  redoInv();
});
