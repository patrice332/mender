import { RootConstruct } from "constructs";
import { K8s } from "./k8s";

export class App extends RootConstruct {
  public readonly k8s: K8s;
  constructor() {
    super();
    this.k8s = new K8s();
  }
}
