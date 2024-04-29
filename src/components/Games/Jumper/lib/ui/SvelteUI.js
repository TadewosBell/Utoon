import { HTMLUI } from "merlyn";

export class SvelteUI extends HTMLUI {
  component;
  props;
  svelteComponent;

  constructor(component, args = {}) {
    super({
      resolution: "native",
    });
    this.component = component;
    this.props = args.props;
  }

  onInitialize(e) {
    super.onInitialize(e);
    this.svelteComponent = new this.component({
      target: this.element,
      intro: true,
      props: { ...(this.props ?? {}), scene: this.scene },
    });
    this.element.style.pointerEvents = "none";
  }

  onPreKill() {
    outroAndDestroy(this.svelteComponent, () => {
      super.onPreKill();
    });
  }
}

// Workaround for https://github.com/sveltejs/svelte/issues/4056
const outroAndDestroy = (instance, cb) => {
  if (instance?.$$.fragment && instance.$$.fragment.o) {
    group_outros();
    transition_out(instance.$$.fragment, 0, 0, () => {
      instance.$destroy();
      cb();
    });
    check_outros();
  } else {
    instance?.$destroy();
  }
};