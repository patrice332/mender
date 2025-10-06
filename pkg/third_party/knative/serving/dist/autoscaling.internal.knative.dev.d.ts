import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
/**
 * Metric represents a resource to configure the metric collector with.
 *
 * @schema Metric
 */
export declare class Metric extends ApiObject {
    /**
     * Returns the apiVersion and kind for "Metric"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Metric".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: MetricProps): any;
    /**
     * Defines a "Metric" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: MetricProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Metric represents a resource to configure the metric collector with.
 *
 * @schema Metric
 */
export interface MetricProps {
    /**
     * @schema Metric#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec holds the desired state of the Metric (from the client).
     *
     * @schema Metric#spec
     */
    readonly spec?: MetricSpec;
}
/**
 * Converts an object of type 'MetricProps' to JSON representation.
 */
export declare function toJson_MetricProps(obj: MetricProps | undefined): Record<string, any> | undefined;
/**
 * Spec holds the desired state of the Metric (from the client).
 *
 * @schema MetricSpec
 */
export interface MetricSpec {
    /**
     * PanicWindow is the aggregation window for metrics where quick reactions are needed.
     *
     * @schema MetricSpec#panicWindow
     */
    readonly panicWindow: number;
    /**
     * ScrapeTarget is the K8s service that publishes the metric endpoint.
     *
     * @schema MetricSpec#scrapeTarget
     */
    readonly scrapeTarget: string;
    /**
     * StableWindow is the aggregation window for metrics in a stable state.
     *
     * @schema MetricSpec#stableWindow
     */
    readonly stableWindow: number;
}
/**
 * Converts an object of type 'MetricSpec' to JSON representation.
 */
export declare function toJson_MetricSpec(obj: MetricSpec | undefined): Record<string, any> | undefined;
/**
 * PodAutoscaler is a Knative abstraction that encapsulates the interface by which Knative
components instantiate autoscalers.  This definition is an abstraction that may be backed
by multiple definitions.  For more information, see the Knative Pluggability presentation:
https://docs.google.com/presentation/d/19vW9HFZ6Puxt31biNZF3uLRejDmu82rxJIk1cWmxF7w/edit
 *
 * @schema PodAutoscaler
 */
export declare class PodAutoscaler extends ApiObject {
    /**
     * Returns the apiVersion and kind for "PodAutoscaler"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "PodAutoscaler".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: PodAutoscalerProps): any;
    /**
     * Defines a "PodAutoscaler" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: PodAutoscalerProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * PodAutoscaler is a Knative abstraction that encapsulates the interface by which Knative
 * components instantiate autoscalers.  This definition is an abstraction that may be backed
 * by multiple definitions.  For more information, see the Knative Pluggability presentation:
 * https://docs.google.com/presentation/d/19vW9HFZ6Puxt31biNZF3uLRejDmu82rxJIk1cWmxF7w/edit
 *
 * @schema PodAutoscaler
 */
export interface PodAutoscalerProps {
    /**
     * @schema PodAutoscaler#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec holds the desired state of the PodAutoscaler (from the client).
     *
     * @schema PodAutoscaler#spec
     */
    readonly spec?: PodAutoscalerSpec;
}
/**
 * Converts an object of type 'PodAutoscalerProps' to JSON representation.
 */
export declare function toJson_PodAutoscalerProps(obj: PodAutoscalerProps | undefined): Record<string, any> | undefined;
/**
 * Spec holds the desired state of the PodAutoscaler (from the client).
 *
 * @schema PodAutoscalerSpec
 */
export interface PodAutoscalerSpec {
    /**
     * ContainerConcurrency specifies the maximum allowed
     * in-flight (concurrent) requests per container of the Revision.
     * Defaults to `0` which means unlimited concurrency.
     *
     * @default 0` which means unlimited concurrency.
     * @schema PodAutoscalerSpec#containerConcurrency
     */
    readonly containerConcurrency?: number;
    /**
     * The application-layer protocol. Matches `ProtocolType` inferred from the revision spec.
     *
     * @schema PodAutoscalerSpec#protocolType
     */
    readonly protocolType: string;
    /**
     * Reachability specifies whether or not the `ScaleTargetRef` can be reached (ie. has a route).
     * Defaults to `ReachabilityUnknown`
     *
     * @default ReachabilityUnknown`
     * @schema PodAutoscalerSpec#reachability
     */
    readonly reachability?: string;
    /**
     * ScaleTargetRef defines the /scale-able resource that this PodAutoscaler
     * is responsible for quickly right-sizing.
     *
     * @schema PodAutoscalerSpec#scaleTargetRef
     */
    readonly scaleTargetRef: PodAutoscalerSpecScaleTargetRef;
}
/**
 * Converts an object of type 'PodAutoscalerSpec' to JSON representation.
 */
export declare function toJson_PodAutoscalerSpec(obj: PodAutoscalerSpec | undefined): Record<string, any> | undefined;
/**
 * ScaleTargetRef defines the /scale-able resource that this PodAutoscaler
 * is responsible for quickly right-sizing.
 *
 * @schema PodAutoscalerSpecScaleTargetRef
 */
export interface PodAutoscalerSpecScaleTargetRef {
    /**
     * API version of the referent.
     *
     * @schema PodAutoscalerSpecScaleTargetRef#apiVersion
     */
    readonly apiVersion?: string;
    /**
     * Kind of the referent.
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     *
     * @schema PodAutoscalerSpecScaleTargetRef#kind
     */
    readonly kind?: string;
    /**
     * Name of the referent.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema PodAutoscalerSpecScaleTargetRef#name
     */
    readonly name?: string;
}
/**
 * Converts an object of type 'PodAutoscalerSpecScaleTargetRef' to JSON representation.
 */
export declare function toJson_PodAutoscalerSpecScaleTargetRef(obj: PodAutoscalerSpecScaleTargetRef | undefined): Record<string, any> | undefined;
