import { RootConstruct } from "constructs";
import { describe, expect, it, vi } from "vitest";
import { createCluster } from "../src/cluster";

describe("Cluster", () => {
  it("should create a cluster", async () => {
    const construct = new RootConstruct("Cluster");
    const cluster = await createCluster(construct, "test", { kubernetesVersion: "1.32" });
    expect(cluster).toBeDefined();
    const pod = {
      metadata: {
        name: "helloworld",
      },
      spec: {
        containers: [
          {
            name: "helloworld",
            image: "testcontainers/helloworld:1.1.0",
            ports: [
              {
                containerPort: 8080,
              },
            ],
            readinessProbe: {
              tcpSocket: {
                port: 8080,
              },
            },
          },
        ],
      },
    };
    const client = cluster.getClient();
    await client.createNamespacedPod({ namespace: "default", body: pod });

    await vi.waitFor(async () => {
      const { status } = await client.readNamespacedPodStatus({ namespace: "default", name: "helloworld" });

      return (
        status?.phase === "Running" &&
        status?.conditions?.some((cond) => cond.type === "Ready" && cond.status === "True")
      );
    }, 60_000);
  }, 60_000);
});
