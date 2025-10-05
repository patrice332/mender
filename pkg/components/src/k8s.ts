import { type ApiObjectProps, App, ApiObject as Cdk8sApiObject, Chart } from "cdk8s";
import * as kplus from "cdk8s-plus-32";
import { Construct } from "constructs";
import { z } from "zod/v4";

export { ImagePullPolicy } from "cdk8s-plus-32";

const manifestSchema = z.object({
  metadata: z.object().optional(),
  apiVersion: z.string(),
  kind: z.string(),
});

export class K8s {
  public readonly underlying: App;
  private readonly projectNames: string[];
  private readonly projects: Record<string, Project>;

  constructor() {
    this.underlying = new App();
    this.projectNames = [];
    this.projects = {};
  }

  public createProject(name: string): Project {
    if (name in this.projects) {
      throw new Error(`Project with name (${name}) already exists`);
    }
    const project = new Project(this.underlying, name);
    this.projectNames.push(name);
    this.projects[name] = project;
    return project;
  }

  public synth = (): unknown[] =>
    this.projectNames.flatMap((name) => {
      const project = this.projects[name];
      if (!project) {
        throw new Error(`Internal Error: Project named (${name}) is in project list, but cannot be found`);
      }
      return project.underlying.toJson();
    });
}

export class Project {
  public readonly underlying: Chart;
  public readonly name: string;

  constructor(app: App, name: string) {
    this.underlying = new Chart(app, name);
    this.name = name;
  }

  public createNamespace(name: string, props: kplus.NamespaceProps): Namespace {
    return new Namespace(this.underlying, name, props);
  }
}

export class Namespace extends Construct {
  public readonly chart: Chart;
  public readonly underlying: kplus.Namespace;
  public readonly name: string;

  constructor(scope: Chart, name: string, props: kplus.NamespaceProps) {
    super(scope, name);
    this.chart = scope;
    const localProps: kplus.NamespaceProps = {
      ...props,
      metadata: {
        ...props.metadata,
        name,
      },
    };
    this.underlying = new kplus.Namespace(scope, `${scope.node.path.replaceAll("/", "-")}-namespace`, localProps);
    this.name = name;
  }
}

export const addManifest = (ns: Namespace, name: string, props: unknown) => {
  const manifestParsed = manifestSchema.safeParse(props);
  if (!manifestParsed.success) {
    throw new Error("Provided manifest is not a valid api object");
  }
  const manifest = manifestParsed.data;
  return new ApiObject(ns, name, { ...manifest, metadata: manifest.metadata ?? {} });
};

export const addDeployment = (ns: Namespace, name: string, props: kplus.DeploymentProps) =>
  new Deployment(ns, name, props);

export class Deployment extends Construct {
  public readonly underlying: kplus.Deployment;
  public readonly name: string;

  constructor(namespace: Namespace, name: string, props: kplus.DeploymentProps) {
    super(namespace.chart, name);
    const localProps: kplus.DeploymentProps = {
      ...props,
      metadata: {
        ...props.metadata,
        name,
        namespace: namespace.name,
      },
    };
    this.underlying = new kplus.Deployment(
      namespace.chart,
      `${namespace.node.path.replaceAll("/", "-")}-${name}-deployment`,
      localProps,
    );
    this.name = name;
  }
}

export class ApiObject extends Construct {
  public readonly underlying: Cdk8sApiObject;
  public readonly name: string;
  constructor(ns: Namespace, name: string, props: ApiObjectProps) {
    super(ns, name);
    const localProps: ApiObjectProps = {
      ...props,
      metadata: {
        ...props.metadata,
        name,
        namespace: ns.name,
      },
    };

    this.name = name;
    this.underlying = new Cdk8sApiObject(
      ns.chart,
      `${ns.node.path.replaceAll("/", "-")}-${name}-apiobject`,
      localProps,
    );
  }
}
