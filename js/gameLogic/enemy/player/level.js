import { player } from "../../../js/module";
export function checkLevel() {
    while (levelUp <= player.xp) {
      player.level += 1;
      levelUp = player.level * 10;
      player.damage += 5;
      player.healing += 5;
      player.maxHealth += 10;
    }
    updateUI();
  }