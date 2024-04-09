export class HP {
  constructor(maxHealth, config = {}, onDead = function () {}) {
    this.hp = maxHealth;
    this.onDead = onDead;
  }

  takeDamage(_from) {
    this.hp -= 1;
    if (this.hp <= 0) {
      this.onDead();
    }
  }
}
