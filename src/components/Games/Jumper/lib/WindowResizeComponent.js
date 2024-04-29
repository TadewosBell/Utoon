import { engine } from "$game";

export class WindowResizeComponent extends ex.Component {
  type = "window-resize";

  onResize = () => {
    if (this.owner?.onWindowResize) {
      engine.once("predraw", () => {
        this.owner.onWindowResize.call(this.owner);
      });
    }
  };

  onAdd(owner) {
    window.addEventListener("resize", this.onResize);
  }

  onRemove(previousOwner) {
    window.removeEventListener("resize", this.onResize);
  }
}