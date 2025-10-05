import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { type Cluster, createCluster } from "../../src/internal/cluster";

describe("Cluster", () => {
  let cluster: Cluster;

  beforeEach(async () => {
    cluster = await createCluster();
  }, 60_000);

  afterEach(async () => {
    await cluster.close();
  }, 60_000);

  it("should create a cluster", async () => {
    const client = cluster.coreClient;
    cluster.coreClient.createNamespacedPod({
      namespace: "default",
      body: {
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
      },
    });

    await vi.waitFor(async () => {
      const { status } = await client.readNamespacedPodStatus({ namespace: "default", name: "helloworld" });

      return (
        status?.phase === "Running" &&
        status?.conditions?.some((cond) => cond.type === "Ready" && cond.status === "True")
      );
    }, 60_000);
  }, 60_000);
});
