import { Construct as BaseConstruct } from "constructs";
import { App } from "./app";
import type { K8s } from "./k8s";

export class Construct extends BaseConstruct {
  // biome-ignore lint/complexity/noUselessConstructor: Adds extra constraints on scope
  constructor(scope: Construct | App, id: string) {
    super(scope, id);
  }

  get k8s(): K8s {
    const root = this.node.root;
    if (!(root instanceof App)) {
      throw new Error("Construct is not a child of a mender app");
    }
    return root.k8s;
  }
}
