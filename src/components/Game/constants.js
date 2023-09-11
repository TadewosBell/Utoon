import * as ex from "excalibur";

export const SCALE = 2;
export const SCALED_CELL = 32;
export const ROOM_HEIGHT_1PX = 256;

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";

export const UP_LEFT = "UP_LEFT";
export const UP_RIGHT = "UP_RIGHT";
export const DOWN_LEFT = "DOWN_LEFT";
export const DOWN_RIGHT = "DOWN_RIGHT";

export const ANCHOR_TOP_LEFT = new ex.Vector(0, 0);
export const ANCHOR_CENTER = new ex.Vector(0.5, 0.5);

export const SCALE_2x = new ex.Vector(2, 2);

export const CUSTOM_EVENT_MM_HP_UPDATE = "CUSTOM_EVENT_MM_HP_UPDATE";
export const CUSTOM_EVENT_MM_DAMAGED = "CUSTOM_EVENT_MM_DAMAGED";
export const CUSTOM_EVENT_CAMERA_Y_CHANGE = "CUSTOM_EVENT_CAMERA_Y_CHANGE";

export const MAX_HP = 28;

export const TAG_HERO = "TAG_HERO";
export const TAG_HERO_BULLET = "TAG_HERO_BULLET";
export const TAG_LADDER = "TAG_LADDER";
export const TAG_LADDER_DETECT_TOP = "TAG_LADDER_DETECT_TOP";

export const Objs = {
  MAP_CHANGE: "MAP_CHANGE",
  LADDER: "LADDER",
  NEW_SHOTMAN: "NEW_SHOTMAN",
  PIPI: "PIPI",
  HARD_HAT: "HARD_HAT",
};
