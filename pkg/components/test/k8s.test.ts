import { describe, expect, it } from "vitest";
import { ImagePullPolicy, K8s } from "../src/k8s";

describe("k8s", () => {
  it("can create a deployment", () => {
    const kplus = new K8s();
    const project = kplus.createProject("test");
    const ns = project.createNamespace("test-ns", {
      metadata: {
        labels: {
          "test.label": "value",
        },
        annotations: {
          "test.annotate": "other_value",
        },
      },
    });
    ns.createDeployment("test-deploy", {
      metadata: {
        labels: {
          "deploy-label": "foo",
        },
        annotations: {
          "deploy-annotate": "bar",
        },
      },
      containers: [
        {
          name: "test-container",
          image: "test-image:sometag",
          imagePullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
        },
      ],
    });

    expect(kplus.synth()).toMatchSnapshot();
  });

  it("can create raw manifests", () => {
    const kplus = new K8s();

    const project = kplus.createProject("test");
    const ns = project.createNamespace("test-ns", {
      metadata: {
        labels: {
          "test.label": "value",
        },
        annotations: {
          "test.annotate": "other_value",
        },
      },
    });

    ns.addManifest({
      metadata: {
        name: "foo-obj",
      },
      apiVersion: "v1",
      kind: "MyCustomCRD",
    });

    expect(kplus.synth()).toMatchSnapshot();
  });
});
