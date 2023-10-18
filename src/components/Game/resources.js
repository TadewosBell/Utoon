import * as ex from "excalibur";
import Store from "../../redux/store";

const Images = {
  heroSheetImage: new ex.ImageSource("/sprites/mm-48-drew-blue-sheet.png"),
  heroBulletImage: new ex.ImageSource("/sprites/mm-lemon.png"),
  astroRunningSheet: new ex.ImageSource("/sprites/astro_running.png"),
  astroYMCASheet: new ex.ImageSource("/sprites/astro_YMCA.png"),
  astroIdleSheet: new ex.ImageSource("/sprites/astro_Idle.png"),
  map1Image: new ex.ImageSource("/maps/DrewMan_stage/FirstLevel.png"),
  map2Image: new ex.ImageSource("/maps/DrewMan_stage/map2.png"),
  map3Image: new ex.ImageSource("/maps/DrewMan_stage/map3.png"),

  shotmanSheetImage: new ex.ImageSource("/sprites/new-shotman-sheet.png"),
  hardHatSheetImage: new ex.ImageSource("/sprites/hardhat-sheet.png"),
  pipiSheetImage: new ex.ImageSource("/sprites/pipi-sheet.png"),
  explosionSpriteSheet: new ex.ImageSource("/sprites/explosion-sheet.png"),

  sweatSpriteSheetImage: new ex.ImageSource("/sprites/mm-pain-sweat-sheet.png"),
  painFlashImage: new ex.ImageSource("/sprites/mm-pain-flash.png"),
  mmExplosionSpriteSheet: new ex.ImageSource("/sprites/mm-die-explosion.png"),
};

const Sounds = {
  LANDING: new ex.Sound("/sounds/mm-floor-landing.wav"),
  SHOOT: new ex.Sound("/sounds/mm-bullet.wav"),
  PAIN: new ex.Sound("/sounds/mm-pain.wav"),
};

const loader = new ex.Loader();
loader.suppressPlayButton = true;
const allResources = { ...Images, ...Sounds };
for (const res in allResources) {
  loader.addResource(allResources[res]);
}

export { loader, Images, Sounds };
