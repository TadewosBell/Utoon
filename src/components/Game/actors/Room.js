import * as ex from "excalibur";
import { ANCHOR_TOP_LEFT, Objs, SCALE_2x, SCALED_CELL } from "../constants.js";
import { Floor } from "./Floor.js";
import { Ladder } from "./Ladder.js";
import { HardHat } from "./enemies/HardHat/HardHat.js";
import { Alien } from "./enemies/Alien/Alien.js";
import { Pipi } from "./enemies/Pipi/Pipi.js";
import { NewShotman } from "./enemies/NewShotman/NewShotman.js";
import { RoomChange } from "./RoomChange.js";

export class Room extends ex.Actor {
    constructor({ x, y, image, floors, objects, limits }) {
        super({
            anchor: ANCHOR_TOP_LEFT,
            pos: new ex.Vector(x, y),
            scale: SCALE_2x,
        });
    
        this.floors = floors;
        this.objects = objects;
        this.limits = limits || [];

        const mapSprite = image.toSprite();
        this.graphics.use(mapSprite);
    }

    onInitialize(engine) {
        this.floors.forEach((f) => {
            const x = this.pos.x + f.x * SCALED_CELL;
            const y = this.pos.y + f.y * SCALED_CELL;
      
            const floor = new Floor(x, y, f.widthCells, f.heightCells);
            engine.add(floor);
          });
      
          this.objects.forEach((obj) => {
            if (obj.type === Objs.MAP_CHANGE) {
              const x = this.pos.x + obj.x * SCALED_CELL;
              const y = this.pos.y + obj.y * SCALED_CELL;
              const roomChange = new RoomChange(x, y, 1, 1, {
                upYDest: obj.upYDest,
                downYDest: obj.downYDest,
                room: this,
              });
              engine.add(roomChange);
            }
      
            const x = this.pos.x + obj.x * SCALED_CELL;
            const y = this.pos.y + obj.y * SCALED_CELL;
      
            // Handle object spawn cases
            if (obj.type === Objs.LADDER) {
              const ladder = new Ladder(x, y, obj.heightCells);
              engine.add(ladder);
            }
      
            if (obj.type === Objs.HARD_HAT) {
              const hardHard = new HardHat(x, y);
              engine.add(hardHard);
            }
      
            if (obj.type === Objs.PIPI) {
              const pipi = new Pipi(x, y);
              engine.add(pipi);
            }
      
            if (obj.type === Objs.NEW_SHOTMAN) {
              const enemy = new NewShotman(x, y);
              engine.add(enemy);
            }

            if(obj.type === Objs.ALIEN) {
              const alien = new Alien(x, y, 1);
              engine.add(alien);
            }

          });
    }
}