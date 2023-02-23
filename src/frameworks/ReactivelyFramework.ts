import { Reactive, stabilize } from "@reactively/core";
import { ReactiveFramework, Signal } from "../util/ReactiveFramework";

export const reactivelyFramework: ReactiveFramework = {
  name: "@reactively",
  signal: (initialValue) => {
    const r = new Reactive(initialValue);
    return {
      write: (v) => r.set(v),
      read: () => r.get(),
    };
  },
  computed: (fn) => {
    const r = new Reactive(fn);
    return {
      read: () => r.get(),
    };
  },
  effect: (fn) => {
    new Reactive(fn, true);
  },
  withBatch: (fn) => {
    fn();
    stabilize();
  },
  withBuild: (fn) => fn(),
  run: () => {},
};
