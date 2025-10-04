import { CoreV1Api, KubeConfig } from "@kubernetes/client-node";
import { K3sContainer, type StartedK3sContainer } from "@testcontainers/k3s";
import { Construct } from "constructs";

type KubernetesVersion = "1.32" | "1.33" | "1.34";

const images: Record<KubernetesVersion, string> = {
  "1.32": "rancher/k3s:v1.32.9-k3s1",
  "1.33": "rancher/k3s:v1.33.5-k3s1",
  "1.34": "rancher/k3s:v1.34.1-k3s1",
};

export interface ClusterBuilderOptions {
  kubernetesVersion: KubernetesVersion;
}

export const createCluster = async (scope: Construct, id: string, options: ClusterBuilderOptions) => {
  const { kubernetesVersion } = options;
  const k3s = await new K3sContainer(images[kubernetesVersion]).start();
  return new Cluster(scope, id, { k3s });
};

interface ClusterOptions {
  k3s: StartedK3sContainer;
}

export class Cluster extends Construct {
  private readonly k3s: StartedK3sContainer;
  private readonly client: CoreV1Api;
  constructor(scope: Construct, id: string, props: ClusterOptions) {
    super(scope, id);

    this.k3s = props.k3s;
    const kubeConfig = new KubeConfig();
    kubeConfig.loadFromString(this.k3s.getKubeConfig());
    this.client = kubeConfig.makeApiClient(CoreV1Api);
  }

  public getClient = (): CoreV1Api => this.client;
}
