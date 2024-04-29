import { getBaseY, getSafeArea } from "./util";
import { WindowResizeComponent } from "./WindowResizeComponent";

export class TilingGraphic extends ex.Actor {
  scene;
  graphic;
  offset = ex.Vector.Zero;
  speed;
  repeatY;

  constructor({ graphic, speed = 0, repeatY = 1, ...args }) {
    super({ anchor: new ex.Vector(0, 0), x: 0, y: 0, ...args });
    this.addComponent(new WindowResizeComponent());
    this.speed = speed;
    this.repeatY = repeatY;
    this.graphic = graphic;
    this.graphics.offset = this.offset;
    this.on("initialize", () => {
      this.onWindowResize();
    });
    this.on("preupdate", (ev) => {
      this._onPreUpdate(ev.engine, ev.delta);
    });
  }

  onWindowResize() {
    const columns = Math.ceil(this.scene.camera.viewport.width / this.graphic.width) + 1;
    const rows = this.repeatY;
    this.graphics.use(
      new ex.GraphicsGroup({
        members: Array.from({ length: columns }).flatMap((_, x) =>
          Array.from({ length: rows }).map((_, y) => ({
            graphic: this.graphic,
            pos: new ex.Vector(this.graphic.width * x, y * this.graphic.height),
          }))
        ),
      })
    );
  }

  _onPreUpdate(engine, delta) {
    this.pos.x = this.scene.camera.viewport.left;
    this.offset.x += this.speed * delta;
    while (this.offset.x < -this.graphic.width) {
      this.offset.x += this.graphic.width;
    }
  }
}