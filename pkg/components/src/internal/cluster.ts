import { CoreV1Api, KubeConfig, KubernetesObjectApi } from "@kubernetes/client-node";
import { K3sContainer, type StartedK3sContainer } from "@testcontainers/k3s";
import type { Project } from "../k8s";

export type KubernetesVersion = "1.32" | "1.33";

const image = "rancher/k3s:v1.32.9-k3s1";

export const createCluster = async () => {
  const k3s = await new K3sContainer(image).start();
  return new Cluster({ k3s });
};

interface ClusterOptions {
  k3s: StartedK3sContainer;
}

export class Cluster {
  private readonly k3s: StartedK3sContainer;
  private readonly k8sClient: KubernetesObjectApi;
  public readonly coreClient: CoreV1Api;
  constructor(props: ClusterOptions) {
    this.k3s = props.k3s;
    const kubeConfig = new KubeConfig();
    kubeConfig.loadFromString(this.k3s.getKubeConfig());
    this.k8sClient = kubeConfig.makeApiClient(KubernetesObjectApi);
    this.coreClient = kubeConfig.makeApiClient(CoreV1Api);
  }

  public async apply(project: Project): Promise<void> {
    const client = this.k8sClient;
    const resources = project.underlying.toJson();
    for (const resource of resources) {
      await client.patch(resource);
    }
  }

  public async close(): Promise<void> {
    await this.k3s.stop();
  }
}
