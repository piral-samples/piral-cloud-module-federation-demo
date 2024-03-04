import { init, loadRemote } from "@module-federation/runtime";

export type SetupOptions = Parameters<typeof init>["0"];

export function setup(options?: SetupOptions) {
  init(options);

  window.loadRemote = (moduleId) => loadRemote(moduleId);
}

declare global {
  interface Window {
    loadRemote(moduleId: string): Promise<any>;
  }
}
