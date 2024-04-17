import { Room } from "../actors/Room.js";
import { Images } from "../resources.js";
import { SCALE, SCALED_CELL, ROOM_HEIGHT_1PX, Objs } from "../constants.js";

const SCALED_ROOM_HEIGHT = ROOM_HEIGHT_1PX * SCALE;

const room1 = new Room({
  image: Images.map1Image,
  x: 0,
  y: 0,
  limits: [SCALED_CELL * 8, (140) * SCALED_CELL - 2],
  floors: [
    {
      //Covers the left side exit
      x: -1,
      y: 0,
      widthCells: 1,
      heightCells: 13,
    },
    {
      // Main floor
      x: 0,
      y: 12,
      widthCells: 28,
      heightCells: 1,
    },

    //First hump
    {
      x: 20,
      y: 11,
      widthCells: 5,
      heightCells: 1,
    },
    {
      x: 21,
      y: 10,
      widthCells: 3,
      heightCells: 1,
    },


    //First Pitfall
    {
      x: 27,
      y: 5,
      widthCells: 3,
      heightCells: 0,
    },

    {
      // Main floor
      x: 31,
      y: 12,
      widthCells: 18,
      heightCells: 1,
    },

    //Second hump
    {
      x: 36,
      y: 11,
      widthCells: 14,
      heightCells: 1,
    },
    {
      x: 36,
      y: 10,
      widthCells: 13,
      heightCells: 1,
    },
    {
      x: 37,
      y: 9,
      widthCells: 9,
      heightCells: 1,
    },
    {
      x: 41,
      y: 8,
      widthCells: 5,
      heightCells: 1,
    },

    //Third hump
    {
      x: 52,
      y: 11,
      widthCells: 7,
      heightCells: 1,
    },
    {
      x: 52,
      y: 10,
      widthCells: 6,
      heightCells: 1,
    },
    {
      x: 52,
      y: 9,
      widthCells: 4,
      heightCells: 1,
    },
    {
      x: 54,
      y: 8,
      widthCells: 2,
      heightCells: 1,
    },

    {
      // Main floor
      x: 59,
      y: 12,
      widthCells: 30,
      heightCells: 1,
    },

    //Fourth hump
    {
      x: 62,
      y: 11,
      widthCells: 3,
      heightCells: 1,
    },

    {
      // step down before gap
      x: 89,
      y: 13,
      widthCells: 4,
      heightCells: 1,
    },

    //first Bridge in gap
    {
      x: 96,
      y: 12,
      widthCells: 3.3,
      heightCells: 1,
    },

    //second bridge in gap
    {
      x: 102.2,
      y: 10,
      widthCells: 1.5,
      heightCells: 1,
    },

    {
      // Main floor after two bridge gap
      x: 105.8,
      y: 12,
      widthCells: 42,
      heightCells: 1,
    },
    {
      //Covers the left side exit
      x: 148,
      y: 0,
      widthCells: 1,
      heightCells: 12,
    },

  ],
  objects: [
    {
      type: Objs.ALIEN,
      x: 70,
      y: 10,
    },
    {
      type: Objs.ALIEN,
      x: 5,
      y: 10,
    },
  ],
});

export class Martian_Stage {
    constructor() {
        this.rooms = [room1]
    }

    get firstMap() {
        return this.rooms[0];
    }
}