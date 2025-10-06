import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
/**
 * Certificate is responsible for provisioning a SSL certificate for the
given hosts. It is a Knative abstraction for various SSL certificate
provisioning solutions (such as cert-manager or self-signed SSL certificate).
 *
 * @schema Certificate
 */
export declare class Certificate extends ApiObject {
    /**
     * Returns the apiVersion and kind for "Certificate"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Certificate".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: CertificateProps): any;
    /**
     * Defines a "Certificate" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: CertificateProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Certificate is responsible for provisioning a SSL certificate for the
 * given hosts. It is a Knative abstraction for various SSL certificate
 * provisioning solutions (such as cert-manager or self-signed SSL certificate).
 *
 * @schema Certificate
 */
export interface CertificateProps {
    /**
     * @schema Certificate#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec is the desired state of the Certificate.
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     *
     * @schema Certificate#spec
     */
    readonly spec?: CertificateSpec;
}
/**
 * Converts an object of type 'CertificateProps' to JSON representation.
 */
export declare function toJson_CertificateProps(obj: CertificateProps | undefined): Record<string, any> | undefined;
/**
 * Spec is the desired state of the Certificate.
 * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
 *
 * @schema CertificateSpec
 */
export interface CertificateSpec {
    /**
     * DNSNames is a list of DNS names the Certificate could support.
     * The wildcard format of DNSNames (e.g. *.default.example.com) is supported.
     *
     * @schema CertificateSpec#dnsNames
     */
    readonly dnsNames: string[];
    /**
     * Domain is the top level domain of the values for DNSNames.
     *
     * @schema CertificateSpec#domain
     */
    readonly domain?: string;
    /**
     * SecretName is the name of the secret resource to store the SSL certificate in.
     *
     * @schema CertificateSpec#secretName
     */
    readonly secretName: string;
}
/**
 * Converts an object of type 'CertificateSpec' to JSON representation.
 */
export declare function toJson_CertificateSpec(obj: CertificateSpec | undefined): Record<string, any> | undefined;
/**
 * ClusterDomainClaim is a cluster-wide reservation for a particular domain name.
 *
 * @schema ClusterDomainClaim
 */
export declare class ClusterDomainClaim extends ApiObject {
    /**
     * Returns the apiVersion and kind for "ClusterDomainClaim"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "ClusterDomainClaim".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: ClusterDomainClaimProps): any;
    /**
     * Defines a "ClusterDomainClaim" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: ClusterDomainClaimProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * ClusterDomainClaim is a cluster-wide reservation for a particular domain name.
 *
 * @schema ClusterDomainClaim
 */
export interface ClusterDomainClaimProps {
    /**
     * @schema ClusterDomainClaim#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec is the desired state of the ClusterDomainClaim.
     * More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     *
     * @schema ClusterDomainClaim#spec
     */
    readonly spec?: ClusterDomainClaimSpec;
}
/**
 * Converts an object of type 'ClusterDomainClaimProps' to JSON representation.
 */
export declare function toJson_ClusterDomainClaimProps(obj: ClusterDomainClaimProps | undefined): Record<string, any> | undefined;
/**
 * Spec is the desired state of the ClusterDomainClaim.
 * More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
 *
 * @schema ClusterDomainClaimSpec
 */
export interface ClusterDomainClaimSpec {
    /**
     * Namespace is the namespace which is allowed to create a DomainMapping
     * using this ClusterDomainClaim's name.
     *
     * @schema ClusterDomainClaimSpec#namespace
     */
    readonly namespace: string;
}
/**
 * Converts an object of type 'ClusterDomainClaimSpec' to JSON representation.
 */
export declare function toJson_ClusterDomainClaimSpec(obj: ClusterDomainClaimSpec | undefined): Record<string, any> | undefined;
/**
 * Ingress is a collection of rules that allow inbound connections to reach the endpoints defined
by a backend. An Ingress can be configured to give services externally-reachable URLs, load
balance traffic, offer name based virtual hosting, etc.

This is heavily based on K8s Ingress https://godoc.org/k8s.io/api/networking/v1beta1#Ingress
which some highlighted modifications.
 *
 * @schema Ingress
 */
export declare class Ingress extends ApiObject {
    /**
     * Returns the apiVersion and kind for "Ingress"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Ingress".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: IngressProps): any;
    /**
     * Defines a "Ingress" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: IngressProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Ingress is a collection of rules that allow inbound connections to reach the endpoints defined
 * by a backend. An Ingress can be configured to give services externally-reachable URLs, load
 * balance traffic, offer name based virtual hosting, etc.
 *
 * This is heavily based on K8s Ingress https://godoc.org/k8s.io/api/networking/v1beta1#Ingress
 * which some highlighted modifications.
 *
 * @schema Ingress
 */
export interface IngressProps {
    /**
     * @schema Ingress#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec is the desired state of the Ingress.
     * More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     *
     * @schema Ingress#spec
     */
    readonly spec?: IngressSpec;
}
/**
 * Converts an object of type 'IngressProps' to JSON representation.
 */
export declare function toJson_IngressProps(obj: IngressProps | undefined): Record<string, any> | undefined;
/**
 * Spec is the desired state of the Ingress.
 * More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
 *
 * @schema IngressSpec
 */
export interface IngressSpec {
    /**
     * HTTPOption is the option of HTTP. It has the following two values:
     * `HTTPOptionEnabled`, `HTTPOptionRedirected`
     *
     * @schema IngressSpec#httpOption
     */
    readonly httpOption?: string;
    /**
     * A list of host rules used to configure the Ingress.
     *
     * @schema IngressSpec#rules
     */
    readonly rules?: IngressSpecRules[];
    /**
     * TLS configuration. Currently Ingress only supports a single TLS
     * port: 443. If multiple members of this list specify different hosts, they
     * will be multiplexed on the same port according to the hostname specified
     * through the SNI TLS extension, if the ingress controller fulfilling the
     * ingress supports SNI.
     *
     * @schema IngressSpec#tls
     */
    readonly tls?: IngressSpecTls[];
}
/**
 * Converts an object of type 'IngressSpec' to JSON representation.
 */
export declare function toJson_IngressSpec(obj: IngressSpec | undefined): Record<string, any> | undefined;
/**
 * IngressRule represents the rules mapping the paths under a specified host to
 * the related backend services. Incoming requests are first evaluated for a host
 * match, then routed to the backend associated with the matching IngressRuleValue.
 *
 * @schema IngressSpecRules
 */
export interface IngressSpecRules {
    /**
     * Host is the fully qualified domain name of a network host, as defined
     * by RFC 3986. Note the following deviations from the "host" part of the
     * URI as defined in the RFC:
     * 1. IPs are not allowed. Currently a rule value can only apply to the
     * IP in the Spec of the parent .
     * 2. The `:` delimiter is not respected because ports are not allowed.
     * Currently the port of an Ingress is implicitly :80 for http and
     * :443 for https.
     * Both these may change in the future.
     * If the host is unspecified, the Ingress routes all traffic based on the
     * specified IngressRuleValue.
     * If multiple matching Hosts were provided, the first rule will take precedent.
     *
     * @schema IngressSpecRules#hosts
     */
    readonly hosts?: string[];
    /**
     * HTTP represents a rule to apply against incoming requests. If the
     * rule is satisfied, the request is routed to the specified backend.
     *
     * @schema IngressSpecRules#http
     */
    readonly http?: IngressSpecRulesHttp;
    /**
     * Visibility signifies whether this rule should `ClusterLocal`. If it's not
     * specified then it defaults to `ExternalIP`.
     *
     * @schema IngressSpecRules#visibility
     */
    readonly visibility?: string;
}
/**
 * Converts an object of type 'IngressSpecRules' to JSON representation.
 */
export declare function toJson_IngressSpecRules(obj: IngressSpecRules | undefined): Record<string, any> | undefined;
/**
 * IngressTLS describes the transport layer security associated with an Ingress.
 *
 * @schema IngressSpecTls
 */
export interface IngressSpecTls {
    /**
     * Hosts is a list of hosts included in the TLS certificate. The values in
     * this list must match the name/s used in the tlsSecret. Defaults to the
     * wildcard host setting for the loadbalancer controller fulfilling this
     * Ingress, if left unspecified.
     *
     * @default the
     * @schema IngressSpecTls#hosts
     */
    readonly hosts?: string[];
    /**
     * SecretName is the name of the secret used to terminate SSL traffic.
     *
     * @schema IngressSpecTls#secretName
     */
    readonly secretName?: string;
    /**
     * SecretNamespace is the namespace of the secret used to terminate SSL traffic.
     * If not set the namespace should be assumed to be the same as the Ingress.
     * If set the secret should have the same namespace as the Ingress otherwise
     * the behaviour is undefined and not supported.
     *
     * @schema IngressSpecTls#secretNamespace
     */
    readonly secretNamespace?: string;
}
/**
 * Converts an object of type 'IngressSpecTls' to JSON representation.
 */
export declare function toJson_IngressSpecTls(obj: IngressSpecTls | undefined): Record<string, any> | undefined;
/**
 * HTTP represents a rule to apply against incoming requests. If the
 * rule is satisfied, the request is routed to the specified backend.
 *
 * @schema IngressSpecRulesHttp
 */
export interface IngressSpecRulesHttp {
    /**
     * A collection of paths that map requests to backends.
     *
     * If they are multiple matching paths, the first match takes precedence.
     *
     * @schema IngressSpecRulesHttp#paths
     */
    readonly paths: IngressSpecRulesHttpPaths[];
}
/**
 * Converts an object of type 'IngressSpecRulesHttp' to JSON representation.
 */
export declare function toJson_IngressSpecRulesHttp(obj: IngressSpecRulesHttp | undefined): Record<string, any> | undefined;
/**
 * HTTPIngressPath associates a path regex with a backend. Incoming URLs matching
 * the path are forwarded to the backend.
 *
 * @schema IngressSpecRulesHttpPaths
 */
export interface IngressSpecRulesHttpPaths {
    /**
     * AppendHeaders allow specifying additional HTTP headers to add
     * before forwarding a request to the destination service.
     *
     * NOTE: This differs from K8s Ingress which doesn't allow header appending.
     *
     * @schema IngressSpecRulesHttpPaths#appendHeaders
     */
    readonly appendHeaders?: {
        [key: string]: string;
    };
    /**
     * Headers defines header matching rules which is a map from a header name
     * to HeaderMatch which specify a matching condition.
     * When a request matched with all the header matching rules,
     * the request is routed by the corresponding ingress rule.
     * If it is empty, the headers are not used for matching
     *
     * @schema IngressSpecRulesHttpPaths#headers
     */
    readonly headers?: {
        [key: string]: IngressSpecRulesHttpPathsHeaders;
    };
    /**
     * Path represents a literal prefix to which this rule should apply.
     * Currently it can contain characters disallowed from the conventional
     * "path" part of a URL as defined by RFC 3986. Paths must begin with
     * a '/'. If unspecified, the path defaults to a catch all sending
     * traffic to the backend.
     *
     * @schema IngressSpecRulesHttpPaths#path
     */
    readonly path?: string;
    /**
     * RewriteHost rewrites the incoming request's host header.
     *
     * This field is currently experimental and not supported by all Ingress
     * implementations.
     *
     * @schema IngressSpecRulesHttpPaths#rewriteHost
     */
    readonly rewriteHost?: string;
    /**
     * Splits defines the referenced service endpoints to which the traffic
     * will be forwarded to.
     *
     * @schema IngressSpecRulesHttpPaths#splits
     */
    readonly splits: IngressSpecRulesHttpPathsSplits[];
}
/**
 * Converts an object of type 'IngressSpecRulesHttpPaths' to JSON representation.
 */
export declare function toJson_IngressSpecRulesHttpPaths(obj: IngressSpecRulesHttpPaths | undefined): Record<string, any> | undefined;
/**
 * HeaderMatch represents a matching value of Headers in HTTPIngressPath.
 * Currently, only the exact matching is supported.
 *
 * @schema IngressSpecRulesHttpPathsHeaders
 */
export interface IngressSpecRulesHttpPathsHeaders {
    /**
     * @schema IngressSpecRulesHttpPathsHeaders#exact
     */
    readonly exact: string;
}
/**
 * Converts an object of type 'IngressSpecRulesHttpPathsHeaders' to JSON representation.
 */
export declare function toJson_IngressSpecRulesHttpPathsHeaders(obj: IngressSpecRulesHttpPathsHeaders | undefined): Record<string, any> | undefined;
/**
 * IngressBackendSplit describes all endpoints for a given service and port.
 *
 * @schema IngressSpecRulesHttpPathsSplits
 */
export interface IngressSpecRulesHttpPathsSplits {
    /**
     * AppendHeaders allow specifying additional HTTP headers to add
     * before forwarding a request to the destination service.
     *
     * NOTE: This differs from K8s Ingress which doesn't allow header appending.
     *
     * @schema IngressSpecRulesHttpPathsSplits#appendHeaders
     */
    readonly appendHeaders?: {
        [key: string]: string;
    };
    /**
     * Specifies the split percentage, a number between 0 and 100.  If
     * only one split is specified, we default to 100.
     *
     * NOTE: This differs from K8s Ingress to allow percentage split.
     *
     * @schema IngressSpecRulesHttpPathsSplits#percent
     */
    readonly percent?: number;
    /**
     * Specifies the name of the referenced service.
     *
     * @schema IngressSpecRulesHttpPathsSplits#serviceName
     */
    readonly serviceName: string;
    /**
     * Specifies the namespace of the referenced service.
     *
     * NOTE: This differs from K8s Ingress to allow routing to different namespaces.
     *
     * @schema IngressSpecRulesHttpPathsSplits#serviceNamespace
     */
    readonly serviceNamespace: string;
    /**
     * Specifies the port of the referenced service.
     *
     * @schema IngressSpecRulesHttpPathsSplits#servicePort
     */
    readonly servicePort: IngressSpecRulesHttpPathsSplitsServicePort;
}
/**
 * Converts an object of type 'IngressSpecRulesHttpPathsSplits' to JSON representation.
 */
export declare function toJson_IngressSpecRulesHttpPathsSplits(obj: IngressSpecRulesHttpPathsSplits | undefined): Record<string, any> | undefined;
/**
 * Specifies the port of the referenced service.
 *
 * @schema IngressSpecRulesHttpPathsSplitsServicePort
 */
export declare class IngressSpecRulesHttpPathsSplitsServicePort {
    readonly value: number | string;
    static fromNumber(value: number): IngressSpecRulesHttpPathsSplitsServicePort;
    static fromString(value: string): IngressSpecRulesHttpPathsSplitsServicePort;
    private constructor();
}
/**
 * ServerlessService is a proxy for the K8s service objects containing the
endpoints for the revision, whether those are endpoints of the activator or
revision pods.
See: https://knative.page.link/naxz for details.
 *
 * @schema ServerlessService
 */
export declare class ServerlessService extends ApiObject {
    /**
     * Returns the apiVersion and kind for "ServerlessService"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "ServerlessService".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: ServerlessServiceProps): any;
    /**
     * Defines a "ServerlessService" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: ServerlessServiceProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * ServerlessService is a proxy for the K8s service objects containing the
 * endpoints for the revision, whether those are endpoints of the activator or
 * revision pods.
 * See: https://knative.page.link/naxz for details.
 *
 * @schema ServerlessService
 */
export interface ServerlessServiceProps {
    /**
     * @schema ServerlessService#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec is the desired state of the ServerlessService.
     * More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     *
     * @schema ServerlessService#spec
     */
    readonly spec?: ServerlessServiceSpec;
}
/**
 * Converts an object of type 'ServerlessServiceProps' to JSON representation.
 */
export declare function toJson_ServerlessServiceProps(obj: ServerlessServiceProps | undefined): Record<string, any> | undefined;
/**
 * Spec is the desired state of the ServerlessService.
 * More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
 *
 * @schema ServerlessServiceSpec
 */
export interface ServerlessServiceSpec {
    /**
     * Mode describes the mode of operation of the ServerlessService.
     *
     * @schema ServerlessServiceSpec#mode
     */
    readonly mode?: string;
    /**
     * NumActivators contains number of Activators that this revision should be
     * assigned.
     * O means — assign all.
     *
     * @schema ServerlessServiceSpec#numActivators
     */
    readonly numActivators?: number;
    /**
     * ObjectRef defines the resource that this ServerlessService
     * is responsible for making "serverless".
     *
     * @schema ServerlessServiceSpec#objectRef
     */
    readonly objectRef: ServerlessServiceSpecObjectRef;
    /**
     * The application-layer protocol. Matches `RevisionProtocolType` set on the owning pa/revision.
     * serving imports networking, so just use string.
     *
     * @schema ServerlessServiceSpec#protocolType
     */
    readonly protocolType: string;
}
/**
 * Converts an object of type 'ServerlessServiceSpec' to JSON representation.
 */
export declare function toJson_ServerlessServiceSpec(obj: ServerlessServiceSpec | undefined): Record<string, any> | undefined;
/**
 * ObjectRef defines the resource that this ServerlessService
 * is responsible for making "serverless".
 *
 * @schema ServerlessServiceSpecObjectRef
 */
export interface ServerlessServiceSpecObjectRef {
    /**
     * API version of the referent.
     *
     * @schema ServerlessServiceSpecObjectRef#apiVersion
     */
    readonly apiVersion?: string;
    /**
     * If referring to a piece of an object instead of an entire object, this string
     * should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2].
     * For example, if the object reference is to a container within a pod, this would take on a value like:
     * "spec.containers{name}" (where "name" refers to the name of the container that triggered
     * the event) or if no container name is specified "spec.containers[2]" (container with
     * index 2 in this pod). This syntax is chosen only to have some well-defined way of
     * referencing a part of an object.
     *
     * @schema ServerlessServiceSpecObjectRef#fieldPath
     */
    readonly fieldPath?: string;
    /**
     * Kind of the referent.
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     *
     * @schema ServerlessServiceSpecObjectRef#kind
     */
    readonly kind?: string;
    /**
     * Name of the referent.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ServerlessServiceSpecObjectRef#name
     */
    readonly name?: string;
    /**
     * Namespace of the referent.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
     *
     * @schema ServerlessServiceSpecObjectRef#namespace
     */
    readonly namespace?: string;
    /**
     * Specific resourceVersion to which this reference is made, if any.
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
     *
     * @schema ServerlessServiceSpecObjectRef#resourceVersion
     */
    readonly resourceVersion?: string;
    /**
     * UID of the referent.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids
     *
     * @schema ServerlessServiceSpecObjectRef#uid
     */
    readonly uid?: string;
}
/**
 * Converts an object of type 'ServerlessServiceSpecObjectRef' to JSON representation.
 */
export declare function toJson_ServerlessServiceSpecObjectRef(obj: ServerlessServiceSpecObjectRef | undefined): Record<string, any> | undefined;
