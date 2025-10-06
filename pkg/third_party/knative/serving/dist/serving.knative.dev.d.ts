import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
/**
 * Configuration represents the "floating HEAD" of a linear history of Revisions.
Users create new Revisions by updating the Configuration's spec.
The "latest created" revision's name is available under status, as is the
"latest ready" revision's name.
See also: https://github.com/knative/serving/blob/main/docs/spec/overview.md#configuration
 *
 * @schema Configuration
 */
export declare class Configuration extends ApiObject {
    /**
     * Returns the apiVersion and kind for "Configuration"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Configuration".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: ConfigurationProps): any;
    /**
     * Defines a "Configuration" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: ConfigurationProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Configuration represents the "floating HEAD" of a linear history of Revisions.
 * Users create new Revisions by updating the Configuration's spec.
 * The "latest created" revision's name is available under status, as is the
 * "latest ready" revision's name.
 * See also: https://github.com/knative/serving/blob/main/docs/spec/overview.md#configuration
 *
 * @schema Configuration
 */
export interface ConfigurationProps {
    /**
     * @schema Configuration#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * ConfigurationSpec holds the desired state of the Configuration (from the client).
     *
     * @schema Configuration#spec
     */
    readonly spec?: ConfigurationSpec;
}
/**
 * Converts an object of type 'ConfigurationProps' to JSON representation.
 */
export declare function toJson_ConfigurationProps(obj: ConfigurationProps | undefined): Record<string, any> | undefined;
/**
 * ConfigurationSpec holds the desired state of the Configuration (from the client).
 *
 * @schema ConfigurationSpec
 */
export interface ConfigurationSpec {
    /**
     * Template holds the latest specification for the Revision to be stamped out.
     *
     * @schema ConfigurationSpec#template
     */
    readonly template?: ConfigurationSpecTemplate;
}
/**
 * Converts an object of type 'ConfigurationSpec' to JSON representation.
 */
export declare function toJson_ConfigurationSpec(obj: ConfigurationSpec | undefined): Record<string, any> | undefined;
/**
 * Template holds the latest specification for the Revision to be stamped out.
 *
 * @schema ConfigurationSpecTemplate
 */
export interface ConfigurationSpecTemplate {
    /**
     * @schema ConfigurationSpecTemplate#metadata
     */
    readonly metadata?: ConfigurationSpecTemplateMetadata;
    /**
     * RevisionSpec holds the desired state of the Revision (from the client).
     *
     * @schema ConfigurationSpecTemplate#spec
     */
    readonly spec?: ConfigurationSpecTemplateSpec;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplate' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplate(obj: ConfigurationSpecTemplate | undefined): Record<string, any> | undefined;
/**
 * @schema ConfigurationSpecTemplateMetadata
 */
export interface ConfigurationSpecTemplateMetadata {
    /**
     * @schema ConfigurationSpecTemplateMetadata#annotations
     */
    readonly annotations?: {
        [key: string]: string;
    };
    /**
     * @schema ConfigurationSpecTemplateMetadata#finalizers
     */
    readonly finalizers?: string[];
    /**
     * @schema ConfigurationSpecTemplateMetadata#labels
     */
    readonly labels?: {
        [key: string]: string;
    };
    /**
     * @schema ConfigurationSpecTemplateMetadata#name
     */
    readonly name?: string;
    /**
     * @schema ConfigurationSpecTemplateMetadata#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateMetadata' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateMetadata(obj: ConfigurationSpecTemplateMetadata | undefined): Record<string, any> | undefined;
/**
 * RevisionSpec holds the desired state of the Revision (from the client).
 *
 * @schema ConfigurationSpecTemplateSpec
 */
export interface ConfigurationSpecTemplateSpec {
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-affinity
     *
     * @schema ConfigurationSpecTemplateSpec#affinity
     */
    readonly affinity?: any;
    /**
     * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
     *
     * @schema ConfigurationSpecTemplateSpec#automountServiceAccountToken
     */
    readonly automountServiceAccountToken?: boolean;
    /**
     * ContainerConcurrency specifies the maximum allowed in-flight (concurrent)
     * requests per container of the Revision.  Defaults to `0` which means
     * concurrency to the application is not limited, and the system decides the
     * target concurrency for the autoscaler.
     *
     * @default 0` which means
     * @schema ConfigurationSpecTemplateSpec#containerConcurrency
     */
    readonly containerConcurrency?: number;
    /**
     * List of containers belonging to the pod.
     * Containers cannot currently be added or removed.
     * There must be at least one container in a Pod.
     * Cannot be updated.
     *
     * @schema ConfigurationSpecTemplateSpec#containers
     */
    readonly containers: ConfigurationSpecTemplateSpecContainers[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-dnsconfig
     *
     * @schema ConfigurationSpecTemplateSpec#dnsConfig
     */
    readonly dnsConfig?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-dnspolicy
     *
     * @schema ConfigurationSpecTemplateSpec#dnsPolicy
     */
    readonly dnsPolicy?: string;
    /**
     * EnableServiceLinks indicates whether information aboutservices should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Knative defaults this to false.
     *
     * @schema ConfigurationSpecTemplateSpec#enableServiceLinks
     */
    readonly enableServiceLinks?: boolean;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostaliases
     *
     * @schema ConfigurationSpecTemplateSpec#hostAliases
     */
    readonly hostAliases?: any[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostipc
     *
     * @schema ConfigurationSpecTemplateSpec#hostIPC
     */
    readonly hostIpc?: boolean;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostnetwork
     *
     * @schema ConfigurationSpecTemplateSpec#hostNetwork
     */
    readonly hostNetwork?: boolean;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostpid
     *
     * @schema ConfigurationSpecTemplateSpec#hostPID
     */
    readonly hostPid?: boolean;
    /**
     * IdleTimeoutSeconds is the maximum duration in seconds a request will be allowed
     * to stay open while not receiving any bytes from the user's application. If
     * unspecified, a system default will be provided.
     *
     * @schema ConfigurationSpecTemplateSpec#idleTimeoutSeconds
     */
    readonly idleTimeoutSeconds?: number;
    /**
     * ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec.
     * If specified, these secrets will be passed to individual puller implementations for them to use.
     * More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
     *
     * @schema ConfigurationSpecTemplateSpec#imagePullSecrets
     */
    readonly imagePullSecrets?: ConfigurationSpecTemplateSpecImagePullSecrets[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-init-containers
     *
     * @schema ConfigurationSpecTemplateSpec#initContainers
     */
    readonly initContainers?: any[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-nodeselector
     *
     * @schema ConfigurationSpecTemplateSpec#nodeSelector
     */
    readonly nodeSelector?: {
        [key: string]: string;
    };
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-priorityclassname
     *
     * @schema ConfigurationSpecTemplateSpec#priorityClassName
     */
    readonly priorityClassName?: string;
    /**
     * ResponseStartTimeoutSeconds is the maximum duration in seconds that the request
     * routing layer will wait for a request delivered to a container to begin
     * sending any network traffic.
     *
     * @schema ConfigurationSpecTemplateSpec#responseStartTimeoutSeconds
     */
    readonly responseStartTimeoutSeconds?: number;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-runtimeclassname
     *
     * @schema ConfigurationSpecTemplateSpec#runtimeClassName
     */
    readonly runtimeClassName?: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-schedulername
     *
     * @schema ConfigurationSpecTemplateSpec#schedulerName
     */
    readonly schedulerName?: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-securitycontext
     *
     * @schema ConfigurationSpecTemplateSpec#securityContext
     */
    readonly securityContext?: any;
    /**
     * ServiceAccountName is the name of the ServiceAccount to use to run this pod.
     * More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
     *
     * @schema ConfigurationSpecTemplateSpec#serviceAccountName
     */
    readonly serviceAccountName?: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-shareprocessnamespace
     *
     * @schema ConfigurationSpecTemplateSpec#shareProcessNamespace
     */
    readonly shareProcessNamespace?: boolean;
    /**
     * TimeoutSeconds is the maximum duration in seconds that the request instance
     * is allowed to respond to a request. If unspecified, a system default will
     * be provided.
     *
     * @schema ConfigurationSpecTemplateSpec#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-tolerations
     *
     * @schema ConfigurationSpecTemplateSpec#tolerations
     */
    readonly tolerations?: any[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-topologyspreadconstraints
     *
     * @schema ConfigurationSpecTemplateSpec#topologySpreadConstraints
     */
    readonly topologySpreadConstraints?: any[];
    /**
     * List of volumes that can be mounted by containers belonging to the pod.
     * More info: https://kubernetes.io/docs/concepts/storage/volumes
     *
     * @schema ConfigurationSpecTemplateSpec#volumes
     */
    readonly volumes?: ConfigurationSpecTemplateSpecVolumes[];
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpec' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpec(obj: ConfigurationSpecTemplateSpec | undefined): Record<string, any> | undefined;
/**
 * A single application container that you want to run within a pod.
 *
 * @schema ConfigurationSpecTemplateSpecContainers
 */
export interface ConfigurationSpecTemplateSpecContainers {
    /**
     * Arguments to the entrypoint.
     * The container image's CMD is used if this is not provided.
     * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
     * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
     * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
     * of whether the variable exists or not. Cannot be updated.
     * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     *
     * @schema ConfigurationSpecTemplateSpecContainers#args
     */
    readonly args?: string[];
    /**
     * Entrypoint array. Not executed within a shell.
     * The container image's ENTRYPOINT is used if this is not provided.
     * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
     * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
     * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
     * of whether the variable exists or not. Cannot be updated.
     * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     *
     * @schema ConfigurationSpecTemplateSpecContainers#command
     */
    readonly command?: string[];
    /**
     * List of environment variables to set in the container.
     * Cannot be updated.
     *
     * @schema ConfigurationSpecTemplateSpecContainers#env
     */
    readonly env?: ConfigurationSpecTemplateSpecContainersEnv[];
    /**
     * List of sources to populate environment variables in the container.
     * The keys defined within a source must be a C_IDENTIFIER. All invalid keys
     * will be reported as an event when the container is starting. When a key exists in multiple
     * sources, the value associated with the last source will take precedence.
     * Values defined by an Env with a duplicate key will take precedence.
     * Cannot be updated.
     *
     * @schema ConfigurationSpecTemplateSpecContainers#envFrom
     */
    readonly envFrom?: ConfigurationSpecTemplateSpecContainersEnvFrom[];
    /**
     * Container image name.
     * More info: https://kubernetes.io/docs/concepts/containers/images
     * This field is optional to allow higher level config management to default or override
     * container images in workload controllers like Deployments and StatefulSets.
     *
     * @schema ConfigurationSpecTemplateSpecContainers#image
     */
    readonly image?: string;
    /**
     * Image pull policy.
     * One of Always, Never, IfNotPresent.
     * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
     *
     * @default Always if :latest tag is specified, or IfNotPresent otherwise.
     * @schema ConfigurationSpecTemplateSpecContainers#imagePullPolicy
     */
    readonly imagePullPolicy?: string;
    /**
     * Periodic probe of container liveness.
     * Container will be restarted if the probe fails.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ConfigurationSpecTemplateSpecContainers#livenessProbe
     */
    readonly livenessProbe?: ConfigurationSpecTemplateSpecContainersLivenessProbe;
    /**
     * Name of the container specified as a DNS_LABEL.
     * Each container in a pod must have a unique name (DNS_LABEL).
     * Cannot be updated.
     *
     * @schema ConfigurationSpecTemplateSpecContainers#name
     */
    readonly name?: string;
    /**
     * List of ports to expose from the container. Not specifying a port here
     * DOES NOT prevent that port from being exposed. Any port which is
     * listening on the default "0.0.0.0" address inside a container will be
     * accessible from the network.
     * Modifying this array with strategic merge patch may corrupt the data.
     * For more information See https://github.com/kubernetes/kubernetes/issues/108255.
     * Cannot be updated.
     *
     * @schema ConfigurationSpecTemplateSpecContainers#ports
     */
    readonly ports?: ConfigurationSpecTemplateSpecContainersPorts[];
    /**
     * Periodic probe of container service readiness.
     * Container will be removed from service endpoints if the probe fails.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ConfigurationSpecTemplateSpecContainers#readinessProbe
     */
    readonly readinessProbe?: ConfigurationSpecTemplateSpecContainersReadinessProbe;
    /**
     * Compute Resources required by this container.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @schema ConfigurationSpecTemplateSpecContainers#resources
     */
    readonly resources?: ConfigurationSpecTemplateSpecContainersResources;
    /**
     * SecurityContext defines the security options the container should be run with.
     * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
     * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
     *
     * @schema ConfigurationSpecTemplateSpecContainers#securityContext
     */
    readonly securityContext?: ConfigurationSpecTemplateSpecContainersSecurityContext;
    /**
     * StartupProbe indicates that the Pod has successfully initialized.
     * If specified, no other probes are executed until this completes successfully.
     * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
     * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
     * when it might take a long time to load data or warm a cache, than during steady-state operation.
     * This cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ConfigurationSpecTemplateSpecContainers#startupProbe
     */
    readonly startupProbe?: ConfigurationSpecTemplateSpecContainersStartupProbe;
    /**
     * Optional: Path at which the file to which the container's termination message
     * will be written is mounted into the container's filesystem.
     * Message written is intended to be brief final status, such as an assertion failure message.
     * Will be truncated by the node if greater than 4096 bytes. The total message length across
     * all containers will be limited to 12kb.
     * Defaults to /dev/termination-log.
     * Cannot be updated.
     *
     * @default dev/termination-log.
     * @schema ConfigurationSpecTemplateSpecContainers#terminationMessagePath
     */
    readonly terminationMessagePath?: string;
    /**
     * Indicate how the termination message should be populated. File will use the contents of
     * terminationMessagePath to populate the container status message on both success and failure.
     * FallbackToLogsOnError will use the last chunk of container log output if the termination
     * message file is empty and the container exited with an error.
     * The log output is limited to 2048 bytes or 80 lines, whichever is smaller.
     * Defaults to File.
     * Cannot be updated.
     *
     * @default File.
     * @schema ConfigurationSpecTemplateSpecContainers#terminationMessagePolicy
     */
    readonly terminationMessagePolicy?: string;
    /**
     * Pod volumes to mount into the container's filesystem.
     * Cannot be updated.
     *
     * @schema ConfigurationSpecTemplateSpecContainers#volumeMounts
     */
    readonly volumeMounts?: ConfigurationSpecTemplateSpecContainersVolumeMounts[];
    /**
     * Container's working directory.
     * If not specified, the container runtime's default will be used, which
     * might be configured in the container image.
     * Cannot be updated.
     *
     * @schema ConfigurationSpecTemplateSpecContainers#workingDir
     */
    readonly workingDir?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainers' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainers(obj: ConfigurationSpecTemplateSpecContainers | undefined): Record<string, any> | undefined;
/**
 * LocalObjectReference contains enough information to let you locate the
 * referenced object inside the same namespace.
 *
 * @schema ConfigurationSpecTemplateSpecImagePullSecrets
 */
export interface ConfigurationSpecTemplateSpecImagePullSecrets {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ConfigurationSpecTemplateSpecImagePullSecrets#name
     */
    readonly name?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecImagePullSecrets' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecImagePullSecrets(obj: ConfigurationSpecTemplateSpecImagePullSecrets | undefined): Record<string, any> | undefined;
/**
 * Volume represents a named volume in a pod that may be accessed by any container in the pod.
 *
 * @schema ConfigurationSpecTemplateSpecVolumes
 */
export interface ConfigurationSpecTemplateSpecVolumes {
    /**
     * configMap represents a configMap that should populate this volume
     *
     * @schema ConfigurationSpecTemplateSpecVolumes#configMap
     */
    readonly configMap?: ConfigurationSpecTemplateSpecVolumesConfigMap;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-csi
     *
     * @schema ConfigurationSpecTemplateSpecVolumes#csi
     */
    readonly csi?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-emptydir
     *
     * @schema ConfigurationSpecTemplateSpecVolumes#emptyDir
     */
    readonly emptyDir?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-hostpath
     *
     * @schema ConfigurationSpecTemplateSpecVolumes#hostPath
     */
    readonly hostPath?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-image
     *
     * @schema ConfigurationSpecTemplateSpecVolumes#image
     */
    readonly image?: any;
    /**
     * name of the volume.
     * Must be a DNS_LABEL and unique within the pod.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ConfigurationSpecTemplateSpecVolumes#name
     */
    readonly name: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-persistent-volume-claim
     *
     * @schema ConfigurationSpecTemplateSpecVolumes#persistentVolumeClaim
     */
    readonly persistentVolumeClaim?: any;
    /**
     * projected items for all in one resources secrets, configmaps, and downward API
     *
     * @schema ConfigurationSpecTemplateSpecVolumes#projected
     */
    readonly projected?: ConfigurationSpecTemplateSpecVolumesProjected;
    /**
     * secret represents a secret that should populate this volume.
     * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
     *
     * @schema ConfigurationSpecTemplateSpecVolumes#secret
     */
    readonly secret?: ConfigurationSpecTemplateSpecVolumesSecret;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumes' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumes(obj: ConfigurationSpecTemplateSpecVolumes | undefined): Record<string, any> | undefined;
/**
 * EnvVar represents an environment variable present in a Container.
 *
 * @schema ConfigurationSpecTemplateSpecContainersEnv
 */
export interface ConfigurationSpecTemplateSpecContainersEnv {
    /**
     * Name of the environment variable. Must be a C_IDENTIFIER.
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnv#name
     */
    readonly name: string;
    /**
     * Variable references $(VAR_NAME) are expanded
     * using the previously defined environment variables in the container and
     * any service environment variables. If a variable cannot be resolved,
     * the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e.
     * "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)".
     * Escaped references will never be expanded, regardless of whether the variable
     * exists or not.
     * Defaults to "".
     *
     * @default .
     * @schema ConfigurationSpecTemplateSpecContainersEnv#value
     */
    readonly value?: string;
    /**
     * Source for the environment variable's value. Cannot be used if value is not empty.
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnv#valueFrom
     */
    readonly valueFrom?: ConfigurationSpecTemplateSpecContainersEnvValueFrom;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersEnv' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersEnv(obj: ConfigurationSpecTemplateSpecContainersEnv | undefined): Record<string, any> | undefined;
/**
 * EnvFromSource represents the source of a set of ConfigMaps or Secrets
 *
 * @schema ConfigurationSpecTemplateSpecContainersEnvFrom
 */
export interface ConfigurationSpecTemplateSpecContainersEnvFrom {
    /**
     * The ConfigMap to select from
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvFrom#configMapRef
     */
    readonly configMapRef?: ConfigurationSpecTemplateSpecContainersEnvFromConfigMapRef;
    /**
     * Optional text to prepend to the name of each environment variable. Must be a C_IDENTIFIER.
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvFrom#prefix
     */
    readonly prefix?: string;
    /**
     * The Secret to select from
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvFrom#secretRef
     */
    readonly secretRef?: ConfigurationSpecTemplateSpecContainersEnvFromSecretRef;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersEnvFrom' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersEnvFrom(obj: ConfigurationSpecTemplateSpecContainersEnvFrom | undefined): Record<string, any> | undefined;
/**
 * Periodic probe of container liveness.
 * Container will be restarted if the probe fails.
 * Cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
 *
 * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe
 */
export interface ConfigurationSpecTemplateSpecContainersLivenessProbe {
    /**
     * Exec specifies a command to execute in the container.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe#exec
     */
    readonly exec?: ConfigurationSpecTemplateSpecContainersLivenessProbeExec;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded.
     * Defaults to 3. Minimum value is 1.
     *
     * @default 3. Minimum value is 1.
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe#failureThreshold
     */
    readonly failureThreshold?: number;
    /**
     * GRPC specifies a GRPC HealthCheckRequest.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe#grpc
     */
    readonly grpc?: ConfigurationSpecTemplateSpecContainersLivenessProbeGrpc;
    /**
     * HTTPGet specifies an HTTP GET request to perform.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe#httpGet
     */
    readonly httpGet?: ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet;
    /**
     * Number of seconds after the container has started before liveness probes are initiated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe#initialDelaySeconds
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe#periodSeconds
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed.
     * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     *
     * @default 1. Must be 1 for liveness and startup. Minimum value is 1.
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe#successThreshold
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies a connection to a TCP port.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe#tcpSocket
     */
    readonly tcpSocket?: ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocket;
    /**
     * Number of seconds after which the probe times out.
     * Defaults to 1 second. Minimum value is 1.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @default 1 second. Minimum value is 1.
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbe#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersLivenessProbe' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersLivenessProbe(obj: ConfigurationSpecTemplateSpecContainersLivenessProbe | undefined): Record<string, any> | undefined;
/**
 * ContainerPort represents a network port in a single container.
 *
 * @schema ConfigurationSpecTemplateSpecContainersPorts
 */
export interface ConfigurationSpecTemplateSpecContainersPorts {
    /**
     * Number of port to expose on the pod's IP address.
     * This must be a valid port number, 0 < x < 65536.
     *
     * @schema ConfigurationSpecTemplateSpecContainersPorts#containerPort
     */
    readonly containerPort?: number;
    /**
     * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
     * named port in a pod must have a unique name. Name for the port that can be
     * referred to by services.
     *
     * @schema ConfigurationSpecTemplateSpecContainersPorts#name
     */
    readonly name?: string;
    /**
     * Protocol for port. Must be UDP, TCP, or SCTP.
     * Defaults to "TCP".
     *
     * @default TCP".
     * @schema ConfigurationSpecTemplateSpecContainersPorts#protocol
     */
    readonly protocol?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersPorts' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersPorts(obj: ConfigurationSpecTemplateSpecContainersPorts | undefined): Record<string, any> | undefined;
/**
 * Periodic probe of container service readiness.
 * Container will be removed from service endpoints if the probe fails.
 * Cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
 *
 * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe
 */
export interface ConfigurationSpecTemplateSpecContainersReadinessProbe {
    /**
     * Exec specifies a command to execute in the container.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe#exec
     */
    readonly exec?: ConfigurationSpecTemplateSpecContainersReadinessProbeExec;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded.
     * Defaults to 3. Minimum value is 1.
     *
     * @default 3. Minimum value is 1.
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe#failureThreshold
     */
    readonly failureThreshold?: number;
    /**
     * GRPC specifies a GRPC HealthCheckRequest.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe#grpc
     */
    readonly grpc?: ConfigurationSpecTemplateSpecContainersReadinessProbeGrpc;
    /**
     * HTTPGet specifies an HTTP GET request to perform.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe#httpGet
     */
    readonly httpGet?: ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet;
    /**
     * Number of seconds after the container has started before liveness probes are initiated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe#initialDelaySeconds
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe#periodSeconds
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed.
     * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     *
     * @default 1. Must be 1 for liveness and startup. Minimum value is 1.
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe#successThreshold
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies a connection to a TCP port.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe#tcpSocket
     */
    readonly tcpSocket?: ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocket;
    /**
     * Number of seconds after which the probe times out.
     * Defaults to 1 second. Minimum value is 1.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @default 1 second. Minimum value is 1.
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbe#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersReadinessProbe' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersReadinessProbe(obj: ConfigurationSpecTemplateSpecContainersReadinessProbe | undefined): Record<string, any> | undefined;
/**
 * Compute Resources required by this container.
 * Cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
 *
 * @schema ConfigurationSpecTemplateSpecContainersResources
 */
export interface ConfigurationSpecTemplateSpecContainersResources {
    /**
     * Limits describes the maximum amount of compute resources allowed.
     * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @schema ConfigurationSpecTemplateSpecContainersResources#limits
     */
    readonly limits?: {
        [key: string]: ConfigurationSpecTemplateSpecContainersResourcesLimits;
    };
    /**
     * Requests describes the minimum amount of compute resources required.
     * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
     * otherwise to an implementation-defined value. Requests cannot exceed Limits.
     * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @schema ConfigurationSpecTemplateSpecContainersResources#requests
     */
    readonly requests?: {
        [key: string]: ConfigurationSpecTemplateSpecContainersResourcesRequests;
    };
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersResources' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersResources(obj: ConfigurationSpecTemplateSpecContainersResources | undefined): Record<string, any> | undefined;
/**
 * SecurityContext defines the security options the container should be run with.
 * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
 * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
 *
 * @schema ConfigurationSpecTemplateSpecContainersSecurityContext
 */
export interface ConfigurationSpecTemplateSpecContainersSecurityContext {
    /**
     * AllowPrivilegeEscalation controls whether a process can gain more
     * privileges than its parent process. This bool directly controls if
     * the no_new_privs flag will be set on the container process.
     * AllowPrivilegeEscalation is true always when the container is:
     * 1) run as Privileged
     * 2) has CAP_SYS_ADMIN
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContext#allowPrivilegeEscalation
     */
    readonly allowPrivilegeEscalation?: boolean;
    /**
     * The capabilities to add/drop when running containers.
     * Defaults to the default set of capabilities granted by the container runtime.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @default the default set of capabilities granted by the container runtime.
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContext#capabilities
     */
    readonly capabilities?: ConfigurationSpecTemplateSpecContainersSecurityContextCapabilities;
    /**
     * Run container in privileged mode. This can only be set to explicitly to 'false'
     *
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContext#privileged
     */
    readonly privileged?: boolean;
    /**
     * Whether this container has a read-only root filesystem.
     * Default is false.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @default false.
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContext#readOnlyRootFilesystem
     */
    readonly readOnlyRootFilesystem?: boolean;
    /**
     * The GID to run the entrypoint of the container process.
     * Uses runtime default if unset.
     * May also be set in PodSecurityContext.  If set in both SecurityContext and
     * PodSecurityContext, the value specified in SecurityContext takes precedence.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContext#runAsGroup
     */
    readonly runAsGroup?: number;
    /**
     * Indicates that the container must run as a non-root user.
     * If true, the Kubelet will validate the image at runtime to ensure that it
     * does not run as UID 0 (root) and fail to start the container if it does.
     * If unset or false, no such validation will be performed.
     * May also be set in PodSecurityContext.  If set in both SecurityContext and
     * PodSecurityContext, the value specified in SecurityContext takes precedence.
     *
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContext#runAsNonRoot
     */
    readonly runAsNonRoot?: boolean;
    /**
     * The UID to run the entrypoint of the container process.
     * Defaults to user specified in image metadata if unspecified.
     * May also be set in PodSecurityContext.  If set in both SecurityContext and
     * PodSecurityContext, the value specified in SecurityContext takes precedence.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @default user specified in image metadata if unspecified.
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContext#runAsUser
     */
    readonly runAsUser?: number;
    /**
     * The seccomp options to use by this container. If seccomp options are
     * provided at both the pod & container level, the container options
     * override the pod options.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContext#seccompProfile
     */
    readonly seccompProfile?: ConfigurationSpecTemplateSpecContainersSecurityContextSeccompProfile;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersSecurityContext' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersSecurityContext(obj: ConfigurationSpecTemplateSpecContainersSecurityContext | undefined): Record<string, any> | undefined;
/**
 * StartupProbe indicates that the Pod has successfully initialized.
 * If specified, no other probes are executed until this completes successfully.
 * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
 * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
 * when it might take a long time to load data or warm a cache, than during steady-state operation.
 * This cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
 *
 * @schema ConfigurationSpecTemplateSpecContainersStartupProbe
 */
export interface ConfigurationSpecTemplateSpecContainersStartupProbe {
    /**
     * Exec specifies a command to execute in the container.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbe#exec
     */
    readonly exec?: ConfigurationSpecTemplateSpecContainersStartupProbeExec;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded.
     * Defaults to 3. Minimum value is 1.
     *
     * @default 3. Minimum value is 1.
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbe#failureThreshold
     */
    readonly failureThreshold?: number;
    /**
     * GRPC specifies a GRPC HealthCheckRequest.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbe#grpc
     */
    readonly grpc?: ConfigurationSpecTemplateSpecContainersStartupProbeGrpc;
    /**
     * HTTPGet specifies an HTTP GET request to perform.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbe#httpGet
     */
    readonly httpGet?: ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet;
    /**
     * Number of seconds after the container has started before liveness probes are initiated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbe#initialDelaySeconds
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbe#periodSeconds
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed.
     * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     *
     * @default 1. Must be 1 for liveness and startup. Minimum value is 1.
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbe#successThreshold
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies a connection to a TCP port.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbe#tcpSocket
     */
    readonly tcpSocket?: ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocket;
    /**
     * Number of seconds after which the probe times out.
     * Defaults to 1 second. Minimum value is 1.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @default 1 second. Minimum value is 1.
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbe#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersStartupProbe' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersStartupProbe(obj: ConfigurationSpecTemplateSpecContainersStartupProbe | undefined): Record<string, any> | undefined;
/**
 * VolumeMount describes a mounting of a Volume within a container.
 *
 * @schema ConfigurationSpecTemplateSpecContainersVolumeMounts
 */
export interface ConfigurationSpecTemplateSpecContainersVolumeMounts {
    /**
     * Path within the container at which the volume should be mounted.  Must
     * not contain ':'.
     *
     * @schema ConfigurationSpecTemplateSpecContainersVolumeMounts#mountPath
     */
    readonly mountPath: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-mount-propagation
     *
     * @schema ConfigurationSpecTemplateSpecContainersVolumeMounts#mountPropagation
     */
    readonly mountPropagation?: string;
    /**
     * This must match the Name of a Volume.
     *
     * @schema ConfigurationSpecTemplateSpecContainersVolumeMounts#name
     */
    readonly name: string;
    /**
     * Mounted read-only if true, read-write otherwise (false or unspecified).
     * Defaults to false.
     *
     * @default false.
     * @schema ConfigurationSpecTemplateSpecContainersVolumeMounts#readOnly
     */
    readonly readOnly?: boolean;
    /**
     * Path within the volume from which the container's volume should be mounted.
     * Defaults to "" (volume's root).
     *
     * @default volume's root).
     * @schema ConfigurationSpecTemplateSpecContainersVolumeMounts#subPath
     */
    readonly subPath?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersVolumeMounts' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersVolumeMounts(obj: ConfigurationSpecTemplateSpecContainersVolumeMounts | undefined): Record<string, any> | undefined;
/**
 * configMap represents a configMap that should populate this volume
 *
 * @schema ConfigurationSpecTemplateSpecVolumesConfigMap
 */
export interface ConfigurationSpecTemplateSpecVolumesConfigMap {
    /**
     * defaultMode is optional: mode bits used to set permissions on created files by default.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * Defaults to 0644.
     * Directories within the path are not affected by this setting.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @default 0644.
     * @schema ConfigurationSpecTemplateSpecVolumesConfigMap#defaultMode
     */
    readonly defaultMode?: number;
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced
     * ConfigMap will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the ConfigMap,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesConfigMap#items
     */
    readonly items?: ConfigurationSpecTemplateSpecVolumesConfigMapItems[];
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ConfigurationSpecTemplateSpecVolumesConfigMap#name
     */
    readonly name?: string;
    /**
     * optional specify whether the ConfigMap or its keys must be defined
     *
     * @schema ConfigurationSpecTemplateSpecVolumesConfigMap#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesConfigMap' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesConfigMap(obj: ConfigurationSpecTemplateSpecVolumesConfigMap | undefined): Record<string, any> | undefined;
/**
 * projected items for all in one resources secrets, configmaps, and downward API
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjected
 */
export interface ConfigurationSpecTemplateSpecVolumesProjected {
    /**
     * defaultMode are the mode bits used to set permissions on created files by default.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * Directories within the path are not affected by this setting.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjected#defaultMode
     */
    readonly defaultMode?: number;
    /**
     * sources is the list of volume projections. Each entry in this list
     * handles one source.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjected#sources
     */
    readonly sources?: ConfigurationSpecTemplateSpecVolumesProjectedSources[];
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjected' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjected(obj: ConfigurationSpecTemplateSpecVolumesProjected | undefined): Record<string, any> | undefined;
/**
 * secret represents a secret that should populate this volume.
 * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
 *
 * @schema ConfigurationSpecTemplateSpecVolumesSecret
 */
export interface ConfigurationSpecTemplateSpecVolumesSecret {
    /**
     * defaultMode is Optional: mode bits used to set permissions on created files by default.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values
     * for mode bits. Defaults to 0644.
     * Directories within the path are not affected by this setting.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @default 0644.
     * @schema ConfigurationSpecTemplateSpecVolumesSecret#defaultMode
     */
    readonly defaultMode?: number;
    /**
     * items If unspecified, each key-value pair in the Data field of the referenced
     * Secret will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the Secret,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesSecret#items
     */
    readonly items?: ConfigurationSpecTemplateSpecVolumesSecretItems[];
    /**
     * optional field specify whether the Secret or its keys must be defined
     *
     * @schema ConfigurationSpecTemplateSpecVolumesSecret#optional
     */
    readonly optional?: boolean;
    /**
     * secretName is the name of the secret in the pod's namespace to use.
     * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
     *
     * @schema ConfigurationSpecTemplateSpecVolumesSecret#secretName
     */
    readonly secretName?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesSecret' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesSecret(obj: ConfigurationSpecTemplateSpecVolumesSecret | undefined): Record<string, any> | undefined;
/**
 * Source for the environment variable's value. Cannot be used if value is not empty.
 *
 * @schema ConfigurationSpecTemplateSpecContainersEnvValueFrom
 */
export interface ConfigurationSpecTemplateSpecContainersEnvValueFrom {
    /**
     * Selects a key of a ConfigMap.
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFrom#configMapKeyRef
     */
    readonly configMapKeyRef?: ConfigurationSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-fieldref
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFrom#fieldRef
     */
    readonly fieldRef?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-fieldref
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFrom#resourceFieldRef
     */
    readonly resourceFieldRef?: any;
    /**
     * Selects a key of a secret in the pod's namespace
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFrom#secretKeyRef
     */
    readonly secretKeyRef?: ConfigurationSpecTemplateSpecContainersEnvValueFromSecretKeyRef;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersEnvValueFrom' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersEnvValueFrom(obj: ConfigurationSpecTemplateSpecContainersEnvValueFrom | undefined): Record<string, any> | undefined;
/**
 * The ConfigMap to select from
 *
 * @schema ConfigurationSpecTemplateSpecContainersEnvFromConfigMapRef
 */
export interface ConfigurationSpecTemplateSpecContainersEnvFromConfigMapRef {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvFromConfigMapRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap must be defined
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvFromConfigMapRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersEnvFromConfigMapRef' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersEnvFromConfigMapRef(obj: ConfigurationSpecTemplateSpecContainersEnvFromConfigMapRef | undefined): Record<string, any> | undefined;
/**
 * The Secret to select from
 *
 * @schema ConfigurationSpecTemplateSpecContainersEnvFromSecretRef
 */
export interface ConfigurationSpecTemplateSpecContainersEnvFromSecretRef {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvFromSecretRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the Secret must be defined
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvFromSecretRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersEnvFromSecretRef' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersEnvFromSecretRef(obj: ConfigurationSpecTemplateSpecContainersEnvFromSecretRef | undefined): Record<string, any> | undefined;
/**
 * Exec specifies a command to execute in the container.
 *
 * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeExec
 */
export interface ConfigurationSpecTemplateSpecContainersLivenessProbeExec {
    /**
     * Command is the command line to execute inside the container, the working directory for the
     * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
     * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
     * a shell, you need to explicitly call out to that shell.
     * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeExec#command
     */
    readonly command?: string[];
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersLivenessProbeExec' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersLivenessProbeExec(obj: ConfigurationSpecTemplateSpecContainersLivenessProbeExec | undefined): Record<string, any> | undefined;
/**
 * GRPC specifies a GRPC HealthCheckRequest.
 *
 * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeGrpc
 */
export interface ConfigurationSpecTemplateSpecContainersLivenessProbeGrpc {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeGrpc#port
     */
    readonly port?: number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest
     * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeGrpc#service
     */
    readonly service?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersLivenessProbeGrpc' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersLivenessProbeGrpc(obj: ConfigurationSpecTemplateSpecContainersLivenessProbeGrpc | undefined): Record<string, any> | undefined;
/**
 * HTTPGet specifies an HTTP GET request to perform.
 *
 * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet
 */
export interface ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set
     * "Host" in httpHeaders instead.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet#host
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet#httpHeaders
     */
    readonly httpHeaders?: ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders[];
    /**
     * Path to access on the HTTP server.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet#path
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet#port
     */
    readonly port?: ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetPort;
    /**
     * Scheme to use for connecting to the host.
     * Defaults to HTTP.
     *
     * @default HTTP.
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet#scheme
     */
    readonly scheme?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet(obj: ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGet | undefined): Record<string, any> | undefined;
/**
 * TCPSocket specifies a connection to a TCP port.
 *
 * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocket
 */
export interface ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocket {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocket#host
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocket#port
     */
    readonly port?: ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocketPort;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocket' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocket(obj: ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocket | undefined): Record<string, any> | undefined;
/**
 * Exec specifies a command to execute in the container.
 *
 * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeExec
 */
export interface ConfigurationSpecTemplateSpecContainersReadinessProbeExec {
    /**
     * Command is the command line to execute inside the container, the working directory for the
     * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
     * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
     * a shell, you need to explicitly call out to that shell.
     * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeExec#command
     */
    readonly command?: string[];
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersReadinessProbeExec' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersReadinessProbeExec(obj: ConfigurationSpecTemplateSpecContainersReadinessProbeExec | undefined): Record<string, any> | undefined;
/**
 * GRPC specifies a GRPC HealthCheckRequest.
 *
 * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeGrpc
 */
export interface ConfigurationSpecTemplateSpecContainersReadinessProbeGrpc {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeGrpc#port
     */
    readonly port?: number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest
     * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeGrpc#service
     */
    readonly service?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersReadinessProbeGrpc' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersReadinessProbeGrpc(obj: ConfigurationSpecTemplateSpecContainersReadinessProbeGrpc | undefined): Record<string, any> | undefined;
/**
 * HTTPGet specifies an HTTP GET request to perform.
 *
 * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet
 */
export interface ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set
     * "Host" in httpHeaders instead.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet#host
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet#httpHeaders
     */
    readonly httpHeaders?: ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders[];
    /**
     * Path to access on the HTTP server.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet#path
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet#port
     */
    readonly port?: ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetPort;
    /**
     * Scheme to use for connecting to the host.
     * Defaults to HTTP.
     *
     * @default HTTP.
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet#scheme
     */
    readonly scheme?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet(obj: ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGet | undefined): Record<string, any> | undefined;
/**
 * TCPSocket specifies a connection to a TCP port.
 *
 * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocket
 */
export interface ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocket {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocket#host
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocket#port
     */
    readonly port?: ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocketPort;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocket' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocket(obj: ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocket | undefined): Record<string, any> | undefined;
/**
 * @schema ConfigurationSpecTemplateSpecContainersResourcesLimits
 */
export declare class ConfigurationSpecTemplateSpecContainersResourcesLimits {
    readonly value: number | string;
    static fromNumber(value: number): ConfigurationSpecTemplateSpecContainersResourcesLimits;
    static fromString(value: string): ConfigurationSpecTemplateSpecContainersResourcesLimits;
    private constructor();
}
/**
 * @schema ConfigurationSpecTemplateSpecContainersResourcesRequests
 */
export declare class ConfigurationSpecTemplateSpecContainersResourcesRequests {
    readonly value: number | string;
    static fromNumber(value: number): ConfigurationSpecTemplateSpecContainersResourcesRequests;
    static fromString(value: string): ConfigurationSpecTemplateSpecContainersResourcesRequests;
    private constructor();
}
/**
 * The capabilities to add/drop when running containers.
 * Defaults to the default set of capabilities granted by the container runtime.
 * Note that this field cannot be set when spec.os.name is windows.
 *
 * @default the default set of capabilities granted by the container runtime.
 * @schema ConfigurationSpecTemplateSpecContainersSecurityContextCapabilities
 */
export interface ConfigurationSpecTemplateSpecContainersSecurityContextCapabilities {
    /**
     * This is accessible behind a feature flag - kubernetes.containerspec-addcapabilities
     *
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContextCapabilities#add
     */
    readonly add?: string[];
    /**
     * Removed capabilities
     *
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContextCapabilities#drop
     */
    readonly drop?: string[];
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersSecurityContextCapabilities' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersSecurityContextCapabilities(obj: ConfigurationSpecTemplateSpecContainersSecurityContextCapabilities | undefined): Record<string, any> | undefined;
/**
 * The seccomp options to use by this container. If seccomp options are
 * provided at both the pod & container level, the container options
 * override the pod options.
 * Note that this field cannot be set when spec.os.name is windows.
 *
 * @schema ConfigurationSpecTemplateSpecContainersSecurityContextSeccompProfile
 */
export interface ConfigurationSpecTemplateSpecContainersSecurityContextSeccompProfile {
    /**
     * localhostProfile indicates a profile defined in a file on the node should be used.
     * The profile must be preconfigured on the node to work.
     * Must be a descending path, relative to the kubelet's configured seccomp profile location.
     * Must be set if type is "Localhost". Must NOT be set for any other type.
     *
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContextSeccompProfile#localhostProfile
     */
    readonly localhostProfile?: string;
    /**
     * type indicates which kind of seccomp profile will be applied.
     * Valid options are:
     *
     * Localhost - a profile defined in a file on the node should be used.
     * RuntimeDefault - the container runtime default profile should be used.
     * Unconfined - no profile should be applied.
     *
     * @schema ConfigurationSpecTemplateSpecContainersSecurityContextSeccompProfile#type
     */
    readonly type: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersSecurityContextSeccompProfile' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersSecurityContextSeccompProfile(obj: ConfigurationSpecTemplateSpecContainersSecurityContextSeccompProfile | undefined): Record<string, any> | undefined;
/**
 * Exec specifies a command to execute in the container.
 *
 * @schema ConfigurationSpecTemplateSpecContainersStartupProbeExec
 */
export interface ConfigurationSpecTemplateSpecContainersStartupProbeExec {
    /**
     * Command is the command line to execute inside the container, the working directory for the
     * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
     * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
     * a shell, you need to explicitly call out to that shell.
     * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeExec#command
     */
    readonly command?: string[];
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersStartupProbeExec' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersStartupProbeExec(obj: ConfigurationSpecTemplateSpecContainersStartupProbeExec | undefined): Record<string, any> | undefined;
/**
 * GRPC specifies a GRPC HealthCheckRequest.
 *
 * @schema ConfigurationSpecTemplateSpecContainersStartupProbeGrpc
 */
export interface ConfigurationSpecTemplateSpecContainersStartupProbeGrpc {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeGrpc#port
     */
    readonly port?: number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest
     * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeGrpc#service
     */
    readonly service?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersStartupProbeGrpc' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersStartupProbeGrpc(obj: ConfigurationSpecTemplateSpecContainersStartupProbeGrpc | undefined): Record<string, any> | undefined;
/**
 * HTTPGet specifies an HTTP GET request to perform.
 *
 * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet
 */
export interface ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set
     * "Host" in httpHeaders instead.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet#host
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet#httpHeaders
     */
    readonly httpHeaders?: ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders[];
    /**
     * Path to access on the HTTP server.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet#path
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet#port
     */
    readonly port?: ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetPort;
    /**
     * Scheme to use for connecting to the host.
     * Defaults to HTTP.
     *
     * @default HTTP.
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet#scheme
     */
    readonly scheme?: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet(obj: ConfigurationSpecTemplateSpecContainersStartupProbeHttpGet | undefined): Record<string, any> | undefined;
/**
 * TCPSocket specifies a connection to a TCP port.
 *
 * @schema ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocket
 */
export interface ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocket {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocket#host
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocket#port
     */
    readonly port?: ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocketPort;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocket' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocket(obj: ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocket | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema ConfigurationSpecTemplateSpecVolumesConfigMapItems
 */
export interface ConfigurationSpecTemplateSpecVolumesConfigMapItems {
    /**
     * key is the key to project.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesConfigMapItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesConfigMapItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesConfigMapItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesConfigMapItems' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesConfigMapItems(obj: ConfigurationSpecTemplateSpecVolumesConfigMapItems | undefined): Record<string, any> | undefined;
/**
 * Projection that may be projected along with other supported volume types.
 * Exactly one of these fields must be set.
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSources
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSources {
    /**
     * configMap information about the configMap data to project
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSources#configMap
     */
    readonly configMap?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMap;
    /**
     * downwardAPI information about the downwardAPI data to project
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSources#downwardAPI
     */
    readonly downwardApi?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApi;
    /**
     * secret information about the secret data to project
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSources#secret
     */
    readonly secret?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecret;
    /**
     * serviceAccountToken is information about the serviceAccountToken data to project
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSources#serviceAccountToken
     */
    readonly serviceAccountToken?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSources' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSources(obj: ConfigurationSpecTemplateSpecVolumesProjectedSources | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema ConfigurationSpecTemplateSpecVolumesSecretItems
 */
export interface ConfigurationSpecTemplateSpecVolumesSecretItems {
    /**
     * key is the key to project.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesSecretItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesSecretItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesSecretItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesSecretItems' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesSecretItems(obj: ConfigurationSpecTemplateSpecVolumesSecretItems | undefined): Record<string, any> | undefined;
/**
 * Selects a key of a ConfigMap.
 *
 * @schema ConfigurationSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef
 */
export interface ConfigurationSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef {
    /**
     * The key to select.
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef#key
     */
    readonly key: string;
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap or its key must be defined
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef(obj: ConfigurationSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef | undefined): Record<string, any> | undefined;
/**
 * Selects a key of a secret in the pod's namespace
 *
 * @schema ConfigurationSpecTemplateSpecContainersEnvValueFromSecretKeyRef
 */
export interface ConfigurationSpecTemplateSpecContainersEnvValueFromSecretKeyRef {
    /**
     * The key of the secret to select from.  Must be a valid secret key.
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFromSecretKeyRef#key
     */
    readonly key: string;
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFromSecretKeyRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the Secret or its key must be defined
     *
     * @schema ConfigurationSpecTemplateSpecContainersEnvValueFromSecretKeyRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersEnvValueFromSecretKeyRef' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersEnvValueFromSecretKeyRef(obj: ConfigurationSpecTemplateSpecContainersEnvValueFromSecretKeyRef | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 *
 * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders
 */
export interface ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders {
    /**
     * The header field name.
     * This will be canonicalized upon output, so case-variant names will be understood as the same header.
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders#name
     */
    readonly name: string;
    /**
     * The header field value
     *
     * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders(obj: ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders | undefined): Record<string, any> | undefined;
/**
 * Name or number of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetPort
 */
export declare class ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetPort {
    readonly value: number | string;
    static fromNumber(value: number): ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetPort;
    static fromString(value: string): ConfigurationSpecTemplateSpecContainersLivenessProbeHttpGetPort;
    private constructor();
}
/**
 * Number or name of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocketPort
 */
export declare class ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocketPort {
    readonly value: number | string;
    static fromNumber(value: number): ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocketPort;
    static fromString(value: string): ConfigurationSpecTemplateSpecContainersLivenessProbeTcpSocketPort;
    private constructor();
}
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 *
 * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders
 */
export interface ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders {
    /**
     * The header field name.
     * This will be canonicalized upon output, so case-variant names will be understood as the same header.
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders#name
     */
    readonly name: string;
    /**
     * The header field value
     *
     * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders(obj: ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders | undefined): Record<string, any> | undefined;
/**
 * Name or number of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetPort
 */
export declare class ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetPort {
    readonly value: number | string;
    static fromNumber(value: number): ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetPort;
    static fromString(value: string): ConfigurationSpecTemplateSpecContainersReadinessProbeHttpGetPort;
    private constructor();
}
/**
 * Number or name of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocketPort
 */
export declare class ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocketPort {
    readonly value: number | string;
    static fromNumber(value: number): ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocketPort;
    static fromString(value: string): ConfigurationSpecTemplateSpecContainersReadinessProbeTcpSocketPort;
    private constructor();
}
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 *
 * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders
 */
export interface ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders {
    /**
     * The header field name.
     * This will be canonicalized upon output, so case-variant names will be understood as the same header.
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders#name
     */
    readonly name: string;
    /**
     * The header field value
     *
     * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders(obj: ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders | undefined): Record<string, any> | undefined;
/**
 * Name or number of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetPort
 */
export declare class ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetPort {
    readonly value: number | string;
    static fromNumber(value: number): ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetPort;
    static fromString(value: string): ConfigurationSpecTemplateSpecContainersStartupProbeHttpGetPort;
    private constructor();
}
/**
 * Number or name of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocketPort
 */
export declare class ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocketPort {
    readonly value: number | string;
    static fromNumber(value: number): ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocketPort;
    static fromString(value: string): ConfigurationSpecTemplateSpecContainersStartupProbeTcpSocketPort;
    private constructor();
}
/**
 * configMap information about the configMap data to project
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMap
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMap {
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced
     * ConfigMap will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the ConfigMap,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMap#items
     */
    readonly items?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMapItems[];
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMap#name
     */
    readonly name?: string;
    /**
     * optional specify whether the ConfigMap or its keys must be defined
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMap#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMap' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMap(obj: ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMap | undefined): Record<string, any> | undefined;
/**
 * downwardAPI information about the downwardAPI data to project
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApi
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApi {
    /**
     * Items is a list of DownwardAPIVolume file
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApi#items
     */
    readonly items?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems[];
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApi' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApi(obj: ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApi | undefined): Record<string, any> | undefined;
/**
 * secret information about the secret data to project
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecret
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecret {
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced
     * Secret will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the Secret,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecret#items
     */
    readonly items?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecretItems[];
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecret#name
     */
    readonly name?: string;
    /**
     * optional field specify whether the Secret or its key must be defined
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecret#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecret' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecret(obj: ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecret | undefined): Record<string, any> | undefined;
/**
 * serviceAccountToken is information about the serviceAccountToken data to project
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken {
    /**
     * audience is the intended audience of the token. A recipient of a token
     * must identify itself with an identifier specified in the audience of the
     * token, and otherwise should reject the token. The audience defaults to the
     * identifier of the apiserver.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken#audience
     */
    readonly audience?: string;
    /**
     * expirationSeconds is the requested duration of validity of the service
     * account token. As the token approaches expiration, the kubelet volume
     * plugin will proactively rotate the service account token. The kubelet will
     * start trying to rotate the token if the token is older than 80 percent of
     * its time to live or if the token is older than 24 hours.Defaults to 1 hour
     * and must be at least 10 minutes.
     *
     * @default 1 hour
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken#expirationSeconds
     */
    readonly expirationSeconds?: number;
    /**
     * path is the path relative to the mount point of the file to project the
     * token into.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken(obj: ConfigurationSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMapItems
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMapItems {
    /**
     * key is the key to project.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMapItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMapItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMapItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMapItems' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMapItems(obj: ConfigurationSpecTemplateSpecVolumesProjectedSourcesConfigMapItems | undefined): Record<string, any> | undefined;
/**
 * DownwardAPIVolumeFile represents information to create the file containing the pod field
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems {
    /**
     * Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems#fieldRef
     */
    readonly fieldRef?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef;
    /**
     * Optional: mode bits used to set permissions on this file, must be an octal value
     * between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems#mode
     */
    readonly mode?: number;
    /**
     * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems#path
     */
    readonly path: string;
    /**
     * Selects a resource of the container: only resources limits and requests
     * (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems#resourceFieldRef
     */
    readonly resourceFieldRef?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems(obj: ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecretItems
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecretItems {
    /**
     * key is the key to project.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecretItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecretItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecretItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecretItems' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecretItems(obj: ConfigurationSpecTemplateSpecVolumesProjectedSourcesSecretItems | undefined): Record<string, any> | undefined;
/**
 * Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef {
    /**
     * Version of the schema the FieldPath is written in terms of, defaults to "v1".
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef#apiVersion
     */
    readonly apiVersion?: string;
    /**
     * Path of the field to select in the specified API version.
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef#fieldPath
     */
    readonly fieldPath: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef(obj: ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef | undefined): Record<string, any> | undefined;
/**
 * Selects a resource of the container: only resources limits and requests
 * (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef
 */
export interface ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef {
    /**
     * Container name: required for volumes, optional for env vars
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef#containerName
     */
    readonly containerName?: string;
    /**
     * Specifies the output format of the exposed resources, defaults to "1"
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef#divisor
     */
    readonly divisor?: ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor;
    /**
     * Required: resource to select
     *
     * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef#resource
     */
    readonly resource: string;
}
/**
 * Converts an object of type 'ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef' to JSON representation.
 */
export declare function toJson_ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef(obj: ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef | undefined): Record<string, any> | undefined;
/**
 * Specifies the output format of the exposed resources, defaults to "1"
 *
 * @schema ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor
 */
export declare class ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor {
    readonly value: number | string;
    static fromNumber(value: number): ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor;
    static fromString(value: string): ConfigurationSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor;
    private constructor();
}
/**
 * DomainMapping is a mapping from a custom hostname to an Addressable.
 *
 * @schema DomainMapping
 */
export declare class DomainMapping extends ApiObject {
    /**
     * Returns the apiVersion and kind for "DomainMapping"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "DomainMapping".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: DomainMappingProps): any;
    /**
     * Defines a "DomainMapping" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: DomainMappingProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * DomainMapping is a mapping from a custom hostname to an Addressable.
 *
 * @schema DomainMapping
 */
export interface DomainMappingProps {
    /**
     * @schema DomainMapping#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec is the desired state of the DomainMapping.
     * More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     *
     * @schema DomainMapping#spec
     */
    readonly spec?: DomainMappingSpec;
}
/**
 * Converts an object of type 'DomainMappingProps' to JSON representation.
 */
export declare function toJson_DomainMappingProps(obj: DomainMappingProps | undefined): Record<string, any> | undefined;
/**
 * Spec is the desired state of the DomainMapping.
 * More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
 *
 * @schema DomainMappingSpec
 */
export interface DomainMappingSpec {
    /**
     * Ref specifies the target of the Domain Mapping.
     *
     * The object identified by the Ref must be an Addressable with a URL of the
     * form `{name}.{namespace}.{domain}` where `{domain}` is the cluster domain,
     * and `{name}` and `{namespace}` are the name and namespace of a Kubernetes
     * Service.
     *
     * This contract is satisfied by Knative types such as Knative Services and
     * Knative Routes, and by Kubernetes Services.
     *
     * @schema DomainMappingSpec#ref
     */
    readonly ref: DomainMappingSpecRef;
    /**
     * TLS allows the DomainMapping to terminate TLS traffic with an existing secret.
     *
     * @schema DomainMappingSpec#tls
     */
    readonly tls?: DomainMappingSpecTls;
}
/**
 * Converts an object of type 'DomainMappingSpec' to JSON representation.
 */
export declare function toJson_DomainMappingSpec(obj: DomainMappingSpec | undefined): Record<string, any> | undefined;
/**
 * Ref specifies the target of the Domain Mapping.
 *
 * The object identified by the Ref must be an Addressable with a URL of the
 * form `{name}.{namespace}.{domain}` where `{domain}` is the cluster domain,
 * and `{name}` and `{namespace}` are the name and namespace of a Kubernetes
 * Service.
 *
 * This contract is satisfied by Knative types such as Knative Services and
 * Knative Routes, and by Kubernetes Services.
 *
 * @schema DomainMappingSpecRef
 */
export interface DomainMappingSpecRef {
    /**
     * Address points to a specific Address Name.
     *
     * @schema DomainMappingSpecRef#address
     */
    readonly address?: string;
    /**
     * API version of the referent.
     *
     * @schema DomainMappingSpecRef#apiVersion
     */
    readonly apiVersion?: string;
    /**
     * Group of the API, without the version of the group. This can be used as an alternative to the APIVersion, and then resolved using ResolveGroup.
     * Note: This API is EXPERIMENTAL and might break anytime. For more details: https://github.com/knative/eventing/issues/5086
     *
     * @schema DomainMappingSpecRef#group
     */
    readonly group?: string;
    /**
     * Kind of the referent.
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     *
     * @schema DomainMappingSpecRef#kind
     */
    readonly kind: string;
    /**
     * Name of the referent.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema DomainMappingSpecRef#name
     */
    readonly name: string;
    /**
     * Namespace of the referent.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
     * This is optional field, it gets defaulted to the object holding it if left out.
     *
     * @schema DomainMappingSpecRef#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'DomainMappingSpecRef' to JSON representation.
 */
export declare function toJson_DomainMappingSpecRef(obj: DomainMappingSpecRef | undefined): Record<string, any> | undefined;
/**
 * TLS allows the DomainMapping to terminate TLS traffic with an existing secret.
 *
 * @schema DomainMappingSpecTls
 */
export interface DomainMappingSpecTls {
    /**
     * SecretName is the name of the existing secret used to terminate TLS traffic.
     *
     * @schema DomainMappingSpecTls#secretName
     */
    readonly secretName: string;
}
/**
 * Converts an object of type 'DomainMappingSpecTls' to JSON representation.
 */
export declare function toJson_DomainMappingSpecTls(obj: DomainMappingSpecTls | undefined): Record<string, any> | undefined;
/**
 * Revision is an immutable snapshot of code and configuration.  A revision
references a container image. Revisions are created by updates to a
Configuration.

See also: https://github.com/knative/serving/blob/main/docs/spec/overview.md#revision
 *
 * @schema Revision
 */
export declare class Revision extends ApiObject {
    /**
     * Returns the apiVersion and kind for "Revision"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Revision".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: RevisionProps): any;
    /**
     * Defines a "Revision" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: RevisionProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Revision is an immutable snapshot of code and configuration.  A revision
 * references a container image. Revisions are created by updates to a
 * Configuration.
 *
 * See also: https://github.com/knative/serving/blob/main/docs/spec/overview.md#revision
 *
 * @schema Revision
 */
export interface RevisionProps {
    /**
     * @schema Revision#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * RevisionSpec holds the desired state of the Revision (from the client).
     *
     * @schema Revision#spec
     */
    readonly spec?: RevisionSpec;
}
/**
 * Converts an object of type 'RevisionProps' to JSON representation.
 */
export declare function toJson_RevisionProps(obj: RevisionProps | undefined): Record<string, any> | undefined;
/**
 * RevisionSpec holds the desired state of the Revision (from the client).
 *
 * @schema RevisionSpec
 */
export interface RevisionSpec {
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-affinity
     *
     * @schema RevisionSpec#affinity
     */
    readonly affinity?: any;
    /**
     * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
     *
     * @schema RevisionSpec#automountServiceAccountToken
     */
    readonly automountServiceAccountToken?: boolean;
    /**
     * ContainerConcurrency specifies the maximum allowed in-flight (concurrent)
     * requests per container of the Revision.  Defaults to `0` which means
     * concurrency to the application is not limited, and the system decides the
     * target concurrency for the autoscaler.
     *
     * @default 0` which means
     * @schema RevisionSpec#containerConcurrency
     */
    readonly containerConcurrency?: number;
    /**
     * List of containers belonging to the pod.
     * Containers cannot currently be added or removed.
     * There must be at least one container in a Pod.
     * Cannot be updated.
     *
     * @schema RevisionSpec#containers
     */
    readonly containers: RevisionSpecContainers[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-dnsconfig
     *
     * @schema RevisionSpec#dnsConfig
     */
    readonly dnsConfig?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-dnspolicy
     *
     * @schema RevisionSpec#dnsPolicy
     */
    readonly dnsPolicy?: string;
    /**
     * EnableServiceLinks indicates whether information aboutservices should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Knative defaults this to false.
     *
     * @schema RevisionSpec#enableServiceLinks
     */
    readonly enableServiceLinks?: boolean;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostaliases
     *
     * @schema RevisionSpec#hostAliases
     */
    readonly hostAliases?: any[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostipc
     *
     * @schema RevisionSpec#hostIPC
     */
    readonly hostIpc?: boolean;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostnetwork
     *
     * @schema RevisionSpec#hostNetwork
     */
    readonly hostNetwork?: boolean;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostpid
     *
     * @schema RevisionSpec#hostPID
     */
    readonly hostPid?: boolean;
    /**
     * IdleTimeoutSeconds is the maximum duration in seconds a request will be allowed
     * to stay open while not receiving any bytes from the user's application. If
     * unspecified, a system default will be provided.
     *
     * @schema RevisionSpec#idleTimeoutSeconds
     */
    readonly idleTimeoutSeconds?: number;
    /**
     * ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec.
     * If specified, these secrets will be passed to individual puller implementations for them to use.
     * More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
     *
     * @schema RevisionSpec#imagePullSecrets
     */
    readonly imagePullSecrets?: RevisionSpecImagePullSecrets[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-init-containers
     *
     * @schema RevisionSpec#initContainers
     */
    readonly initContainers?: any[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-nodeselector
     *
     * @schema RevisionSpec#nodeSelector
     */
    readonly nodeSelector?: {
        [key: string]: string;
    };
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-priorityclassname
     *
     * @schema RevisionSpec#priorityClassName
     */
    readonly priorityClassName?: string;
    /**
     * ResponseStartTimeoutSeconds is the maximum duration in seconds that the request
     * routing layer will wait for a request delivered to a container to begin
     * sending any network traffic.
     *
     * @schema RevisionSpec#responseStartTimeoutSeconds
     */
    readonly responseStartTimeoutSeconds?: number;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-runtimeclassname
     *
     * @schema RevisionSpec#runtimeClassName
     */
    readonly runtimeClassName?: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-schedulername
     *
     * @schema RevisionSpec#schedulerName
     */
    readonly schedulerName?: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-securitycontext
     *
     * @schema RevisionSpec#securityContext
     */
    readonly securityContext?: any;
    /**
     * ServiceAccountName is the name of the ServiceAccount to use to run this pod.
     * More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
     *
     * @schema RevisionSpec#serviceAccountName
     */
    readonly serviceAccountName?: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-shareprocessnamespace
     *
     * @schema RevisionSpec#shareProcessNamespace
     */
    readonly shareProcessNamespace?: boolean;
    /**
     * TimeoutSeconds is the maximum duration in seconds that the request instance
     * is allowed to respond to a request. If unspecified, a system default will
     * be provided.
     *
     * @schema RevisionSpec#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-tolerations
     *
     * @schema RevisionSpec#tolerations
     */
    readonly tolerations?: any[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-topologyspreadconstraints
     *
     * @schema RevisionSpec#topologySpreadConstraints
     */
    readonly topologySpreadConstraints?: any[];
    /**
     * List of volumes that can be mounted by containers belonging to the pod.
     * More info: https://kubernetes.io/docs/concepts/storage/volumes
     *
     * @schema RevisionSpec#volumes
     */
    readonly volumes?: RevisionSpecVolumes[];
}
/**
 * Converts an object of type 'RevisionSpec' to JSON representation.
 */
export declare function toJson_RevisionSpec(obj: RevisionSpec | undefined): Record<string, any> | undefined;
/**
 * A single application container that you want to run within a pod.
 *
 * @schema RevisionSpecContainers
 */
export interface RevisionSpecContainers {
    /**
     * Arguments to the entrypoint.
     * The container image's CMD is used if this is not provided.
     * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
     * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
     * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
     * of whether the variable exists or not. Cannot be updated.
     * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     *
     * @schema RevisionSpecContainers#args
     */
    readonly args?: string[];
    /**
     * Entrypoint array. Not executed within a shell.
     * The container image's ENTRYPOINT is used if this is not provided.
     * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
     * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
     * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
     * of whether the variable exists or not. Cannot be updated.
     * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     *
     * @schema RevisionSpecContainers#command
     */
    readonly command?: string[];
    /**
     * List of environment variables to set in the container.
     * Cannot be updated.
     *
     * @schema RevisionSpecContainers#env
     */
    readonly env?: RevisionSpecContainersEnv[];
    /**
     * List of sources to populate environment variables in the container.
     * The keys defined within a source must be a C_IDENTIFIER. All invalid keys
     * will be reported as an event when the container is starting. When a key exists in multiple
     * sources, the value associated with the last source will take precedence.
     * Values defined by an Env with a duplicate key will take precedence.
     * Cannot be updated.
     *
     * @schema RevisionSpecContainers#envFrom
     */
    readonly envFrom?: RevisionSpecContainersEnvFrom[];
    /**
     * Container image name.
     * More info: https://kubernetes.io/docs/concepts/containers/images
     * This field is optional to allow higher level config management to default or override
     * container images in workload controllers like Deployments and StatefulSets.
     *
     * @schema RevisionSpecContainers#image
     */
    readonly image?: string;
    /**
     * Image pull policy.
     * One of Always, Never, IfNotPresent.
     * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
     *
     * @default Always if :latest tag is specified, or IfNotPresent otherwise.
     * @schema RevisionSpecContainers#imagePullPolicy
     */
    readonly imagePullPolicy?: string;
    /**
     * Periodic probe of container liveness.
     * Container will be restarted if the probe fails.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema RevisionSpecContainers#livenessProbe
     */
    readonly livenessProbe?: RevisionSpecContainersLivenessProbe;
    /**
     * Name of the container specified as a DNS_LABEL.
     * Each container in a pod must have a unique name (DNS_LABEL).
     * Cannot be updated.
     *
     * @schema RevisionSpecContainers#name
     */
    readonly name?: string;
    /**
     * List of ports to expose from the container. Not specifying a port here
     * DOES NOT prevent that port from being exposed. Any port which is
     * listening on the default "0.0.0.0" address inside a container will be
     * accessible from the network.
     * Modifying this array with strategic merge patch may corrupt the data.
     * For more information See https://github.com/kubernetes/kubernetes/issues/108255.
     * Cannot be updated.
     *
     * @schema RevisionSpecContainers#ports
     */
    readonly ports?: RevisionSpecContainersPorts[];
    /**
     * Periodic probe of container service readiness.
     * Container will be removed from service endpoints if the probe fails.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema RevisionSpecContainers#readinessProbe
     */
    readonly readinessProbe?: RevisionSpecContainersReadinessProbe;
    /**
     * Compute Resources required by this container.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @schema RevisionSpecContainers#resources
     */
    readonly resources?: RevisionSpecContainersResources;
    /**
     * SecurityContext defines the security options the container should be run with.
     * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
     * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
     *
     * @schema RevisionSpecContainers#securityContext
     */
    readonly securityContext?: RevisionSpecContainersSecurityContext;
    /**
     * StartupProbe indicates that the Pod has successfully initialized.
     * If specified, no other probes are executed until this completes successfully.
     * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
     * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
     * when it might take a long time to load data or warm a cache, than during steady-state operation.
     * This cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema RevisionSpecContainers#startupProbe
     */
    readonly startupProbe?: RevisionSpecContainersStartupProbe;
    /**
     * Optional: Path at which the file to which the container's termination message
     * will be written is mounted into the container's filesystem.
     * Message written is intended to be brief final status, such as an assertion failure message.
     * Will be truncated by the node if greater than 4096 bytes. The total message length across
     * all containers will be limited to 12kb.
     * Defaults to /dev/termination-log.
     * Cannot be updated.
     *
     * @default dev/termination-log.
     * @schema RevisionSpecContainers#terminationMessagePath
     */
    readonly terminationMessagePath?: string;
    /**
     * Indicate how the termination message should be populated. File will use the contents of
     * terminationMessagePath to populate the container status message on both success and failure.
     * FallbackToLogsOnError will use the last chunk of container log output if the termination
     * message file is empty and the container exited with an error.
     * The log output is limited to 2048 bytes or 80 lines, whichever is smaller.
     * Defaults to File.
     * Cannot be updated.
     *
     * @default File.
     * @schema RevisionSpecContainers#terminationMessagePolicy
     */
    readonly terminationMessagePolicy?: string;
    /**
     * Pod volumes to mount into the container's filesystem.
     * Cannot be updated.
     *
     * @schema RevisionSpecContainers#volumeMounts
     */
    readonly volumeMounts?: RevisionSpecContainersVolumeMounts[];
    /**
     * Container's working directory.
     * If not specified, the container runtime's default will be used, which
     * might be configured in the container image.
     * Cannot be updated.
     *
     * @schema RevisionSpecContainers#workingDir
     */
    readonly workingDir?: string;
}
/**
 * Converts an object of type 'RevisionSpecContainers' to JSON representation.
 */
export declare function toJson_RevisionSpecContainers(obj: RevisionSpecContainers | undefined): Record<string, any> | undefined;
/**
 * LocalObjectReference contains enough information to let you locate the
 * referenced object inside the same namespace.
 *
 * @schema RevisionSpecImagePullSecrets
 */
export interface RevisionSpecImagePullSecrets {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema RevisionSpecImagePullSecrets#name
     */
    readonly name?: string;
}
/**
 * Converts an object of type 'RevisionSpecImagePullSecrets' to JSON representation.
 */
export declare function toJson_RevisionSpecImagePullSecrets(obj: RevisionSpecImagePullSecrets | undefined): Record<string, any> | undefined;
/**
 * Volume represents a named volume in a pod that may be accessed by any container in the pod.
 *
 * @schema RevisionSpecVolumes
 */
export interface RevisionSpecVolumes {
    /**
     * configMap represents a configMap that should populate this volume
     *
     * @schema RevisionSpecVolumes#configMap
     */
    readonly configMap?: RevisionSpecVolumesConfigMap;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-csi
     *
     * @schema RevisionSpecVolumes#csi
     */
    readonly csi?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-emptydir
     *
     * @schema RevisionSpecVolumes#emptyDir
     */
    readonly emptyDir?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-hostpath
     *
     * @schema RevisionSpecVolumes#hostPath
     */
    readonly hostPath?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-image
     *
     * @schema RevisionSpecVolumes#image
     */
    readonly image?: any;
    /**
     * name of the volume.
     * Must be a DNS_LABEL and unique within the pod.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema RevisionSpecVolumes#name
     */
    readonly name: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-persistent-volume-claim
     *
     * @schema RevisionSpecVolumes#persistentVolumeClaim
     */
    readonly persistentVolumeClaim?: any;
    /**
     * projected items for all in one resources secrets, configmaps, and downward API
     *
     * @schema RevisionSpecVolumes#projected
     */
    readonly projected?: RevisionSpecVolumesProjected;
    /**
     * secret represents a secret that should populate this volume.
     * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
     *
     * @schema RevisionSpecVolumes#secret
     */
    readonly secret?: RevisionSpecVolumesSecret;
}
/**
 * Converts an object of type 'RevisionSpecVolumes' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumes(obj: RevisionSpecVolumes | undefined): Record<string, any> | undefined;
/**
 * EnvVar represents an environment variable present in a Container.
 *
 * @schema RevisionSpecContainersEnv
 */
export interface RevisionSpecContainersEnv {
    /**
     * Name of the environment variable. Must be a C_IDENTIFIER.
     *
     * @schema RevisionSpecContainersEnv#name
     */
    readonly name: string;
    /**
     * Variable references $(VAR_NAME) are expanded
     * using the previously defined environment variables in the container and
     * any service environment variables. If a variable cannot be resolved,
     * the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e.
     * "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)".
     * Escaped references will never be expanded, regardless of whether the variable
     * exists or not.
     * Defaults to "".
     *
     * @default .
     * @schema RevisionSpecContainersEnv#value
     */
    readonly value?: string;
    /**
     * Source for the environment variable's value. Cannot be used if value is not empty.
     *
     * @schema RevisionSpecContainersEnv#valueFrom
     */
    readonly valueFrom?: RevisionSpecContainersEnvValueFrom;
}
/**
 * Converts an object of type 'RevisionSpecContainersEnv' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersEnv(obj: RevisionSpecContainersEnv | undefined): Record<string, any> | undefined;
/**
 * EnvFromSource represents the source of a set of ConfigMaps or Secrets
 *
 * @schema RevisionSpecContainersEnvFrom
 */
export interface RevisionSpecContainersEnvFrom {
    /**
     * The ConfigMap to select from
     *
     * @schema RevisionSpecContainersEnvFrom#configMapRef
     */
    readonly configMapRef?: RevisionSpecContainersEnvFromConfigMapRef;
    /**
     * Optional text to prepend to the name of each environment variable. Must be a C_IDENTIFIER.
     *
     * @schema RevisionSpecContainersEnvFrom#prefix
     */
    readonly prefix?: string;
    /**
     * The Secret to select from
     *
     * @schema RevisionSpecContainersEnvFrom#secretRef
     */
    readonly secretRef?: RevisionSpecContainersEnvFromSecretRef;
}
/**
 * Converts an object of type 'RevisionSpecContainersEnvFrom' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersEnvFrom(obj: RevisionSpecContainersEnvFrom | undefined): Record<string, any> | undefined;
/**
 * Periodic probe of container liveness.
 * Container will be restarted if the probe fails.
 * Cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
 *
 * @schema RevisionSpecContainersLivenessProbe
 */
export interface RevisionSpecContainersLivenessProbe {
    /**
     * Exec specifies a command to execute in the container.
     *
     * @schema RevisionSpecContainersLivenessProbe#exec
     */
    readonly exec?: RevisionSpecContainersLivenessProbeExec;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded.
     * Defaults to 3. Minimum value is 1.
     *
     * @default 3. Minimum value is 1.
     * @schema RevisionSpecContainersLivenessProbe#failureThreshold
     */
    readonly failureThreshold?: number;
    /**
     * GRPC specifies a GRPC HealthCheckRequest.
     *
     * @schema RevisionSpecContainersLivenessProbe#grpc
     */
    readonly grpc?: RevisionSpecContainersLivenessProbeGrpc;
    /**
     * HTTPGet specifies an HTTP GET request to perform.
     *
     * @schema RevisionSpecContainersLivenessProbe#httpGet
     */
    readonly httpGet?: RevisionSpecContainersLivenessProbeHttpGet;
    /**
     * Number of seconds after the container has started before liveness probes are initiated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema RevisionSpecContainersLivenessProbe#initialDelaySeconds
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe.
     *
     * @schema RevisionSpecContainersLivenessProbe#periodSeconds
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed.
     * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     *
     * @default 1. Must be 1 for liveness and startup. Minimum value is 1.
     * @schema RevisionSpecContainersLivenessProbe#successThreshold
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies a connection to a TCP port.
     *
     * @schema RevisionSpecContainersLivenessProbe#tcpSocket
     */
    readonly tcpSocket?: RevisionSpecContainersLivenessProbeTcpSocket;
    /**
     * Number of seconds after which the probe times out.
     * Defaults to 1 second. Minimum value is 1.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @default 1 second. Minimum value is 1.
     * @schema RevisionSpecContainersLivenessProbe#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
}
/**
 * Converts an object of type 'RevisionSpecContainersLivenessProbe' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersLivenessProbe(obj: RevisionSpecContainersLivenessProbe | undefined): Record<string, any> | undefined;
/**
 * ContainerPort represents a network port in a single container.
 *
 * @schema RevisionSpecContainersPorts
 */
export interface RevisionSpecContainersPorts {
    /**
     * Number of port to expose on the pod's IP address.
     * This must be a valid port number, 0 < x < 65536.
     *
     * @schema RevisionSpecContainersPorts#containerPort
     */
    readonly containerPort?: number;
    /**
     * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
     * named port in a pod must have a unique name. Name for the port that can be
     * referred to by services.
     *
     * @schema RevisionSpecContainersPorts#name
     */
    readonly name?: string;
    /**
     * Protocol for port. Must be UDP, TCP, or SCTP.
     * Defaults to "TCP".
     *
     * @default TCP".
     * @schema RevisionSpecContainersPorts#protocol
     */
    readonly protocol?: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersPorts' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersPorts(obj: RevisionSpecContainersPorts | undefined): Record<string, any> | undefined;
/**
 * Periodic probe of container service readiness.
 * Container will be removed from service endpoints if the probe fails.
 * Cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
 *
 * @schema RevisionSpecContainersReadinessProbe
 */
export interface RevisionSpecContainersReadinessProbe {
    /**
     * Exec specifies a command to execute in the container.
     *
     * @schema RevisionSpecContainersReadinessProbe#exec
     */
    readonly exec?: RevisionSpecContainersReadinessProbeExec;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded.
     * Defaults to 3. Minimum value is 1.
     *
     * @default 3. Minimum value is 1.
     * @schema RevisionSpecContainersReadinessProbe#failureThreshold
     */
    readonly failureThreshold?: number;
    /**
     * GRPC specifies a GRPC HealthCheckRequest.
     *
     * @schema RevisionSpecContainersReadinessProbe#grpc
     */
    readonly grpc?: RevisionSpecContainersReadinessProbeGrpc;
    /**
     * HTTPGet specifies an HTTP GET request to perform.
     *
     * @schema RevisionSpecContainersReadinessProbe#httpGet
     */
    readonly httpGet?: RevisionSpecContainersReadinessProbeHttpGet;
    /**
     * Number of seconds after the container has started before liveness probes are initiated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema RevisionSpecContainersReadinessProbe#initialDelaySeconds
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe.
     *
     * @schema RevisionSpecContainersReadinessProbe#periodSeconds
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed.
     * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     *
     * @default 1. Must be 1 for liveness and startup. Minimum value is 1.
     * @schema RevisionSpecContainersReadinessProbe#successThreshold
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies a connection to a TCP port.
     *
     * @schema RevisionSpecContainersReadinessProbe#tcpSocket
     */
    readonly tcpSocket?: RevisionSpecContainersReadinessProbeTcpSocket;
    /**
     * Number of seconds after which the probe times out.
     * Defaults to 1 second. Minimum value is 1.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @default 1 second. Minimum value is 1.
     * @schema RevisionSpecContainersReadinessProbe#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
}
/**
 * Converts an object of type 'RevisionSpecContainersReadinessProbe' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersReadinessProbe(obj: RevisionSpecContainersReadinessProbe | undefined): Record<string, any> | undefined;
/**
 * Compute Resources required by this container.
 * Cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
 *
 * @schema RevisionSpecContainersResources
 */
export interface RevisionSpecContainersResources {
    /**
     * Limits describes the maximum amount of compute resources allowed.
     * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @schema RevisionSpecContainersResources#limits
     */
    readonly limits?: {
        [key: string]: RevisionSpecContainersResourcesLimits;
    };
    /**
     * Requests describes the minimum amount of compute resources required.
     * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
     * otherwise to an implementation-defined value. Requests cannot exceed Limits.
     * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @schema RevisionSpecContainersResources#requests
     */
    readonly requests?: {
        [key: string]: RevisionSpecContainersResourcesRequests;
    };
}
/**
 * Converts an object of type 'RevisionSpecContainersResources' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersResources(obj: RevisionSpecContainersResources | undefined): Record<string, any> | undefined;
/**
 * SecurityContext defines the security options the container should be run with.
 * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
 * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
 *
 * @schema RevisionSpecContainersSecurityContext
 */
export interface RevisionSpecContainersSecurityContext {
    /**
     * AllowPrivilegeEscalation controls whether a process can gain more
     * privileges than its parent process. This bool directly controls if
     * the no_new_privs flag will be set on the container process.
     * AllowPrivilegeEscalation is true always when the container is:
     * 1) run as Privileged
     * 2) has CAP_SYS_ADMIN
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @schema RevisionSpecContainersSecurityContext#allowPrivilegeEscalation
     */
    readonly allowPrivilegeEscalation?: boolean;
    /**
     * The capabilities to add/drop when running containers.
     * Defaults to the default set of capabilities granted by the container runtime.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @default the default set of capabilities granted by the container runtime.
     * @schema RevisionSpecContainersSecurityContext#capabilities
     */
    readonly capabilities?: RevisionSpecContainersSecurityContextCapabilities;
    /**
     * Run container in privileged mode. This can only be set to explicitly to 'false'
     *
     * @schema RevisionSpecContainersSecurityContext#privileged
     */
    readonly privileged?: boolean;
    /**
     * Whether this container has a read-only root filesystem.
     * Default is false.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @default false.
     * @schema RevisionSpecContainersSecurityContext#readOnlyRootFilesystem
     */
    readonly readOnlyRootFilesystem?: boolean;
    /**
     * The GID to run the entrypoint of the container process.
     * Uses runtime default if unset.
     * May also be set in PodSecurityContext.  If set in both SecurityContext and
     * PodSecurityContext, the value specified in SecurityContext takes precedence.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @schema RevisionSpecContainersSecurityContext#runAsGroup
     */
    readonly runAsGroup?: number;
    /**
     * Indicates that the container must run as a non-root user.
     * If true, the Kubelet will validate the image at runtime to ensure that it
     * does not run as UID 0 (root) and fail to start the container if it does.
     * If unset or false, no such validation will be performed.
     * May also be set in PodSecurityContext.  If set in both SecurityContext and
     * PodSecurityContext, the value specified in SecurityContext takes precedence.
     *
     * @schema RevisionSpecContainersSecurityContext#runAsNonRoot
     */
    readonly runAsNonRoot?: boolean;
    /**
     * The UID to run the entrypoint of the container process.
     * Defaults to user specified in image metadata if unspecified.
     * May also be set in PodSecurityContext.  If set in both SecurityContext and
     * PodSecurityContext, the value specified in SecurityContext takes precedence.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @default user specified in image metadata if unspecified.
     * @schema RevisionSpecContainersSecurityContext#runAsUser
     */
    readonly runAsUser?: number;
    /**
     * The seccomp options to use by this container. If seccomp options are
     * provided at both the pod & container level, the container options
     * override the pod options.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @schema RevisionSpecContainersSecurityContext#seccompProfile
     */
    readonly seccompProfile?: RevisionSpecContainersSecurityContextSeccompProfile;
}
/**
 * Converts an object of type 'RevisionSpecContainersSecurityContext' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersSecurityContext(obj: RevisionSpecContainersSecurityContext | undefined): Record<string, any> | undefined;
/**
 * StartupProbe indicates that the Pod has successfully initialized.
 * If specified, no other probes are executed until this completes successfully.
 * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
 * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
 * when it might take a long time to load data or warm a cache, than during steady-state operation.
 * This cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
 *
 * @schema RevisionSpecContainersStartupProbe
 */
export interface RevisionSpecContainersStartupProbe {
    /**
     * Exec specifies a command to execute in the container.
     *
     * @schema RevisionSpecContainersStartupProbe#exec
     */
    readonly exec?: RevisionSpecContainersStartupProbeExec;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded.
     * Defaults to 3. Minimum value is 1.
     *
     * @default 3. Minimum value is 1.
     * @schema RevisionSpecContainersStartupProbe#failureThreshold
     */
    readonly failureThreshold?: number;
    /**
     * GRPC specifies a GRPC HealthCheckRequest.
     *
     * @schema RevisionSpecContainersStartupProbe#grpc
     */
    readonly grpc?: RevisionSpecContainersStartupProbeGrpc;
    /**
     * HTTPGet specifies an HTTP GET request to perform.
     *
     * @schema RevisionSpecContainersStartupProbe#httpGet
     */
    readonly httpGet?: RevisionSpecContainersStartupProbeHttpGet;
    /**
     * Number of seconds after the container has started before liveness probes are initiated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema RevisionSpecContainersStartupProbe#initialDelaySeconds
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe.
     *
     * @schema RevisionSpecContainersStartupProbe#periodSeconds
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed.
     * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     *
     * @default 1. Must be 1 for liveness and startup. Minimum value is 1.
     * @schema RevisionSpecContainersStartupProbe#successThreshold
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies a connection to a TCP port.
     *
     * @schema RevisionSpecContainersStartupProbe#tcpSocket
     */
    readonly tcpSocket?: RevisionSpecContainersStartupProbeTcpSocket;
    /**
     * Number of seconds after which the probe times out.
     * Defaults to 1 second. Minimum value is 1.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @default 1 second. Minimum value is 1.
     * @schema RevisionSpecContainersStartupProbe#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
}
/**
 * Converts an object of type 'RevisionSpecContainersStartupProbe' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersStartupProbe(obj: RevisionSpecContainersStartupProbe | undefined): Record<string, any> | undefined;
/**
 * VolumeMount describes a mounting of a Volume within a container.
 *
 * @schema RevisionSpecContainersVolumeMounts
 */
export interface RevisionSpecContainersVolumeMounts {
    /**
     * Path within the container at which the volume should be mounted.  Must
     * not contain ':'.
     *
     * @schema RevisionSpecContainersVolumeMounts#mountPath
     */
    readonly mountPath: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-mount-propagation
     *
     * @schema RevisionSpecContainersVolumeMounts#mountPropagation
     */
    readonly mountPropagation?: string;
    /**
     * This must match the Name of a Volume.
     *
     * @schema RevisionSpecContainersVolumeMounts#name
     */
    readonly name: string;
    /**
     * Mounted read-only if true, read-write otherwise (false or unspecified).
     * Defaults to false.
     *
     * @default false.
     * @schema RevisionSpecContainersVolumeMounts#readOnly
     */
    readonly readOnly?: boolean;
    /**
     * Path within the volume from which the container's volume should be mounted.
     * Defaults to "" (volume's root).
     *
     * @default volume's root).
     * @schema RevisionSpecContainersVolumeMounts#subPath
     */
    readonly subPath?: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersVolumeMounts' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersVolumeMounts(obj: RevisionSpecContainersVolumeMounts | undefined): Record<string, any> | undefined;
/**
 * configMap represents a configMap that should populate this volume
 *
 * @schema RevisionSpecVolumesConfigMap
 */
export interface RevisionSpecVolumesConfigMap {
    /**
     * defaultMode is optional: mode bits used to set permissions on created files by default.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * Defaults to 0644.
     * Directories within the path are not affected by this setting.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @default 0644.
     * @schema RevisionSpecVolumesConfigMap#defaultMode
     */
    readonly defaultMode?: number;
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced
     * ConfigMap will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the ConfigMap,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema RevisionSpecVolumesConfigMap#items
     */
    readonly items?: RevisionSpecVolumesConfigMapItems[];
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema RevisionSpecVolumesConfigMap#name
     */
    readonly name?: string;
    /**
     * optional specify whether the ConfigMap or its keys must be defined
     *
     * @schema RevisionSpecVolumesConfigMap#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'RevisionSpecVolumesConfigMap' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesConfigMap(obj: RevisionSpecVolumesConfigMap | undefined): Record<string, any> | undefined;
/**
 * projected items for all in one resources secrets, configmaps, and downward API
 *
 * @schema RevisionSpecVolumesProjected
 */
export interface RevisionSpecVolumesProjected {
    /**
     * defaultMode are the mode bits used to set permissions on created files by default.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * Directories within the path are not affected by this setting.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema RevisionSpecVolumesProjected#defaultMode
     */
    readonly defaultMode?: number;
    /**
     * sources is the list of volume projections. Each entry in this list
     * handles one source.
     *
     * @schema RevisionSpecVolumesProjected#sources
     */
    readonly sources?: RevisionSpecVolumesProjectedSources[];
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjected' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjected(obj: RevisionSpecVolumesProjected | undefined): Record<string, any> | undefined;
/**
 * secret represents a secret that should populate this volume.
 * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
 *
 * @schema RevisionSpecVolumesSecret
 */
export interface RevisionSpecVolumesSecret {
    /**
     * defaultMode is Optional: mode bits used to set permissions on created files by default.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values
     * for mode bits. Defaults to 0644.
     * Directories within the path are not affected by this setting.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @default 0644.
     * @schema RevisionSpecVolumesSecret#defaultMode
     */
    readonly defaultMode?: number;
    /**
     * items If unspecified, each key-value pair in the Data field of the referenced
     * Secret will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the Secret,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema RevisionSpecVolumesSecret#items
     */
    readonly items?: RevisionSpecVolumesSecretItems[];
    /**
     * optional field specify whether the Secret or its keys must be defined
     *
     * @schema RevisionSpecVolumesSecret#optional
     */
    readonly optional?: boolean;
    /**
     * secretName is the name of the secret in the pod's namespace to use.
     * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
     *
     * @schema RevisionSpecVolumesSecret#secretName
     */
    readonly secretName?: string;
}
/**
 * Converts an object of type 'RevisionSpecVolumesSecret' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesSecret(obj: RevisionSpecVolumesSecret | undefined): Record<string, any> | undefined;
/**
 * Source for the environment variable's value. Cannot be used if value is not empty.
 *
 * @schema RevisionSpecContainersEnvValueFrom
 */
export interface RevisionSpecContainersEnvValueFrom {
    /**
     * Selects a key of a ConfigMap.
     *
     * @schema RevisionSpecContainersEnvValueFrom#configMapKeyRef
     */
    readonly configMapKeyRef?: RevisionSpecContainersEnvValueFromConfigMapKeyRef;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-fieldref
     *
     * @schema RevisionSpecContainersEnvValueFrom#fieldRef
     */
    readonly fieldRef?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-fieldref
     *
     * @schema RevisionSpecContainersEnvValueFrom#resourceFieldRef
     */
    readonly resourceFieldRef?: any;
    /**
     * Selects a key of a secret in the pod's namespace
     *
     * @schema RevisionSpecContainersEnvValueFrom#secretKeyRef
     */
    readonly secretKeyRef?: RevisionSpecContainersEnvValueFromSecretKeyRef;
}
/**
 * Converts an object of type 'RevisionSpecContainersEnvValueFrom' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersEnvValueFrom(obj: RevisionSpecContainersEnvValueFrom | undefined): Record<string, any> | undefined;
/**
 * The ConfigMap to select from
 *
 * @schema RevisionSpecContainersEnvFromConfigMapRef
 */
export interface RevisionSpecContainersEnvFromConfigMapRef {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema RevisionSpecContainersEnvFromConfigMapRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap must be defined
     *
     * @schema RevisionSpecContainersEnvFromConfigMapRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'RevisionSpecContainersEnvFromConfigMapRef' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersEnvFromConfigMapRef(obj: RevisionSpecContainersEnvFromConfigMapRef | undefined): Record<string, any> | undefined;
/**
 * The Secret to select from
 *
 * @schema RevisionSpecContainersEnvFromSecretRef
 */
export interface RevisionSpecContainersEnvFromSecretRef {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema RevisionSpecContainersEnvFromSecretRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the Secret must be defined
     *
     * @schema RevisionSpecContainersEnvFromSecretRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'RevisionSpecContainersEnvFromSecretRef' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersEnvFromSecretRef(obj: RevisionSpecContainersEnvFromSecretRef | undefined): Record<string, any> | undefined;
/**
 * Exec specifies a command to execute in the container.
 *
 * @schema RevisionSpecContainersLivenessProbeExec
 */
export interface RevisionSpecContainersLivenessProbeExec {
    /**
     * Command is the command line to execute inside the container, the working directory for the
     * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
     * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
     * a shell, you need to explicitly call out to that shell.
     * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     *
     * @schema RevisionSpecContainersLivenessProbeExec#command
     */
    readonly command?: string[];
}
/**
 * Converts an object of type 'RevisionSpecContainersLivenessProbeExec' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersLivenessProbeExec(obj: RevisionSpecContainersLivenessProbeExec | undefined): Record<string, any> | undefined;
/**
 * GRPC specifies a GRPC HealthCheckRequest.
 *
 * @schema RevisionSpecContainersLivenessProbeGrpc
 */
export interface RevisionSpecContainersLivenessProbeGrpc {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     *
     * @schema RevisionSpecContainersLivenessProbeGrpc#port
     */
    readonly port?: number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest
     * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     *
     * @schema RevisionSpecContainersLivenessProbeGrpc#service
     */
    readonly service?: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersLivenessProbeGrpc' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersLivenessProbeGrpc(obj: RevisionSpecContainersLivenessProbeGrpc | undefined): Record<string, any> | undefined;
/**
 * HTTPGet specifies an HTTP GET request to perform.
 *
 * @schema RevisionSpecContainersLivenessProbeHttpGet
 */
export interface RevisionSpecContainersLivenessProbeHttpGet {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set
     * "Host" in httpHeaders instead.
     *
     * @schema RevisionSpecContainersLivenessProbeHttpGet#host
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     *
     * @schema RevisionSpecContainersLivenessProbeHttpGet#httpHeaders
     */
    readonly httpHeaders?: RevisionSpecContainersLivenessProbeHttpGetHttpHeaders[];
    /**
     * Path to access on the HTTP server.
     *
     * @schema RevisionSpecContainersLivenessProbeHttpGet#path
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema RevisionSpecContainersLivenessProbeHttpGet#port
     */
    readonly port?: RevisionSpecContainersLivenessProbeHttpGetPort;
    /**
     * Scheme to use for connecting to the host.
     * Defaults to HTTP.
     *
     * @default HTTP.
     * @schema RevisionSpecContainersLivenessProbeHttpGet#scheme
     */
    readonly scheme?: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersLivenessProbeHttpGet' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersLivenessProbeHttpGet(obj: RevisionSpecContainersLivenessProbeHttpGet | undefined): Record<string, any> | undefined;
/**
 * TCPSocket specifies a connection to a TCP port.
 *
 * @schema RevisionSpecContainersLivenessProbeTcpSocket
 */
export interface RevisionSpecContainersLivenessProbeTcpSocket {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     *
     * @schema RevisionSpecContainersLivenessProbeTcpSocket#host
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema RevisionSpecContainersLivenessProbeTcpSocket#port
     */
    readonly port?: RevisionSpecContainersLivenessProbeTcpSocketPort;
}
/**
 * Converts an object of type 'RevisionSpecContainersLivenessProbeTcpSocket' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersLivenessProbeTcpSocket(obj: RevisionSpecContainersLivenessProbeTcpSocket | undefined): Record<string, any> | undefined;
/**
 * Exec specifies a command to execute in the container.
 *
 * @schema RevisionSpecContainersReadinessProbeExec
 */
export interface RevisionSpecContainersReadinessProbeExec {
    /**
     * Command is the command line to execute inside the container, the working directory for the
     * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
     * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
     * a shell, you need to explicitly call out to that shell.
     * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     *
     * @schema RevisionSpecContainersReadinessProbeExec#command
     */
    readonly command?: string[];
}
/**
 * Converts an object of type 'RevisionSpecContainersReadinessProbeExec' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersReadinessProbeExec(obj: RevisionSpecContainersReadinessProbeExec | undefined): Record<string, any> | undefined;
/**
 * GRPC specifies a GRPC HealthCheckRequest.
 *
 * @schema RevisionSpecContainersReadinessProbeGrpc
 */
export interface RevisionSpecContainersReadinessProbeGrpc {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     *
     * @schema RevisionSpecContainersReadinessProbeGrpc#port
     */
    readonly port?: number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest
     * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     *
     * @schema RevisionSpecContainersReadinessProbeGrpc#service
     */
    readonly service?: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersReadinessProbeGrpc' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersReadinessProbeGrpc(obj: RevisionSpecContainersReadinessProbeGrpc | undefined): Record<string, any> | undefined;
/**
 * HTTPGet specifies an HTTP GET request to perform.
 *
 * @schema RevisionSpecContainersReadinessProbeHttpGet
 */
export interface RevisionSpecContainersReadinessProbeHttpGet {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set
     * "Host" in httpHeaders instead.
     *
     * @schema RevisionSpecContainersReadinessProbeHttpGet#host
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     *
     * @schema RevisionSpecContainersReadinessProbeHttpGet#httpHeaders
     */
    readonly httpHeaders?: RevisionSpecContainersReadinessProbeHttpGetHttpHeaders[];
    /**
     * Path to access on the HTTP server.
     *
     * @schema RevisionSpecContainersReadinessProbeHttpGet#path
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema RevisionSpecContainersReadinessProbeHttpGet#port
     */
    readonly port?: RevisionSpecContainersReadinessProbeHttpGetPort;
    /**
     * Scheme to use for connecting to the host.
     * Defaults to HTTP.
     *
     * @default HTTP.
     * @schema RevisionSpecContainersReadinessProbeHttpGet#scheme
     */
    readonly scheme?: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersReadinessProbeHttpGet' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersReadinessProbeHttpGet(obj: RevisionSpecContainersReadinessProbeHttpGet | undefined): Record<string, any> | undefined;
/**
 * TCPSocket specifies a connection to a TCP port.
 *
 * @schema RevisionSpecContainersReadinessProbeTcpSocket
 */
export interface RevisionSpecContainersReadinessProbeTcpSocket {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     *
     * @schema RevisionSpecContainersReadinessProbeTcpSocket#host
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema RevisionSpecContainersReadinessProbeTcpSocket#port
     */
    readonly port?: RevisionSpecContainersReadinessProbeTcpSocketPort;
}
/**
 * Converts an object of type 'RevisionSpecContainersReadinessProbeTcpSocket' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersReadinessProbeTcpSocket(obj: RevisionSpecContainersReadinessProbeTcpSocket | undefined): Record<string, any> | undefined;
/**
 * @schema RevisionSpecContainersResourcesLimits
 */
export declare class RevisionSpecContainersResourcesLimits {
    readonly value: number | string;
    static fromNumber(value: number): RevisionSpecContainersResourcesLimits;
    static fromString(value: string): RevisionSpecContainersResourcesLimits;
    private constructor();
}
/**
 * @schema RevisionSpecContainersResourcesRequests
 */
export declare class RevisionSpecContainersResourcesRequests {
    readonly value: number | string;
    static fromNumber(value: number): RevisionSpecContainersResourcesRequests;
    static fromString(value: string): RevisionSpecContainersResourcesRequests;
    private constructor();
}
/**
 * The capabilities to add/drop when running containers.
 * Defaults to the default set of capabilities granted by the container runtime.
 * Note that this field cannot be set when spec.os.name is windows.
 *
 * @default the default set of capabilities granted by the container runtime.
 * @schema RevisionSpecContainersSecurityContextCapabilities
 */
export interface RevisionSpecContainersSecurityContextCapabilities {
    /**
     * This is accessible behind a feature flag - kubernetes.containerspec-addcapabilities
     *
     * @schema RevisionSpecContainersSecurityContextCapabilities#add
     */
    readonly add?: string[];
    /**
     * Removed capabilities
     *
     * @schema RevisionSpecContainersSecurityContextCapabilities#drop
     */
    readonly drop?: string[];
}
/**
 * Converts an object of type 'RevisionSpecContainersSecurityContextCapabilities' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersSecurityContextCapabilities(obj: RevisionSpecContainersSecurityContextCapabilities | undefined): Record<string, any> | undefined;
/**
 * The seccomp options to use by this container. If seccomp options are
 * provided at both the pod & container level, the container options
 * override the pod options.
 * Note that this field cannot be set when spec.os.name is windows.
 *
 * @schema RevisionSpecContainersSecurityContextSeccompProfile
 */
export interface RevisionSpecContainersSecurityContextSeccompProfile {
    /**
     * localhostProfile indicates a profile defined in a file on the node should be used.
     * The profile must be preconfigured on the node to work.
     * Must be a descending path, relative to the kubelet's configured seccomp profile location.
     * Must be set if type is "Localhost". Must NOT be set for any other type.
     *
     * @schema RevisionSpecContainersSecurityContextSeccompProfile#localhostProfile
     */
    readonly localhostProfile?: string;
    /**
     * type indicates which kind of seccomp profile will be applied.
     * Valid options are:
     *
     * Localhost - a profile defined in a file on the node should be used.
     * RuntimeDefault - the container runtime default profile should be used.
     * Unconfined - no profile should be applied.
     *
     * @schema RevisionSpecContainersSecurityContextSeccompProfile#type
     */
    readonly type: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersSecurityContextSeccompProfile' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersSecurityContextSeccompProfile(obj: RevisionSpecContainersSecurityContextSeccompProfile | undefined): Record<string, any> | undefined;
/**
 * Exec specifies a command to execute in the container.
 *
 * @schema RevisionSpecContainersStartupProbeExec
 */
export interface RevisionSpecContainersStartupProbeExec {
    /**
     * Command is the command line to execute inside the container, the working directory for the
     * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
     * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
     * a shell, you need to explicitly call out to that shell.
     * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     *
     * @schema RevisionSpecContainersStartupProbeExec#command
     */
    readonly command?: string[];
}
/**
 * Converts an object of type 'RevisionSpecContainersStartupProbeExec' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersStartupProbeExec(obj: RevisionSpecContainersStartupProbeExec | undefined): Record<string, any> | undefined;
/**
 * GRPC specifies a GRPC HealthCheckRequest.
 *
 * @schema RevisionSpecContainersStartupProbeGrpc
 */
export interface RevisionSpecContainersStartupProbeGrpc {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     *
     * @schema RevisionSpecContainersStartupProbeGrpc#port
     */
    readonly port?: number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest
     * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     *
     * @schema RevisionSpecContainersStartupProbeGrpc#service
     */
    readonly service?: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersStartupProbeGrpc' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersStartupProbeGrpc(obj: RevisionSpecContainersStartupProbeGrpc | undefined): Record<string, any> | undefined;
/**
 * HTTPGet specifies an HTTP GET request to perform.
 *
 * @schema RevisionSpecContainersStartupProbeHttpGet
 */
export interface RevisionSpecContainersStartupProbeHttpGet {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set
     * "Host" in httpHeaders instead.
     *
     * @schema RevisionSpecContainersStartupProbeHttpGet#host
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     *
     * @schema RevisionSpecContainersStartupProbeHttpGet#httpHeaders
     */
    readonly httpHeaders?: RevisionSpecContainersStartupProbeHttpGetHttpHeaders[];
    /**
     * Path to access on the HTTP server.
     *
     * @schema RevisionSpecContainersStartupProbeHttpGet#path
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema RevisionSpecContainersStartupProbeHttpGet#port
     */
    readonly port?: RevisionSpecContainersStartupProbeHttpGetPort;
    /**
     * Scheme to use for connecting to the host.
     * Defaults to HTTP.
     *
     * @default HTTP.
     * @schema RevisionSpecContainersStartupProbeHttpGet#scheme
     */
    readonly scheme?: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersStartupProbeHttpGet' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersStartupProbeHttpGet(obj: RevisionSpecContainersStartupProbeHttpGet | undefined): Record<string, any> | undefined;
/**
 * TCPSocket specifies a connection to a TCP port.
 *
 * @schema RevisionSpecContainersStartupProbeTcpSocket
 */
export interface RevisionSpecContainersStartupProbeTcpSocket {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     *
     * @schema RevisionSpecContainersStartupProbeTcpSocket#host
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema RevisionSpecContainersStartupProbeTcpSocket#port
     */
    readonly port?: RevisionSpecContainersStartupProbeTcpSocketPort;
}
/**
 * Converts an object of type 'RevisionSpecContainersStartupProbeTcpSocket' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersStartupProbeTcpSocket(obj: RevisionSpecContainersStartupProbeTcpSocket | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema RevisionSpecVolumesConfigMapItems
 */
export interface RevisionSpecVolumesConfigMapItems {
    /**
     * key is the key to project.
     *
     * @schema RevisionSpecVolumesConfigMapItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema RevisionSpecVolumesConfigMapItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema RevisionSpecVolumesConfigMapItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'RevisionSpecVolumesConfigMapItems' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesConfigMapItems(obj: RevisionSpecVolumesConfigMapItems | undefined): Record<string, any> | undefined;
/**
 * Projection that may be projected along with other supported volume types.
 * Exactly one of these fields must be set.
 *
 * @schema RevisionSpecVolumesProjectedSources
 */
export interface RevisionSpecVolumesProjectedSources {
    /**
     * configMap information about the configMap data to project
     *
     * @schema RevisionSpecVolumesProjectedSources#configMap
     */
    readonly configMap?: RevisionSpecVolumesProjectedSourcesConfigMap;
    /**
     * downwardAPI information about the downwardAPI data to project
     *
     * @schema RevisionSpecVolumesProjectedSources#downwardAPI
     */
    readonly downwardApi?: RevisionSpecVolumesProjectedSourcesDownwardApi;
    /**
     * secret information about the secret data to project
     *
     * @schema RevisionSpecVolumesProjectedSources#secret
     */
    readonly secret?: RevisionSpecVolumesProjectedSourcesSecret;
    /**
     * serviceAccountToken is information about the serviceAccountToken data to project
     *
     * @schema RevisionSpecVolumesProjectedSources#serviceAccountToken
     */
    readonly serviceAccountToken?: RevisionSpecVolumesProjectedSourcesServiceAccountToken;
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSources' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSources(obj: RevisionSpecVolumesProjectedSources | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema RevisionSpecVolumesSecretItems
 */
export interface RevisionSpecVolumesSecretItems {
    /**
     * key is the key to project.
     *
     * @schema RevisionSpecVolumesSecretItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema RevisionSpecVolumesSecretItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema RevisionSpecVolumesSecretItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'RevisionSpecVolumesSecretItems' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesSecretItems(obj: RevisionSpecVolumesSecretItems | undefined): Record<string, any> | undefined;
/**
 * Selects a key of a ConfigMap.
 *
 * @schema RevisionSpecContainersEnvValueFromConfigMapKeyRef
 */
export interface RevisionSpecContainersEnvValueFromConfigMapKeyRef {
    /**
     * The key to select.
     *
     * @schema RevisionSpecContainersEnvValueFromConfigMapKeyRef#key
     */
    readonly key: string;
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema RevisionSpecContainersEnvValueFromConfigMapKeyRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap or its key must be defined
     *
     * @schema RevisionSpecContainersEnvValueFromConfigMapKeyRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'RevisionSpecContainersEnvValueFromConfigMapKeyRef' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersEnvValueFromConfigMapKeyRef(obj: RevisionSpecContainersEnvValueFromConfigMapKeyRef | undefined): Record<string, any> | undefined;
/**
 * Selects a key of a secret in the pod's namespace
 *
 * @schema RevisionSpecContainersEnvValueFromSecretKeyRef
 */
export interface RevisionSpecContainersEnvValueFromSecretKeyRef {
    /**
     * The key of the secret to select from.  Must be a valid secret key.
     *
     * @schema RevisionSpecContainersEnvValueFromSecretKeyRef#key
     */
    readonly key: string;
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema RevisionSpecContainersEnvValueFromSecretKeyRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the Secret or its key must be defined
     *
     * @schema RevisionSpecContainersEnvValueFromSecretKeyRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'RevisionSpecContainersEnvValueFromSecretKeyRef' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersEnvValueFromSecretKeyRef(obj: RevisionSpecContainersEnvValueFromSecretKeyRef | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 *
 * @schema RevisionSpecContainersLivenessProbeHttpGetHttpHeaders
 */
export interface RevisionSpecContainersLivenessProbeHttpGetHttpHeaders {
    /**
     * The header field name.
     * This will be canonicalized upon output, so case-variant names will be understood as the same header.
     *
     * @schema RevisionSpecContainersLivenessProbeHttpGetHttpHeaders#name
     */
    readonly name: string;
    /**
     * The header field value
     *
     * @schema RevisionSpecContainersLivenessProbeHttpGetHttpHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersLivenessProbeHttpGetHttpHeaders' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersLivenessProbeHttpGetHttpHeaders(obj: RevisionSpecContainersLivenessProbeHttpGetHttpHeaders | undefined): Record<string, any> | undefined;
/**
 * Name or number of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema RevisionSpecContainersLivenessProbeHttpGetPort
 */
export declare class RevisionSpecContainersLivenessProbeHttpGetPort {
    readonly value: number | string;
    static fromNumber(value: number): RevisionSpecContainersLivenessProbeHttpGetPort;
    static fromString(value: string): RevisionSpecContainersLivenessProbeHttpGetPort;
    private constructor();
}
/**
 * Number or name of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema RevisionSpecContainersLivenessProbeTcpSocketPort
 */
export declare class RevisionSpecContainersLivenessProbeTcpSocketPort {
    readonly value: number | string;
    static fromNumber(value: number): RevisionSpecContainersLivenessProbeTcpSocketPort;
    static fromString(value: string): RevisionSpecContainersLivenessProbeTcpSocketPort;
    private constructor();
}
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 *
 * @schema RevisionSpecContainersReadinessProbeHttpGetHttpHeaders
 */
export interface RevisionSpecContainersReadinessProbeHttpGetHttpHeaders {
    /**
     * The header field name.
     * This will be canonicalized upon output, so case-variant names will be understood as the same header.
     *
     * @schema RevisionSpecContainersReadinessProbeHttpGetHttpHeaders#name
     */
    readonly name: string;
    /**
     * The header field value
     *
     * @schema RevisionSpecContainersReadinessProbeHttpGetHttpHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersReadinessProbeHttpGetHttpHeaders' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersReadinessProbeHttpGetHttpHeaders(obj: RevisionSpecContainersReadinessProbeHttpGetHttpHeaders | undefined): Record<string, any> | undefined;
/**
 * Name or number of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema RevisionSpecContainersReadinessProbeHttpGetPort
 */
export declare class RevisionSpecContainersReadinessProbeHttpGetPort {
    readonly value: number | string;
    static fromNumber(value: number): RevisionSpecContainersReadinessProbeHttpGetPort;
    static fromString(value: string): RevisionSpecContainersReadinessProbeHttpGetPort;
    private constructor();
}
/**
 * Number or name of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema RevisionSpecContainersReadinessProbeTcpSocketPort
 */
export declare class RevisionSpecContainersReadinessProbeTcpSocketPort {
    readonly value: number | string;
    static fromNumber(value: number): RevisionSpecContainersReadinessProbeTcpSocketPort;
    static fromString(value: string): RevisionSpecContainersReadinessProbeTcpSocketPort;
    private constructor();
}
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 *
 * @schema RevisionSpecContainersStartupProbeHttpGetHttpHeaders
 */
export interface RevisionSpecContainersStartupProbeHttpGetHttpHeaders {
    /**
     * The header field name.
     * This will be canonicalized upon output, so case-variant names will be understood as the same header.
     *
     * @schema RevisionSpecContainersStartupProbeHttpGetHttpHeaders#name
     */
    readonly name: string;
    /**
     * The header field value
     *
     * @schema RevisionSpecContainersStartupProbeHttpGetHttpHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'RevisionSpecContainersStartupProbeHttpGetHttpHeaders' to JSON representation.
 */
export declare function toJson_RevisionSpecContainersStartupProbeHttpGetHttpHeaders(obj: RevisionSpecContainersStartupProbeHttpGetHttpHeaders | undefined): Record<string, any> | undefined;
/**
 * Name or number of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema RevisionSpecContainersStartupProbeHttpGetPort
 */
export declare class RevisionSpecContainersStartupProbeHttpGetPort {
    readonly value: number | string;
    static fromNumber(value: number): RevisionSpecContainersStartupProbeHttpGetPort;
    static fromString(value: string): RevisionSpecContainersStartupProbeHttpGetPort;
    private constructor();
}
/**
 * Number or name of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema RevisionSpecContainersStartupProbeTcpSocketPort
 */
export declare class RevisionSpecContainersStartupProbeTcpSocketPort {
    readonly value: number | string;
    static fromNumber(value: number): RevisionSpecContainersStartupProbeTcpSocketPort;
    static fromString(value: string): RevisionSpecContainersStartupProbeTcpSocketPort;
    private constructor();
}
/**
 * configMap information about the configMap data to project
 *
 * @schema RevisionSpecVolumesProjectedSourcesConfigMap
 */
export interface RevisionSpecVolumesProjectedSourcesConfigMap {
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced
     * ConfigMap will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the ConfigMap,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema RevisionSpecVolumesProjectedSourcesConfigMap#items
     */
    readonly items?: RevisionSpecVolumesProjectedSourcesConfigMapItems[];
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema RevisionSpecVolumesProjectedSourcesConfigMap#name
     */
    readonly name?: string;
    /**
     * optional specify whether the ConfigMap or its keys must be defined
     *
     * @schema RevisionSpecVolumesProjectedSourcesConfigMap#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSourcesConfigMap' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSourcesConfigMap(obj: RevisionSpecVolumesProjectedSourcesConfigMap | undefined): Record<string, any> | undefined;
/**
 * downwardAPI information about the downwardAPI data to project
 *
 * @schema RevisionSpecVolumesProjectedSourcesDownwardApi
 */
export interface RevisionSpecVolumesProjectedSourcesDownwardApi {
    /**
     * Items is a list of DownwardAPIVolume file
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApi#items
     */
    readonly items?: RevisionSpecVolumesProjectedSourcesDownwardApiItems[];
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSourcesDownwardApi' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSourcesDownwardApi(obj: RevisionSpecVolumesProjectedSourcesDownwardApi | undefined): Record<string, any> | undefined;
/**
 * secret information about the secret data to project
 *
 * @schema RevisionSpecVolumesProjectedSourcesSecret
 */
export interface RevisionSpecVolumesProjectedSourcesSecret {
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced
     * Secret will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the Secret,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema RevisionSpecVolumesProjectedSourcesSecret#items
     */
    readonly items?: RevisionSpecVolumesProjectedSourcesSecretItems[];
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema RevisionSpecVolumesProjectedSourcesSecret#name
     */
    readonly name?: string;
    /**
     * optional field specify whether the Secret or its key must be defined
     *
     * @schema RevisionSpecVolumesProjectedSourcesSecret#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSourcesSecret' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSourcesSecret(obj: RevisionSpecVolumesProjectedSourcesSecret | undefined): Record<string, any> | undefined;
/**
 * serviceAccountToken is information about the serviceAccountToken data to project
 *
 * @schema RevisionSpecVolumesProjectedSourcesServiceAccountToken
 */
export interface RevisionSpecVolumesProjectedSourcesServiceAccountToken {
    /**
     * audience is the intended audience of the token. A recipient of a token
     * must identify itself with an identifier specified in the audience of the
     * token, and otherwise should reject the token. The audience defaults to the
     * identifier of the apiserver.
     *
     * @schema RevisionSpecVolumesProjectedSourcesServiceAccountToken#audience
     */
    readonly audience?: string;
    /**
     * expirationSeconds is the requested duration of validity of the service
     * account token. As the token approaches expiration, the kubelet volume
     * plugin will proactively rotate the service account token. The kubelet will
     * start trying to rotate the token if the token is older than 80 percent of
     * its time to live or if the token is older than 24 hours.Defaults to 1 hour
     * and must be at least 10 minutes.
     *
     * @default 1 hour
     * @schema RevisionSpecVolumesProjectedSourcesServiceAccountToken#expirationSeconds
     */
    readonly expirationSeconds?: number;
    /**
     * path is the path relative to the mount point of the file to project the
     * token into.
     *
     * @schema RevisionSpecVolumesProjectedSourcesServiceAccountToken#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSourcesServiceAccountToken' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSourcesServiceAccountToken(obj: RevisionSpecVolumesProjectedSourcesServiceAccountToken | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema RevisionSpecVolumesProjectedSourcesConfigMapItems
 */
export interface RevisionSpecVolumesProjectedSourcesConfigMapItems {
    /**
     * key is the key to project.
     *
     * @schema RevisionSpecVolumesProjectedSourcesConfigMapItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema RevisionSpecVolumesProjectedSourcesConfigMapItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema RevisionSpecVolumesProjectedSourcesConfigMapItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSourcesConfigMapItems' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSourcesConfigMapItems(obj: RevisionSpecVolumesProjectedSourcesConfigMapItems | undefined): Record<string, any> | undefined;
/**
 * DownwardAPIVolumeFile represents information to create the file containing the pod field
 *
 * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItems
 */
export interface RevisionSpecVolumesProjectedSourcesDownwardApiItems {
    /**
     * Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItems#fieldRef
     */
    readonly fieldRef?: RevisionSpecVolumesProjectedSourcesDownwardApiItemsFieldRef;
    /**
     * Optional: mode bits used to set permissions on this file, must be an octal value
     * between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItems#mode
     */
    readonly mode?: number;
    /**
     * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItems#path
     */
    readonly path: string;
    /**
     * Selects a resource of the container: only resources limits and requests
     * (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItems#resourceFieldRef
     */
    readonly resourceFieldRef?: RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef;
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSourcesDownwardApiItems' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSourcesDownwardApiItems(obj: RevisionSpecVolumesProjectedSourcesDownwardApiItems | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema RevisionSpecVolumesProjectedSourcesSecretItems
 */
export interface RevisionSpecVolumesProjectedSourcesSecretItems {
    /**
     * key is the key to project.
     *
     * @schema RevisionSpecVolumesProjectedSourcesSecretItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema RevisionSpecVolumesProjectedSourcesSecretItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema RevisionSpecVolumesProjectedSourcesSecretItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSourcesSecretItems' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSourcesSecretItems(obj: RevisionSpecVolumesProjectedSourcesSecretItems | undefined): Record<string, any> | undefined;
/**
 * Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.
 *
 * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItemsFieldRef
 */
export interface RevisionSpecVolumesProjectedSourcesDownwardApiItemsFieldRef {
    /**
     * Version of the schema the FieldPath is written in terms of, defaults to "v1".
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItemsFieldRef#apiVersion
     */
    readonly apiVersion?: string;
    /**
     * Path of the field to select in the specified API version.
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItemsFieldRef#fieldPath
     */
    readonly fieldPath: string;
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSourcesDownwardApiItemsFieldRef' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSourcesDownwardApiItemsFieldRef(obj: RevisionSpecVolumesProjectedSourcesDownwardApiItemsFieldRef | undefined): Record<string, any> | undefined;
/**
 * Selects a resource of the container: only resources limits and requests
 * (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
 *
 * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef
 */
export interface RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef {
    /**
     * Container name: required for volumes, optional for env vars
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef#containerName
     */
    readonly containerName?: string;
    /**
     * Specifies the output format of the exposed resources, defaults to "1"
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef#divisor
     */
    readonly divisor?: RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor;
    /**
     * Required: resource to select
     *
     * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef#resource
     */
    readonly resource: string;
}
/**
 * Converts an object of type 'RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef' to JSON representation.
 */
export declare function toJson_RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef(obj: RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef | undefined): Record<string, any> | undefined;
/**
 * Specifies the output format of the exposed resources, defaults to "1"
 *
 * @schema RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor
 */
export declare class RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor {
    readonly value: number | string;
    static fromNumber(value: number): RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor;
    static fromString(value: string): RevisionSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor;
    private constructor();
}
/**
 * Route is responsible for configuring ingress over a collection of Revisions.
Some of the Revisions a Route distributes traffic over may be specified by
referencing the Configuration responsible for creating them; in these cases
the Route is additionally responsible for monitoring the Configuration for
"latest ready revision" changes, and smoothly rolling out latest revisions.
See also: https://github.com/knative/serving/blob/main/docs/spec/overview.md#route
 *
 * @schema Route
 */
export declare class Route extends ApiObject {
    /**
     * Returns the apiVersion and kind for "Route"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Route".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: RouteProps): any;
    /**
     * Defines a "Route" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: RouteProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Route is responsible for configuring ingress over a collection of Revisions.
 * Some of the Revisions a Route distributes traffic over may be specified by
 * referencing the Configuration responsible for creating them; in these cases
 * the Route is additionally responsible for monitoring the Configuration for
 * "latest ready revision" changes, and smoothly rolling out latest revisions.
 * See also: https://github.com/knative/serving/blob/main/docs/spec/overview.md#route
 *
 * @schema Route
 */
export interface RouteProps {
    /**
     * @schema Route#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec holds the desired state of the Route (from the client).
     *
     * @schema Route#spec
     */
    readonly spec?: RouteSpec;
}
/**
 * Converts an object of type 'RouteProps' to JSON representation.
 */
export declare function toJson_RouteProps(obj: RouteProps | undefined): Record<string, any> | undefined;
/**
 * Spec holds the desired state of the Route (from the client).
 *
 * @schema RouteSpec
 */
export interface RouteSpec {
    /**
     * Traffic specifies how to distribute traffic over a collection of
     * revisions and configurations.
     *
     * @schema RouteSpec#traffic
     */
    readonly traffic?: RouteSpecTraffic[];
}
/**
 * Converts an object of type 'RouteSpec' to JSON representation.
 */
export declare function toJson_RouteSpec(obj: RouteSpec | undefined): Record<string, any> | undefined;
/**
 * TrafficTarget holds a single entry of the routing table for a Route.
 *
 * @schema RouteSpecTraffic
 */
export interface RouteSpecTraffic {
    /**
     * ConfigurationName of a configuration to whose latest revision we will send
     * this portion of traffic. When the "status.latestReadyRevisionName" of the
     * referenced configuration changes, we will automatically migrate traffic
     * from the prior "latest ready" revision to the new one.  This field is never
     * set in Route's status, only its spec.  This is mutually exclusive with
     * RevisionName.
     *
     * @schema RouteSpecTraffic#configurationName
     */
    readonly configurationName?: string;
    /**
     * LatestRevision may be optionally provided to indicate that the latest
     * ready Revision of the Configuration should be used for this traffic
     * target.  When provided LatestRevision must be true if RevisionName is
     * empty; it must be false when RevisionName is non-empty.
     *
     * @schema RouteSpecTraffic#latestRevision
     */
    readonly latestRevision?: boolean;
    /**
     * Percent indicates that percentage based routing should be used and
     * the value indicates the percent of traffic that is be routed to this
     * Revision or Configuration. `0` (zero) mean no traffic, `100` means all
     * traffic.
     * When percentage based routing is being used the follow rules apply:
     * - the sum of all percent values must equal 100
     * - when not specified, the implied value for `percent` is zero for
     * that particular Revision or Configuration
     *
     * @schema RouteSpecTraffic#percent
     */
    readonly percent?: number;
    /**
     * RevisionName of a specific revision to which to send this portion of
     * traffic.  This is mutually exclusive with ConfigurationName.
     *
     * @schema RouteSpecTraffic#revisionName
     */
    readonly revisionName?: string;
    /**
     * Tag is optionally used to expose a dedicated url for referencing
     * this target exclusively.
     *
     * @schema RouteSpecTraffic#tag
     */
    readonly tag?: string;
    /**
     * URL displays the URL for accessing named traffic targets. URL is displayed in
     * status, and is disallowed on spec. URL must contain a scheme (e.g. http://) and
     * a hostname, but may not contain anything else (e.g. basic auth, url path, etc.)
     *
     * @schema RouteSpecTraffic#url
     */
    readonly url?: string;
}
/**
 * Converts an object of type 'RouteSpecTraffic' to JSON representation.
 */
export declare function toJson_RouteSpecTraffic(obj: RouteSpecTraffic | undefined): Record<string, any> | undefined;
/**
 * Service acts as a top-level container that manages a Route and Configuration
which implement a network service. Service exists to provide a singular
abstraction which can be access controlled, reasoned about, and which
encapsulates software lifecycle decisions such as rollout policy and
team resource ownership. Service acts only as an orchestrator of the
underlying Routes and Configurations (much as a kubernetes Deployment
orchestrates ReplicaSets), and its usage is optional but recommended.

The Service's controller will track the statuses of its owned Configuration
and Route, reflecting their statuses and conditions as its own.

See also: https://github.com/knative/serving/blob/main/docs/spec/overview.md#service
 *
 * @schema Service
 */
export declare class Service extends ApiObject {
    /**
     * Returns the apiVersion and kind for "Service"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Service".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: ServiceProps): any;
    /**
     * Defines a "Service" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: ServiceProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Service acts as a top-level container that manages a Route and Configuration
 * which implement a network service. Service exists to provide a singular
 * abstraction which can be access controlled, reasoned about, and which
 * encapsulates software lifecycle decisions such as rollout policy and
 * team resource ownership. Service acts only as an orchestrator of the
 * underlying Routes and Configurations (much as a kubernetes Deployment
 * orchestrates ReplicaSets), and its usage is optional but recommended.
 *
 * The Service's controller will track the statuses of its owned Configuration
 * and Route, reflecting their statuses and conditions as its own.
 *
 * See also: https://github.com/knative/serving/blob/main/docs/spec/overview.md#service
 *
 * @schema Service
 */
export interface ServiceProps {
    /**
     * @schema Service#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * ServiceSpec represents the configuration for the Service object.
     * A Service's specification is the union of the specifications for a Route
     * and Configuration.  The Service restricts what can be expressed in these
     * fields, e.g. the Route must reference the provided Configuration;
     * however, these limitations also enable friendlier defaulting,
     * e.g. Route never needs a Configuration name, and may be defaulted to
     * the appropriate "run latest" spec.
     *
     * @schema Service#spec
     */
    readonly spec?: ServiceSpec;
}
/**
 * Converts an object of type 'ServiceProps' to JSON representation.
 */
export declare function toJson_ServiceProps(obj: ServiceProps | undefined): Record<string, any> | undefined;
/**
 * ServiceSpec represents the configuration for the Service object.
 * A Service's specification is the union of the specifications for a Route
 * and Configuration.  The Service restricts what can be expressed in these
 * fields, e.g. the Route must reference the provided Configuration;
 * however, these limitations also enable friendlier defaulting,
 * e.g. Route never needs a Configuration name, and may be defaulted to
 * the appropriate "run latest" spec.
 *
 * @schema ServiceSpec
 */
export interface ServiceSpec {
    /**
     * Template holds the latest specification for the Revision to be stamped out.
     *
     * @schema ServiceSpec#template
     */
    readonly template?: ServiceSpecTemplate;
    /**
     * Traffic specifies how to distribute traffic over a collection of
     * revisions and configurations.
     *
     * @schema ServiceSpec#traffic
     */
    readonly traffic?: ServiceSpecTraffic[];
}
/**
 * Converts an object of type 'ServiceSpec' to JSON representation.
 */
export declare function toJson_ServiceSpec(obj: ServiceSpec | undefined): Record<string, any> | undefined;
/**
 * Template holds the latest specification for the Revision to be stamped out.
 *
 * @schema ServiceSpecTemplate
 */
export interface ServiceSpecTemplate {
    /**
     * @schema ServiceSpecTemplate#metadata
     */
    readonly metadata?: ServiceSpecTemplateMetadata;
    /**
     * RevisionSpec holds the desired state of the Revision (from the client).
     *
     * @schema ServiceSpecTemplate#spec
     */
    readonly spec?: ServiceSpecTemplateSpec;
}
/**
 * Converts an object of type 'ServiceSpecTemplate' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplate(obj: ServiceSpecTemplate | undefined): Record<string, any> | undefined;
/**
 * TrafficTarget holds a single entry of the routing table for a Route.
 *
 * @schema ServiceSpecTraffic
 */
export interface ServiceSpecTraffic {
    /**
     * ConfigurationName of a configuration to whose latest revision we will send
     * this portion of traffic. When the "status.latestReadyRevisionName" of the
     * referenced configuration changes, we will automatically migrate traffic
     * from the prior "latest ready" revision to the new one.  This field is never
     * set in Route's status, only its spec.  This is mutually exclusive with
     * RevisionName.
     *
     * @schema ServiceSpecTraffic#configurationName
     */
    readonly configurationName?: string;
    /**
     * LatestRevision may be optionally provided to indicate that the latest
     * ready Revision of the Configuration should be used for this traffic
     * target.  When provided LatestRevision must be true if RevisionName is
     * empty; it must be false when RevisionName is non-empty.
     *
     * @schema ServiceSpecTraffic#latestRevision
     */
    readonly latestRevision?: boolean;
    /**
     * Percent indicates that percentage based routing should be used and
     * the value indicates the percent of traffic that is be routed to this
     * Revision or Configuration. `0` (zero) mean no traffic, `100` means all
     * traffic.
     * When percentage based routing is being used the follow rules apply:
     * - the sum of all percent values must equal 100
     * - when not specified, the implied value for `percent` is zero for
     * that particular Revision or Configuration
     *
     * @schema ServiceSpecTraffic#percent
     */
    readonly percent?: number;
    /**
     * RevisionName of a specific revision to which to send this portion of
     * traffic.  This is mutually exclusive with ConfigurationName.
     *
     * @schema ServiceSpecTraffic#revisionName
     */
    readonly revisionName?: string;
    /**
     * Tag is optionally used to expose a dedicated url for referencing
     * this target exclusively.
     *
     * @schema ServiceSpecTraffic#tag
     */
    readonly tag?: string;
    /**
     * URL displays the URL for accessing named traffic targets. URL is displayed in
     * status, and is disallowed on spec. URL must contain a scheme (e.g. http://) and
     * a hostname, but may not contain anything else (e.g. basic auth, url path, etc.)
     *
     * @schema ServiceSpecTraffic#url
     */
    readonly url?: string;
}
/**
 * Converts an object of type 'ServiceSpecTraffic' to JSON representation.
 */
export declare function toJson_ServiceSpecTraffic(obj: ServiceSpecTraffic | undefined): Record<string, any> | undefined;
/**
 * @schema ServiceSpecTemplateMetadata
 */
export interface ServiceSpecTemplateMetadata {
    /**
     * @schema ServiceSpecTemplateMetadata#annotations
     */
    readonly annotations?: {
        [key: string]: string;
    };
    /**
     * @schema ServiceSpecTemplateMetadata#finalizers
     */
    readonly finalizers?: string[];
    /**
     * @schema ServiceSpecTemplateMetadata#labels
     */
    readonly labels?: {
        [key: string]: string;
    };
    /**
     * @schema ServiceSpecTemplateMetadata#name
     */
    readonly name?: string;
    /**
     * @schema ServiceSpecTemplateMetadata#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateMetadata' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateMetadata(obj: ServiceSpecTemplateMetadata | undefined): Record<string, any> | undefined;
/**
 * RevisionSpec holds the desired state of the Revision (from the client).
 *
 * @schema ServiceSpecTemplateSpec
 */
export interface ServiceSpecTemplateSpec {
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-affinity
     *
     * @schema ServiceSpecTemplateSpec#affinity
     */
    readonly affinity?: any;
    /**
     * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
     *
     * @schema ServiceSpecTemplateSpec#automountServiceAccountToken
     */
    readonly automountServiceAccountToken?: boolean;
    /**
     * ContainerConcurrency specifies the maximum allowed in-flight (concurrent)
     * requests per container of the Revision.  Defaults to `0` which means
     * concurrency to the application is not limited, and the system decides the
     * target concurrency for the autoscaler.
     *
     * @default 0` which means
     * @schema ServiceSpecTemplateSpec#containerConcurrency
     */
    readonly containerConcurrency?: number;
    /**
     * List of containers belonging to the pod.
     * Containers cannot currently be added or removed.
     * There must be at least one container in a Pod.
     * Cannot be updated.
     *
     * @schema ServiceSpecTemplateSpec#containers
     */
    readonly containers: ServiceSpecTemplateSpecContainers[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-dnsconfig
     *
     * @schema ServiceSpecTemplateSpec#dnsConfig
     */
    readonly dnsConfig?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-dnspolicy
     *
     * @schema ServiceSpecTemplateSpec#dnsPolicy
     */
    readonly dnsPolicy?: string;
    /**
     * EnableServiceLinks indicates whether information aboutservices should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Knative defaults this to false.
     *
     * @schema ServiceSpecTemplateSpec#enableServiceLinks
     */
    readonly enableServiceLinks?: boolean;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostaliases
     *
     * @schema ServiceSpecTemplateSpec#hostAliases
     */
    readonly hostAliases?: any[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostipc
     *
     * @schema ServiceSpecTemplateSpec#hostIPC
     */
    readonly hostIpc?: boolean;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostnetwork
     *
     * @schema ServiceSpecTemplateSpec#hostNetwork
     */
    readonly hostNetwork?: boolean;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-hostpid
     *
     * @schema ServiceSpecTemplateSpec#hostPID
     */
    readonly hostPid?: boolean;
    /**
     * IdleTimeoutSeconds is the maximum duration in seconds a request will be allowed
     * to stay open while not receiving any bytes from the user's application. If
     * unspecified, a system default will be provided.
     *
     * @schema ServiceSpecTemplateSpec#idleTimeoutSeconds
     */
    readonly idleTimeoutSeconds?: number;
    /**
     * ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec.
     * If specified, these secrets will be passed to individual puller implementations for them to use.
     * More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
     *
     * @schema ServiceSpecTemplateSpec#imagePullSecrets
     */
    readonly imagePullSecrets?: ServiceSpecTemplateSpecImagePullSecrets[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-init-containers
     *
     * @schema ServiceSpecTemplateSpec#initContainers
     */
    readonly initContainers?: any[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-nodeselector
     *
     * @schema ServiceSpecTemplateSpec#nodeSelector
     */
    readonly nodeSelector?: {
        [key: string]: string;
    };
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-priorityclassname
     *
     * @schema ServiceSpecTemplateSpec#priorityClassName
     */
    readonly priorityClassName?: string;
    /**
     * ResponseStartTimeoutSeconds is the maximum duration in seconds that the request
     * routing layer will wait for a request delivered to a container to begin
     * sending any network traffic.
     *
     * @schema ServiceSpecTemplateSpec#responseStartTimeoutSeconds
     */
    readonly responseStartTimeoutSeconds?: number;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-runtimeclassname
     *
     * @schema ServiceSpecTemplateSpec#runtimeClassName
     */
    readonly runtimeClassName?: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-schedulername
     *
     * @schema ServiceSpecTemplateSpec#schedulerName
     */
    readonly schedulerName?: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-securitycontext
     *
     * @schema ServiceSpecTemplateSpec#securityContext
     */
    readonly securityContext?: any;
    /**
     * ServiceAccountName is the name of the ServiceAccount to use to run this pod.
     * More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
     *
     * @schema ServiceSpecTemplateSpec#serviceAccountName
     */
    readonly serviceAccountName?: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-shareprocessnamespace
     *
     * @schema ServiceSpecTemplateSpec#shareProcessNamespace
     */
    readonly shareProcessNamespace?: boolean;
    /**
     * TimeoutSeconds is the maximum duration in seconds that the request instance
     * is allowed to respond to a request. If unspecified, a system default will
     * be provided.
     *
     * @schema ServiceSpecTemplateSpec#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-tolerations
     *
     * @schema ServiceSpecTemplateSpec#tolerations
     */
    readonly tolerations?: any[];
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-topologyspreadconstraints
     *
     * @schema ServiceSpecTemplateSpec#topologySpreadConstraints
     */
    readonly topologySpreadConstraints?: any[];
    /**
     * List of volumes that can be mounted by containers belonging to the pod.
     * More info: https://kubernetes.io/docs/concepts/storage/volumes
     *
     * @schema ServiceSpecTemplateSpec#volumes
     */
    readonly volumes?: ServiceSpecTemplateSpecVolumes[];
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpec' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpec(obj: ServiceSpecTemplateSpec | undefined): Record<string, any> | undefined;
/**
 * A single application container that you want to run within a pod.
 *
 * @schema ServiceSpecTemplateSpecContainers
 */
export interface ServiceSpecTemplateSpecContainers {
    /**
     * Arguments to the entrypoint.
     * The container image's CMD is used if this is not provided.
     * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
     * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
     * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
     * of whether the variable exists or not. Cannot be updated.
     * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     *
     * @schema ServiceSpecTemplateSpecContainers#args
     */
    readonly args?: string[];
    /**
     * Entrypoint array. Not executed within a shell.
     * The container image's ENTRYPOINT is used if this is not provided.
     * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
     * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
     * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
     * of whether the variable exists or not. Cannot be updated.
     * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
     *
     * @schema ServiceSpecTemplateSpecContainers#command
     */
    readonly command?: string[];
    /**
     * List of environment variables to set in the container.
     * Cannot be updated.
     *
     * @schema ServiceSpecTemplateSpecContainers#env
     */
    readonly env?: ServiceSpecTemplateSpecContainersEnv[];
    /**
     * List of sources to populate environment variables in the container.
     * The keys defined within a source must be a C_IDENTIFIER. All invalid keys
     * will be reported as an event when the container is starting. When a key exists in multiple
     * sources, the value associated with the last source will take precedence.
     * Values defined by an Env with a duplicate key will take precedence.
     * Cannot be updated.
     *
     * @schema ServiceSpecTemplateSpecContainers#envFrom
     */
    readonly envFrom?: ServiceSpecTemplateSpecContainersEnvFrom[];
    /**
     * Container image name.
     * More info: https://kubernetes.io/docs/concepts/containers/images
     * This field is optional to allow higher level config management to default or override
     * container images in workload controllers like Deployments and StatefulSets.
     *
     * @schema ServiceSpecTemplateSpecContainers#image
     */
    readonly image?: string;
    /**
     * Image pull policy.
     * One of Always, Never, IfNotPresent.
     * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
     *
     * @default Always if :latest tag is specified, or IfNotPresent otherwise.
     * @schema ServiceSpecTemplateSpecContainers#imagePullPolicy
     */
    readonly imagePullPolicy?: string;
    /**
     * Periodic probe of container liveness.
     * Container will be restarted if the probe fails.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ServiceSpecTemplateSpecContainers#livenessProbe
     */
    readonly livenessProbe?: ServiceSpecTemplateSpecContainersLivenessProbe;
    /**
     * Name of the container specified as a DNS_LABEL.
     * Each container in a pod must have a unique name (DNS_LABEL).
     * Cannot be updated.
     *
     * @schema ServiceSpecTemplateSpecContainers#name
     */
    readonly name?: string;
    /**
     * List of ports to expose from the container. Not specifying a port here
     * DOES NOT prevent that port from being exposed. Any port which is
     * listening on the default "0.0.0.0" address inside a container will be
     * accessible from the network.
     * Modifying this array with strategic merge patch may corrupt the data.
     * For more information See https://github.com/kubernetes/kubernetes/issues/108255.
     * Cannot be updated.
     *
     * @schema ServiceSpecTemplateSpecContainers#ports
     */
    readonly ports?: ServiceSpecTemplateSpecContainersPorts[];
    /**
     * Periodic probe of container service readiness.
     * Container will be removed from service endpoints if the probe fails.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ServiceSpecTemplateSpecContainers#readinessProbe
     */
    readonly readinessProbe?: ServiceSpecTemplateSpecContainersReadinessProbe;
    /**
     * Compute Resources required by this container.
     * Cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @schema ServiceSpecTemplateSpecContainers#resources
     */
    readonly resources?: ServiceSpecTemplateSpecContainersResources;
    /**
     * SecurityContext defines the security options the container should be run with.
     * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
     * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
     *
     * @schema ServiceSpecTemplateSpecContainers#securityContext
     */
    readonly securityContext?: ServiceSpecTemplateSpecContainersSecurityContext;
    /**
     * StartupProbe indicates that the Pod has successfully initialized.
     * If specified, no other probes are executed until this completes successfully.
     * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
     * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
     * when it might take a long time to load data or warm a cache, than during steady-state operation.
     * This cannot be updated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ServiceSpecTemplateSpecContainers#startupProbe
     */
    readonly startupProbe?: ServiceSpecTemplateSpecContainersStartupProbe;
    /**
     * Optional: Path at which the file to which the container's termination message
     * will be written is mounted into the container's filesystem.
     * Message written is intended to be brief final status, such as an assertion failure message.
     * Will be truncated by the node if greater than 4096 bytes. The total message length across
     * all containers will be limited to 12kb.
     * Defaults to /dev/termination-log.
     * Cannot be updated.
     *
     * @default dev/termination-log.
     * @schema ServiceSpecTemplateSpecContainers#terminationMessagePath
     */
    readonly terminationMessagePath?: string;
    /**
     * Indicate how the termination message should be populated. File will use the contents of
     * terminationMessagePath to populate the container status message on both success and failure.
     * FallbackToLogsOnError will use the last chunk of container log output if the termination
     * message file is empty and the container exited with an error.
     * The log output is limited to 2048 bytes or 80 lines, whichever is smaller.
     * Defaults to File.
     * Cannot be updated.
     *
     * @default File.
     * @schema ServiceSpecTemplateSpecContainers#terminationMessagePolicy
     */
    readonly terminationMessagePolicy?: string;
    /**
     * Pod volumes to mount into the container's filesystem.
     * Cannot be updated.
     *
     * @schema ServiceSpecTemplateSpecContainers#volumeMounts
     */
    readonly volumeMounts?: ServiceSpecTemplateSpecContainersVolumeMounts[];
    /**
     * Container's working directory.
     * If not specified, the container runtime's default will be used, which
     * might be configured in the container image.
     * Cannot be updated.
     *
     * @schema ServiceSpecTemplateSpecContainers#workingDir
     */
    readonly workingDir?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainers' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainers(obj: ServiceSpecTemplateSpecContainers | undefined): Record<string, any> | undefined;
/**
 * LocalObjectReference contains enough information to let you locate the
 * referenced object inside the same namespace.
 *
 * @schema ServiceSpecTemplateSpecImagePullSecrets
 */
export interface ServiceSpecTemplateSpecImagePullSecrets {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServiceSpecTemplateSpecImagePullSecrets#name
     */
    readonly name?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecImagePullSecrets' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecImagePullSecrets(obj: ServiceSpecTemplateSpecImagePullSecrets | undefined): Record<string, any> | undefined;
/**
 * Volume represents a named volume in a pod that may be accessed by any container in the pod.
 *
 * @schema ServiceSpecTemplateSpecVolumes
 */
export interface ServiceSpecTemplateSpecVolumes {
    /**
     * configMap represents a configMap that should populate this volume
     *
     * @schema ServiceSpecTemplateSpecVolumes#configMap
     */
    readonly configMap?: ServiceSpecTemplateSpecVolumesConfigMap;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-csi
     *
     * @schema ServiceSpecTemplateSpecVolumes#csi
     */
    readonly csi?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-emptydir
     *
     * @schema ServiceSpecTemplateSpecVolumes#emptyDir
     */
    readonly emptyDir?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-hostpath
     *
     * @schema ServiceSpecTemplateSpecVolumes#hostPath
     */
    readonly hostPath?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-image
     *
     * @schema ServiceSpecTemplateSpecVolumes#image
     */
    readonly image?: any;
    /**
     * name of the volume.
     * Must be a DNS_LABEL and unique within the pod.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServiceSpecTemplateSpecVolumes#name
     */
    readonly name: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-persistent-volume-claim
     *
     * @schema ServiceSpecTemplateSpecVolumes#persistentVolumeClaim
     */
    readonly persistentVolumeClaim?: any;
    /**
     * projected items for all in one resources secrets, configmaps, and downward API
     *
     * @schema ServiceSpecTemplateSpecVolumes#projected
     */
    readonly projected?: ServiceSpecTemplateSpecVolumesProjected;
    /**
     * secret represents a secret that should populate this volume.
     * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
     *
     * @schema ServiceSpecTemplateSpecVolumes#secret
     */
    readonly secret?: ServiceSpecTemplateSpecVolumesSecret;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumes' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumes(obj: ServiceSpecTemplateSpecVolumes | undefined): Record<string, any> | undefined;
/**
 * EnvVar represents an environment variable present in a Container.
 *
 * @schema ServiceSpecTemplateSpecContainersEnv
 */
export interface ServiceSpecTemplateSpecContainersEnv {
    /**
     * Name of the environment variable. Must be a C_IDENTIFIER.
     *
     * @schema ServiceSpecTemplateSpecContainersEnv#name
     */
    readonly name: string;
    /**
     * Variable references $(VAR_NAME) are expanded
     * using the previously defined environment variables in the container and
     * any service environment variables. If a variable cannot be resolved,
     * the reference in the input string will be unchanged. Double $$ are reduced
     * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e.
     * "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)".
     * Escaped references will never be expanded, regardless of whether the variable
     * exists or not.
     * Defaults to "".
     *
     * @default .
     * @schema ServiceSpecTemplateSpecContainersEnv#value
     */
    readonly value?: string;
    /**
     * Source for the environment variable's value. Cannot be used if value is not empty.
     *
     * @schema ServiceSpecTemplateSpecContainersEnv#valueFrom
     */
    readonly valueFrom?: ServiceSpecTemplateSpecContainersEnvValueFrom;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersEnv' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersEnv(obj: ServiceSpecTemplateSpecContainersEnv | undefined): Record<string, any> | undefined;
/**
 * EnvFromSource represents the source of a set of ConfigMaps or Secrets
 *
 * @schema ServiceSpecTemplateSpecContainersEnvFrom
 */
export interface ServiceSpecTemplateSpecContainersEnvFrom {
    /**
     * The ConfigMap to select from
     *
     * @schema ServiceSpecTemplateSpecContainersEnvFrom#configMapRef
     */
    readonly configMapRef?: ServiceSpecTemplateSpecContainersEnvFromConfigMapRef;
    /**
     * Optional text to prepend to the name of each environment variable. Must be a C_IDENTIFIER.
     *
     * @schema ServiceSpecTemplateSpecContainersEnvFrom#prefix
     */
    readonly prefix?: string;
    /**
     * The Secret to select from
     *
     * @schema ServiceSpecTemplateSpecContainersEnvFrom#secretRef
     */
    readonly secretRef?: ServiceSpecTemplateSpecContainersEnvFromSecretRef;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersEnvFrom' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersEnvFrom(obj: ServiceSpecTemplateSpecContainersEnvFrom | undefined): Record<string, any> | undefined;
/**
 * Periodic probe of container liveness.
 * Container will be restarted if the probe fails.
 * Cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
 *
 * @schema ServiceSpecTemplateSpecContainersLivenessProbe
 */
export interface ServiceSpecTemplateSpecContainersLivenessProbe {
    /**
     * Exec specifies a command to execute in the container.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbe#exec
     */
    readonly exec?: ServiceSpecTemplateSpecContainersLivenessProbeExec;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded.
     * Defaults to 3. Minimum value is 1.
     *
     * @default 3. Minimum value is 1.
     * @schema ServiceSpecTemplateSpecContainersLivenessProbe#failureThreshold
     */
    readonly failureThreshold?: number;
    /**
     * GRPC specifies a GRPC HealthCheckRequest.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbe#grpc
     */
    readonly grpc?: ServiceSpecTemplateSpecContainersLivenessProbeGrpc;
    /**
     * HTTPGet specifies an HTTP GET request to perform.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbe#httpGet
     */
    readonly httpGet?: ServiceSpecTemplateSpecContainersLivenessProbeHttpGet;
    /**
     * Number of seconds after the container has started before liveness probes are initiated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbe#initialDelaySeconds
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbe#periodSeconds
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed.
     * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     *
     * @default 1. Must be 1 for liveness and startup. Minimum value is 1.
     * @schema ServiceSpecTemplateSpecContainersLivenessProbe#successThreshold
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies a connection to a TCP port.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbe#tcpSocket
     */
    readonly tcpSocket?: ServiceSpecTemplateSpecContainersLivenessProbeTcpSocket;
    /**
     * Number of seconds after which the probe times out.
     * Defaults to 1 second. Minimum value is 1.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @default 1 second. Minimum value is 1.
     * @schema ServiceSpecTemplateSpecContainersLivenessProbe#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersLivenessProbe' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersLivenessProbe(obj: ServiceSpecTemplateSpecContainersLivenessProbe | undefined): Record<string, any> | undefined;
/**
 * ContainerPort represents a network port in a single container.
 *
 * @schema ServiceSpecTemplateSpecContainersPorts
 */
export interface ServiceSpecTemplateSpecContainersPorts {
    /**
     * Number of port to expose on the pod's IP address.
     * This must be a valid port number, 0 < x < 65536.
     *
     * @schema ServiceSpecTemplateSpecContainersPorts#containerPort
     */
    readonly containerPort?: number;
    /**
     * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
     * named port in a pod must have a unique name. Name for the port that can be
     * referred to by services.
     *
     * @schema ServiceSpecTemplateSpecContainersPorts#name
     */
    readonly name?: string;
    /**
     * Protocol for port. Must be UDP, TCP, or SCTP.
     * Defaults to "TCP".
     *
     * @default TCP".
     * @schema ServiceSpecTemplateSpecContainersPorts#protocol
     */
    readonly protocol?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersPorts' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersPorts(obj: ServiceSpecTemplateSpecContainersPorts | undefined): Record<string, any> | undefined;
/**
 * Periodic probe of container service readiness.
 * Container will be removed from service endpoints if the probe fails.
 * Cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
 *
 * @schema ServiceSpecTemplateSpecContainersReadinessProbe
 */
export interface ServiceSpecTemplateSpecContainersReadinessProbe {
    /**
     * Exec specifies a command to execute in the container.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbe#exec
     */
    readonly exec?: ServiceSpecTemplateSpecContainersReadinessProbeExec;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded.
     * Defaults to 3. Minimum value is 1.
     *
     * @default 3. Minimum value is 1.
     * @schema ServiceSpecTemplateSpecContainersReadinessProbe#failureThreshold
     */
    readonly failureThreshold?: number;
    /**
     * GRPC specifies a GRPC HealthCheckRequest.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbe#grpc
     */
    readonly grpc?: ServiceSpecTemplateSpecContainersReadinessProbeGrpc;
    /**
     * HTTPGet specifies an HTTP GET request to perform.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbe#httpGet
     */
    readonly httpGet?: ServiceSpecTemplateSpecContainersReadinessProbeHttpGet;
    /**
     * Number of seconds after the container has started before liveness probes are initiated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbe#initialDelaySeconds
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbe#periodSeconds
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed.
     * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     *
     * @default 1. Must be 1 for liveness and startup. Minimum value is 1.
     * @schema ServiceSpecTemplateSpecContainersReadinessProbe#successThreshold
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies a connection to a TCP port.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbe#tcpSocket
     */
    readonly tcpSocket?: ServiceSpecTemplateSpecContainersReadinessProbeTcpSocket;
    /**
     * Number of seconds after which the probe times out.
     * Defaults to 1 second. Minimum value is 1.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @default 1 second. Minimum value is 1.
     * @schema ServiceSpecTemplateSpecContainersReadinessProbe#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersReadinessProbe' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersReadinessProbe(obj: ServiceSpecTemplateSpecContainersReadinessProbe | undefined): Record<string, any> | undefined;
/**
 * Compute Resources required by this container.
 * Cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
 *
 * @schema ServiceSpecTemplateSpecContainersResources
 */
export interface ServiceSpecTemplateSpecContainersResources {
    /**
     * Limits describes the maximum amount of compute resources allowed.
     * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @schema ServiceSpecTemplateSpecContainersResources#limits
     */
    readonly limits?: {
        [key: string]: ServiceSpecTemplateSpecContainersResourcesLimits;
    };
    /**
     * Requests describes the minimum amount of compute resources required.
     * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
     * otherwise to an implementation-defined value. Requests cannot exceed Limits.
     * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
     *
     * @schema ServiceSpecTemplateSpecContainersResources#requests
     */
    readonly requests?: {
        [key: string]: ServiceSpecTemplateSpecContainersResourcesRequests;
    };
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersResources' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersResources(obj: ServiceSpecTemplateSpecContainersResources | undefined): Record<string, any> | undefined;
/**
 * SecurityContext defines the security options the container should be run with.
 * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
 * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
 *
 * @schema ServiceSpecTemplateSpecContainersSecurityContext
 */
export interface ServiceSpecTemplateSpecContainersSecurityContext {
    /**
     * AllowPrivilegeEscalation controls whether a process can gain more
     * privileges than its parent process. This bool directly controls if
     * the no_new_privs flag will be set on the container process.
     * AllowPrivilegeEscalation is true always when the container is:
     * 1) run as Privileged
     * 2) has CAP_SYS_ADMIN
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @schema ServiceSpecTemplateSpecContainersSecurityContext#allowPrivilegeEscalation
     */
    readonly allowPrivilegeEscalation?: boolean;
    /**
     * The capabilities to add/drop when running containers.
     * Defaults to the default set of capabilities granted by the container runtime.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @default the default set of capabilities granted by the container runtime.
     * @schema ServiceSpecTemplateSpecContainersSecurityContext#capabilities
     */
    readonly capabilities?: ServiceSpecTemplateSpecContainersSecurityContextCapabilities;
    /**
     * Run container in privileged mode. This can only be set to explicitly to 'false'
     *
     * @schema ServiceSpecTemplateSpecContainersSecurityContext#privileged
     */
    readonly privileged?: boolean;
    /**
     * Whether this container has a read-only root filesystem.
     * Default is false.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @default false.
     * @schema ServiceSpecTemplateSpecContainersSecurityContext#readOnlyRootFilesystem
     */
    readonly readOnlyRootFilesystem?: boolean;
    /**
     * The GID to run the entrypoint of the container process.
     * Uses runtime default if unset.
     * May also be set in PodSecurityContext.  If set in both SecurityContext and
     * PodSecurityContext, the value specified in SecurityContext takes precedence.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @schema ServiceSpecTemplateSpecContainersSecurityContext#runAsGroup
     */
    readonly runAsGroup?: number;
    /**
     * Indicates that the container must run as a non-root user.
     * If true, the Kubelet will validate the image at runtime to ensure that it
     * does not run as UID 0 (root) and fail to start the container if it does.
     * If unset or false, no such validation will be performed.
     * May also be set in PodSecurityContext.  If set in both SecurityContext and
     * PodSecurityContext, the value specified in SecurityContext takes precedence.
     *
     * @schema ServiceSpecTemplateSpecContainersSecurityContext#runAsNonRoot
     */
    readonly runAsNonRoot?: boolean;
    /**
     * The UID to run the entrypoint of the container process.
     * Defaults to user specified in image metadata if unspecified.
     * May also be set in PodSecurityContext.  If set in both SecurityContext and
     * PodSecurityContext, the value specified in SecurityContext takes precedence.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @default user specified in image metadata if unspecified.
     * @schema ServiceSpecTemplateSpecContainersSecurityContext#runAsUser
     */
    readonly runAsUser?: number;
    /**
     * The seccomp options to use by this container. If seccomp options are
     * provided at both the pod & container level, the container options
     * override the pod options.
     * Note that this field cannot be set when spec.os.name is windows.
     *
     * @schema ServiceSpecTemplateSpecContainersSecurityContext#seccompProfile
     */
    readonly seccompProfile?: ServiceSpecTemplateSpecContainersSecurityContextSeccompProfile;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersSecurityContext' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersSecurityContext(obj: ServiceSpecTemplateSpecContainersSecurityContext | undefined): Record<string, any> | undefined;
/**
 * StartupProbe indicates that the Pod has successfully initialized.
 * If specified, no other probes are executed until this completes successfully.
 * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
 * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
 * when it might take a long time to load data or warm a cache, than during steady-state operation.
 * This cannot be updated.
 * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
 *
 * @schema ServiceSpecTemplateSpecContainersStartupProbe
 */
export interface ServiceSpecTemplateSpecContainersStartupProbe {
    /**
     * Exec specifies a command to execute in the container.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbe#exec
     */
    readonly exec?: ServiceSpecTemplateSpecContainersStartupProbeExec;
    /**
     * Minimum consecutive failures for the probe to be considered failed after having succeeded.
     * Defaults to 3. Minimum value is 1.
     *
     * @default 3. Minimum value is 1.
     * @schema ServiceSpecTemplateSpecContainersStartupProbe#failureThreshold
     */
    readonly failureThreshold?: number;
    /**
     * GRPC specifies a GRPC HealthCheckRequest.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbe#grpc
     */
    readonly grpc?: ServiceSpecTemplateSpecContainersStartupProbeGrpc;
    /**
     * HTTPGet specifies an HTTP GET request to perform.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbe#httpGet
     */
    readonly httpGet?: ServiceSpecTemplateSpecContainersStartupProbeHttpGet;
    /**
     * Number of seconds after the container has started before liveness probes are initiated.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbe#initialDelaySeconds
     */
    readonly initialDelaySeconds?: number;
    /**
     * How often (in seconds) to perform the probe.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbe#periodSeconds
     */
    readonly periodSeconds?: number;
    /**
     * Minimum consecutive successes for the probe to be considered successful after having failed.
     * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
     *
     * @default 1. Must be 1 for liveness and startup. Minimum value is 1.
     * @schema ServiceSpecTemplateSpecContainersStartupProbe#successThreshold
     */
    readonly successThreshold?: number;
    /**
     * TCPSocket specifies a connection to a TCP port.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbe#tcpSocket
     */
    readonly tcpSocket?: ServiceSpecTemplateSpecContainersStartupProbeTcpSocket;
    /**
     * Number of seconds after which the probe times out.
     * Defaults to 1 second. Minimum value is 1.
     * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
     *
     * @default 1 second. Minimum value is 1.
     * @schema ServiceSpecTemplateSpecContainersStartupProbe#timeoutSeconds
     */
    readonly timeoutSeconds?: number;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersStartupProbe' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersStartupProbe(obj: ServiceSpecTemplateSpecContainersStartupProbe | undefined): Record<string, any> | undefined;
/**
 * VolumeMount describes a mounting of a Volume within a container.
 *
 * @schema ServiceSpecTemplateSpecContainersVolumeMounts
 */
export interface ServiceSpecTemplateSpecContainersVolumeMounts {
    /**
     * Path within the container at which the volume should be mounted.  Must
     * not contain ':'.
     *
     * @schema ServiceSpecTemplateSpecContainersVolumeMounts#mountPath
     */
    readonly mountPath: string;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-volumes-mount-propagation
     *
     * @schema ServiceSpecTemplateSpecContainersVolumeMounts#mountPropagation
     */
    readonly mountPropagation?: string;
    /**
     * This must match the Name of a Volume.
     *
     * @schema ServiceSpecTemplateSpecContainersVolumeMounts#name
     */
    readonly name: string;
    /**
     * Mounted read-only if true, read-write otherwise (false or unspecified).
     * Defaults to false.
     *
     * @default false.
     * @schema ServiceSpecTemplateSpecContainersVolumeMounts#readOnly
     */
    readonly readOnly?: boolean;
    /**
     * Path within the volume from which the container's volume should be mounted.
     * Defaults to "" (volume's root).
     *
     * @default volume's root).
     * @schema ServiceSpecTemplateSpecContainersVolumeMounts#subPath
     */
    readonly subPath?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersVolumeMounts' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersVolumeMounts(obj: ServiceSpecTemplateSpecContainersVolumeMounts | undefined): Record<string, any> | undefined;
/**
 * configMap represents a configMap that should populate this volume
 *
 * @schema ServiceSpecTemplateSpecVolumesConfigMap
 */
export interface ServiceSpecTemplateSpecVolumesConfigMap {
    /**
     * defaultMode is optional: mode bits used to set permissions on created files by default.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * Defaults to 0644.
     * Directories within the path are not affected by this setting.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @default 0644.
     * @schema ServiceSpecTemplateSpecVolumesConfigMap#defaultMode
     */
    readonly defaultMode?: number;
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced
     * ConfigMap will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the ConfigMap,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema ServiceSpecTemplateSpecVolumesConfigMap#items
     */
    readonly items?: ServiceSpecTemplateSpecVolumesConfigMapItems[];
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServiceSpecTemplateSpecVolumesConfigMap#name
     */
    readonly name?: string;
    /**
     * optional specify whether the ConfigMap or its keys must be defined
     *
     * @schema ServiceSpecTemplateSpecVolumesConfigMap#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesConfigMap' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesConfigMap(obj: ServiceSpecTemplateSpecVolumesConfigMap | undefined): Record<string, any> | undefined;
/**
 * projected items for all in one resources secrets, configmaps, and downward API
 *
 * @schema ServiceSpecTemplateSpecVolumesProjected
 */
export interface ServiceSpecTemplateSpecVolumesProjected {
    /**
     * defaultMode are the mode bits used to set permissions on created files by default.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * Directories within the path are not affected by this setting.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjected#defaultMode
     */
    readonly defaultMode?: number;
    /**
     * sources is the list of volume projections. Each entry in this list
     * handles one source.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjected#sources
     */
    readonly sources?: ServiceSpecTemplateSpecVolumesProjectedSources[];
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjected' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjected(obj: ServiceSpecTemplateSpecVolumesProjected | undefined): Record<string, any> | undefined;
/**
 * secret represents a secret that should populate this volume.
 * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
 *
 * @schema ServiceSpecTemplateSpecVolumesSecret
 */
export interface ServiceSpecTemplateSpecVolumesSecret {
    /**
     * defaultMode is Optional: mode bits used to set permissions on created files by default.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values
     * for mode bits. Defaults to 0644.
     * Directories within the path are not affected by this setting.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @default 0644.
     * @schema ServiceSpecTemplateSpecVolumesSecret#defaultMode
     */
    readonly defaultMode?: number;
    /**
     * items If unspecified, each key-value pair in the Data field of the referenced
     * Secret will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the Secret,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema ServiceSpecTemplateSpecVolumesSecret#items
     */
    readonly items?: ServiceSpecTemplateSpecVolumesSecretItems[];
    /**
     * optional field specify whether the Secret or its keys must be defined
     *
     * @schema ServiceSpecTemplateSpecVolumesSecret#optional
     */
    readonly optional?: boolean;
    /**
     * secretName is the name of the secret in the pod's namespace to use.
     * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
     *
     * @schema ServiceSpecTemplateSpecVolumesSecret#secretName
     */
    readonly secretName?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesSecret' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesSecret(obj: ServiceSpecTemplateSpecVolumesSecret | undefined): Record<string, any> | undefined;
/**
 * Source for the environment variable's value. Cannot be used if value is not empty.
 *
 * @schema ServiceSpecTemplateSpecContainersEnvValueFrom
 */
export interface ServiceSpecTemplateSpecContainersEnvValueFrom {
    /**
     * Selects a key of a ConfigMap.
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFrom#configMapKeyRef
     */
    readonly configMapKeyRef?: ServiceSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-fieldref
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFrom#fieldRef
     */
    readonly fieldRef?: any;
    /**
     * This is accessible behind a feature flag - kubernetes.podspec-fieldref
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFrom#resourceFieldRef
     */
    readonly resourceFieldRef?: any;
    /**
     * Selects a key of a secret in the pod's namespace
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFrom#secretKeyRef
     */
    readonly secretKeyRef?: ServiceSpecTemplateSpecContainersEnvValueFromSecretKeyRef;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersEnvValueFrom' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersEnvValueFrom(obj: ServiceSpecTemplateSpecContainersEnvValueFrom | undefined): Record<string, any> | undefined;
/**
 * The ConfigMap to select from
 *
 * @schema ServiceSpecTemplateSpecContainersEnvFromConfigMapRef
 */
export interface ServiceSpecTemplateSpecContainersEnvFromConfigMapRef {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServiceSpecTemplateSpecContainersEnvFromConfigMapRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap must be defined
     *
     * @schema ServiceSpecTemplateSpecContainersEnvFromConfigMapRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersEnvFromConfigMapRef' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersEnvFromConfigMapRef(obj: ServiceSpecTemplateSpecContainersEnvFromConfigMapRef | undefined): Record<string, any> | undefined;
/**
 * The Secret to select from
 *
 * @schema ServiceSpecTemplateSpecContainersEnvFromSecretRef
 */
export interface ServiceSpecTemplateSpecContainersEnvFromSecretRef {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServiceSpecTemplateSpecContainersEnvFromSecretRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the Secret must be defined
     *
     * @schema ServiceSpecTemplateSpecContainersEnvFromSecretRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersEnvFromSecretRef' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersEnvFromSecretRef(obj: ServiceSpecTemplateSpecContainersEnvFromSecretRef | undefined): Record<string, any> | undefined;
/**
 * Exec specifies a command to execute in the container.
 *
 * @schema ServiceSpecTemplateSpecContainersLivenessProbeExec
 */
export interface ServiceSpecTemplateSpecContainersLivenessProbeExec {
    /**
     * Command is the command line to execute inside the container, the working directory for the
     * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
     * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
     * a shell, you need to explicitly call out to that shell.
     * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeExec#command
     */
    readonly command?: string[];
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersLivenessProbeExec' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersLivenessProbeExec(obj: ServiceSpecTemplateSpecContainersLivenessProbeExec | undefined): Record<string, any> | undefined;
/**
 * GRPC specifies a GRPC HealthCheckRequest.
 *
 * @schema ServiceSpecTemplateSpecContainersLivenessProbeGrpc
 */
export interface ServiceSpecTemplateSpecContainersLivenessProbeGrpc {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeGrpc#port
     */
    readonly port?: number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest
     * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeGrpc#service
     */
    readonly service?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersLivenessProbeGrpc' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersLivenessProbeGrpc(obj: ServiceSpecTemplateSpecContainersLivenessProbeGrpc | undefined): Record<string, any> | undefined;
/**
 * HTTPGet specifies an HTTP GET request to perform.
 *
 * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGet
 */
export interface ServiceSpecTemplateSpecContainersLivenessProbeHttpGet {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set
     * "Host" in httpHeaders instead.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGet#host
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGet#httpHeaders
     */
    readonly httpHeaders?: ServiceSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders[];
    /**
     * Path to access on the HTTP server.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGet#path
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGet#port
     */
    readonly port?: ServiceSpecTemplateSpecContainersLivenessProbeHttpGetPort;
    /**
     * Scheme to use for connecting to the host.
     * Defaults to HTTP.
     *
     * @default HTTP.
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGet#scheme
     */
    readonly scheme?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersLivenessProbeHttpGet' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersLivenessProbeHttpGet(obj: ServiceSpecTemplateSpecContainersLivenessProbeHttpGet | undefined): Record<string, any> | undefined;
/**
 * TCPSocket specifies a connection to a TCP port.
 *
 * @schema ServiceSpecTemplateSpecContainersLivenessProbeTcpSocket
 */
export interface ServiceSpecTemplateSpecContainersLivenessProbeTcpSocket {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeTcpSocket#host
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeTcpSocket#port
     */
    readonly port?: ServiceSpecTemplateSpecContainersLivenessProbeTcpSocketPort;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersLivenessProbeTcpSocket' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersLivenessProbeTcpSocket(obj: ServiceSpecTemplateSpecContainersLivenessProbeTcpSocket | undefined): Record<string, any> | undefined;
/**
 * Exec specifies a command to execute in the container.
 *
 * @schema ServiceSpecTemplateSpecContainersReadinessProbeExec
 */
export interface ServiceSpecTemplateSpecContainersReadinessProbeExec {
    /**
     * Command is the command line to execute inside the container, the working directory for the
     * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
     * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
     * a shell, you need to explicitly call out to that shell.
     * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeExec#command
     */
    readonly command?: string[];
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersReadinessProbeExec' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersReadinessProbeExec(obj: ServiceSpecTemplateSpecContainersReadinessProbeExec | undefined): Record<string, any> | undefined;
/**
 * GRPC specifies a GRPC HealthCheckRequest.
 *
 * @schema ServiceSpecTemplateSpecContainersReadinessProbeGrpc
 */
export interface ServiceSpecTemplateSpecContainersReadinessProbeGrpc {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeGrpc#port
     */
    readonly port?: number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest
     * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeGrpc#service
     */
    readonly service?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersReadinessProbeGrpc' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersReadinessProbeGrpc(obj: ServiceSpecTemplateSpecContainersReadinessProbeGrpc | undefined): Record<string, any> | undefined;
/**
 * HTTPGet specifies an HTTP GET request to perform.
 *
 * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGet
 */
export interface ServiceSpecTemplateSpecContainersReadinessProbeHttpGet {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set
     * "Host" in httpHeaders instead.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGet#host
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGet#httpHeaders
     */
    readonly httpHeaders?: ServiceSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders[];
    /**
     * Path to access on the HTTP server.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGet#path
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGet#port
     */
    readonly port?: ServiceSpecTemplateSpecContainersReadinessProbeHttpGetPort;
    /**
     * Scheme to use for connecting to the host.
     * Defaults to HTTP.
     *
     * @default HTTP.
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGet#scheme
     */
    readonly scheme?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersReadinessProbeHttpGet' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersReadinessProbeHttpGet(obj: ServiceSpecTemplateSpecContainersReadinessProbeHttpGet | undefined): Record<string, any> | undefined;
/**
 * TCPSocket specifies a connection to a TCP port.
 *
 * @schema ServiceSpecTemplateSpecContainersReadinessProbeTcpSocket
 */
export interface ServiceSpecTemplateSpecContainersReadinessProbeTcpSocket {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeTcpSocket#host
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeTcpSocket#port
     */
    readonly port?: ServiceSpecTemplateSpecContainersReadinessProbeTcpSocketPort;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersReadinessProbeTcpSocket' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersReadinessProbeTcpSocket(obj: ServiceSpecTemplateSpecContainersReadinessProbeTcpSocket | undefined): Record<string, any> | undefined;
/**
 * @schema ServiceSpecTemplateSpecContainersResourcesLimits
 */
export declare class ServiceSpecTemplateSpecContainersResourcesLimits {
    readonly value: number | string;
    static fromNumber(value: number): ServiceSpecTemplateSpecContainersResourcesLimits;
    static fromString(value: string): ServiceSpecTemplateSpecContainersResourcesLimits;
    private constructor();
}
/**
 * @schema ServiceSpecTemplateSpecContainersResourcesRequests
 */
export declare class ServiceSpecTemplateSpecContainersResourcesRequests {
    readonly value: number | string;
    static fromNumber(value: number): ServiceSpecTemplateSpecContainersResourcesRequests;
    static fromString(value: string): ServiceSpecTemplateSpecContainersResourcesRequests;
    private constructor();
}
/**
 * The capabilities to add/drop when running containers.
 * Defaults to the default set of capabilities granted by the container runtime.
 * Note that this field cannot be set when spec.os.name is windows.
 *
 * @default the default set of capabilities granted by the container runtime.
 * @schema ServiceSpecTemplateSpecContainersSecurityContextCapabilities
 */
export interface ServiceSpecTemplateSpecContainersSecurityContextCapabilities {
    /**
     * This is accessible behind a feature flag - kubernetes.containerspec-addcapabilities
     *
     * @schema ServiceSpecTemplateSpecContainersSecurityContextCapabilities#add
     */
    readonly add?: string[];
    /**
     * Removed capabilities
     *
     * @schema ServiceSpecTemplateSpecContainersSecurityContextCapabilities#drop
     */
    readonly drop?: string[];
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersSecurityContextCapabilities' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersSecurityContextCapabilities(obj: ServiceSpecTemplateSpecContainersSecurityContextCapabilities | undefined): Record<string, any> | undefined;
/**
 * The seccomp options to use by this container. If seccomp options are
 * provided at both the pod & container level, the container options
 * override the pod options.
 * Note that this field cannot be set when spec.os.name is windows.
 *
 * @schema ServiceSpecTemplateSpecContainersSecurityContextSeccompProfile
 */
export interface ServiceSpecTemplateSpecContainersSecurityContextSeccompProfile {
    /**
     * localhostProfile indicates a profile defined in a file on the node should be used.
     * The profile must be preconfigured on the node to work.
     * Must be a descending path, relative to the kubelet's configured seccomp profile location.
     * Must be set if type is "Localhost". Must NOT be set for any other type.
     *
     * @schema ServiceSpecTemplateSpecContainersSecurityContextSeccompProfile#localhostProfile
     */
    readonly localhostProfile?: string;
    /**
     * type indicates which kind of seccomp profile will be applied.
     * Valid options are:
     *
     * Localhost - a profile defined in a file on the node should be used.
     * RuntimeDefault - the container runtime default profile should be used.
     * Unconfined - no profile should be applied.
     *
     * @schema ServiceSpecTemplateSpecContainersSecurityContextSeccompProfile#type
     */
    readonly type: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersSecurityContextSeccompProfile' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersSecurityContextSeccompProfile(obj: ServiceSpecTemplateSpecContainersSecurityContextSeccompProfile | undefined): Record<string, any> | undefined;
/**
 * Exec specifies a command to execute in the container.
 *
 * @schema ServiceSpecTemplateSpecContainersStartupProbeExec
 */
export interface ServiceSpecTemplateSpecContainersStartupProbeExec {
    /**
     * Command is the command line to execute inside the container, the working directory for the
     * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
     * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
     * a shell, you need to explicitly call out to that shell.
     * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeExec#command
     */
    readonly command?: string[];
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersStartupProbeExec' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersStartupProbeExec(obj: ServiceSpecTemplateSpecContainersStartupProbeExec | undefined): Record<string, any> | undefined;
/**
 * GRPC specifies a GRPC HealthCheckRequest.
 *
 * @schema ServiceSpecTemplateSpecContainersStartupProbeGrpc
 */
export interface ServiceSpecTemplateSpecContainersStartupProbeGrpc {
    /**
     * Port number of the gRPC service. Number must be in the range 1 to 65535.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeGrpc#port
     */
    readonly port?: number;
    /**
     * Service is the name of the service to place in the gRPC HealthCheckRequest
     * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
     *
     * If this is not specified, the default behavior is defined by gRPC.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeGrpc#service
     */
    readonly service?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersStartupProbeGrpc' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersStartupProbeGrpc(obj: ServiceSpecTemplateSpecContainersStartupProbeGrpc | undefined): Record<string, any> | undefined;
/**
 * HTTPGet specifies an HTTP GET request to perform.
 *
 * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGet
 */
export interface ServiceSpecTemplateSpecContainersStartupProbeHttpGet {
    /**
     * Host name to connect to, defaults to the pod IP. You probably want to set
     * "Host" in httpHeaders instead.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGet#host
     */
    readonly host?: string;
    /**
     * Custom headers to set in the request. HTTP allows repeated headers.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGet#httpHeaders
     */
    readonly httpHeaders?: ServiceSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders[];
    /**
     * Path to access on the HTTP server.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGet#path
     */
    readonly path?: string;
    /**
     * Name or number of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGet#port
     */
    readonly port?: ServiceSpecTemplateSpecContainersStartupProbeHttpGetPort;
    /**
     * Scheme to use for connecting to the host.
     * Defaults to HTTP.
     *
     * @default HTTP.
     * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGet#scheme
     */
    readonly scheme?: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersStartupProbeHttpGet' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersStartupProbeHttpGet(obj: ServiceSpecTemplateSpecContainersStartupProbeHttpGet | undefined): Record<string, any> | undefined;
/**
 * TCPSocket specifies a connection to a TCP port.
 *
 * @schema ServiceSpecTemplateSpecContainersStartupProbeTcpSocket
 */
export interface ServiceSpecTemplateSpecContainersStartupProbeTcpSocket {
    /**
     * Optional: Host name to connect to, defaults to the pod IP.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeTcpSocket#host
     */
    readonly host?: string;
    /**
     * Number or name of the port to access on the container.
     * Number must be in the range 1 to 65535.
     * Name must be an IANA_SVC_NAME.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeTcpSocket#port
     */
    readonly port?: ServiceSpecTemplateSpecContainersStartupProbeTcpSocketPort;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersStartupProbeTcpSocket' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersStartupProbeTcpSocket(obj: ServiceSpecTemplateSpecContainersStartupProbeTcpSocket | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema ServiceSpecTemplateSpecVolumesConfigMapItems
 */
export interface ServiceSpecTemplateSpecVolumesConfigMapItems {
    /**
     * key is the key to project.
     *
     * @schema ServiceSpecTemplateSpecVolumesConfigMapItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ServiceSpecTemplateSpecVolumesConfigMapItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema ServiceSpecTemplateSpecVolumesConfigMapItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesConfigMapItems' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesConfigMapItems(obj: ServiceSpecTemplateSpecVolumesConfigMapItems | undefined): Record<string, any> | undefined;
/**
 * Projection that may be projected along with other supported volume types.
 * Exactly one of these fields must be set.
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSources
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSources {
    /**
     * configMap information about the configMap data to project
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSources#configMap
     */
    readonly configMap?: ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMap;
    /**
     * downwardAPI information about the downwardAPI data to project
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSources#downwardAPI
     */
    readonly downwardApi?: ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApi;
    /**
     * secret information about the secret data to project
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSources#secret
     */
    readonly secret?: ServiceSpecTemplateSpecVolumesProjectedSourcesSecret;
    /**
     * serviceAccountToken is information about the serviceAccountToken data to project
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSources#serviceAccountToken
     */
    readonly serviceAccountToken?: ServiceSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSources' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSources(obj: ServiceSpecTemplateSpecVolumesProjectedSources | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema ServiceSpecTemplateSpecVolumesSecretItems
 */
export interface ServiceSpecTemplateSpecVolumesSecretItems {
    /**
     * key is the key to project.
     *
     * @schema ServiceSpecTemplateSpecVolumesSecretItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ServiceSpecTemplateSpecVolumesSecretItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema ServiceSpecTemplateSpecVolumesSecretItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesSecretItems' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesSecretItems(obj: ServiceSpecTemplateSpecVolumesSecretItems | undefined): Record<string, any> | undefined;
/**
 * Selects a key of a ConfigMap.
 *
 * @schema ServiceSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef
 */
export interface ServiceSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef {
    /**
     * The key to select.
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef#key
     */
    readonly key: string;
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the ConfigMap or its key must be defined
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef(obj: ServiceSpecTemplateSpecContainersEnvValueFromConfigMapKeyRef | undefined): Record<string, any> | undefined;
/**
 * Selects a key of a secret in the pod's namespace
 *
 * @schema ServiceSpecTemplateSpecContainersEnvValueFromSecretKeyRef
 */
export interface ServiceSpecTemplateSpecContainersEnvValueFromSecretKeyRef {
    /**
     * The key of the secret to select from.  Must be a valid secret key.
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFromSecretKeyRef#key
     */
    readonly key: string;
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFromSecretKeyRef#name
     */
    readonly name?: string;
    /**
     * Specify whether the Secret or its key must be defined
     *
     * @schema ServiceSpecTemplateSpecContainersEnvValueFromSecretKeyRef#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersEnvValueFromSecretKeyRef' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersEnvValueFromSecretKeyRef(obj: ServiceSpecTemplateSpecContainersEnvValueFromSecretKeyRef | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 *
 * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders
 */
export interface ServiceSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders {
    /**
     * The header field name.
     * This will be canonicalized upon output, so case-variant names will be understood as the same header.
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders#name
     */
    readonly name: string;
    /**
     * The header field value
     *
     * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders(obj: ServiceSpecTemplateSpecContainersLivenessProbeHttpGetHttpHeaders | undefined): Record<string, any> | undefined;
/**
 * Name or number of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ServiceSpecTemplateSpecContainersLivenessProbeHttpGetPort
 */
export declare class ServiceSpecTemplateSpecContainersLivenessProbeHttpGetPort {
    readonly value: number | string;
    static fromNumber(value: number): ServiceSpecTemplateSpecContainersLivenessProbeHttpGetPort;
    static fromString(value: string): ServiceSpecTemplateSpecContainersLivenessProbeHttpGetPort;
    private constructor();
}
/**
 * Number or name of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ServiceSpecTemplateSpecContainersLivenessProbeTcpSocketPort
 */
export declare class ServiceSpecTemplateSpecContainersLivenessProbeTcpSocketPort {
    readonly value: number | string;
    static fromNumber(value: number): ServiceSpecTemplateSpecContainersLivenessProbeTcpSocketPort;
    static fromString(value: string): ServiceSpecTemplateSpecContainersLivenessProbeTcpSocketPort;
    private constructor();
}
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 *
 * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders
 */
export interface ServiceSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders {
    /**
     * The header field name.
     * This will be canonicalized upon output, so case-variant names will be understood as the same header.
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders#name
     */
    readonly name: string;
    /**
     * The header field value
     *
     * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders(obj: ServiceSpecTemplateSpecContainersReadinessProbeHttpGetHttpHeaders | undefined): Record<string, any> | undefined;
/**
 * Name or number of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ServiceSpecTemplateSpecContainersReadinessProbeHttpGetPort
 */
export declare class ServiceSpecTemplateSpecContainersReadinessProbeHttpGetPort {
    readonly value: number | string;
    static fromNumber(value: number): ServiceSpecTemplateSpecContainersReadinessProbeHttpGetPort;
    static fromString(value: string): ServiceSpecTemplateSpecContainersReadinessProbeHttpGetPort;
    private constructor();
}
/**
 * Number or name of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ServiceSpecTemplateSpecContainersReadinessProbeTcpSocketPort
 */
export declare class ServiceSpecTemplateSpecContainersReadinessProbeTcpSocketPort {
    readonly value: number | string;
    static fromNumber(value: number): ServiceSpecTemplateSpecContainersReadinessProbeTcpSocketPort;
    static fromString(value: string): ServiceSpecTemplateSpecContainersReadinessProbeTcpSocketPort;
    private constructor();
}
/**
 * HTTPHeader describes a custom header to be used in HTTP probes
 *
 * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders
 */
export interface ServiceSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders {
    /**
     * The header field name.
     * This will be canonicalized upon output, so case-variant names will be understood as the same header.
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders#name
     */
    readonly name: string;
    /**
     * The header field value
     *
     * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders(obj: ServiceSpecTemplateSpecContainersStartupProbeHttpGetHttpHeaders | undefined): Record<string, any> | undefined;
/**
 * Name or number of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ServiceSpecTemplateSpecContainersStartupProbeHttpGetPort
 */
export declare class ServiceSpecTemplateSpecContainersStartupProbeHttpGetPort {
    readonly value: number | string;
    static fromNumber(value: number): ServiceSpecTemplateSpecContainersStartupProbeHttpGetPort;
    static fromString(value: string): ServiceSpecTemplateSpecContainersStartupProbeHttpGetPort;
    private constructor();
}
/**
 * Number or name of the port to access on the container.
 * Number must be in the range 1 to 65535.
 * Name must be an IANA_SVC_NAME.
 *
 * @schema ServiceSpecTemplateSpecContainersStartupProbeTcpSocketPort
 */
export declare class ServiceSpecTemplateSpecContainersStartupProbeTcpSocketPort {
    readonly value: number | string;
    static fromNumber(value: number): ServiceSpecTemplateSpecContainersStartupProbeTcpSocketPort;
    static fromString(value: string): ServiceSpecTemplateSpecContainersStartupProbeTcpSocketPort;
    private constructor();
}
/**
 * configMap information about the configMap data to project
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMap
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMap {
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced
     * ConfigMap will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the ConfigMap,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMap#items
     */
    readonly items?: ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMapItems[];
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMap#name
     */
    readonly name?: string;
    /**
     * optional specify whether the ConfigMap or its keys must be defined
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMap#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMap' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMap(obj: ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMap | undefined): Record<string, any> | undefined;
/**
 * downwardAPI information about the downwardAPI data to project
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApi
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApi {
    /**
     * Items is a list of DownwardAPIVolume file
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApi#items
     */
    readonly items?: ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems[];
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApi' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApi(obj: ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApi | undefined): Record<string, any> | undefined;
/**
 * secret information about the secret data to project
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesSecret
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSourcesSecret {
    /**
     * items if unspecified, each key-value pair in the Data field of the referenced
     * Secret will be projected into the volume as a file whose name is the
     * key and content is the value. If specified, the listed keys will be
     * projected into the specified paths, and unlisted keys will not be
     * present. If a key is specified which is not present in the Secret,
     * the volume setup will error unless it is marked optional. Paths must be
     * relative and may not contain the '..' path or start with '..'.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesSecret#items
     */
    readonly items?: ServiceSpecTemplateSpecVolumesProjectedSourcesSecretItems[];
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesSecret#name
     */
    readonly name?: string;
    /**
     * optional field specify whether the Secret or its key must be defined
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesSecret#optional
     */
    readonly optional?: boolean;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSourcesSecret' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSourcesSecret(obj: ServiceSpecTemplateSpecVolumesProjectedSourcesSecret | undefined): Record<string, any> | undefined;
/**
 * serviceAccountToken is information about the serviceAccountToken data to project
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken {
    /**
     * audience is the intended audience of the token. A recipient of a token
     * must identify itself with an identifier specified in the audience of the
     * token, and otherwise should reject the token. The audience defaults to the
     * identifier of the apiserver.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken#audience
     */
    readonly audience?: string;
    /**
     * expirationSeconds is the requested duration of validity of the service
     * account token. As the token approaches expiration, the kubelet volume
     * plugin will proactively rotate the service account token. The kubelet will
     * start trying to rotate the token if the token is older than 80 percent of
     * its time to live or if the token is older than 24 hours.Defaults to 1 hour
     * and must be at least 10 minutes.
     *
     * @default 1 hour
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken#expirationSeconds
     */
    readonly expirationSeconds?: number;
    /**
     * path is the path relative to the mount point of the file to project the
     * token into.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken(obj: ServiceSpecTemplateSpecVolumesProjectedSourcesServiceAccountToken | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMapItems
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMapItems {
    /**
     * key is the key to project.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMapItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMapItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMapItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMapItems' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMapItems(obj: ServiceSpecTemplateSpecVolumesProjectedSourcesConfigMapItems | undefined): Record<string, any> | undefined;
/**
 * DownwardAPIVolumeFile represents information to create the file containing the pod field
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems {
    /**
     * Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems#fieldRef
     */
    readonly fieldRef?: ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef;
    /**
     * Optional: mode bits used to set permissions on this file, must be an octal value
     * between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems#mode
     */
    readonly mode?: number;
    /**
     * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems#path
     */
    readonly path: string;
    /**
     * Selects a resource of the container: only resources limits and requests
     * (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems#resourceFieldRef
     */
    readonly resourceFieldRef?: ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems(obj: ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItems | undefined): Record<string, any> | undefined;
/**
 * Maps a string key to a path within a volume.
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesSecretItems
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSourcesSecretItems {
    /**
     * key is the key to project.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesSecretItems#key
     */
    readonly key: string;
    /**
     * mode is Optional: mode bits used to set permissions on this file.
     * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
     * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
     * If not specified, the volume defaultMode will be used.
     * This might be in conflict with other options that affect the file
     * mode, like fsGroup, and the result can be other mode bits set.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesSecretItems#mode
     */
    readonly mode?: number;
    /**
     * path is the relative path of the file to map the key to.
     * May not be an absolute path.
     * May not contain the path element '..'.
     * May not start with the string '..'.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesSecretItems#path
     */
    readonly path: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSourcesSecretItems' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSourcesSecretItems(obj: ServiceSpecTemplateSpecVolumesProjectedSourcesSecretItems | undefined): Record<string, any> | undefined;
/**
 * Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef {
    /**
     * Version of the schema the FieldPath is written in terms of, defaults to "v1".
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef#apiVersion
     */
    readonly apiVersion?: string;
    /**
     * Path of the field to select in the specified API version.
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef#fieldPath
     */
    readonly fieldPath: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef(obj: ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsFieldRef | undefined): Record<string, any> | undefined;
/**
 * Selects a resource of the container: only resources limits and requests
 * (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef
 */
export interface ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef {
    /**
     * Container name: required for volumes, optional for env vars
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef#containerName
     */
    readonly containerName?: string;
    /**
     * Specifies the output format of the exposed resources, defaults to "1"
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef#divisor
     */
    readonly divisor?: ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor;
    /**
     * Required: resource to select
     *
     * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef#resource
     */
    readonly resource: string;
}
/**
 * Converts an object of type 'ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef' to JSON representation.
 */
export declare function toJson_ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef(obj: ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRef | undefined): Record<string, any> | undefined;
/**
 * Specifies the output format of the exposed resources, defaults to "1"
 *
 * @schema ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor
 */
export declare class ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor {
    readonly value: number | string;
    static fromNumber(value: number): ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor;
    static fromString(value: string): ServiceSpecTemplateSpecVolumesProjectedSourcesDownwardApiItemsResourceFieldRefDivisor;
    private constructor();
}
