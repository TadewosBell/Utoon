import {
  CUSTOM_EVENT_MM_DAMAGED,
  CUSTOM_EVENT_MM_HP_UPDATE,
  MAX_HP,
} from "../constants.js";
import { HeroDie } from "../actors/Hero/HeroDie.js";

export class HeroHp {
  constructor(engine) {
    this.engine = engine;
    this.hp = MAX_HP;
    this.hero = undefined;

    this.engine.on(CUSTOM_EVENT_MM_DAMAGED, (damageAmount) => {
      this.subtract(damageAmount);
    });
  }

  init() {
    this.engine.emit(CUSTOM_EVENT_MM_HP_UPDATE, this.hp);
  }

  subtract(n) {
    this.hp -= n;
    if (this.hp <= 0) {
      this.hp = 0;
      this.handleHeroDie();
    }
    this.engine.emit(CUSTOM_EVENT_MM_HP_UPDATE, this.hp);
  }

  handleHeroDie() {
    if (!this.hero) {
      console.warn("no hero node assigned to HeroHp (handleHeroDie method)");
    }

    //Add a hero death, get rid of actual hero
    const heroDie = new HeroDie(this.hero.pos.x, this.hero.pos.y);
    this.engine.add(heroDie);
    this.hero.kill();
  }
}
