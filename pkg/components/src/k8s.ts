import { type ApiObjectMetadata, App, Chart } from "cdk8s";
import * as kplus from "cdk8s-plus-32";
import { Construct } from "constructs";

export { ImagePullPolicy } from "cdk8s-plus-32";

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

  public createNamespace(
    name: string,
    props: Omit<kplus.NamespaceProps, "metadata"> & { metadata?: Omit<ApiObjectMetadata, "name"> },
  ): Namespace {
    return new Namespace(this.underlying, name, props);
  }
}

export class Namespace extends Construct {
  private readonly chart: Chart;
  public readonly underlying: kplus.Namespace;
  public readonly name: string;

  constructor(
    scope: Chart,
    name: string,
    props: Omit<kplus.NamespaceProps, "metadata"> & { metadata?: Omit<ApiObjectMetadata, "name"> },
  ) {
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

  public createDeployment(
    name: string,
    props: Omit<kplus.DeploymentProps, "metadata"> & { metadata?: Omit<ApiObjectMetadata, "name" | "namespace"> },
  ): Deployment {
    return new Deployment(this.chart, this, name, props);
  }
}

export class Deployment extends Construct {
  public readonly underlying: kplus.Deployment;
  public readonly name: string;

  constructor(
    scope: Chart,
    namespace: Namespace,
    name: string,
    props: Omit<kplus.DeploymentProps, "metadata"> & { metadata?: Omit<ApiObjectMetadata, "name" | "namespace"> },
  ) {
    super(scope, name);
    const localProps: kplus.DeploymentProps = {
      ...props,
      metadata: {
        ...props.metadata,
        name,
        namespace: namespace.name,
      },
    };
    this.underlying = new kplus.Deployment(scope, `${namespace.node.path.replaceAll("/", "-")}-deployment`, localProps);
    this.name = name;
  }
}
