import { describe, expect, it } from "vitest";
import { addDeployment, addManifest, ImagePullPolicy, K8s } from "../src/k8s";

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
    addDeployment(ns, "test-deploy", {
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

    addManifest(ns, "foo-obj", {
      apiVersion: "v1",
      kind: "MyCustomCRD",
    });

    expect(kplus.synth()).toMatchSnapshot();
  });
});
