import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
/**
 * Gateway represents an instance of a service-traffic handling infrastructure
by binding Listeners to a set of IP addresses.
 *
 * @schema Gateway
 */
export declare class Gateway extends ApiObject {
    /**
     * Returns the apiVersion and kind for "Gateway"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Gateway".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: GatewayProps): any;
    /**
     * Defines a "Gateway" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: GatewayProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Gateway represents an instance of a service-traffic handling infrastructure
 * by binding Listeners to a set of IP addresses.
 *
 * @schema Gateway
 */
export interface GatewayProps {
    /**
     * @schema Gateway#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec defines the desired state of Gateway.
     *
     * @schema Gateway#spec
     */
    readonly spec: GatewaySpec;
}
/**
 * Converts an object of type 'GatewayProps' to JSON representation.
 */
export declare function toJson_GatewayProps(obj: GatewayProps | undefined): Record<string, any> | undefined;
/**
 * Spec defines the desired state of Gateway.
 *
 * @schema GatewaySpec
 */
export interface GatewaySpec {
    /**
     * Addresses requested for this Gateway. This is optional and behavior can
     * depend on the implementation. If a value is set in the spec and the
     * requested address is invalid or unavailable, the implementation MUST
     * indicate this in the associated entry in GatewayStatus.Addresses.
     *
     * The Addresses field represents a request for the address(es) on the
     * "outside of the Gateway", that traffic bound for this Gateway will use.
     * This could be the IP address or hostname of an external load balancer or
     * other networking infrastructure, or some other address that traffic will
     * be sent to.
     *
     * If no Addresses are specified, the implementation MAY schedule the
     * Gateway in an implementation-specific manner, assigning an appropriate
     * set of Addresses.
     *
     * The implementation MUST bind all Listeners to every GatewayAddress that
     * it assigns to the Gateway and add a corresponding entry in
     * GatewayStatus.Addresses.
     *
     * Support: Extended
     *
     * @schema GatewaySpec#addresses
     */
    readonly addresses?: GatewaySpecAddresses[];
    /**
     * GatewayClassName used for this Gateway. This is the name of a
     * GatewayClass resource.
     *
     * @schema GatewaySpec#gatewayClassName
     */
    readonly gatewayClassName: string;
    /**
     * Infrastructure defines infrastructure level attributes about this Gateway instance.
     *
     * Support: Extended
     *
     * @schema GatewaySpec#infrastructure
     */
    readonly infrastructure?: GatewaySpecInfrastructure;
    /**
     * Listeners associated with this Gateway. Listeners define
     * logical endpoints that are bound on this Gateway's addresses.
     * At least one Listener MUST be specified.
     *
     * ## Distinct Listeners
     *
     * Each Listener in a set of Listeners (for example, in a single Gateway)
     * MUST be _distinct_, in that a traffic flow MUST be able to be assigned to
     * exactly one listener. (This section uses "set of Listeners" rather than
     * "Listeners in a single Gateway" because implementations MAY merge configuration
     * from multiple Gateways onto a single data plane, and these rules _also_
     * apply in that case).
     *
     * Practically, this means that each listener in a set MUST have a unique
     * combination of Port, Protocol, and, if supported by the protocol, Hostname.
     *
     * Some combinations of port, protocol, and TLS settings are considered
     * Core support and MUST be supported by implementations based on the objects
     * they support:
     *
     * HTTPRoute
     *
     * 1. HTTPRoute, Port: 80, Protocol: HTTP
     * 2. HTTPRoute, Port: 443, Protocol: HTTPS, TLS Mode: Terminate, TLS keypair provided
     *
     * TLSRoute
     *
     * 1. TLSRoute, Port: 443, Protocol: TLS, TLS Mode: Passthrough
     *
     * "Distinct" Listeners have the following property:
     *
     * **The implementation can match inbound requests to a single distinct
     * Listener**.
     *
     * When multiple Listeners share values for fields (for
     * example, two Listeners with the same Port value), the implementation
     * can match requests to only one of the Listeners using other
     * Listener fields.
     *
     * When multiple listeners have the same value for the Protocol field, then
     * each of the Listeners with matching Protocol values MUST have different
     * values for other fields.
     *
     * The set of fields that MUST be different for a Listener differs per protocol.
     * The following rules define the rules for what fields MUST be considered for
     * Listeners to be distinct with each protocol currently defined in the
     * Gateway API spec.
     *
     * The set of listeners that all share a protocol value MUST have _different_
     * values for _at least one_ of these fields to be distinct:
     *
     * * **HTTP, HTTPS, TLS**: Port, Hostname
     * * **TCP, UDP**: Port
     *
     * One **very** important rule to call out involves what happens when an
     * implementation:
     *
     * * Supports TCP protocol Listeners, as well as HTTP, HTTPS, or TLS protocol
     * Listeners, and
     * * sees HTTP, HTTPS, or TLS protocols with the same `port` as one with TCP
     * Protocol.
     *
     * In this case all the Listeners that share a port with the
     * TCP Listener are not distinct and so MUST NOT be accepted.
     *
     * If an implementation does not support TCP Protocol Listeners, then the
     * previous rule does not apply, and the TCP Listeners SHOULD NOT be
     * accepted.
     *
     * Note that the `tls` field is not used for determining if a listener is distinct, because
     * Listeners that _only_ differ on TLS config will still conflict in all cases.
     *
     * ### Listeners that are distinct only by Hostname
     *
     * When the Listeners are distinct based only on Hostname, inbound request
     * hostnames MUST match from the most specific to least specific Hostname
     * values to choose the correct Listener and its associated set of Routes.
     *
     * Exact matches MUST be processed before wildcard matches, and wildcard
     * matches MUST be processed before fallback (empty Hostname value)
     * matches. For example, `"foo.example.com"` takes precedence over
     * `"*.example.com"`, and `"*.example.com"` takes precedence over `""`.
     *
     * Additionally, if there are multiple wildcard entries, more specific
     * wildcard entries must be processed before less specific wildcard entries.
     * For example, `"*.foo.example.com"` takes precedence over `"*.example.com"`.
     *
     * The precise definition here is that the higher the number of dots in the
     * hostname to the right of the wildcard character, the higher the precedence.
     *
     * The wildcard character will match any number of characters _and dots_ to
     * the left, however, so `"*.example.com"` will match both
     * `"foo.bar.example.com"` _and_ `"bar.example.com"`.
     *
     * ## Handling indistinct Listeners
     *
     * If a set of Listeners contains Listeners that are not distinct, then those
     * Listeners are _Conflicted_, and the implementation MUST set the "Conflicted"
     * condition in the Listener Status to "True".
     *
     * The words "indistinct" and "conflicted" are considered equivalent for the
     * purpose of this documentation.
     *
     * Implementations MAY choose to accept a Gateway with some Conflicted
     * Listeners only if they only accept the partial Listener set that contains
     * no Conflicted Listeners.
     *
     * Specifically, an implementation MAY accept a partial Listener set subject to
     * the following rules:
     *
     * * The implementation MUST NOT pick one conflicting Listener as the winner.
     * ALL indistinct Listeners must not be accepted for processing.
     * * At least one distinct Listener MUST be present, or else the Gateway effectively
     * contains _no_ Listeners, and must be rejected from processing as a whole.
     *
     * The implementation MUST set a "ListenersNotValid" condition on the
     * Gateway Status when the Gateway contains Conflicted Listeners whether or
     * not they accept the Gateway. That Condition SHOULD clearly
     * indicate in the Message which Listeners are conflicted, and which are
     * Accepted. Additionally, the Listener status for those listeners SHOULD
     * indicate which Listeners are conflicted and not Accepted.
     *
     * ## General Listener behavior
     *
     * Note that, for all distinct Listeners, requests SHOULD match at most one Listener.
     * For example, if Listeners are defined for "foo.example.com" and "*.example.com", a
     * request to "foo.example.com" SHOULD only be routed using routes attached
     * to the "foo.example.com" Listener (and not the "*.example.com" Listener).
     *
     * This concept is known as "Listener Isolation", and it is an Extended feature
     * of Gateway API. Implementations that do not support Listener Isolation MUST
     * clearly document this, and MUST NOT claim support for the
     * `GatewayHTTPListenerIsolation` feature.
     *
     * Implementations that _do_ support Listener Isolation SHOULD claim support
     * for the Extended `GatewayHTTPListenerIsolation` feature and pass the associated
     * conformance tests.
     *
     * ## Compatible Listeners
     *
     * A Gateway's Listeners are considered _compatible_ if:
     *
     * 1. They are distinct.
     * 2. The implementation can serve them in compliance with the Addresses
     * requirement that all Listeners are available on all assigned
     * addresses.
     *
     * Compatible combinations in Extended support are expected to vary across
     * implementations. A combination that is compatible for one implementation
     * may not be compatible for another.
     *
     * For example, an implementation that cannot serve both TCP and UDP listeners
     * on the same address, or cannot mix HTTPS and generic TLS listens on the same port
     * would not consider those cases compatible, even though they are distinct.
     *
     * Implementations MAY merge separate Gateways onto a single set of
     * Addresses if all Listeners across all Gateways are compatible.
     *
     * In a future release the MinItems=1 requirement MAY be dropped.
     *
     * Support: Core
     *
     * @schema GatewaySpec#listeners
     */
    readonly listeners: GatewaySpecListeners[];
}
/**
 * Converts an object of type 'GatewaySpec' to JSON representation.
 */
export declare function toJson_GatewaySpec(obj: GatewaySpec | undefined): Record<string, any> | undefined;
/**
 * GatewaySpecAddress describes an address that can be bound to a Gateway.
 *
 * @schema GatewaySpecAddresses
 */
export interface GatewaySpecAddresses {
    /**
     * Type of the address.
     *
     * @schema GatewaySpecAddresses#type
     */
    readonly type?: string;
    /**
     * When a value is unspecified, an implementation SHOULD automatically
     * assign an address matching the requested type if possible.
     *
     * If an implementation does not support an empty value, they MUST set the
     * "Programmed" condition in status to False with a reason of "AddressNotAssigned".
     *
     * Examples: `1.2.3.4`, `128::1`, `my-ip-address`.
     *
     * @schema GatewaySpecAddresses#value
     */
    readonly value?: string;
}
/**
 * Converts an object of type 'GatewaySpecAddresses' to JSON representation.
 */
export declare function toJson_GatewaySpecAddresses(obj: GatewaySpecAddresses | undefined): Record<string, any> | undefined;
/**
 * Infrastructure defines infrastructure level attributes about this Gateway instance.
 *
 * Support: Extended
 *
 * @schema GatewaySpecInfrastructure
 */
export interface GatewaySpecInfrastructure {
    /**
     * Annotations that SHOULD be applied to any resources created in response to this Gateway.
     *
     * For implementations creating other Kubernetes objects, this should be the `metadata.annotations` field on resources.
     * For other implementations, this refers to any relevant (implementation specific) "annotations" concepts.
     *
     * An implementation may chose to add additional implementation-specific annotations as they see fit.
     *
     * Support: Extended
     *
     * @schema GatewaySpecInfrastructure#annotations
     */
    readonly annotations?: {
        [key: string]: string;
    };
    /**
     * Labels that SHOULD be applied to any resources created in response to this Gateway.
     *
     * For implementations creating other Kubernetes objects, this should be the `metadata.labels` field on resources.
     * For other implementations, this refers to any relevant (implementation specific) "labels" concepts.
     *
     * An implementation may chose to add additional implementation-specific labels as they see fit.
     *
     * If an implementation maps these labels to Pods, or any other resource that would need to be recreated when labels
     * change, it SHOULD clearly warn about this behavior in documentation.
     *
     * Support: Extended
     *
     * @schema GatewaySpecInfrastructure#labels
     */
    readonly labels?: {
        [key: string]: string;
    };
    /**
     * ParametersRef is a reference to a resource that contains the configuration
     * parameters corresponding to the Gateway. This is optional if the
     * controller does not require any additional configuration.
     *
     * This follows the same semantics as GatewayClass's `parametersRef`, but on a per-Gateway basis
     *
     * The Gateway's GatewayClass may provide its own `parametersRef`. When both are specified,
     * the merging behavior is implementation specific.
     * It is generally recommended that GatewayClass provides defaults that can be overridden by a Gateway.
     *
     * If the referent cannot be found, refers to an unsupported kind, or when
     * the data within that resource is malformed, the Gateway SHOULD be
     * rejected with the "Accepted" status condition set to "False" and an
     * "InvalidParameters" reason.
     *
     * Support: Implementation-specific
     *
     * @schema GatewaySpecInfrastructure#parametersRef
     */
    readonly parametersRef?: GatewaySpecInfrastructureParametersRef;
}
/**
 * Converts an object of type 'GatewaySpecInfrastructure' to JSON representation.
 */
export declare function toJson_GatewaySpecInfrastructure(obj: GatewaySpecInfrastructure | undefined): Record<string, any> | undefined;
/**
 * Listener embodies the concept of a logical endpoint where a Gateway accepts
 * network connections.
 *
 * @schema GatewaySpecListeners
 */
export interface GatewaySpecListeners {
    /**
     * AllowedRoutes defines the types of routes that MAY be attached to a
     * Listener and the trusted namespaces where those Route resources MAY be
     * present.
     *
     * Although a client request may match multiple route rules, only one rule
     * may ultimately receive the request. Matching precedence MUST be
     * determined in order of the following criteria:
     *
     * * The most specific match as defined by the Route type.
     * * The oldest Route based on creation timestamp. For example, a Route with
     * a creation timestamp of "2020-09-08 01:02:03" is given precedence over
     * a Route with a creation timestamp of "2020-09-08 01:02:04".
     * * If everything else is equivalent, the Route appearing first in
     * alphabetical order (namespace/name) should be given precedence. For
     * example, foo/bar is given precedence over foo/baz.
     *
     * All valid rules within a Route attached to this Listener should be
     * implemented. Invalid Route rules can be ignored (sometimes that will mean
     * the full Route). If a Route rule transitions from valid to invalid,
     * support for that Route rule should be dropped to ensure consistency. For
     * example, even if a filter specified by a Route rule is invalid, the rest
     * of the rules within that Route should still be supported.
     *
     * Support: Core
     *
     * @schema GatewaySpecListeners#allowedRoutes
     */
    readonly allowedRoutes?: GatewaySpecListenersAllowedRoutes;
    /**
     * Hostname specifies the virtual hostname to match for protocol types that
     * define this concept. When unspecified, all hostnames are matched. This
     * field is ignored for protocols that don't require hostname based
     * matching.
     *
     * Implementations MUST apply Hostname matching appropriately for each of
     * the following protocols:
     *
     * * TLS: The Listener Hostname MUST match the SNI.
     * * HTTP: The Listener Hostname MUST match the Host header of the request.
     * * HTTPS: The Listener Hostname SHOULD match both the SNI and Host header.
     * Note that this does not require the SNI and Host header to be the same.
     * The semantics of this are described in more detail below.
     *
     * To ensure security, Section 11.1 of RFC-6066 emphasizes that server
     * implementations that rely on SNI hostname matching MUST also verify
     * hostnames within the application protocol.
     *
     * Section 9.1.2 of RFC-7540 provides a mechanism for servers to reject the
     * reuse of a connection by responding with the HTTP 421 Misdirected Request
     * status code. This indicates that the origin server has rejected the
     * request because it appears to have been misdirected.
     *
     * To detect misdirected requests, Gateways SHOULD match the authority of
     * the requests with all the SNI hostname(s) configured across all the
     * Gateway Listeners on the same port and protocol:
     *
     * * If another Listener has an exact match or more specific wildcard entry,
     * the Gateway SHOULD return a 421.
     * * If the current Listener (selected by SNI matching during ClientHello)
     * does not match the Host:
     * * If another Listener does match the Host the Gateway SHOULD return a
     * 421.
     * * If no other Listener matches the Host, the Gateway MUST return a
     * 404.
     *
     * For HTTPRoute and TLSRoute resources, there is an interaction with the
     * `spec.hostnames` array. When both listener and route specify hostnames,
     * there MUST be an intersection between the values for a Route to be
     * accepted. For more information, refer to the Route specific Hostnames
     * documentation.
     *
     * Hostnames that are prefixed with a wildcard label (`*.`) are interpreted
     * as a suffix match. That means that a match for `*.example.com` would match
     * both `test.example.com`, and `foo.test.example.com`, but not `example.com`.
     *
     * Support: Core
     *
     * @schema GatewaySpecListeners#hostname
     */
    readonly hostname?: string;
    /**
     * Name is the name of the Listener. This name MUST be unique within a
     * Gateway.
     *
     * Support: Core
     *
     * @schema GatewaySpecListeners#name
     */
    readonly name: string;
    /**
     * Port is the network port. Multiple listeners may use the
     * same port, subject to the Listener compatibility rules.
     *
     * Support: Core
     *
     * @schema GatewaySpecListeners#port
     */
    readonly port: number;
    /**
     * Protocol specifies the network protocol this listener expects to receive.
     *
     * Support: Core
     *
     * @schema GatewaySpecListeners#protocol
     */
    readonly protocol: string;
    /**
     * TLS is the TLS configuration for the Listener. This field is required if
     * the Protocol field is "HTTPS" or "TLS". It is invalid to set this field
     * if the Protocol field is "HTTP", "TCP", or "UDP".
     *
     * The association of SNIs to Certificate defined in GatewayTLSConfig is
     * defined based on the Hostname field for this listener.
     *
     * The GatewayClass MUST use the longest matching SNI out of all
     * available certificates for any TLS handshake.
     *
     * Support: Core
     *
     * @schema GatewaySpecListeners#tls
     */
    readonly tls?: GatewaySpecListenersTls;
}
/**
 * Converts an object of type 'GatewaySpecListeners' to JSON representation.
 */
export declare function toJson_GatewaySpecListeners(obj: GatewaySpecListeners | undefined): Record<string, any> | undefined;
/**
 * ParametersRef is a reference to a resource that contains the configuration
 * parameters corresponding to the Gateway. This is optional if the
 * controller does not require any additional configuration.
 *
 * This follows the same semantics as GatewayClass's `parametersRef`, but on a per-Gateway basis
 *
 * The Gateway's GatewayClass may provide its own `parametersRef`. When both are specified,
 * the merging behavior is implementation specific.
 * It is generally recommended that GatewayClass provides defaults that can be overridden by a Gateway.
 *
 * If the referent cannot be found, refers to an unsupported kind, or when
 * the data within that resource is malformed, the Gateway SHOULD be
 * rejected with the "Accepted" status condition set to "False" and an
 * "InvalidParameters" reason.
 *
 * Support: Implementation-specific
 *
 * @schema GatewaySpecInfrastructureParametersRef
 */
export interface GatewaySpecInfrastructureParametersRef {
    /**
     * Group is the group of the referent.
     *
     * @schema GatewaySpecInfrastructureParametersRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent.
     *
     * @schema GatewaySpecInfrastructureParametersRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GatewaySpecInfrastructureParametersRef#name
     */
    readonly name: string;
}
/**
 * Converts an object of type 'GatewaySpecInfrastructureParametersRef' to JSON representation.
 */
export declare function toJson_GatewaySpecInfrastructureParametersRef(obj: GatewaySpecInfrastructureParametersRef | undefined): Record<string, any> | undefined;
/**
 * AllowedRoutes defines the types of routes that MAY be attached to a
 * Listener and the trusted namespaces where those Route resources MAY be
 * present.
 *
 * Although a client request may match multiple route rules, only one rule
 * may ultimately receive the request. Matching precedence MUST be
 * determined in order of the following criteria:
 *
 * * The most specific match as defined by the Route type.
 * * The oldest Route based on creation timestamp. For example, a Route with
 * a creation timestamp of "2020-09-08 01:02:03" is given precedence over
 * a Route with a creation timestamp of "2020-09-08 01:02:04".
 * * If everything else is equivalent, the Route appearing first in
 * alphabetical order (namespace/name) should be given precedence. For
 * example, foo/bar is given precedence over foo/baz.
 *
 * All valid rules within a Route attached to this Listener should be
 * implemented. Invalid Route rules can be ignored (sometimes that will mean
 * the full Route). If a Route rule transitions from valid to invalid,
 * support for that Route rule should be dropped to ensure consistency. For
 * example, even if a filter specified by a Route rule is invalid, the rest
 * of the rules within that Route should still be supported.
 *
 * Support: Core
 *
 * @schema GatewaySpecListenersAllowedRoutes
 */
export interface GatewaySpecListenersAllowedRoutes {
    /**
     * Kinds specifies the groups and kinds of Routes that are allowed to bind
     * to this Gateway Listener. When unspecified or empty, the kinds of Routes
     * selected are determined using the Listener protocol.
     *
     * A RouteGroupKind MUST correspond to kinds of Routes that are compatible
     * with the application protocol specified in the Listener's Protocol field.
     * If an implementation does not support or recognize this resource type, it
     * MUST set the "ResolvedRefs" condition to False for this Listener with the
     * "InvalidRouteKinds" reason.
     *
     * Support: Core
     *
     * @schema GatewaySpecListenersAllowedRoutes#kinds
     */
    readonly kinds?: GatewaySpecListenersAllowedRoutesKinds[];
    /**
     * Namespaces indicates namespaces from which Routes may be attached to this
     * Listener. This is restricted to the namespace of this Gateway by default.
     *
     * Support: Core
     *
     * @schema GatewaySpecListenersAllowedRoutes#namespaces
     */
    readonly namespaces?: GatewaySpecListenersAllowedRoutesNamespaces;
}
/**
 * Converts an object of type 'GatewaySpecListenersAllowedRoutes' to JSON representation.
 */
export declare function toJson_GatewaySpecListenersAllowedRoutes(obj: GatewaySpecListenersAllowedRoutes | undefined): Record<string, any> | undefined;
/**
 * TLS is the TLS configuration for the Listener. This field is required if
 * the Protocol field is "HTTPS" or "TLS". It is invalid to set this field
 * if the Protocol field is "HTTP", "TCP", or "UDP".
 *
 * The association of SNIs to Certificate defined in GatewayTLSConfig is
 * defined based on the Hostname field for this listener.
 *
 * The GatewayClass MUST use the longest matching SNI out of all
 * available certificates for any TLS handshake.
 *
 * Support: Core
 *
 * @schema GatewaySpecListenersTls
 */
export interface GatewaySpecListenersTls {
    /**
     * CertificateRefs contains a series of references to Kubernetes objects that
     * contains TLS certificates and private keys. These certificates are used to
     * establish a TLS handshake for requests that match the hostname of the
     * associated listener.
     *
     * A single CertificateRef to a Kubernetes Secret has "Core" support.
     * Implementations MAY choose to support attaching multiple certificates to
     * a Listener, but this behavior is implementation-specific.
     *
     * References to a resource in different namespace are invalid UNLESS there
     * is a ReferenceGrant in the target namespace that allows the certificate
     * to be attached. If a ReferenceGrant does not allow this reference, the
     * "ResolvedRefs" condition MUST be set to False for this listener with the
     * "RefNotPermitted" reason.
     *
     * This field is required to have at least one element when the mode is set
     * to "Terminate" (default) and is optional otherwise.
     *
     * CertificateRefs can reference to standard Kubernetes resources, i.e.
     * Secret, or implementation-specific custom resources.
     *
     * Support: Core - A single reference to a Kubernetes Secret of type kubernetes.io/tls
     *
     * Support: Implementation-specific (More than one reference or other resource types)
     *
     * @schema GatewaySpecListenersTls#certificateRefs
     */
    readonly certificateRefs?: GatewaySpecListenersTlsCertificateRefs[];
    /**
     * Mode defines the TLS behavior for the TLS session initiated by the client.
     * There are two possible modes:
     *
     * - Terminate: The TLS session between the downstream client and the
     * Gateway is terminated at the Gateway. This mode requires certificates
     * to be specified in some way, such as populating the certificateRefs
     * field.
     * - Passthrough: The TLS session is NOT terminated by the Gateway. This
     * implies that the Gateway can't decipher the TLS stream except for
     * the ClientHello message of the TLS protocol. The certificateRefs field
     * is ignored in this mode.
     *
     * Support: Core
     *
     * @schema GatewaySpecListenersTls#mode
     */
    readonly mode?: GatewaySpecListenersTlsMode;
    /**
     * Options are a list of key/value pairs to enable extended TLS
     * configuration for each implementation. For example, configuring the
     * minimum TLS version or supported cipher suites.
     *
     * A set of common keys MAY be defined by the API in the future. To avoid
     * any ambiguity, implementation-specific definitions MUST use
     * domain-prefixed names, such as `example.com/my-custom-option`.
     * Un-prefixed names are reserved for key names defined by Gateway API.
     *
     * Support: Implementation-specific
     *
     * @schema GatewaySpecListenersTls#options
     */
    readonly options?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'GatewaySpecListenersTls' to JSON representation.
 */
export declare function toJson_GatewaySpecListenersTls(obj: GatewaySpecListenersTls | undefined): Record<string, any> | undefined;
/**
 * RouteGroupKind indicates the group and kind of a Route resource.
 *
 * @schema GatewaySpecListenersAllowedRoutesKinds
 */
export interface GatewaySpecListenersAllowedRoutesKinds {
    /**
     * Group is the group of the Route.
     *
     * @schema GatewaySpecListenersAllowedRoutesKinds#group
     */
    readonly group?: string;
    /**
     * Kind is the kind of the Route.
     *
     * @schema GatewaySpecListenersAllowedRoutesKinds#kind
     */
    readonly kind: string;
}
/**
 * Converts an object of type 'GatewaySpecListenersAllowedRoutesKinds' to JSON representation.
 */
export declare function toJson_GatewaySpecListenersAllowedRoutesKinds(obj: GatewaySpecListenersAllowedRoutesKinds | undefined): Record<string, any> | undefined;
/**
 * Namespaces indicates namespaces from which Routes may be attached to this
 * Listener. This is restricted to the namespace of this Gateway by default.
 *
 * Support: Core
 *
 * @schema GatewaySpecListenersAllowedRoutesNamespaces
 */
export interface GatewaySpecListenersAllowedRoutesNamespaces {
    /**
     * From indicates where Routes will be selected for this Gateway. Possible
     * values are:
     *
     * * All: Routes in all namespaces may be used by this Gateway.
     * * Selector: Routes in namespaces selected by the selector may be used by
     * this Gateway.
     * * Same: Only Routes in the same namespace may be used by this Gateway.
     *
     * Support: Core
     *
     * @schema GatewaySpecListenersAllowedRoutesNamespaces#from
     */
    readonly from?: GatewaySpecListenersAllowedRoutesNamespacesFrom;
    /**
     * Selector must be specified when From is set to "Selector". In that case,
     * only Routes in Namespaces matching this Selector will be selected by this
     * Gateway. This field is ignored for other values of "From".
     *
     * Support: Core
     *
     * @schema GatewaySpecListenersAllowedRoutesNamespaces#selector
     */
    readonly selector?: GatewaySpecListenersAllowedRoutesNamespacesSelector;
}
/**
 * Converts an object of type 'GatewaySpecListenersAllowedRoutesNamespaces' to JSON representation.
 */
export declare function toJson_GatewaySpecListenersAllowedRoutesNamespaces(obj: GatewaySpecListenersAllowedRoutesNamespaces | undefined): Record<string, any> | undefined;
/**
 * SecretObjectReference identifies an API object including its namespace,
 * defaulting to Secret.
 *
 * The API object must be valid in the cluster; the Group and Kind must
 * be registered in the cluster for this reference to be valid.
 *
 * References to objects with invalid Group and Kind are not valid, and must
 * be rejected by the implementation, with appropriate Conditions set
 * on the containing object.
 *
 * @schema GatewaySpecListenersTlsCertificateRefs
 */
export interface GatewaySpecListenersTlsCertificateRefs {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema GatewaySpecListenersTlsCertificateRefs#group
     */
    readonly group?: string;
    /**
     * Kind is kind of the referent. For example "Secret".
     *
     * @schema GatewaySpecListenersTlsCertificateRefs#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GatewaySpecListenersTlsCertificateRefs#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the referenced object. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema GatewaySpecListenersTlsCertificateRefs#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'GatewaySpecListenersTlsCertificateRefs' to JSON representation.
 */
export declare function toJson_GatewaySpecListenersTlsCertificateRefs(obj: GatewaySpecListenersTlsCertificateRefs | undefined): Record<string, any> | undefined;
/**
 * Mode defines the TLS behavior for the TLS session initiated by the client.
 * There are two possible modes:
 *
 * - Terminate: The TLS session between the downstream client and the
 * Gateway is terminated at the Gateway. This mode requires certificates
 * to be specified in some way, such as populating the certificateRefs
 * field.
 * - Passthrough: The TLS session is NOT terminated by the Gateway. This
 * implies that the Gateway can't decipher the TLS stream except for
 * the ClientHello message of the TLS protocol. The certificateRefs field
 * is ignored in this mode.
 *
 * Support: Core
 *
 * @schema GatewaySpecListenersTlsMode
 */
export declare enum GatewaySpecListenersTlsMode {
    /** Terminate */
    TERMINATE = "Terminate",
    /** Passthrough */
    PASSTHROUGH = "Passthrough"
}
/**
 * From indicates where Routes will be selected for this Gateway. Possible
 * values are:
 *
 * * All: Routes in all namespaces may be used by this Gateway.
 * * Selector: Routes in namespaces selected by the selector may be used by
 * this Gateway.
 * * Same: Only Routes in the same namespace may be used by this Gateway.
 *
 * Support: Core
 *
 * @schema GatewaySpecListenersAllowedRoutesNamespacesFrom
 */
export declare enum GatewaySpecListenersAllowedRoutesNamespacesFrom {
    /** All */
    ALL = "All",
    /** Selector */
    SELECTOR = "Selector",
    /** Same */
    SAME = "Same"
}
/**
 * Selector must be specified when From is set to "Selector". In that case,
 * only Routes in Namespaces matching this Selector will be selected by this
 * Gateway. This field is ignored for other values of "From".
 *
 * Support: Core
 *
 * @schema GatewaySpecListenersAllowedRoutesNamespacesSelector
 */
export interface GatewaySpecListenersAllowedRoutesNamespacesSelector {
    /**
     * matchExpressions is a list of label selector requirements. The requirements are ANDed.
     *
     * @schema GatewaySpecListenersAllowedRoutesNamespacesSelector#matchExpressions
     */
    readonly matchExpressions?: GatewaySpecListenersAllowedRoutesNamespacesSelectorMatchExpressions[];
    /**
     * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels
     * map is equivalent to an element of matchExpressions, whose key field is "key", the
     * operator is "In", and the values array contains only "value". The requirements are ANDed.
     *
     * @schema GatewaySpecListenersAllowedRoutesNamespacesSelector#matchLabels
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'GatewaySpecListenersAllowedRoutesNamespacesSelector' to JSON representation.
 */
export declare function toJson_GatewaySpecListenersAllowedRoutesNamespacesSelector(obj: GatewaySpecListenersAllowedRoutesNamespacesSelector | undefined): Record<string, any> | undefined;
/**
 * A label selector requirement is a selector that contains values, a key, and an operator that
 * relates the key and values.
 *
 * @schema GatewaySpecListenersAllowedRoutesNamespacesSelectorMatchExpressions
 */
export interface GatewaySpecListenersAllowedRoutesNamespacesSelectorMatchExpressions {
    /**
     * key is the label key that the selector applies to.
     *
     * @schema GatewaySpecListenersAllowedRoutesNamespacesSelectorMatchExpressions#key
     */
    readonly key: string;
    /**
     * operator represents a key's relationship to a set of values.
     * Valid operators are In, NotIn, Exists and DoesNotExist.
     *
     * @schema GatewaySpecListenersAllowedRoutesNamespacesSelectorMatchExpressions#operator
     */
    readonly operator: string;
    /**
     * values is an array of string values. If the operator is In or NotIn,
     * the values array must be non-empty. If the operator is Exists or DoesNotExist,
     * the values array must be empty. This array is replaced during a strategic
     * merge patch.
     *
     * @schema GatewaySpecListenersAllowedRoutesNamespacesSelectorMatchExpressions#values
     */
    readonly values?: string[];
}
/**
 * Converts an object of type 'GatewaySpecListenersAllowedRoutesNamespacesSelectorMatchExpressions' to JSON representation.
 */
export declare function toJson_GatewaySpecListenersAllowedRoutesNamespacesSelectorMatchExpressions(obj: GatewaySpecListenersAllowedRoutesNamespacesSelectorMatchExpressions | undefined): Record<string, any> | undefined;
/**
 * Gateway represents an instance of a service-traffic handling infrastructure
by binding Listeners to a set of IP addresses.
 *
 * @schema GatewayV1Beta1
 */
export declare class GatewayV1Beta1 extends ApiObject {
    /**
     * Returns the apiVersion and kind for "GatewayV1Beta1"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "GatewayV1Beta1".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: GatewayV1Beta1Props): any;
    /**
     * Defines a "GatewayV1Beta1" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: GatewayV1Beta1Props);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Gateway represents an instance of a service-traffic handling infrastructure
 * by binding Listeners to a set of IP addresses.
 *
 * @schema GatewayV1Beta1
 */
export interface GatewayV1Beta1Props {
    /**
     * @schema GatewayV1Beta1#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec defines the desired state of Gateway.
     *
     * @schema GatewayV1Beta1#spec
     */
    readonly spec: GatewayV1Beta1Spec;
}
/**
 * Converts an object of type 'GatewayV1Beta1Props' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1Props(obj: GatewayV1Beta1Props | undefined): Record<string, any> | undefined;
/**
 * Spec defines the desired state of Gateway.
 *
 * @schema GatewayV1Beta1Spec
 */
export interface GatewayV1Beta1Spec {
    /**
     * Addresses requested for this Gateway. This is optional and behavior can
     * depend on the implementation. If a value is set in the spec and the
     * requested address is invalid or unavailable, the implementation MUST
     * indicate this in the associated entry in GatewayStatus.Addresses.
     *
     * The Addresses field represents a request for the address(es) on the
     * "outside of the Gateway", that traffic bound for this Gateway will use.
     * This could be the IP address or hostname of an external load balancer or
     * other networking infrastructure, or some other address that traffic will
     * be sent to.
     *
     * If no Addresses are specified, the implementation MAY schedule the
     * Gateway in an implementation-specific manner, assigning an appropriate
     * set of Addresses.
     *
     * The implementation MUST bind all Listeners to every GatewayAddress that
     * it assigns to the Gateway and add a corresponding entry in
     * GatewayStatus.Addresses.
     *
     * Support: Extended
     *
     * @schema GatewayV1Beta1Spec#addresses
     */
    readonly addresses?: GatewayV1Beta1SpecAddresses[];
    /**
     * GatewayClassName used for this Gateway. This is the name of a
     * GatewayClass resource.
     *
     * @schema GatewayV1Beta1Spec#gatewayClassName
     */
    readonly gatewayClassName: string;
    /**
     * Infrastructure defines infrastructure level attributes about this Gateway instance.
     *
     * Support: Extended
     *
     * @schema GatewayV1Beta1Spec#infrastructure
     */
    readonly infrastructure?: GatewayV1Beta1SpecInfrastructure;
    /**
     * Listeners associated with this Gateway. Listeners define
     * logical endpoints that are bound on this Gateway's addresses.
     * At least one Listener MUST be specified.
     *
     * ## Distinct Listeners
     *
     * Each Listener in a set of Listeners (for example, in a single Gateway)
     * MUST be _distinct_, in that a traffic flow MUST be able to be assigned to
     * exactly one listener. (This section uses "set of Listeners" rather than
     * "Listeners in a single Gateway" because implementations MAY merge configuration
     * from multiple Gateways onto a single data plane, and these rules _also_
     * apply in that case).
     *
     * Practically, this means that each listener in a set MUST have a unique
     * combination of Port, Protocol, and, if supported by the protocol, Hostname.
     *
     * Some combinations of port, protocol, and TLS settings are considered
     * Core support and MUST be supported by implementations based on the objects
     * they support:
     *
     * HTTPRoute
     *
     * 1. HTTPRoute, Port: 80, Protocol: HTTP
     * 2. HTTPRoute, Port: 443, Protocol: HTTPS, TLS Mode: Terminate, TLS keypair provided
     *
     * TLSRoute
     *
     * 1. TLSRoute, Port: 443, Protocol: TLS, TLS Mode: Passthrough
     *
     * "Distinct" Listeners have the following property:
     *
     * **The implementation can match inbound requests to a single distinct
     * Listener**.
     *
     * When multiple Listeners share values for fields (for
     * example, two Listeners with the same Port value), the implementation
     * can match requests to only one of the Listeners using other
     * Listener fields.
     *
     * When multiple listeners have the same value for the Protocol field, then
     * each of the Listeners with matching Protocol values MUST have different
     * values for other fields.
     *
     * The set of fields that MUST be different for a Listener differs per protocol.
     * The following rules define the rules for what fields MUST be considered for
     * Listeners to be distinct with each protocol currently defined in the
     * Gateway API spec.
     *
     * The set of listeners that all share a protocol value MUST have _different_
     * values for _at least one_ of these fields to be distinct:
     *
     * * **HTTP, HTTPS, TLS**: Port, Hostname
     * * **TCP, UDP**: Port
     *
     * One **very** important rule to call out involves what happens when an
     * implementation:
     *
     * * Supports TCP protocol Listeners, as well as HTTP, HTTPS, or TLS protocol
     * Listeners, and
     * * sees HTTP, HTTPS, or TLS protocols with the same `port` as one with TCP
     * Protocol.
     *
     * In this case all the Listeners that share a port with the
     * TCP Listener are not distinct and so MUST NOT be accepted.
     *
     * If an implementation does not support TCP Protocol Listeners, then the
     * previous rule does not apply, and the TCP Listeners SHOULD NOT be
     * accepted.
     *
     * Note that the `tls` field is not used for determining if a listener is distinct, because
     * Listeners that _only_ differ on TLS config will still conflict in all cases.
     *
     * ### Listeners that are distinct only by Hostname
     *
     * When the Listeners are distinct based only on Hostname, inbound request
     * hostnames MUST match from the most specific to least specific Hostname
     * values to choose the correct Listener and its associated set of Routes.
     *
     * Exact matches MUST be processed before wildcard matches, and wildcard
     * matches MUST be processed before fallback (empty Hostname value)
     * matches. For example, `"foo.example.com"` takes precedence over
     * `"*.example.com"`, and `"*.example.com"` takes precedence over `""`.
     *
     * Additionally, if there are multiple wildcard entries, more specific
     * wildcard entries must be processed before less specific wildcard entries.
     * For example, `"*.foo.example.com"` takes precedence over `"*.example.com"`.
     *
     * The precise definition here is that the higher the number of dots in the
     * hostname to the right of the wildcard character, the higher the precedence.
     *
     * The wildcard character will match any number of characters _and dots_ to
     * the left, however, so `"*.example.com"` will match both
     * `"foo.bar.example.com"` _and_ `"bar.example.com"`.
     *
     * ## Handling indistinct Listeners
     *
     * If a set of Listeners contains Listeners that are not distinct, then those
     * Listeners are _Conflicted_, and the implementation MUST set the "Conflicted"
     * condition in the Listener Status to "True".
     *
     * The words "indistinct" and "conflicted" are considered equivalent for the
     * purpose of this documentation.
     *
     * Implementations MAY choose to accept a Gateway with some Conflicted
     * Listeners only if they only accept the partial Listener set that contains
     * no Conflicted Listeners.
     *
     * Specifically, an implementation MAY accept a partial Listener set subject to
     * the following rules:
     *
     * * The implementation MUST NOT pick one conflicting Listener as the winner.
     * ALL indistinct Listeners must not be accepted for processing.
     * * At least one distinct Listener MUST be present, or else the Gateway effectively
     * contains _no_ Listeners, and must be rejected from processing as a whole.
     *
     * The implementation MUST set a "ListenersNotValid" condition on the
     * Gateway Status when the Gateway contains Conflicted Listeners whether or
     * not they accept the Gateway. That Condition SHOULD clearly
     * indicate in the Message which Listeners are conflicted, and which are
     * Accepted. Additionally, the Listener status for those listeners SHOULD
     * indicate which Listeners are conflicted and not Accepted.
     *
     * ## General Listener behavior
     *
     * Note that, for all distinct Listeners, requests SHOULD match at most one Listener.
     * For example, if Listeners are defined for "foo.example.com" and "*.example.com", a
     * request to "foo.example.com" SHOULD only be routed using routes attached
     * to the "foo.example.com" Listener (and not the "*.example.com" Listener).
     *
     * This concept is known as "Listener Isolation", and it is an Extended feature
     * of Gateway API. Implementations that do not support Listener Isolation MUST
     * clearly document this, and MUST NOT claim support for the
     * `GatewayHTTPListenerIsolation` feature.
     *
     * Implementations that _do_ support Listener Isolation SHOULD claim support
     * for the Extended `GatewayHTTPListenerIsolation` feature and pass the associated
     * conformance tests.
     *
     * ## Compatible Listeners
     *
     * A Gateway's Listeners are considered _compatible_ if:
     *
     * 1. They are distinct.
     * 2. The implementation can serve them in compliance with the Addresses
     * requirement that all Listeners are available on all assigned
     * addresses.
     *
     * Compatible combinations in Extended support are expected to vary across
     * implementations. A combination that is compatible for one implementation
     * may not be compatible for another.
     *
     * For example, an implementation that cannot serve both TCP and UDP listeners
     * on the same address, or cannot mix HTTPS and generic TLS listens on the same port
     * would not consider those cases compatible, even though they are distinct.
     *
     * Implementations MAY merge separate Gateways onto a single set of
     * Addresses if all Listeners across all Gateways are compatible.
     *
     * In a future release the MinItems=1 requirement MAY be dropped.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1Spec#listeners
     */
    readonly listeners: GatewayV1Beta1SpecListeners[];
}
/**
 * Converts an object of type 'GatewayV1Beta1Spec' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1Spec(obj: GatewayV1Beta1Spec | undefined): Record<string, any> | undefined;
/**
 * GatewaySpecAddress describes an address that can be bound to a Gateway.
 *
 * @schema GatewayV1Beta1SpecAddresses
 */
export interface GatewayV1Beta1SpecAddresses {
    /**
     * Type of the address.
     *
     * @schema GatewayV1Beta1SpecAddresses#type
     */
    readonly type?: string;
    /**
     * When a value is unspecified, an implementation SHOULD automatically
     * assign an address matching the requested type if possible.
     *
     * If an implementation does not support an empty value, they MUST set the
     * "Programmed" condition in status to False with a reason of "AddressNotAssigned".
     *
     * Examples: `1.2.3.4`, `128::1`, `my-ip-address`.
     *
     * @schema GatewayV1Beta1SpecAddresses#value
     */
    readonly value?: string;
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecAddresses' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecAddresses(obj: GatewayV1Beta1SpecAddresses | undefined): Record<string, any> | undefined;
/**
 * Infrastructure defines infrastructure level attributes about this Gateway instance.
 *
 * Support: Extended
 *
 * @schema GatewayV1Beta1SpecInfrastructure
 */
export interface GatewayV1Beta1SpecInfrastructure {
    /**
     * Annotations that SHOULD be applied to any resources created in response to this Gateway.
     *
     * For implementations creating other Kubernetes objects, this should be the `metadata.annotations` field on resources.
     * For other implementations, this refers to any relevant (implementation specific) "annotations" concepts.
     *
     * An implementation may chose to add additional implementation-specific annotations as they see fit.
     *
     * Support: Extended
     *
     * @schema GatewayV1Beta1SpecInfrastructure#annotations
     */
    readonly annotations?: {
        [key: string]: string;
    };
    /**
     * Labels that SHOULD be applied to any resources created in response to this Gateway.
     *
     * For implementations creating other Kubernetes objects, this should be the `metadata.labels` field on resources.
     * For other implementations, this refers to any relevant (implementation specific) "labels" concepts.
     *
     * An implementation may chose to add additional implementation-specific labels as they see fit.
     *
     * If an implementation maps these labels to Pods, or any other resource that would need to be recreated when labels
     * change, it SHOULD clearly warn about this behavior in documentation.
     *
     * Support: Extended
     *
     * @schema GatewayV1Beta1SpecInfrastructure#labels
     */
    readonly labels?: {
        [key: string]: string;
    };
    /**
     * ParametersRef is a reference to a resource that contains the configuration
     * parameters corresponding to the Gateway. This is optional if the
     * controller does not require any additional configuration.
     *
     * This follows the same semantics as GatewayClass's `parametersRef`, but on a per-Gateway basis
     *
     * The Gateway's GatewayClass may provide its own `parametersRef`. When both are specified,
     * the merging behavior is implementation specific.
     * It is generally recommended that GatewayClass provides defaults that can be overridden by a Gateway.
     *
     * If the referent cannot be found, refers to an unsupported kind, or when
     * the data within that resource is malformed, the Gateway SHOULD be
     * rejected with the "Accepted" status condition set to "False" and an
     * "InvalidParameters" reason.
     *
     * Support: Implementation-specific
     *
     * @schema GatewayV1Beta1SpecInfrastructure#parametersRef
     */
    readonly parametersRef?: GatewayV1Beta1SpecInfrastructureParametersRef;
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecInfrastructure' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecInfrastructure(obj: GatewayV1Beta1SpecInfrastructure | undefined): Record<string, any> | undefined;
/**
 * Listener embodies the concept of a logical endpoint where a Gateway accepts
 * network connections.
 *
 * @schema GatewayV1Beta1SpecListeners
 */
export interface GatewayV1Beta1SpecListeners {
    /**
     * AllowedRoutes defines the types of routes that MAY be attached to a
     * Listener and the trusted namespaces where those Route resources MAY be
     * present.
     *
     * Although a client request may match multiple route rules, only one rule
     * may ultimately receive the request. Matching precedence MUST be
     * determined in order of the following criteria:
     *
     * * The most specific match as defined by the Route type.
     * * The oldest Route based on creation timestamp. For example, a Route with
     * a creation timestamp of "2020-09-08 01:02:03" is given precedence over
     * a Route with a creation timestamp of "2020-09-08 01:02:04".
     * * If everything else is equivalent, the Route appearing first in
     * alphabetical order (namespace/name) should be given precedence. For
     * example, foo/bar is given precedence over foo/baz.
     *
     * All valid rules within a Route attached to this Listener should be
     * implemented. Invalid Route rules can be ignored (sometimes that will mean
     * the full Route). If a Route rule transitions from valid to invalid,
     * support for that Route rule should be dropped to ensure consistency. For
     * example, even if a filter specified by a Route rule is invalid, the rest
     * of the rules within that Route should still be supported.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListeners#allowedRoutes
     */
    readonly allowedRoutes?: GatewayV1Beta1SpecListenersAllowedRoutes;
    /**
     * Hostname specifies the virtual hostname to match for protocol types that
     * define this concept. When unspecified, all hostnames are matched. This
     * field is ignored for protocols that don't require hostname based
     * matching.
     *
     * Implementations MUST apply Hostname matching appropriately for each of
     * the following protocols:
     *
     * * TLS: The Listener Hostname MUST match the SNI.
     * * HTTP: The Listener Hostname MUST match the Host header of the request.
     * * HTTPS: The Listener Hostname SHOULD match both the SNI and Host header.
     * Note that this does not require the SNI and Host header to be the same.
     * The semantics of this are described in more detail below.
     *
     * To ensure security, Section 11.1 of RFC-6066 emphasizes that server
     * implementations that rely on SNI hostname matching MUST also verify
     * hostnames within the application protocol.
     *
     * Section 9.1.2 of RFC-7540 provides a mechanism for servers to reject the
     * reuse of a connection by responding with the HTTP 421 Misdirected Request
     * status code. This indicates that the origin server has rejected the
     * request because it appears to have been misdirected.
     *
     * To detect misdirected requests, Gateways SHOULD match the authority of
     * the requests with all the SNI hostname(s) configured across all the
     * Gateway Listeners on the same port and protocol:
     *
     * * If another Listener has an exact match or more specific wildcard entry,
     * the Gateway SHOULD return a 421.
     * * If the current Listener (selected by SNI matching during ClientHello)
     * does not match the Host:
     * * If another Listener does match the Host the Gateway SHOULD return a
     * 421.
     * * If no other Listener matches the Host, the Gateway MUST return a
     * 404.
     *
     * For HTTPRoute and TLSRoute resources, there is an interaction with the
     * `spec.hostnames` array. When both listener and route specify hostnames,
     * there MUST be an intersection between the values for a Route to be
     * accepted. For more information, refer to the Route specific Hostnames
     * documentation.
     *
     * Hostnames that are prefixed with a wildcard label (`*.`) are interpreted
     * as a suffix match. That means that a match for `*.example.com` would match
     * both `test.example.com`, and `foo.test.example.com`, but not `example.com`.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListeners#hostname
     */
    readonly hostname?: string;
    /**
     * Name is the name of the Listener. This name MUST be unique within a
     * Gateway.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListeners#name
     */
    readonly name: string;
    /**
     * Port is the network port. Multiple listeners may use the
     * same port, subject to the Listener compatibility rules.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListeners#port
     */
    readonly port: number;
    /**
     * Protocol specifies the network protocol this listener expects to receive.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListeners#protocol
     */
    readonly protocol: string;
    /**
     * TLS is the TLS configuration for the Listener. This field is required if
     * the Protocol field is "HTTPS" or "TLS". It is invalid to set this field
     * if the Protocol field is "HTTP", "TCP", or "UDP".
     *
     * The association of SNIs to Certificate defined in GatewayTLSConfig is
     * defined based on the Hostname field for this listener.
     *
     * The GatewayClass MUST use the longest matching SNI out of all
     * available certificates for any TLS handshake.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListeners#tls
     */
    readonly tls?: GatewayV1Beta1SpecListenersTls;
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecListeners' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecListeners(obj: GatewayV1Beta1SpecListeners | undefined): Record<string, any> | undefined;
/**
 * ParametersRef is a reference to a resource that contains the configuration
 * parameters corresponding to the Gateway. This is optional if the
 * controller does not require any additional configuration.
 *
 * This follows the same semantics as GatewayClass's `parametersRef`, but on a per-Gateway basis
 *
 * The Gateway's GatewayClass may provide its own `parametersRef`. When both are specified,
 * the merging behavior is implementation specific.
 * It is generally recommended that GatewayClass provides defaults that can be overridden by a Gateway.
 *
 * If the referent cannot be found, refers to an unsupported kind, or when
 * the data within that resource is malformed, the Gateway SHOULD be
 * rejected with the "Accepted" status condition set to "False" and an
 * "InvalidParameters" reason.
 *
 * Support: Implementation-specific
 *
 * @schema GatewayV1Beta1SpecInfrastructureParametersRef
 */
export interface GatewayV1Beta1SpecInfrastructureParametersRef {
    /**
     * Group is the group of the referent.
     *
     * @schema GatewayV1Beta1SpecInfrastructureParametersRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent.
     *
     * @schema GatewayV1Beta1SpecInfrastructureParametersRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GatewayV1Beta1SpecInfrastructureParametersRef#name
     */
    readonly name: string;
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecInfrastructureParametersRef' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecInfrastructureParametersRef(obj: GatewayV1Beta1SpecInfrastructureParametersRef | undefined): Record<string, any> | undefined;
/**
 * AllowedRoutes defines the types of routes that MAY be attached to a
 * Listener and the trusted namespaces where those Route resources MAY be
 * present.
 *
 * Although a client request may match multiple route rules, only one rule
 * may ultimately receive the request. Matching precedence MUST be
 * determined in order of the following criteria:
 *
 * * The most specific match as defined by the Route type.
 * * The oldest Route based on creation timestamp. For example, a Route with
 * a creation timestamp of "2020-09-08 01:02:03" is given precedence over
 * a Route with a creation timestamp of "2020-09-08 01:02:04".
 * * If everything else is equivalent, the Route appearing first in
 * alphabetical order (namespace/name) should be given precedence. For
 * example, foo/bar is given precedence over foo/baz.
 *
 * All valid rules within a Route attached to this Listener should be
 * implemented. Invalid Route rules can be ignored (sometimes that will mean
 * the full Route). If a Route rule transitions from valid to invalid,
 * support for that Route rule should be dropped to ensure consistency. For
 * example, even if a filter specified by a Route rule is invalid, the rest
 * of the rules within that Route should still be supported.
 *
 * Support: Core
 *
 * @schema GatewayV1Beta1SpecListenersAllowedRoutes
 */
export interface GatewayV1Beta1SpecListenersAllowedRoutes {
    /**
     * Kinds specifies the groups and kinds of Routes that are allowed to bind
     * to this Gateway Listener. When unspecified or empty, the kinds of Routes
     * selected are determined using the Listener protocol.
     *
     * A RouteGroupKind MUST correspond to kinds of Routes that are compatible
     * with the application protocol specified in the Listener's Protocol field.
     * If an implementation does not support or recognize this resource type, it
     * MUST set the "ResolvedRefs" condition to False for this Listener with the
     * "InvalidRouteKinds" reason.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutes#kinds
     */
    readonly kinds?: GatewayV1Beta1SpecListenersAllowedRoutesKinds[];
    /**
     * Namespaces indicates namespaces from which Routes may be attached to this
     * Listener. This is restricted to the namespace of this Gateway by default.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutes#namespaces
     */
    readonly namespaces?: GatewayV1Beta1SpecListenersAllowedRoutesNamespaces;
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecListenersAllowedRoutes' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecListenersAllowedRoutes(obj: GatewayV1Beta1SpecListenersAllowedRoutes | undefined): Record<string, any> | undefined;
/**
 * TLS is the TLS configuration for the Listener. This field is required if
 * the Protocol field is "HTTPS" or "TLS". It is invalid to set this field
 * if the Protocol field is "HTTP", "TCP", or "UDP".
 *
 * The association of SNIs to Certificate defined in GatewayTLSConfig is
 * defined based on the Hostname field for this listener.
 *
 * The GatewayClass MUST use the longest matching SNI out of all
 * available certificates for any TLS handshake.
 *
 * Support: Core
 *
 * @schema GatewayV1Beta1SpecListenersTls
 */
export interface GatewayV1Beta1SpecListenersTls {
    /**
     * CertificateRefs contains a series of references to Kubernetes objects that
     * contains TLS certificates and private keys. These certificates are used to
     * establish a TLS handshake for requests that match the hostname of the
     * associated listener.
     *
     * A single CertificateRef to a Kubernetes Secret has "Core" support.
     * Implementations MAY choose to support attaching multiple certificates to
     * a Listener, but this behavior is implementation-specific.
     *
     * References to a resource in different namespace are invalid UNLESS there
     * is a ReferenceGrant in the target namespace that allows the certificate
     * to be attached. If a ReferenceGrant does not allow this reference, the
     * "ResolvedRefs" condition MUST be set to False for this listener with the
     * "RefNotPermitted" reason.
     *
     * This field is required to have at least one element when the mode is set
     * to "Terminate" (default) and is optional otherwise.
     *
     * CertificateRefs can reference to standard Kubernetes resources, i.e.
     * Secret, or implementation-specific custom resources.
     *
     * Support: Core - A single reference to a Kubernetes Secret of type kubernetes.io/tls
     *
     * Support: Implementation-specific (More than one reference or other resource types)
     *
     * @schema GatewayV1Beta1SpecListenersTls#certificateRefs
     */
    readonly certificateRefs?: GatewayV1Beta1SpecListenersTlsCertificateRefs[];
    /**
     * Mode defines the TLS behavior for the TLS session initiated by the client.
     * There are two possible modes:
     *
     * - Terminate: The TLS session between the downstream client and the
     * Gateway is terminated at the Gateway. This mode requires certificates
     * to be specified in some way, such as populating the certificateRefs
     * field.
     * - Passthrough: The TLS session is NOT terminated by the Gateway. This
     * implies that the Gateway can't decipher the TLS stream except for
     * the ClientHello message of the TLS protocol. The certificateRefs field
     * is ignored in this mode.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListenersTls#mode
     */
    readonly mode?: GatewayV1Beta1SpecListenersTlsMode;
    /**
     * Options are a list of key/value pairs to enable extended TLS
     * configuration for each implementation. For example, configuring the
     * minimum TLS version or supported cipher suites.
     *
     * A set of common keys MAY be defined by the API in the future. To avoid
     * any ambiguity, implementation-specific definitions MUST use
     * domain-prefixed names, such as `example.com/my-custom-option`.
     * Un-prefixed names are reserved for key names defined by Gateway API.
     *
     * Support: Implementation-specific
     *
     * @schema GatewayV1Beta1SpecListenersTls#options
     */
    readonly options?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecListenersTls' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecListenersTls(obj: GatewayV1Beta1SpecListenersTls | undefined): Record<string, any> | undefined;
/**
 * RouteGroupKind indicates the group and kind of a Route resource.
 *
 * @schema GatewayV1Beta1SpecListenersAllowedRoutesKinds
 */
export interface GatewayV1Beta1SpecListenersAllowedRoutesKinds {
    /**
     * Group is the group of the Route.
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutesKinds#group
     */
    readonly group?: string;
    /**
     * Kind is the kind of the Route.
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutesKinds#kind
     */
    readonly kind: string;
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecListenersAllowedRoutesKinds' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecListenersAllowedRoutesKinds(obj: GatewayV1Beta1SpecListenersAllowedRoutesKinds | undefined): Record<string, any> | undefined;
/**
 * Namespaces indicates namespaces from which Routes may be attached to this
 * Listener. This is restricted to the namespace of this Gateway by default.
 *
 * Support: Core
 *
 * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespaces
 */
export interface GatewayV1Beta1SpecListenersAllowedRoutesNamespaces {
    /**
     * From indicates where Routes will be selected for this Gateway. Possible
     * values are:
     *
     * * All: Routes in all namespaces may be used by this Gateway.
     * * Selector: Routes in namespaces selected by the selector may be used by
     * this Gateway.
     * * Same: Only Routes in the same namespace may be used by this Gateway.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespaces#from
     */
    readonly from?: GatewayV1Beta1SpecListenersAllowedRoutesNamespacesFrom;
    /**
     * Selector must be specified when From is set to "Selector". In that case,
     * only Routes in Namespaces matching this Selector will be selected by this
     * Gateway. This field is ignored for other values of "From".
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespaces#selector
     */
    readonly selector?: GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelector;
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecListenersAllowedRoutesNamespaces' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecListenersAllowedRoutesNamespaces(obj: GatewayV1Beta1SpecListenersAllowedRoutesNamespaces | undefined): Record<string, any> | undefined;
/**
 * SecretObjectReference identifies an API object including its namespace,
 * defaulting to Secret.
 *
 * The API object must be valid in the cluster; the Group and Kind must
 * be registered in the cluster for this reference to be valid.
 *
 * References to objects with invalid Group and Kind are not valid, and must
 * be rejected by the implementation, with appropriate Conditions set
 * on the containing object.
 *
 * @schema GatewayV1Beta1SpecListenersTlsCertificateRefs
 */
export interface GatewayV1Beta1SpecListenersTlsCertificateRefs {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema GatewayV1Beta1SpecListenersTlsCertificateRefs#group
     */
    readonly group?: string;
    /**
     * Kind is kind of the referent. For example "Secret".
     *
     * @schema GatewayV1Beta1SpecListenersTlsCertificateRefs#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GatewayV1Beta1SpecListenersTlsCertificateRefs#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the referenced object. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema GatewayV1Beta1SpecListenersTlsCertificateRefs#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecListenersTlsCertificateRefs' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecListenersTlsCertificateRefs(obj: GatewayV1Beta1SpecListenersTlsCertificateRefs | undefined): Record<string, any> | undefined;
/**
 * Mode defines the TLS behavior for the TLS session initiated by the client.
 * There are two possible modes:
 *
 * - Terminate: The TLS session between the downstream client and the
 * Gateway is terminated at the Gateway. This mode requires certificates
 * to be specified in some way, such as populating the certificateRefs
 * field.
 * - Passthrough: The TLS session is NOT terminated by the Gateway. This
 * implies that the Gateway can't decipher the TLS stream except for
 * the ClientHello message of the TLS protocol. The certificateRefs field
 * is ignored in this mode.
 *
 * Support: Core
 *
 * @schema GatewayV1Beta1SpecListenersTlsMode
 */
export declare enum GatewayV1Beta1SpecListenersTlsMode {
    /** Terminate */
    TERMINATE = "Terminate",
    /** Passthrough */
    PASSTHROUGH = "Passthrough"
}
/**
 * From indicates where Routes will be selected for this Gateway. Possible
 * values are:
 *
 * * All: Routes in all namespaces may be used by this Gateway.
 * * Selector: Routes in namespaces selected by the selector may be used by
 * this Gateway.
 * * Same: Only Routes in the same namespace may be used by this Gateway.
 *
 * Support: Core
 *
 * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespacesFrom
 */
export declare enum GatewayV1Beta1SpecListenersAllowedRoutesNamespacesFrom {
    /** All */
    ALL = "All",
    /** Selector */
    SELECTOR = "Selector",
    /** Same */
    SAME = "Same"
}
/**
 * Selector must be specified when From is set to "Selector". In that case,
 * only Routes in Namespaces matching this Selector will be selected by this
 * Gateway. This field is ignored for other values of "From".
 *
 * Support: Core
 *
 * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelector
 */
export interface GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelector {
    /**
     * matchExpressions is a list of label selector requirements. The requirements are ANDed.
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelector#matchExpressions
     */
    readonly matchExpressions?: GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelectorMatchExpressions[];
    /**
     * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels
     * map is equivalent to an element of matchExpressions, whose key field is "key", the
     * operator is "In", and the values array contains only "value". The requirements are ANDed.
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelector#matchLabels
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelector' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelector(obj: GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelector | undefined): Record<string, any> | undefined;
/**
 * A label selector requirement is a selector that contains values, a key, and an operator that
 * relates the key and values.
 *
 * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelectorMatchExpressions
 */
export interface GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelectorMatchExpressions {
    /**
     * key is the label key that the selector applies to.
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelectorMatchExpressions#key
     */
    readonly key: string;
    /**
     * operator represents a key's relationship to a set of values.
     * Valid operators are In, NotIn, Exists and DoesNotExist.
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelectorMatchExpressions#operator
     */
    readonly operator: string;
    /**
     * values is an array of string values. If the operator is In or NotIn,
     * the values array must be non-empty. If the operator is Exists or DoesNotExist,
     * the values array must be empty. This array is replaced during a strategic
     * merge patch.
     *
     * @schema GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelectorMatchExpressions#values
     */
    readonly values?: string[];
}
/**
 * Converts an object of type 'GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelectorMatchExpressions' to JSON representation.
 */
export declare function toJson_GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelectorMatchExpressions(obj: GatewayV1Beta1SpecListenersAllowedRoutesNamespacesSelectorMatchExpressions | undefined): Record<string, any> | undefined;
/**
 * GatewayClass describes a class of Gateways available to the user for creating
Gateway resources.

It is recommended that this resource be used as a template for Gateways. This
means that a Gateway is based on the state of the GatewayClass at the time it
was created and changes to the GatewayClass or associated parameters are not
propagated down to existing Gateways. This recommendation is intended to
limit the blast radius of changes to GatewayClass or associated parameters.
If implementations choose to propagate GatewayClass changes to existing
Gateways, that MUST be clearly documented by the implementation.

Whenever one or more Gateways are using a GatewayClass, implementations SHOULD
add the `gateway-exists-finalizer.gateway.networking.k8s.io` finalizer on the
associated GatewayClass. This ensures that a GatewayClass associated with a
Gateway is not deleted while in use.

GatewayClass is a Cluster level resource.
 *
 * @schema GatewayClass
 */
export declare class GatewayClass extends ApiObject {
    /**
     * Returns the apiVersion and kind for "GatewayClass"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "GatewayClass".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: GatewayClassProps): any;
    /**
     * Defines a "GatewayClass" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: GatewayClassProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * GatewayClass describes a class of Gateways available to the user for creating
 * Gateway resources.
 *
 * It is recommended that this resource be used as a template for Gateways. This
 * means that a Gateway is based on the state of the GatewayClass at the time it
 * was created and changes to the GatewayClass or associated parameters are not
 * propagated down to existing Gateways. This recommendation is intended to
 * limit the blast radius of changes to GatewayClass or associated parameters.
 * If implementations choose to propagate GatewayClass changes to existing
 * Gateways, that MUST be clearly documented by the implementation.
 *
 * Whenever one or more Gateways are using a GatewayClass, implementations SHOULD
 * add the `gateway-exists-finalizer.gateway.networking.k8s.io` finalizer on the
 * associated GatewayClass. This ensures that a GatewayClass associated with a
 * Gateway is not deleted while in use.
 *
 * GatewayClass is a Cluster level resource.
 *
 * @schema GatewayClass
 */
export interface GatewayClassProps {
    /**
     * @schema GatewayClass#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec defines the desired state of GatewayClass.
     *
     * @schema GatewayClass#spec
     */
    readonly spec: GatewayClassSpec;
}
/**
 * Converts an object of type 'GatewayClassProps' to JSON representation.
 */
export declare function toJson_GatewayClassProps(obj: GatewayClassProps | undefined): Record<string, any> | undefined;
/**
 * Spec defines the desired state of GatewayClass.
 *
 * @schema GatewayClassSpec
 */
export interface GatewayClassSpec {
    /**
     * ControllerName is the name of the controller that is managing Gateways of
     * this class. The value of this field MUST be a domain prefixed path.
     *
     * Example: "example.net/gateway-controller".
     *
     * This field is not mutable and cannot be empty.
     *
     * Support: Core
     *
     * @schema GatewayClassSpec#controllerName
     */
    readonly controllerName: string;
    /**
     * Description helps describe a GatewayClass with more details.
     *
     * @schema GatewayClassSpec#description
     */
    readonly description?: string;
    /**
     * ParametersRef is a reference to a resource that contains the configuration
     * parameters corresponding to the GatewayClass. This is optional if the
     * controller does not require any additional configuration.
     *
     * ParametersRef can reference a standard Kubernetes resource, i.e. ConfigMap,
     * or an implementation-specific custom resource. The resource can be
     * cluster-scoped or namespace-scoped.
     *
     * If the referent cannot be found, refers to an unsupported kind, or when
     * the data within that resource is malformed, the GatewayClass SHOULD be
     * rejected with the "Accepted" status condition set to "False" and an
     * "InvalidParameters" reason.
     *
     * A Gateway for this GatewayClass may provide its own `parametersRef`. When both are specified,
     * the merging behavior is implementation specific.
     * It is generally recommended that GatewayClass provides defaults that can be overridden by a Gateway.
     *
     * Support: Implementation-specific
     *
     * @schema GatewayClassSpec#parametersRef
     */
    readonly parametersRef?: GatewayClassSpecParametersRef;
}
/**
 * Converts an object of type 'GatewayClassSpec' to JSON representation.
 */
export declare function toJson_GatewayClassSpec(obj: GatewayClassSpec | undefined): Record<string, any> | undefined;
/**
 * ParametersRef is a reference to a resource that contains the configuration
 * parameters corresponding to the GatewayClass. This is optional if the
 * controller does not require any additional configuration.
 *
 * ParametersRef can reference a standard Kubernetes resource, i.e. ConfigMap,
 * or an implementation-specific custom resource. The resource can be
 * cluster-scoped or namespace-scoped.
 *
 * If the referent cannot be found, refers to an unsupported kind, or when
 * the data within that resource is malformed, the GatewayClass SHOULD be
 * rejected with the "Accepted" status condition set to "False" and an
 * "InvalidParameters" reason.
 *
 * A Gateway for this GatewayClass may provide its own `parametersRef`. When both are specified,
 * the merging behavior is implementation specific.
 * It is generally recommended that GatewayClass provides defaults that can be overridden by a Gateway.
 *
 * Support: Implementation-specific
 *
 * @schema GatewayClassSpecParametersRef
 */
export interface GatewayClassSpecParametersRef {
    /**
     * Group is the group of the referent.
     *
     * @schema GatewayClassSpecParametersRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent.
     *
     * @schema GatewayClassSpecParametersRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GatewayClassSpecParametersRef#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the referent.
     * This field is required when referring to a Namespace-scoped resource and
     * MUST be unset when referring to a Cluster-scoped resource.
     *
     * @schema GatewayClassSpecParametersRef#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'GatewayClassSpecParametersRef' to JSON representation.
 */
export declare function toJson_GatewayClassSpecParametersRef(obj: GatewayClassSpecParametersRef | undefined): Record<string, any> | undefined;
/**
 * GatewayClass describes a class of Gateways available to the user for creating
Gateway resources.

It is recommended that this resource be used as a template for Gateways. This
means that a Gateway is based on the state of the GatewayClass at the time it
was created and changes to the GatewayClass or associated parameters are not
propagated down to existing Gateways. This recommendation is intended to
limit the blast radius of changes to GatewayClass or associated parameters.
If implementations choose to propagate GatewayClass changes to existing
Gateways, that MUST be clearly documented by the implementation.

Whenever one or more Gateways are using a GatewayClass, implementations SHOULD
add the `gateway-exists-finalizer.gateway.networking.k8s.io` finalizer on the
associated GatewayClass. This ensures that a GatewayClass associated with a
Gateway is not deleted while in use.

GatewayClass is a Cluster level resource.
 *
 * @schema GatewayClassV1Beta1
 */
export declare class GatewayClassV1Beta1 extends ApiObject {
    /**
     * Returns the apiVersion and kind for "GatewayClassV1Beta1"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "GatewayClassV1Beta1".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: GatewayClassV1Beta1Props): any;
    /**
     * Defines a "GatewayClassV1Beta1" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: GatewayClassV1Beta1Props);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * GatewayClass describes a class of Gateways available to the user for creating
 * Gateway resources.
 *
 * It is recommended that this resource be used as a template for Gateways. This
 * means that a Gateway is based on the state of the GatewayClass at the time it
 * was created and changes to the GatewayClass or associated parameters are not
 * propagated down to existing Gateways. This recommendation is intended to
 * limit the blast radius of changes to GatewayClass or associated parameters.
 * If implementations choose to propagate GatewayClass changes to existing
 * Gateways, that MUST be clearly documented by the implementation.
 *
 * Whenever one or more Gateways are using a GatewayClass, implementations SHOULD
 * add the `gateway-exists-finalizer.gateway.networking.k8s.io` finalizer on the
 * associated GatewayClass. This ensures that a GatewayClass associated with a
 * Gateway is not deleted while in use.
 *
 * GatewayClass is a Cluster level resource.
 *
 * @schema GatewayClassV1Beta1
 */
export interface GatewayClassV1Beta1Props {
    /**
     * @schema GatewayClassV1Beta1#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec defines the desired state of GatewayClass.
     *
     * @schema GatewayClassV1Beta1#spec
     */
    readonly spec: GatewayClassV1Beta1Spec;
}
/**
 * Converts an object of type 'GatewayClassV1Beta1Props' to JSON representation.
 */
export declare function toJson_GatewayClassV1Beta1Props(obj: GatewayClassV1Beta1Props | undefined): Record<string, any> | undefined;
/**
 * Spec defines the desired state of GatewayClass.
 *
 * @schema GatewayClassV1Beta1Spec
 */
export interface GatewayClassV1Beta1Spec {
    /**
     * ControllerName is the name of the controller that is managing Gateways of
     * this class. The value of this field MUST be a domain prefixed path.
     *
     * Example: "example.net/gateway-controller".
     *
     * This field is not mutable and cannot be empty.
     *
     * Support: Core
     *
     * @schema GatewayClassV1Beta1Spec#controllerName
     */
    readonly controllerName: string;
    /**
     * Description helps describe a GatewayClass with more details.
     *
     * @schema GatewayClassV1Beta1Spec#description
     */
    readonly description?: string;
    /**
     * ParametersRef is a reference to a resource that contains the configuration
     * parameters corresponding to the GatewayClass. This is optional if the
     * controller does not require any additional configuration.
     *
     * ParametersRef can reference a standard Kubernetes resource, i.e. ConfigMap,
     * or an implementation-specific custom resource. The resource can be
     * cluster-scoped or namespace-scoped.
     *
     * If the referent cannot be found, refers to an unsupported kind, or when
     * the data within that resource is malformed, the GatewayClass SHOULD be
     * rejected with the "Accepted" status condition set to "False" and an
     * "InvalidParameters" reason.
     *
     * A Gateway for this GatewayClass may provide its own `parametersRef`. When both are specified,
     * the merging behavior is implementation specific.
     * It is generally recommended that GatewayClass provides defaults that can be overridden by a Gateway.
     *
     * Support: Implementation-specific
     *
     * @schema GatewayClassV1Beta1Spec#parametersRef
     */
    readonly parametersRef?: GatewayClassV1Beta1SpecParametersRef;
}
/**
 * Converts an object of type 'GatewayClassV1Beta1Spec' to JSON representation.
 */
export declare function toJson_GatewayClassV1Beta1Spec(obj: GatewayClassV1Beta1Spec | undefined): Record<string, any> | undefined;
/**
 * ParametersRef is a reference to a resource that contains the configuration
 * parameters corresponding to the GatewayClass. This is optional if the
 * controller does not require any additional configuration.
 *
 * ParametersRef can reference a standard Kubernetes resource, i.e. ConfigMap,
 * or an implementation-specific custom resource. The resource can be
 * cluster-scoped or namespace-scoped.
 *
 * If the referent cannot be found, refers to an unsupported kind, or when
 * the data within that resource is malformed, the GatewayClass SHOULD be
 * rejected with the "Accepted" status condition set to "False" and an
 * "InvalidParameters" reason.
 *
 * A Gateway for this GatewayClass may provide its own `parametersRef`. When both are specified,
 * the merging behavior is implementation specific.
 * It is generally recommended that GatewayClass provides defaults that can be overridden by a Gateway.
 *
 * Support: Implementation-specific
 *
 * @schema GatewayClassV1Beta1SpecParametersRef
 */
export interface GatewayClassV1Beta1SpecParametersRef {
    /**
     * Group is the group of the referent.
     *
     * @schema GatewayClassV1Beta1SpecParametersRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent.
     *
     * @schema GatewayClassV1Beta1SpecParametersRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GatewayClassV1Beta1SpecParametersRef#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the referent.
     * This field is required when referring to a Namespace-scoped resource and
     * MUST be unset when referring to a Cluster-scoped resource.
     *
     * @schema GatewayClassV1Beta1SpecParametersRef#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'GatewayClassV1Beta1SpecParametersRef' to JSON representation.
 */
export declare function toJson_GatewayClassV1Beta1SpecParametersRef(obj: GatewayClassV1Beta1SpecParametersRef | undefined): Record<string, any> | undefined;
/**
 * GRPCRoute provides a way to route gRPC requests. This includes the capability
to match requests by hostname, gRPC service, gRPC method, or HTTP/2 header.
Filters can be used to specify additional processing steps. Backends specify
where matching requests will be routed.

GRPCRoute falls under extended support within the Gateway API. Within the
following specification, the word "MUST" indicates that an implementation
supporting GRPCRoute must conform to the indicated requirement, but an
implementation not supporting this route type need not follow the requirement
unless explicitly indicated.

Implementations supporting `GRPCRoute` with the `HTTPS` `ProtocolType` MUST
accept HTTP/2 connections without an initial upgrade from HTTP/1.1, i.e. via
ALPN. If the implementation does not support this, then it MUST set the
"Accepted" condition to "False" for the affected listener with a reason of
"UnsupportedProtocol".  Implementations MAY also accept HTTP/2 connections
with an upgrade from HTTP/1.

Implementations supporting `GRPCRoute` with the `HTTP` `ProtocolType` MUST
support HTTP/2 over cleartext TCP (h2c,
https://www.rfc-editor.org/rfc/rfc7540#section-3.1) without an initial
upgrade from HTTP/1.1, i.e. with prior knowledge
(https://www.rfc-editor.org/rfc/rfc7540#section-3.4). If the implementation
does not support this, then it MUST set the "Accepted" condition to "False"
for the affected listener with a reason of "UnsupportedProtocol".
Implementations MAY also accept HTTP/2 connections with an upgrade from
HTTP/1, i.e. without prior knowledge.
 *
 * @schema GRPCRoute
 */
export declare class GrpcRoute extends ApiObject {
    /**
     * Returns the apiVersion and kind for "GRPCRoute"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "GRPCRoute".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: GrpcRouteProps): any;
    /**
     * Defines a "GRPCRoute" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: GrpcRouteProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * GRPCRoute provides a way to route gRPC requests. This includes the capability
 * to match requests by hostname, gRPC service, gRPC method, or HTTP/2 header.
 * Filters can be used to specify additional processing steps. Backends specify
 * where matching requests will be routed.
 *
 * GRPCRoute falls under extended support within the Gateway API. Within the
 * following specification, the word "MUST" indicates that an implementation
 * supporting GRPCRoute must conform to the indicated requirement, but an
 * implementation not supporting this route type need not follow the requirement
 * unless explicitly indicated.
 *
 * Implementations supporting `GRPCRoute` with the `HTTPS` `ProtocolType` MUST
 * accept HTTP/2 connections without an initial upgrade from HTTP/1.1, i.e. via
 * ALPN. If the implementation does not support this, then it MUST set the
 * "Accepted" condition to "False" for the affected listener with a reason of
 * "UnsupportedProtocol".  Implementations MAY also accept HTTP/2 connections
 * with an upgrade from HTTP/1.
 *
 * Implementations supporting `GRPCRoute` with the `HTTP` `ProtocolType` MUST
 * support HTTP/2 over cleartext TCP (h2c,
 * https://www.rfc-editor.org/rfc/rfc7540#section-3.1) without an initial
 * upgrade from HTTP/1.1, i.e. with prior knowledge
 * (https://www.rfc-editor.org/rfc/rfc7540#section-3.4). If the implementation
 * does not support this, then it MUST set the "Accepted" condition to "False"
 * for the affected listener with a reason of "UnsupportedProtocol".
 * Implementations MAY also accept HTTP/2 connections with an upgrade from
 * HTTP/1, i.e. without prior knowledge.
 *
 * @schema GRPCRoute
 */
export interface GrpcRouteProps {
    /**
     * @schema GRPCRoute#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec defines the desired state of GRPCRoute.
     *
     * @schema GRPCRoute#spec
     */
    readonly spec?: GrpcRouteSpec;
}
/**
 * Converts an object of type 'GrpcRouteProps' to JSON representation.
 */
export declare function toJson_GrpcRouteProps(obj: GrpcRouteProps | undefined): Record<string, any> | undefined;
/**
 * Spec defines the desired state of GRPCRoute.
 *
 * @schema GrpcRouteSpec
 */
export interface GrpcRouteSpec {
    /**
     * Hostnames defines a set of hostnames to match against the GRPC
     * Host header to select a GRPCRoute to process the request. This matches
     * the RFC 1123 definition of a hostname with 2 notable exceptions:
     *
     * 1. IPs are not allowed.
     * 2. A hostname may be prefixed with a wildcard label (`*.`). The wildcard
     * label MUST appear by itself as the first label.
     *
     * If a hostname is specified by both the Listener and GRPCRoute, there
     * MUST be at least one intersecting hostname for the GRPCRoute to be
     * attached to the Listener. For example:
     *
     * * A Listener with `test.example.com` as the hostname matches GRPCRoutes
     * that have either not specified any hostnames, or have specified at
     * least one of `test.example.com` or `*.example.com`.
     * * A Listener with `*.example.com` as the hostname matches GRPCRoutes
     * that have either not specified any hostnames or have specified at least
     * one hostname that matches the Listener hostname. For example,
     * `test.example.com` and `*.example.com` would both match. On the other
     * hand, `example.com` and `test.example.net` would not match.
     *
     * Hostnames that are prefixed with a wildcard label (`*.`) are interpreted
     * as a suffix match. That means that a match for `*.example.com` would match
     * both `test.example.com`, and `foo.test.example.com`, but not `example.com`.
     *
     * If both the Listener and GRPCRoute have specified hostnames, any
     * GRPCRoute hostnames that do not match the Listener hostname MUST be
     * ignored. For example, if a Listener specified `*.example.com`, and the
     * GRPCRoute specified `test.example.com` and `test.example.net`,
     * `test.example.net` MUST NOT be considered for a match.
     *
     * If both the Listener and GRPCRoute have specified hostnames, and none
     * match with the criteria above, then the GRPCRoute MUST NOT be accepted by
     * the implementation. The implementation MUST raise an 'Accepted' Condition
     * with a status of `False` in the corresponding RouteParentStatus.
     *
     * If a Route (A) of type HTTPRoute or GRPCRoute is attached to a
     * Listener and that listener already has another Route (B) of the other
     * type attached and the intersection of the hostnames of A and B is
     * non-empty, then the implementation MUST accept exactly one of these two
     * routes, determined by the following criteria, in order:
     *
     * * The oldest Route based on creation timestamp.
     * * The Route appearing first in alphabetical order by
     * "{namespace}/{name}".
     *
     * The rejected Route MUST raise an 'Accepted' condition with a status of
     * 'False' in the corresponding RouteParentStatus.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpec#hostnames
     */
    readonly hostnames?: string[];
    /**
     * ParentRefs references the resources (usually Gateways) that a Route wants
     * to be attached to. Note that the referenced parent resource needs to
     * allow this for the attachment to be complete. For Gateways, that means
     * the Gateway needs to allow attachment from Routes of this kind and
     * namespace. For Services, that means the Service must either be in the same
     * namespace for a "producer" route, or the mesh implementation must support
     * and allow "consumer" routes for the referenced Service. ReferenceGrant is
     * not applicable for governing ParentRefs to Services - it is not possible to
     * create a "producer" route for a Service in a different namespace from the
     * Route.
     *
     * There are two kinds of parent resources with "Core" support:
     *
     * * Gateway (Gateway conformance profile)
     * * Service (Mesh conformance profile, ClusterIP Services only)
     *
     * This API may be extended in the future to support additional kinds of parent
     * resources.
     *
     * ParentRefs must be _distinct_. This means either that:
     *
     * * They select different objects.  If this is the case, then parentRef
     * entries are distinct. In terms of fields, this means that the
     * multi-part key defined by `group`, `kind`, `namespace`, and `name` must
     * be unique across all parentRef entries in the Route.
     * * They do not select different objects, but for each optional field used,
     * each ParentRef that selects the same object must set the same set of
     * optional fields to different values. If one ParentRef sets a
     * combination of optional fields, all must set the same combination.
     *
     * Some examples:
     *
     * * If one ParentRef sets `sectionName`, all ParentRefs referencing the
     * same object must also set `sectionName`.
     * * If one ParentRef sets `port`, all ParentRefs referencing the same
     * object must also set `port`.
     * * If one ParentRef sets `sectionName` and `port`, all ParentRefs
     * referencing the same object must also set `sectionName` and `port`.
     *
     * It is possible to separately reference multiple distinct objects that may
     * be collapsed by an implementation. For example, some implementations may
     * choose to merge compatible Gateway Listeners together. If that is the
     * case, the list of routes attached to those resources should also be
     * merged.
     *
     * Note that for ParentRefs that cross namespace boundaries, there are specific
     * rules. Cross-namespace references are only valid if they are explicitly
     * allowed by something in the namespace they are referring to. For example,
     * Gateway has the AllowedRoutes field, and ReferenceGrant provides a
     * generic way to enable other kinds of cross-namespace reference.
     *
     * @schema GrpcRouteSpec#parentRefs
     */
    readonly parentRefs?: GrpcRouteSpecParentRefs[];
    /**
     * Rules are a list of GRPC matchers, filters and actions.
     *
     * @schema GrpcRouteSpec#rules
     */
    readonly rules?: GrpcRouteSpecRules[];
}
/**
 * Converts an object of type 'GrpcRouteSpec' to JSON representation.
 */
export declare function toJson_GrpcRouteSpec(obj: GrpcRouteSpec | undefined): Record<string, any> | undefined;
/**
 * ParentReference identifies an API object (usually a Gateway) that can be considered
 * a parent of this resource (usually a route). There are two kinds of parent resources
 * with "Core" support:
 *
 * * Gateway (Gateway conformance profile)
 * * Service (Mesh conformance profile, ClusterIP Services only)
 *
 * This API may be extended in the future to support additional kinds of parent
 * resources.
 *
 * The API object must be valid in the cluster; the Group and Kind must
 * be registered in the cluster for this reference to be valid.
 *
 * @schema GrpcRouteSpecParentRefs
 */
export interface GrpcRouteSpecParentRefs {
    /**
     * Group is the group of the referent.
     * When unspecified, "gateway.networking.k8s.io" is inferred.
     * To set the core API group (such as for a "Service" kind referent),
     * Group must be explicitly set to "" (empty string).
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecParentRefs#group
     */
    readonly group?: string;
    /**
     * Kind is kind of the referent.
     *
     * There are two kinds of parent resources with "Core" support:
     *
     * * Gateway (Gateway conformance profile)
     * * Service (Mesh conformance profile, ClusterIP Services only)
     *
     * Support for other resources is Implementation-Specific.
     *
     * @schema GrpcRouteSpecParentRefs#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecParentRefs#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the referent. When unspecified, this refers
     * to the local namespace of the Route.
     *
     * Note that there are specific rules for ParentRefs which cross namespace
     * boundaries. Cross-namespace references are only valid if they are explicitly
     * allowed by something in the namespace they are referring to. For example:
     * Gateway has the AllowedRoutes field, and ReferenceGrant provides a
     * generic way to enable any other kind of cross-namespace reference.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecParentRefs#namespace
     */
    readonly namespace?: string;
    /**
     * Port is the network port this Route targets. It can be interpreted
     * differently based on the type of parent resource.
     *
     * When the parent resource is a Gateway, this targets all listeners
     * listening on the specified port that also support this kind of Route(and
     * select this Route). It's not recommended to set `Port` unless the
     * networking behaviors specified in a Route must apply to a specific port
     * as opposed to a listener(s) whose port(s) may be changed. When both Port
     * and SectionName are specified, the name and port of the selected listener
     * must match both specified values.
     *
     * Implementations MAY choose to support other parent resources.
     * Implementations supporting other types of parent resources MUST clearly
     * document how/if Port is interpreted.
     *
     * For the purpose of status, an attachment is considered successful as
     * long as the parent resource accepts it partially. For example, Gateway
     * listeners can restrict which Routes can attach to them by Route kind,
     * namespace, or hostname. If 1 of 2 Gateway listeners accept attachment
     * from the referencing Route, the Route MUST be considered successfully
     * attached. If no Gateway listeners accept attachment from this Route,
     * the Route MUST be considered detached from the Gateway.
     *
     * Support: Extended
     *
     * @schema GrpcRouteSpecParentRefs#port
     */
    readonly port?: number;
    /**
     * SectionName is the name of a section within the target resource. In the
     * following resources, SectionName is interpreted as the following:
     *
     * * Gateway: Listener name. When both Port (experimental) and SectionName
     * are specified, the name and port of the selected listener must match
     * both specified values.
     * * Service: Port name. When both Port (experimental) and SectionName
     * are specified, the name and port of the selected listener must match
     * both specified values.
     *
     * Implementations MAY choose to support attaching Routes to other resources.
     * If that is the case, they MUST clearly document how SectionName is
     * interpreted.
     *
     * When unspecified (empty string), this will reference the entire resource.
     * For the purpose of status, an attachment is considered successful if at
     * least one section in the parent resource accepts it. For example, Gateway
     * listeners can restrict which Routes can attach to them by Route kind,
     * namespace, or hostname. If 1 of 2 Gateway listeners accept attachment from
     * the referencing Route, the Route MUST be considered successfully
     * attached. If no Gateway listeners accept attachment from this Route, the
     * Route MUST be considered detached from the Gateway.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecParentRefs#sectionName
     */
    readonly sectionName?: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecParentRefs' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecParentRefs(obj: GrpcRouteSpecParentRefs | undefined): Record<string, any> | undefined;
/**
 * GRPCRouteRule defines the semantics for matching a gRPC request based on
 * conditions (matches), processing it (filters), and forwarding the request to
 * an API object (backendRefs).
 *
 * @schema GrpcRouteSpecRules
 */
export interface GrpcRouteSpecRules {
    /**
     * BackendRefs defines the backend(s) where matching requests should be
     * sent.
     *
     * Failure behavior here depends on how many BackendRefs are specified and
     * how many are invalid.
     *
     * If *all* entries in BackendRefs are invalid, and there are also no filters
     * specified in this route rule, *all* traffic which matches this rule MUST
     * receive an `UNAVAILABLE` status.
     *
     * See the GRPCBackendRef definition for the rules about what makes a single
     * GRPCBackendRef invalid.
     *
     * When a GRPCBackendRef is invalid, `UNAVAILABLE` statuses MUST be returned for
     * requests that would have otherwise been routed to an invalid backend. If
     * multiple backends are specified, and some are invalid, the proportion of
     * requests that would otherwise have been routed to an invalid backend
     * MUST receive an `UNAVAILABLE` status.
     *
     * For example, if two backends are specified with equal weights, and one is
     * invalid, 50 percent of traffic MUST receive an `UNAVAILABLE` status.
     * Implementations may choose how that 50 percent is determined.
     *
     * Support: Core for Kubernetes Service
     *
     * Support: Implementation-specific for any other resource
     *
     * Support for weight: Core
     *
     * @schema GrpcRouteSpecRules#backendRefs
     */
    readonly backendRefs?: GrpcRouteSpecRulesBackendRefs[];
    /**
     * Filters define the filters that are applied to requests that match
     * this rule.
     *
     * The effects of ordering of multiple behaviors are currently unspecified.
     * This can change in the future based on feedback during the alpha stage.
     *
     * Conformance-levels at this level are defined based on the type of filter:
     *
     * - ALL core filters MUST be supported by all implementations that support
     * GRPCRoute.
     * - Implementers are encouraged to support extended filters.
     * - Implementation-specific custom filters have no API guarantees across
     * implementations.
     *
     * Specifying the same filter multiple times is not supported unless explicitly
     * indicated in the filter.
     *
     * If an implementation cannot support a combination of filters, it must clearly
     * document that limitation. In cases where incompatible or unsupported
     * filters are specified and cause the `Accepted` condition to be set to status
     * `False`, implementations may use the `IncompatibleFilters` reason to specify
     * this configuration error.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecRules#filters
     */
    readonly filters?: GrpcRouteSpecRulesFilters[];
    /**
     * Matches define conditions used for matching the rule against incoming
     * gRPC requests. Each match is independent, i.e. this rule will be matched
     * if **any** one of the matches is satisfied.
     *
     * For example, take the following matches configuration:
     *
     * ```
     * matches:
     * - method:
     * service: foo.bar
     * headers:
     * values:
     * version: 2
     * - method:
     * service: foo.bar.v2
     * ```
     *
     * For a request to match against this rule, it MUST satisfy
     * EITHER of the two conditions:
     *
     * - service of foo.bar AND contains the header `version: 2`
     * - service of foo.bar.v2
     *
     * See the documentation for GRPCRouteMatch on how to specify multiple
     * match conditions to be ANDed together.
     *
     * If no matches are specified, the implementation MUST match every gRPC request.
     *
     * Proxy or Load Balancer routing configuration generated from GRPCRoutes
     * MUST prioritize rules based on the following criteria, continuing on
     * ties. Merging MUST not be done between GRPCRoutes and HTTPRoutes.
     * Precedence MUST be given to the rule with the largest number of:
     *
     * * Characters in a matching non-wildcard hostname.
     * * Characters in a matching hostname.
     * * Characters in a matching service.
     * * Characters in a matching method.
     * * Header matches.
     *
     * If ties still exist across multiple Routes, matching precedence MUST be
     * determined in order of the following criteria, continuing on ties:
     *
     * * The oldest Route based on creation timestamp.
     * * The Route appearing first in alphabetical order by
     * "{namespace}/{name}".
     *
     * If ties still exist within the Route that has been given precedence,
     * matching precedence MUST be granted to the first matching rule meeting
     * the above criteria.
     *
     * @schema GrpcRouteSpecRules#matches
     */
    readonly matches?: GrpcRouteSpecRulesMatches[];
}
/**
 * Converts an object of type 'GrpcRouteSpecRules' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRules(obj: GrpcRouteSpecRules | undefined): Record<string, any> | undefined;
/**
 * GRPCBackendRef defines how a GRPCRoute forwards a gRPC request.
 *
 * Note that when a namespace different than the local namespace is specified, a
 * ReferenceGrant object is required in the referent namespace to allow that
 * namespace's owner to accept the reference. See the ReferenceGrant
 * documentation for details.
 *
 * @schema GrpcRouteSpecRulesBackendRefs
 */
export interface GrpcRouteSpecRulesBackendRefs {
    /**
     * Filters defined at this level MUST be executed if and only if the
     * request is being forwarded to the backend defined here.
     *
     * Support: Implementation-specific (For broader support of filters, use the
     * Filters field in GRPCRouteRule.)
     *
     * @schema GrpcRouteSpecRulesBackendRefs#filters
     */
    readonly filters?: GrpcRouteSpecRulesBackendRefsFilters[];
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema GrpcRouteSpecRulesBackendRefs#group
     */
    readonly group?: string;
    /**
     * Kind is the Kubernetes resource kind of the referent. For example
     * "Service".
     *
     * Defaults to "Service" when not specified.
     *
     * ExternalName services can refer to CNAME DNS records that may live
     * outside of the cluster and as such are difficult to reason about in
     * terms of conformance. They also may not be safe to forward to (see
     * CVE-2021-25740 for more information). Implementations SHOULD NOT
     * support ExternalName Services.
     *
     * Support: Core (Services with a type other than ExternalName)
     *
     * Support: Implementation-specific (Services with type ExternalName)
     *
     * @default Service" when not specified.
     * @schema GrpcRouteSpecRulesBackendRefs#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GrpcRouteSpecRulesBackendRefs#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the backend. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecRulesBackendRefs#namespace
     */
    readonly namespace?: string;
    /**
     * Port specifies the destination port number to use for this resource.
     * Port is required when the referent is a Kubernetes Service. In this
     * case, the port number is the service port number, not the target port.
     * For other resources, destination port might be derived from the referent
     * resource or this field.
     *
     * @schema GrpcRouteSpecRulesBackendRefs#port
     */
    readonly port?: number;
    /**
     * Weight specifies the proportion of requests forwarded to the referenced
     * backend. This is computed as weight/(sum of all weights in this
     * BackendRefs list). For non-zero values, there may be some epsilon from
     * the exact proportion defined here depending on the precision an
     * implementation supports. Weight is not a percentage and the sum of
     * weights does not need to equal 100.
     *
     * If only one backend is specified and it has a weight greater than 0, 100%
     * of the traffic is forwarded to that backend. If weight is set to 0, no
     * traffic should be forwarded for this entry. If unspecified, weight
     * defaults to 1.
     *
     * Support for this field varies based on the context where used.
     *
     * @schema GrpcRouteSpecRulesBackendRefs#weight
     */
    readonly weight?: number;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefs' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefs(obj: GrpcRouteSpecRulesBackendRefs | undefined): Record<string, any> | undefined;
/**
 * GRPCRouteFilter defines processing steps that must be completed during the
 * request or response lifecycle. GRPCRouteFilters are meant as an extension
 * point to express processing that may be done in Gateway implementations. Some
 * examples include request or response modification, implementing
 * authentication strategies, rate-limiting, and traffic shaping. API
 * guarantee/conformance is defined based on the type of the filter.
 *
 * @schema GrpcRouteSpecRulesFilters
 */
export interface GrpcRouteSpecRulesFilters {
    /**
     * ExtensionRef is an optional, implementation-specific extension to the
     * "filter" behavior.  For example, resource "myroutefilter" in group
     * "networking.example.net"). ExtensionRef MUST NOT be used for core and
     * extended filters.
     *
     * Support: Implementation-specific
     *
     * This filter can be used multiple times within the same rule.
     *
     * @schema GrpcRouteSpecRulesFilters#extensionRef
     */
    readonly extensionRef?: GrpcRouteSpecRulesFiltersExtensionRef;
    /**
     * RequestHeaderModifier defines a schema for a filter that modifies request
     * headers.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecRulesFilters#requestHeaderModifier
     */
    readonly requestHeaderModifier?: GrpcRouteSpecRulesFiltersRequestHeaderModifier;
    /**
     * RequestMirror defines a schema for a filter that mirrors requests.
     * Requests are sent to the specified destination, but responses from
     * that destination are ignored.
     *
     * This filter can be used multiple times within the same rule. Note that
     * not all implementations will be able to support mirroring to multiple
     * backends.
     *
     * Support: Extended
     *
     * @schema GrpcRouteSpecRulesFilters#requestMirror
     */
    readonly requestMirror?: GrpcRouteSpecRulesFiltersRequestMirror;
    /**
     * ResponseHeaderModifier defines a schema for a filter that modifies response
     * headers.
     *
     * Support: Extended
     *
     * @schema GrpcRouteSpecRulesFilters#responseHeaderModifier
     */
    readonly responseHeaderModifier?: GrpcRouteSpecRulesFiltersResponseHeaderModifier;
    /**
     * Type identifies the type of filter to apply. As with other API fields,
     * types are classified into three conformance levels:
     *
     * - Core: Filter types and their corresponding configuration defined by
     * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
     * implementations supporting GRPCRoute MUST support core filters.
     *
     * - Extended: Filter types and their corresponding configuration defined by
     * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
     * are encouraged to support extended filters.
     *
     * - Implementation-specific: Filters that are defined and supported by specific vendors.
     * In the future, filters showing convergence in behavior across multiple
     * implementations will be considered for inclusion in extended or core
     * conformance levels. Filter-specific configuration for such filters
     * is specified using the ExtensionRef field. `Type` MUST be set to
     * "ExtensionRef" for custom filters.
     *
     * Implementers are encouraged to define custom implementation types to
     * extend the core API with implementation-specific behavior.
     *
     * If a reference to a custom filter type cannot be resolved, the filter
     * MUST NOT be skipped. Instead, requests that would have been processed by
     * that filter MUST receive a HTTP error response.
     *
     * @schema GrpcRouteSpecRulesFilters#type
     */
    readonly type: GrpcRouteSpecRulesFiltersType;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFilters' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFilters(obj: GrpcRouteSpecRulesFilters | undefined): Record<string, any> | undefined;
/**
 * GRPCRouteMatch defines the predicate used to match requests to a given
 * action. Multiple match types are ANDed together, i.e. the match will
 * evaluate to true only if all conditions are satisfied.
 *
 * For example, the match below will match a gRPC request only if its service
 * is `foo` AND it contains the `version: v1` header:
 *
 * ```
 * matches:
 * - method:
 * type: Exact
 * service: "foo"
 * headers:
 * - name: "version"
 * value "v1"
 *
 * ```
 *
 * @schema GrpcRouteSpecRulesMatches
 */
export interface GrpcRouteSpecRulesMatches {
    /**
     * Headers specifies gRPC request header matchers. Multiple match values are
     * ANDed together, meaning, a request MUST match all the specified headers
     * to select the route.
     *
     * @schema GrpcRouteSpecRulesMatches#headers
     */
    readonly headers?: GrpcRouteSpecRulesMatchesHeaders[];
    /**
     * Method specifies a gRPC request service/method matcher. If this field is
     * not specified, all services and methods will match.
     *
     * @schema GrpcRouteSpecRulesMatches#method
     */
    readonly method?: GrpcRouteSpecRulesMatchesMethod;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesMatches' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesMatches(obj: GrpcRouteSpecRulesMatches | undefined): Record<string, any> | undefined;
/**
 * GRPCRouteFilter defines processing steps that must be completed during the
 * request or response lifecycle. GRPCRouteFilters are meant as an extension
 * point to express processing that may be done in Gateway implementations. Some
 * examples include request or response modification, implementing
 * authentication strategies, rate-limiting, and traffic shaping. API
 * guarantee/conformance is defined based on the type of the filter.
 *
 * @schema GrpcRouteSpecRulesBackendRefsFilters
 */
export interface GrpcRouteSpecRulesBackendRefsFilters {
    /**
     * ExtensionRef is an optional, implementation-specific extension to the
     * "filter" behavior.  For example, resource "myroutefilter" in group
     * "networking.example.net"). ExtensionRef MUST NOT be used for core and
     * extended filters.
     *
     * Support: Implementation-specific
     *
     * This filter can be used multiple times within the same rule.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFilters#extensionRef
     */
    readonly extensionRef?: GrpcRouteSpecRulesBackendRefsFiltersExtensionRef;
    /**
     * RequestHeaderModifier defines a schema for a filter that modifies request
     * headers.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecRulesBackendRefsFilters#requestHeaderModifier
     */
    readonly requestHeaderModifier?: GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifier;
    /**
     * RequestMirror defines a schema for a filter that mirrors requests.
     * Requests are sent to the specified destination, but responses from
     * that destination are ignored.
     *
     * This filter can be used multiple times within the same rule. Note that
     * not all implementations will be able to support mirroring to multiple
     * backends.
     *
     * Support: Extended
     *
     * @schema GrpcRouteSpecRulesBackendRefsFilters#requestMirror
     */
    readonly requestMirror?: GrpcRouteSpecRulesBackendRefsFiltersRequestMirror;
    /**
     * ResponseHeaderModifier defines a schema for a filter that modifies response
     * headers.
     *
     * Support: Extended
     *
     * @schema GrpcRouteSpecRulesBackendRefsFilters#responseHeaderModifier
     */
    readonly responseHeaderModifier?: GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifier;
    /**
     * Type identifies the type of filter to apply. As with other API fields,
     * types are classified into three conformance levels:
     *
     * - Core: Filter types and their corresponding configuration defined by
     * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
     * implementations supporting GRPCRoute MUST support core filters.
     *
     * - Extended: Filter types and their corresponding configuration defined by
     * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
     * are encouraged to support extended filters.
     *
     * - Implementation-specific: Filters that are defined and supported by specific vendors.
     * In the future, filters showing convergence in behavior across multiple
     * implementations will be considered for inclusion in extended or core
     * conformance levels. Filter-specific configuration for such filters
     * is specified using the ExtensionRef field. `Type` MUST be set to
     * "ExtensionRef" for custom filters.
     *
     * Implementers are encouraged to define custom implementation types to
     * extend the core API with implementation-specific behavior.
     *
     * If a reference to a custom filter type cannot be resolved, the filter
     * MUST NOT be skipped. Instead, requests that would have been processed by
     * that filter MUST receive a HTTP error response.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFilters#type
     */
    readonly type: GrpcRouteSpecRulesBackendRefsFiltersType;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFilters' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFilters(obj: GrpcRouteSpecRulesBackendRefsFilters | undefined): Record<string, any> | undefined;
/**
 * ExtensionRef is an optional, implementation-specific extension to the
 * "filter" behavior.  For example, resource "myroutefilter" in group
 * "networking.example.net"). ExtensionRef MUST NOT be used for core and
 * extended filters.
 *
 * Support: Implementation-specific
 *
 * This filter can be used multiple times within the same rule.
 *
 * @schema GrpcRouteSpecRulesFiltersExtensionRef
 */
export interface GrpcRouteSpecRulesFiltersExtensionRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema GrpcRouteSpecRulesFiltersExtensionRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent. For example "HTTPRoute" or "Service".
     *
     * @schema GrpcRouteSpecRulesFiltersExtensionRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GrpcRouteSpecRulesFiltersExtensionRef#name
     */
    readonly name: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersExtensionRef' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersExtensionRef(obj: GrpcRouteSpecRulesFiltersExtensionRef | undefined): Record<string, any> | undefined;
/**
 * RequestHeaderModifier defines a schema for a filter that modifies request
 * headers.
 *
 * Support: Core
 *
 * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifier
 */
export interface GrpcRouteSpecRulesFiltersRequestHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifier#add
     */
    readonly add?: GrpcRouteSpecRulesFiltersRequestHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifier#set
     */
    readonly set?: GrpcRouteSpecRulesFiltersRequestHeaderModifierSet[];
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersRequestHeaderModifier' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersRequestHeaderModifier(obj: GrpcRouteSpecRulesFiltersRequestHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * RequestMirror defines a schema for a filter that mirrors requests.
 * Requests are sent to the specified destination, but responses from
 * that destination are ignored.
 *
 * This filter can be used multiple times within the same rule. Note that
 * not all implementations will be able to support mirroring to multiple
 * backends.
 *
 * Support: Extended
 *
 * @schema GrpcRouteSpecRulesFiltersRequestMirror
 */
export interface GrpcRouteSpecRulesFiltersRequestMirror {
    /**
     * BackendRef references a resource where mirrored requests are sent.
     *
     * Mirrored requests must be sent only to a single destination endpoint
     * within this BackendRef, irrespective of how many endpoints are present
     * within this BackendRef.
     *
     * If the referent cannot be found, this BackendRef is invalid and must be
     * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
     * condition on the Route status is set to `status: False` and not configure
     * this backend in the underlying implementation.
     *
     * If there is a cross-namespace reference to an *existing* object
     * that is not allowed by a ReferenceGrant, the controller must ensure the
     * "ResolvedRefs"  condition on the Route is set to `status: False`,
     * with the "RefNotPermitted" reason and not configure this backend in the
     * underlying implementation.
     *
     * In either error case, the Message of the `ResolvedRefs` Condition
     * should be used to provide more detail about the problem.
     *
     * Support: Extended for Kubernetes Service
     *
     * Support: Implementation-specific for any other resource
     *
     * @schema GrpcRouteSpecRulesFiltersRequestMirror#backendRef
     */
    readonly backendRef: GrpcRouteSpecRulesFiltersRequestMirrorBackendRef;
    /**
     * Fraction represents the fraction of requests that should be
     * mirrored to BackendRef.
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema GrpcRouteSpecRulesFiltersRequestMirror#fraction
     */
    readonly fraction?: GrpcRouteSpecRulesFiltersRequestMirrorFraction;
    /**
     * Percent represents the percentage of requests that should be
     * mirrored to BackendRef. Its minimum value is 0 (indicating 0% of
     * requests) and its maximum value is 100 (indicating 100% of requests).
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema GrpcRouteSpecRulesFiltersRequestMirror#percent
     */
    readonly percent?: number;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersRequestMirror' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersRequestMirror(obj: GrpcRouteSpecRulesFiltersRequestMirror | undefined): Record<string, any> | undefined;
/**
 * ResponseHeaderModifier defines a schema for a filter that modifies response
 * headers.
 *
 * Support: Extended
 *
 * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifier
 */
export interface GrpcRouteSpecRulesFiltersResponseHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifier#add
     */
    readonly add?: GrpcRouteSpecRulesFiltersResponseHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifier#set
     */
    readonly set?: GrpcRouteSpecRulesFiltersResponseHeaderModifierSet[];
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersResponseHeaderModifier' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersResponseHeaderModifier(obj: GrpcRouteSpecRulesFiltersResponseHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * Type identifies the type of filter to apply. As with other API fields,
 * types are classified into three conformance levels:
 *
 * - Core: Filter types and their corresponding configuration defined by
 * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
 * implementations supporting GRPCRoute MUST support core filters.
 *
 * - Extended: Filter types and their corresponding configuration defined by
 * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
 * are encouraged to support extended filters.
 *
 * - Implementation-specific: Filters that are defined and supported by specific vendors.
 * In the future, filters showing convergence in behavior across multiple
 * implementations will be considered for inclusion in extended or core
 * conformance levels. Filter-specific configuration for such filters
 * is specified using the ExtensionRef field. `Type` MUST be set to
 * "ExtensionRef" for custom filters.
 *
 * Implementers are encouraged to define custom implementation types to
 * extend the core API with implementation-specific behavior.
 *
 * If a reference to a custom filter type cannot be resolved, the filter
 * MUST NOT be skipped. Instead, requests that would have been processed by
 * that filter MUST receive a HTTP error response.
 *
 * @schema GrpcRouteSpecRulesFiltersType
 */
export declare enum GrpcRouteSpecRulesFiltersType {
    /** ResponseHeaderModifier */
    RESPONSE_HEADER_MODIFIER = "ResponseHeaderModifier",
    /** RequestHeaderModifier */
    REQUEST_HEADER_MODIFIER = "RequestHeaderModifier",
    /** RequestMirror */
    REQUEST_MIRROR = "RequestMirror",
    /** ExtensionRef */
    EXTENSION_REF = "ExtensionRef"
}
/**
 * GRPCHeaderMatch describes how to select a gRPC route by matching gRPC request
 * headers.
 *
 * @schema GrpcRouteSpecRulesMatchesHeaders
 */
export interface GrpcRouteSpecRulesMatchesHeaders {
    /**
     * Name is the name of the gRPC Header to be matched.
     *
     * If multiple entries specify equivalent header names, only the first
     * entry with an equivalent name MUST be considered for a match. Subsequent
     * entries with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema GrpcRouteSpecRulesMatchesHeaders#name
     */
    readonly name: string;
    /**
     * Type specifies how to match against the value of the header.
     *
     * @schema GrpcRouteSpecRulesMatchesHeaders#type
     */
    readonly type?: GrpcRouteSpecRulesMatchesHeadersType;
    /**
     * Value is the value of the gRPC Header to be matched.
     *
     * @schema GrpcRouteSpecRulesMatchesHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesMatchesHeaders' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesMatchesHeaders(obj: GrpcRouteSpecRulesMatchesHeaders | undefined): Record<string, any> | undefined;
/**
 * Method specifies a gRPC request service/method matcher. If this field is
 * not specified, all services and methods will match.
 *
 * @schema GrpcRouteSpecRulesMatchesMethod
 */
export interface GrpcRouteSpecRulesMatchesMethod {
    /**
     * Value of the method to match against. If left empty or omitted, will
     * match all services.
     *
     * At least one of Service and Method MUST be a non-empty string.
     *
     * @schema GrpcRouteSpecRulesMatchesMethod#method
     */
    readonly method?: string;
    /**
     * Value of the service to match against. If left empty or omitted, will
     * match any service.
     *
     * At least one of Service and Method MUST be a non-empty string.
     *
     * @schema GrpcRouteSpecRulesMatchesMethod#service
     */
    readonly service?: string;
    /**
     * Type specifies how to match against the service and/or method.
     * Support: Core (Exact with service and method specified)
     *
     * Support: Implementation-specific (Exact with method specified but no service specified)
     *
     * Support: Implementation-specific (RegularExpression)
     *
     * @schema GrpcRouteSpecRulesMatchesMethod#type
     */
    readonly type?: GrpcRouteSpecRulesMatchesMethodType;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesMatchesMethod' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesMatchesMethod(obj: GrpcRouteSpecRulesMatchesMethod | undefined): Record<string, any> | undefined;
/**
 * ExtensionRef is an optional, implementation-specific extension to the
 * "filter" behavior.  For example, resource "myroutefilter" in group
 * "networking.example.net"). ExtensionRef MUST NOT be used for core and
 * extended filters.
 *
 * Support: Implementation-specific
 *
 * This filter can be used multiple times within the same rule.
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersExtensionRef
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersExtensionRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersExtensionRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent. For example "HTTPRoute" or "Service".
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersExtensionRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersExtensionRef#name
     */
    readonly name: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersExtensionRef' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersExtensionRef(obj: GrpcRouteSpecRulesBackendRefsFiltersExtensionRef | undefined): Record<string, any> | undefined;
/**
 * RequestHeaderModifier defines a schema for a filter that modifies request
 * headers.
 *
 * Support: Core
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifier
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifier#add
     */
    readonly add?: GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifier#set
     */
    readonly set?: GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet[];
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifier' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifier(obj: GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * RequestMirror defines a schema for a filter that mirrors requests.
 * Requests are sent to the specified destination, but responses from
 * that destination are ignored.
 *
 * This filter can be used multiple times within the same rule. Note that
 * not all implementations will be able to support mirroring to multiple
 * backends.
 *
 * Support: Extended
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirror
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersRequestMirror {
    /**
     * BackendRef references a resource where mirrored requests are sent.
     *
     * Mirrored requests must be sent only to a single destination endpoint
     * within this BackendRef, irrespective of how many endpoints are present
     * within this BackendRef.
     *
     * If the referent cannot be found, this BackendRef is invalid and must be
     * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
     * condition on the Route status is set to `status: False` and not configure
     * this backend in the underlying implementation.
     *
     * If there is a cross-namespace reference to an *existing* object
     * that is not allowed by a ReferenceGrant, the controller must ensure the
     * "ResolvedRefs"  condition on the Route is set to `status: False`,
     * with the "RefNotPermitted" reason and not configure this backend in the
     * underlying implementation.
     *
     * In either error case, the Message of the `ResolvedRefs` Condition
     * should be used to provide more detail about the problem.
     *
     * Support: Extended for Kubernetes Service
     *
     * Support: Implementation-specific for any other resource
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirror#backendRef
     */
    readonly backendRef: GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef;
    /**
     * Fraction represents the fraction of requests that should be
     * mirrored to BackendRef.
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirror#fraction
     */
    readonly fraction?: GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorFraction;
    /**
     * Percent represents the percentage of requests that should be
     * mirrored to BackendRef. Its minimum value is 0 (indicating 0% of
     * requests) and its maximum value is 100 (indicating 100% of requests).
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirror#percent
     */
    readonly percent?: number;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersRequestMirror' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersRequestMirror(obj: GrpcRouteSpecRulesBackendRefsFiltersRequestMirror | undefined): Record<string, any> | undefined;
/**
 * ResponseHeaderModifier defines a schema for a filter that modifies response
 * headers.
 *
 * Support: Extended
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifier
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifier#add
     */
    readonly add?: GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifier#set
     */
    readonly set?: GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet[];
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifier' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifier(obj: GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * Type identifies the type of filter to apply. As with other API fields,
 * types are classified into three conformance levels:
 *
 * - Core: Filter types and their corresponding configuration defined by
 * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
 * implementations supporting GRPCRoute MUST support core filters.
 *
 * - Extended: Filter types and their corresponding configuration defined by
 * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
 * are encouraged to support extended filters.
 *
 * - Implementation-specific: Filters that are defined and supported by specific vendors.
 * In the future, filters showing convergence in behavior across multiple
 * implementations will be considered for inclusion in extended or core
 * conformance levels. Filter-specific configuration for such filters
 * is specified using the ExtensionRef field. `Type` MUST be set to
 * "ExtensionRef" for custom filters.
 *
 * Implementers are encouraged to define custom implementation types to
 * extend the core API with implementation-specific behavior.
 *
 * If a reference to a custom filter type cannot be resolved, the filter
 * MUST NOT be skipped. Instead, requests that would have been processed by
 * that filter MUST receive a HTTP error response.
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersType
 */
export declare enum GrpcRouteSpecRulesBackendRefsFiltersType {
    /** ResponseHeaderModifier */
    RESPONSE_HEADER_MODIFIER = "ResponseHeaderModifier",
    /** RequestHeaderModifier */
    REQUEST_HEADER_MODIFIER = "RequestHeaderModifier",
    /** RequestMirror */
    REQUEST_MIRROR = "RequestMirror",
    /** ExtensionRef */
    EXTENSION_REF = "ExtensionRef"
}
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifierAdd
 */
export interface GrpcRouteSpecRulesFiltersRequestHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersRequestHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersRequestHeaderModifierAdd(obj: GrpcRouteSpecRulesFiltersRequestHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifierSet
 */
export interface GrpcRouteSpecRulesFiltersRequestHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema GrpcRouteSpecRulesFiltersRequestHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersRequestHeaderModifierSet' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersRequestHeaderModifierSet(obj: GrpcRouteSpecRulesFiltersRequestHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * BackendRef references a resource where mirrored requests are sent.
 *
 * Mirrored requests must be sent only to a single destination endpoint
 * within this BackendRef, irrespective of how many endpoints are present
 * within this BackendRef.
 *
 * If the referent cannot be found, this BackendRef is invalid and must be
 * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
 * condition on the Route status is set to `status: False` and not configure
 * this backend in the underlying implementation.
 *
 * If there is a cross-namespace reference to an *existing* object
 * that is not allowed by a ReferenceGrant, the controller must ensure the
 * "ResolvedRefs"  condition on the Route is set to `status: False`,
 * with the "RefNotPermitted" reason and not configure this backend in the
 * underlying implementation.
 *
 * In either error case, the Message of the `ResolvedRefs` Condition
 * should be used to provide more detail about the problem.
 *
 * Support: Extended for Kubernetes Service
 *
 * Support: Implementation-specific for any other resource
 *
 * @schema GrpcRouteSpecRulesFiltersRequestMirrorBackendRef
 */
export interface GrpcRouteSpecRulesFiltersRequestMirrorBackendRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema GrpcRouteSpecRulesFiltersRequestMirrorBackendRef#group
     */
    readonly group?: string;
    /**
     * Kind is the Kubernetes resource kind of the referent. For example
     * "Service".
     *
     * Defaults to "Service" when not specified.
     *
     * ExternalName services can refer to CNAME DNS records that may live
     * outside of the cluster and as such are difficult to reason about in
     * terms of conformance. They also may not be safe to forward to (see
     * CVE-2021-25740 for more information). Implementations SHOULD NOT
     * support ExternalName Services.
     *
     * Support: Core (Services with a type other than ExternalName)
     *
     * Support: Implementation-specific (Services with type ExternalName)
     *
     * @default Service" when not specified.
     * @schema GrpcRouteSpecRulesFiltersRequestMirrorBackendRef#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GrpcRouteSpecRulesFiltersRequestMirrorBackendRef#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the backend. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecRulesFiltersRequestMirrorBackendRef#namespace
     */
    readonly namespace?: string;
    /**
     * Port specifies the destination port number to use for this resource.
     * Port is required when the referent is a Kubernetes Service. In this
     * case, the port number is the service port number, not the target port.
     * For other resources, destination port might be derived from the referent
     * resource or this field.
     *
     * @schema GrpcRouteSpecRulesFiltersRequestMirrorBackendRef#port
     */
    readonly port?: number;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersRequestMirrorBackendRef' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersRequestMirrorBackendRef(obj: GrpcRouteSpecRulesFiltersRequestMirrorBackendRef | undefined): Record<string, any> | undefined;
/**
 * Fraction represents the fraction of requests that should be
 * mirrored to BackendRef.
 *
 * Only one of Fraction or Percent may be specified. If neither field
 * is specified, 100% of requests will be mirrored.
 *
 * @schema GrpcRouteSpecRulesFiltersRequestMirrorFraction
 */
export interface GrpcRouteSpecRulesFiltersRequestMirrorFraction {
    /**
     * @schema GrpcRouteSpecRulesFiltersRequestMirrorFraction#denominator
     */
    readonly denominator?: number;
    /**
     * @schema GrpcRouteSpecRulesFiltersRequestMirrorFraction#numerator
     */
    readonly numerator: number;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersRequestMirrorFraction' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersRequestMirrorFraction(obj: GrpcRouteSpecRulesFiltersRequestMirrorFraction | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifierAdd
 */
export interface GrpcRouteSpecRulesFiltersResponseHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersResponseHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersResponseHeaderModifierAdd(obj: GrpcRouteSpecRulesFiltersResponseHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifierSet
 */
export interface GrpcRouteSpecRulesFiltersResponseHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema GrpcRouteSpecRulesFiltersResponseHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesFiltersResponseHeaderModifierSet' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesFiltersResponseHeaderModifierSet(obj: GrpcRouteSpecRulesFiltersResponseHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * Type specifies how to match against the value of the header.
 *
 * @schema GrpcRouteSpecRulesMatchesHeadersType
 */
export declare enum GrpcRouteSpecRulesMatchesHeadersType {
    /** Exact */
    EXACT = "Exact",
    /** RegularExpression */
    REGULAR_EXPRESSION = "RegularExpression"
}
/**
 * Type specifies how to match against the service and/or method.
 * Support: Core (Exact with service and method specified)
 *
 * Support: Implementation-specific (Exact with method specified but no service specified)
 *
 * Support: Implementation-specific (RegularExpression)
 *
 * @schema GrpcRouteSpecRulesMatchesMethodType
 */
export declare enum GrpcRouteSpecRulesMatchesMethodType {
    /** Exact */
    EXACT = "Exact",
    /** RegularExpression */
    REGULAR_EXPRESSION = "RegularExpression"
}
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd(obj: GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet(obj: GrpcRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * BackendRef references a resource where mirrored requests are sent.
 *
 * Mirrored requests must be sent only to a single destination endpoint
 * within this BackendRef, irrespective of how many endpoints are present
 * within this BackendRef.
 *
 * If the referent cannot be found, this BackendRef is invalid and must be
 * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
 * condition on the Route status is set to `status: False` and not configure
 * this backend in the underlying implementation.
 *
 * If there is a cross-namespace reference to an *existing* object
 * that is not allowed by a ReferenceGrant, the controller must ensure the
 * "ResolvedRefs"  condition on the Route is set to `status: False`,
 * with the "RefNotPermitted" reason and not configure this backend in the
 * underlying implementation.
 *
 * In either error case, the Message of the `ResolvedRefs` Condition
 * should be used to provide more detail about the problem.
 *
 * Support: Extended for Kubernetes Service
 *
 * Support: Implementation-specific for any other resource
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#group
     */
    readonly group?: string;
    /**
     * Kind is the Kubernetes resource kind of the referent. For example
     * "Service".
     *
     * Defaults to "Service" when not specified.
     *
     * ExternalName services can refer to CNAME DNS records that may live
     * outside of the cluster and as such are difficult to reason about in
     * terms of conformance. They also may not be safe to forward to (see
     * CVE-2021-25740 for more information). Implementations SHOULD NOT
     * support ExternalName Services.
     *
     * Support: Core (Services with a type other than ExternalName)
     *
     * Support: Implementation-specific (Services with type ExternalName)
     *
     * @default Service" when not specified.
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the backend. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#namespace
     */
    readonly namespace?: string;
    /**
     * Port specifies the destination port number to use for this resource.
     * Port is required when the referent is a Kubernetes Service. In this
     * case, the port number is the service port number, not the target port.
     * For other resources, destination port might be derived from the referent
     * resource or this field.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#port
     */
    readonly port?: number;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef(obj: GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef | undefined): Record<string, any> | undefined;
/**
 * Fraction represents the fraction of requests that should be
 * mirrored to BackendRef.
 *
 * Only one of Fraction or Percent may be specified. If neither field
 * is specified, 100% of requests will be mirrored.
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorFraction
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorFraction {
    /**
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorFraction#denominator
     */
    readonly denominator?: number;
    /**
     * @schema GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorFraction#numerator
     */
    readonly numerator: number;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorFraction' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorFraction(obj: GrpcRouteSpecRulesBackendRefsFiltersRequestMirrorFraction | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd(obj: GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet
 */
export interface GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet' to JSON representation.
 */
export declare function toJson_GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet(obj: GrpcRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * HTTPRoute provides a way to route HTTP requests. This includes the capability
to match requests by hostname, path, header, or query param. Filters can be
used to specify additional processing steps. Backends specify where matching
requests should be routed.
 *
 * @schema HTTPRoute
 */
export declare class HttpRoute extends ApiObject {
    /**
     * Returns the apiVersion and kind for "HTTPRoute"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "HTTPRoute".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: HttpRouteProps): any;
    /**
     * Defines a "HTTPRoute" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: HttpRouteProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * HTTPRoute provides a way to route HTTP requests. This includes the capability
 * to match requests by hostname, path, header, or query param. Filters can be
 * used to specify additional processing steps. Backends specify where matching
 * requests should be routed.
 *
 * @schema HTTPRoute
 */
export interface HttpRouteProps {
    /**
     * @schema HTTPRoute#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec defines the desired state of HTTPRoute.
     *
     * @schema HTTPRoute#spec
     */
    readonly spec: HttpRouteSpec;
}
/**
 * Converts an object of type 'HttpRouteProps' to JSON representation.
 */
export declare function toJson_HttpRouteProps(obj: HttpRouteProps | undefined): Record<string, any> | undefined;
/**
 * Spec defines the desired state of HTTPRoute.
 *
 * @schema HttpRouteSpec
 */
export interface HttpRouteSpec {
    /**
     * Hostnames defines a set of hostnames that should match against the HTTP Host
     * header to select a HTTPRoute used to process the request. Implementations
     * MUST ignore any port value specified in the HTTP Host header while
     * performing a match and (absent of any applicable header modification
     * configuration) MUST forward this header unmodified to the backend.
     *
     * Valid values for Hostnames are determined by RFC 1123 definition of a
     * hostname with 2 notable exceptions:
     *
     * 1. IPs are not allowed.
     * 2. A hostname may be prefixed with a wildcard label (`*.`). The wildcard
     * label must appear by itself as the first label.
     *
     * If a hostname is specified by both the Listener and HTTPRoute, there
     * must be at least one intersecting hostname for the HTTPRoute to be
     * attached to the Listener. For example:
     *
     * * A Listener with `test.example.com` as the hostname matches HTTPRoutes
     * that have either not specified any hostnames, or have specified at
     * least one of `test.example.com` or `*.example.com`.
     * * A Listener with `*.example.com` as the hostname matches HTTPRoutes
     * that have either not specified any hostnames or have specified at least
     * one hostname that matches the Listener hostname. For example,
     * `*.example.com`, `test.example.com`, and `foo.test.example.com` would
     * all match. On the other hand, `example.com` and `test.example.net` would
     * not match.
     *
     * Hostnames that are prefixed with a wildcard label (`*.`) are interpreted
     * as a suffix match. That means that a match for `*.example.com` would match
     * both `test.example.com`, and `foo.test.example.com`, but not `example.com`.
     *
     * If both the Listener and HTTPRoute have specified hostnames, any
     * HTTPRoute hostnames that do not match the Listener hostname MUST be
     * ignored. For example, if a Listener specified `*.example.com`, and the
     * HTTPRoute specified `test.example.com` and `test.example.net`,
     * `test.example.net` must not be considered for a match.
     *
     * If both the Listener and HTTPRoute have specified hostnames, and none
     * match with the criteria above, then the HTTPRoute is not accepted. The
     * implementation must raise an 'Accepted' Condition with a status of
     * `False` in the corresponding RouteParentStatus.
     *
     * In the event that multiple HTTPRoutes specify intersecting hostnames (e.g.
     * overlapping wildcard matching and exact matching hostnames), precedence must
     * be given to rules from the HTTPRoute with the largest number of:
     *
     * * Characters in a matching non-wildcard hostname.
     * * Characters in a matching hostname.
     *
     * If ties exist across multiple Routes, the matching precedence rules for
     * HTTPRouteMatches takes over.
     *
     * Support: Core
     *
     * @schema HttpRouteSpec#hostnames
     */
    readonly hostnames?: string[];
    /**
     * ParentRefs references the resources (usually Gateways) that a Route wants
     * to be attached to. Note that the referenced parent resource needs to
     * allow this for the attachment to be complete. For Gateways, that means
     * the Gateway needs to allow attachment from Routes of this kind and
     * namespace. For Services, that means the Service must either be in the same
     * namespace for a "producer" route, or the mesh implementation must support
     * and allow "consumer" routes for the referenced Service. ReferenceGrant is
     * not applicable for governing ParentRefs to Services - it is not possible to
     * create a "producer" route for a Service in a different namespace from the
     * Route.
     *
     * There are two kinds of parent resources with "Core" support:
     *
     * * Gateway (Gateway conformance profile)
     * * Service (Mesh conformance profile, ClusterIP Services only)
     *
     * This API may be extended in the future to support additional kinds of parent
     * resources.
     *
     * ParentRefs must be _distinct_. This means either that:
     *
     * * They select different objects.  If this is the case, then parentRef
     * entries are distinct. In terms of fields, this means that the
     * multi-part key defined by `group`, `kind`, `namespace`, and `name` must
     * be unique across all parentRef entries in the Route.
     * * They do not select different objects, but for each optional field used,
     * each ParentRef that selects the same object must set the same set of
     * optional fields to different values. If one ParentRef sets a
     * combination of optional fields, all must set the same combination.
     *
     * Some examples:
     *
     * * If one ParentRef sets `sectionName`, all ParentRefs referencing the
     * same object must also set `sectionName`.
     * * If one ParentRef sets `port`, all ParentRefs referencing the same
     * object must also set `port`.
     * * If one ParentRef sets `sectionName` and `port`, all ParentRefs
     * referencing the same object must also set `sectionName` and `port`.
     *
     * It is possible to separately reference multiple distinct objects that may
     * be collapsed by an implementation. For example, some implementations may
     * choose to merge compatible Gateway Listeners together. If that is the
     * case, the list of routes attached to those resources should also be
     * merged.
     *
     * Note that for ParentRefs that cross namespace boundaries, there are specific
     * rules. Cross-namespace references are only valid if they are explicitly
     * allowed by something in the namespace they are referring to. For example,
     * Gateway has the AllowedRoutes field, and ReferenceGrant provides a
     * generic way to enable other kinds of cross-namespace reference.
     *
     * @schema HttpRouteSpec#parentRefs
     */
    readonly parentRefs?: HttpRouteSpecParentRefs[];
    /**
     * Rules are a list of HTTP matchers, filters and actions.
     *
     * @schema HttpRouteSpec#rules
     */
    readonly rules?: HttpRouteSpecRules[];
}
/**
 * Converts an object of type 'HttpRouteSpec' to JSON representation.
 */
export declare function toJson_HttpRouteSpec(obj: HttpRouteSpec | undefined): Record<string, any> | undefined;
/**
 * ParentReference identifies an API object (usually a Gateway) that can be considered
 * a parent of this resource (usually a route). There are two kinds of parent resources
 * with "Core" support:
 *
 * * Gateway (Gateway conformance profile)
 * * Service (Mesh conformance profile, ClusterIP Services only)
 *
 * This API may be extended in the future to support additional kinds of parent
 * resources.
 *
 * The API object must be valid in the cluster; the Group and Kind must
 * be registered in the cluster for this reference to be valid.
 *
 * @schema HttpRouteSpecParentRefs
 */
export interface HttpRouteSpecParentRefs {
    /**
     * Group is the group of the referent.
     * When unspecified, "gateway.networking.k8s.io" is inferred.
     * To set the core API group (such as for a "Service" kind referent),
     * Group must be explicitly set to "" (empty string).
     *
     * Support: Core
     *
     * @schema HttpRouteSpecParentRefs#group
     */
    readonly group?: string;
    /**
     * Kind is kind of the referent.
     *
     * There are two kinds of parent resources with "Core" support:
     *
     * * Gateway (Gateway conformance profile)
     * * Service (Mesh conformance profile, ClusterIP Services only)
     *
     * Support for other resources is Implementation-Specific.
     *
     * @schema HttpRouteSpecParentRefs#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecParentRefs#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the referent. When unspecified, this refers
     * to the local namespace of the Route.
     *
     * Note that there are specific rules for ParentRefs which cross namespace
     * boundaries. Cross-namespace references are only valid if they are explicitly
     * allowed by something in the namespace they are referring to. For example:
     * Gateway has the AllowedRoutes field, and ReferenceGrant provides a
     * generic way to enable any other kind of cross-namespace reference.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecParentRefs#namespace
     */
    readonly namespace?: string;
    /**
     * Port is the network port this Route targets. It can be interpreted
     * differently based on the type of parent resource.
     *
     * When the parent resource is a Gateway, this targets all listeners
     * listening on the specified port that also support this kind of Route(and
     * select this Route). It's not recommended to set `Port` unless the
     * networking behaviors specified in a Route must apply to a specific port
     * as opposed to a listener(s) whose port(s) may be changed. When both Port
     * and SectionName are specified, the name and port of the selected listener
     * must match both specified values.
     *
     * Implementations MAY choose to support other parent resources.
     * Implementations supporting other types of parent resources MUST clearly
     * document how/if Port is interpreted.
     *
     * For the purpose of status, an attachment is considered successful as
     * long as the parent resource accepts it partially. For example, Gateway
     * listeners can restrict which Routes can attach to them by Route kind,
     * namespace, or hostname. If 1 of 2 Gateway listeners accept attachment
     * from the referencing Route, the Route MUST be considered successfully
     * attached. If no Gateway listeners accept attachment from this Route,
     * the Route MUST be considered detached from the Gateway.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecParentRefs#port
     */
    readonly port?: number;
    /**
     * SectionName is the name of a section within the target resource. In the
     * following resources, SectionName is interpreted as the following:
     *
     * * Gateway: Listener name. When both Port (experimental) and SectionName
     * are specified, the name and port of the selected listener must match
     * both specified values.
     * * Service: Port name. When both Port (experimental) and SectionName
     * are specified, the name and port of the selected listener must match
     * both specified values.
     *
     * Implementations MAY choose to support attaching Routes to other resources.
     * If that is the case, they MUST clearly document how SectionName is
     * interpreted.
     *
     * When unspecified (empty string), this will reference the entire resource.
     * For the purpose of status, an attachment is considered successful if at
     * least one section in the parent resource accepts it. For example, Gateway
     * listeners can restrict which Routes can attach to them by Route kind,
     * namespace, or hostname. If 1 of 2 Gateway listeners accept attachment from
     * the referencing Route, the Route MUST be considered successfully
     * attached. If no Gateway listeners accept attachment from this Route, the
     * Route MUST be considered detached from the Gateway.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecParentRefs#sectionName
     */
    readonly sectionName?: string;
}
/**
 * Converts an object of type 'HttpRouteSpecParentRefs' to JSON representation.
 */
export declare function toJson_HttpRouteSpecParentRefs(obj: HttpRouteSpecParentRefs | undefined): Record<string, any> | undefined;
/**
 * HTTPRouteRule defines semantics for matching an HTTP request based on
 * conditions (matches), processing it (filters), and forwarding the request to
 * an API object (backendRefs).
 *
 * @schema HttpRouteSpecRules
 */
export interface HttpRouteSpecRules {
    /**
     * BackendRefs defines the backend(s) where matching requests should be
     * sent.
     *
     * Failure behavior here depends on how many BackendRefs are specified and
     * how many are invalid.
     *
     * If *all* entries in BackendRefs are invalid, and there are also no filters
     * specified in this route rule, *all* traffic which matches this rule MUST
     * receive a 500 status code.
     *
     * See the HTTPBackendRef definition for the rules about what makes a single
     * HTTPBackendRef invalid.
     *
     * When a HTTPBackendRef is invalid, 500 status codes MUST be returned for
     * requests that would have otherwise been routed to an invalid backend. If
     * multiple backends are specified, and some are invalid, the proportion of
     * requests that would otherwise have been routed to an invalid backend
     * MUST receive a 500 status code.
     *
     * For example, if two backends are specified with equal weights, and one is
     * invalid, 50 percent of traffic must receive a 500. Implementations may
     * choose how that 50 percent is determined.
     *
     * When a HTTPBackendRef refers to a Service that has no ready endpoints,
     * implementations SHOULD return a 503 for requests to that backend instead.
     * If an implementation chooses to do this, all of the above rules for 500 responses
     * MUST also apply for responses that return a 503.
     *
     * Support: Core for Kubernetes Service
     *
     * Support: Extended for Kubernetes ServiceImport
     *
     * Support: Implementation-specific for any other resource
     *
     * Support for weight: Core
     *
     * @schema HttpRouteSpecRules#backendRefs
     */
    readonly backendRefs?: HttpRouteSpecRulesBackendRefs[];
    /**
     * Filters define the filters that are applied to requests that match
     * this rule.
     *
     * Wherever possible, implementations SHOULD implement filters in the order
     * they are specified.
     *
     * Implementations MAY choose to implement this ordering strictly, rejecting
     * any combination or order of filters that cannot be supported. If implementations
     * choose a strict interpretation of filter ordering, they MUST clearly document
     * that behavior.
     *
     * To reject an invalid combination or order of filters, implementations SHOULD
     * consider the Route Rules with this configuration invalid. If all Route Rules
     * in a Route are invalid, the entire Route would be considered invalid. If only
     * a portion of Route Rules are invalid, implementations MUST set the
     * "PartiallyInvalid" condition for the Route.
     *
     * Conformance-levels at this level are defined based on the type of filter:
     *
     * - ALL core filters MUST be supported by all implementations.
     * - Implementers are encouraged to support extended filters.
     * - Implementation-specific custom filters have no API guarantees across
     * implementations.
     *
     * Specifying the same filter multiple times is not supported unless explicitly
     * indicated in the filter.
     *
     * All filters are expected to be compatible with each other except for the
     * URLRewrite and RequestRedirect filters, which may not be combined. If an
     * implementation cannot support other combinations of filters, they must clearly
     * document that limitation. In cases where incompatible or unsupported
     * filters are specified and cause the `Accepted` condition to be set to status
     * `False`, implementations may use the `IncompatibleFilters` reason to specify
     * this configuration error.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRules#filters
     */
    readonly filters?: HttpRouteSpecRulesFilters[];
    /**
     * Matches define conditions used for matching the rule against incoming
     * HTTP requests. Each match is independent, i.e. this rule will be matched
     * if **any** one of the matches is satisfied.
     *
     * For example, take the following matches configuration:
     *
     * ```
     * matches:
     * - path:
     * value: "/foo"
     * headers:
     * - name: "version"
     * value: "v2"
     * - path:
     * value: "/v2/foo"
     * ```
     *
     * For a request to match against this rule, a request must satisfy
     * EITHER of the two conditions:
     *
     * - path prefixed with `/foo` AND contains the header `version: v2`
     * - path prefix of `/v2/foo`
     *
     * See the documentation for HTTPRouteMatch on how to specify multiple
     * match conditions that should be ANDed together.
     *
     * If no matches are specified, the default is a prefix
     * path match on "/", which has the effect of matching every
     * HTTP request.
     *
     * Proxy or Load Balancer routing configuration generated from HTTPRoutes
     * MUST prioritize matches based on the following criteria, continuing on
     * ties. Across all rules specified on applicable Routes, precedence must be
     * given to the match having:
     *
     * * "Exact" path match.
     * * "Prefix" path match with largest number of characters.
     * * Method match.
     * * Largest number of header matches.
     * * Largest number of query param matches.
     *
     * Note: The precedence of RegularExpression path matches are implementation-specific.
     *
     * If ties still exist across multiple Routes, matching precedence MUST be
     * determined in order of the following criteria, continuing on ties:
     *
     * * The oldest Route based on creation timestamp.
     * * The Route appearing first in alphabetical order by
     * "{namespace}/{name}".
     *
     * If ties still exist within an HTTPRoute, matching precedence MUST be granted
     * to the FIRST matching rule (in list order) with a match meeting the above
     * criteria.
     *
     * When no rules matching a request have been successfully attached to the
     * parent a request is coming from, a HTTP 404 status code MUST be returned.
     *
     * @schema HttpRouteSpecRules#matches
     */
    readonly matches?: HttpRouteSpecRulesMatches[];
    /**
     * Timeouts defines the timeouts that can be configured for an HTTP request.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRules#timeouts
     */
    readonly timeouts?: HttpRouteSpecRulesTimeouts;
}
/**
 * Converts an object of type 'HttpRouteSpecRules' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRules(obj: HttpRouteSpecRules | undefined): Record<string, any> | undefined;
/**
 * HTTPBackendRef defines how a HTTPRoute forwards a HTTP request.
 *
 * Note that when a namespace different than the local namespace is specified, a
 * ReferenceGrant object is required in the referent namespace to allow that
 * namespace's owner to accept the reference. See the ReferenceGrant
 * documentation for details.
 *
 * @schema HttpRouteSpecRulesBackendRefs
 */
export interface HttpRouteSpecRulesBackendRefs {
    /**
     * Filters defined at this level should be executed if and only if the
     * request is being forwarded to the backend defined here.
     *
     * Support: Implementation-specific (For broader support of filters, use the
     * Filters field in HTTPRouteRule.)
     *
     * @schema HttpRouteSpecRulesBackendRefs#filters
     */
    readonly filters?: HttpRouteSpecRulesBackendRefsFilters[];
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteSpecRulesBackendRefs#group
     */
    readonly group?: string;
    /**
     * Kind is the Kubernetes resource kind of the referent. For example
     * "Service".
     *
     * Defaults to "Service" when not specified.
     *
     * ExternalName services can refer to CNAME DNS records that may live
     * outside of the cluster and as such are difficult to reason about in
     * terms of conformance. They also may not be safe to forward to (see
     * CVE-2021-25740 for more information). Implementations SHOULD NOT
     * support ExternalName Services.
     *
     * Support: Core (Services with a type other than ExternalName)
     *
     * Support: Implementation-specific (Services with type ExternalName)
     *
     * @default Service" when not specified.
     * @schema HttpRouteSpecRulesBackendRefs#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteSpecRulesBackendRefs#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the backend. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesBackendRefs#namespace
     */
    readonly namespace?: string;
    /**
     * Port specifies the destination port number to use for this resource.
     * Port is required when the referent is a Kubernetes Service. In this
     * case, the port number is the service port number, not the target port.
     * For other resources, destination port might be derived from the referent
     * resource or this field.
     *
     * @schema HttpRouteSpecRulesBackendRefs#port
     */
    readonly port?: number;
    /**
     * Weight specifies the proportion of requests forwarded to the referenced
     * backend. This is computed as weight/(sum of all weights in this
     * BackendRefs list). For non-zero values, there may be some epsilon from
     * the exact proportion defined here depending on the precision an
     * implementation supports. Weight is not a percentage and the sum of
     * weights does not need to equal 100.
     *
     * If only one backend is specified and it has a weight greater than 0, 100%
     * of the traffic is forwarded to that backend. If weight is set to 0, no
     * traffic should be forwarded for this entry. If unspecified, weight
     * defaults to 1.
     *
     * Support for this field varies based on the context where used.
     *
     * @schema HttpRouteSpecRulesBackendRefs#weight
     */
    readonly weight?: number;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefs' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefs(obj: HttpRouteSpecRulesBackendRefs | undefined): Record<string, any> | undefined;
/**
 * HTTPRouteFilter defines processing steps that must be completed during the
 * request or response lifecycle. HTTPRouteFilters are meant as an extension
 * point to express processing that may be done in Gateway implementations. Some
 * examples include request or response modification, implementing
 * authentication strategies, rate-limiting, and traffic shaping. API
 * guarantee/conformance is defined based on the type of the filter.
 *
 * @schema HttpRouteSpecRulesFilters
 */
export interface HttpRouteSpecRulesFilters {
    /**
     * ExtensionRef is an optional, implementation-specific extension to the
     * "filter" behavior.  For example, resource "myroutefilter" in group
     * "networking.example.net"). ExtensionRef MUST NOT be used for core and
     * extended filters.
     *
     * This filter can be used multiple times within the same rule.
     *
     * Support: Implementation-specific
     *
     * @schema HttpRouteSpecRulesFilters#extensionRef
     */
    readonly extensionRef?: HttpRouteSpecRulesFiltersExtensionRef;
    /**
     * RequestHeaderModifier defines a schema for a filter that modifies request
     * headers.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesFilters#requestHeaderModifier
     */
    readonly requestHeaderModifier?: HttpRouteSpecRulesFiltersRequestHeaderModifier;
    /**
     * RequestMirror defines a schema for a filter that mirrors requests.
     * Requests are sent to the specified destination, but responses from
     * that destination are ignored.
     *
     * This filter can be used multiple times within the same rule. Note that
     * not all implementations will be able to support mirroring to multiple
     * backends.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesFilters#requestMirror
     */
    readonly requestMirror?: HttpRouteSpecRulesFiltersRequestMirror;
    /**
     * RequestRedirect defines a schema for a filter that responds to the
     * request with an HTTP redirection.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesFilters#requestRedirect
     */
    readonly requestRedirect?: HttpRouteSpecRulesFiltersRequestRedirect;
    /**
     * ResponseHeaderModifier defines a schema for a filter that modifies response
     * headers.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesFilters#responseHeaderModifier
     */
    readonly responseHeaderModifier?: HttpRouteSpecRulesFiltersResponseHeaderModifier;
    /**
     * Type identifies the type of filter to apply. As with other API fields,
     * types are classified into three conformance levels:
     *
     * - Core: Filter types and their corresponding configuration defined by
     * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
     * implementations must support core filters.
     *
     * - Extended: Filter types and their corresponding configuration defined by
     * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
     * are encouraged to support extended filters.
     *
     * - Implementation-specific: Filters that are defined and supported by
     * specific vendors.
     * In the future, filters showing convergence in behavior across multiple
     * implementations will be considered for inclusion in extended or core
     * conformance levels. Filter-specific configuration for such filters
     * is specified using the ExtensionRef field. `Type` should be set to
     * "ExtensionRef" for custom filters.
     *
     * Implementers are encouraged to define custom implementation types to
     * extend the core API with implementation-specific behavior.
     *
     * If a reference to a custom filter type cannot be resolved, the filter
     * MUST NOT be skipped. Instead, requests that would have been processed by
     * that filter MUST receive a HTTP error response.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteSpecRulesFilters#type
     */
    readonly type: HttpRouteSpecRulesFiltersType;
    /**
     * URLRewrite defines a schema for a filter that modifies a request during forwarding.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesFilters#urlRewrite
     */
    readonly urlRewrite?: HttpRouteSpecRulesFiltersUrlRewrite;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFilters' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFilters(obj: HttpRouteSpecRulesFilters | undefined): Record<string, any> | undefined;
/**
 * HTTPRouteMatch defines the predicate used to match requests to a given
 * action. Multiple match types are ANDed together, i.e. the match will
 * evaluate to true only if all conditions are satisfied.
 *
 * For example, the match below will match a HTTP request only if its path
 * starts with `/foo` AND it contains the `version: v1` header:
 *
 * ```
 * match:
 *
 * path:
 * value: "/foo"
 * headers:
 * - name: "version"
 * value "v1"
 *
 * ```
 *
 * @schema HttpRouteSpecRulesMatches
 */
export interface HttpRouteSpecRulesMatches {
    /**
     * Headers specifies HTTP request header matchers. Multiple match values are
     * ANDed together, meaning, a request must match all the specified headers
     * to select the route.
     *
     * @schema HttpRouteSpecRulesMatches#headers
     */
    readonly headers?: HttpRouteSpecRulesMatchesHeaders[];
    /**
     * Method specifies HTTP method matcher.
     * When specified, this route will be matched only if the request has the
     * specified method.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesMatches#method
     */
    readonly method?: HttpRouteSpecRulesMatchesMethod;
    /**
     * Path specifies a HTTP request path matcher. If this field is not
     * specified, a default prefix match on the "/" path is provided.
     *
     * @schema HttpRouteSpecRulesMatches#path
     */
    readonly path?: HttpRouteSpecRulesMatchesPath;
    /**
     * QueryParams specifies HTTP query parameter matchers. Multiple match
     * values are ANDed together, meaning, a request must match all the
     * specified query parameters to select the route.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesMatches#queryParams
     */
    readonly queryParams?: HttpRouteSpecRulesMatchesQueryParams[];
}
/**
 * Converts an object of type 'HttpRouteSpecRulesMatches' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesMatches(obj: HttpRouteSpecRulesMatches | undefined): Record<string, any> | undefined;
/**
 * Timeouts defines the timeouts that can be configured for an HTTP request.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesTimeouts
 */
export interface HttpRouteSpecRulesTimeouts {
    /**
     * BackendRequest specifies a timeout for an individual request from the gateway
     * to a backend. This covers the time from when the request first starts being
     * sent from the gateway to when the full response has been received from the backend.
     *
     * Setting a timeout to the zero duration (e.g. "0s") SHOULD disable the timeout
     * completely. Implementations that cannot completely disable the timeout MUST
     * instead interpret the zero duration as the longest possible value to which
     * the timeout can be set.
     *
     * An entire client HTTP transaction with a gateway, covered by the Request timeout,
     * may result in more than one call from the gateway to the destination backend,
     * for example, if automatic retries are supported.
     *
     * The value of BackendRequest must be a Gateway API Duration string as defined by
     * GEP-2257.  When this field is unspecified, its behavior is implementation-specific;
     * when specified, the value of BackendRequest must be no more than the value of the
     * Request timeout (since the Request timeout encompasses the BackendRequest timeout).
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesTimeouts#backendRequest
     */
    readonly backendRequest?: string;
    /**
     * Request specifies the maximum duration for a gateway to respond to an HTTP request.
     * If the gateway has not been able to respond before this deadline is met, the gateway
     * MUST return a timeout error.
     *
     * For example, setting the `rules.timeouts.request` field to the value `10s` in an
     * `HTTPRoute` will cause a timeout if a client request is taking longer than 10 seconds
     * to complete.
     *
     * Setting a timeout to the zero duration (e.g. "0s") SHOULD disable the timeout
     * completely. Implementations that cannot completely disable the timeout MUST
     * instead interpret the zero duration as the longest possible value to which
     * the timeout can be set.
     *
     * This timeout is intended to cover as close to the whole request-response transaction
     * as possible although an implementation MAY choose to start the timeout after the entire
     * request stream has been received instead of immediately after the transaction is
     * initiated by the client.
     *
     * The value of Request is a Gateway API Duration string as defined by GEP-2257. When this
     * field is unspecified, request timeout behavior is implementation-specific.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesTimeouts#request
     */
    readonly request?: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesTimeouts' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesTimeouts(obj: HttpRouteSpecRulesTimeouts | undefined): Record<string, any> | undefined;
/**
 * HTTPRouteFilter defines processing steps that must be completed during the
 * request or response lifecycle. HTTPRouteFilters are meant as an extension
 * point to express processing that may be done in Gateway implementations. Some
 * examples include request or response modification, implementing
 * authentication strategies, rate-limiting, and traffic shaping. API
 * guarantee/conformance is defined based on the type of the filter.
 *
 * @schema HttpRouteSpecRulesBackendRefsFilters
 */
export interface HttpRouteSpecRulesBackendRefsFilters {
    /**
     * ExtensionRef is an optional, implementation-specific extension to the
     * "filter" behavior.  For example, resource "myroutefilter" in group
     * "networking.example.net"). ExtensionRef MUST NOT be used for core and
     * extended filters.
     *
     * This filter can be used multiple times within the same rule.
     *
     * Support: Implementation-specific
     *
     * @schema HttpRouteSpecRulesBackendRefsFilters#extensionRef
     */
    readonly extensionRef?: HttpRouteSpecRulesBackendRefsFiltersExtensionRef;
    /**
     * RequestHeaderModifier defines a schema for a filter that modifies request
     * headers.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesBackendRefsFilters#requestHeaderModifier
     */
    readonly requestHeaderModifier?: HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifier;
    /**
     * RequestMirror defines a schema for a filter that mirrors requests.
     * Requests are sent to the specified destination, but responses from
     * that destination are ignored.
     *
     * This filter can be used multiple times within the same rule. Note that
     * not all implementations will be able to support mirroring to multiple
     * backends.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesBackendRefsFilters#requestMirror
     */
    readonly requestMirror?: HttpRouteSpecRulesBackendRefsFiltersRequestMirror;
    /**
     * RequestRedirect defines a schema for a filter that responds to the
     * request with an HTTP redirection.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesBackendRefsFilters#requestRedirect
     */
    readonly requestRedirect?: HttpRouteSpecRulesBackendRefsFiltersRequestRedirect;
    /**
     * ResponseHeaderModifier defines a schema for a filter that modifies response
     * headers.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesBackendRefsFilters#responseHeaderModifier
     */
    readonly responseHeaderModifier?: HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifier;
    /**
     * Type identifies the type of filter to apply. As with other API fields,
     * types are classified into three conformance levels:
     *
     * - Core: Filter types and their corresponding configuration defined by
     * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
     * implementations must support core filters.
     *
     * - Extended: Filter types and their corresponding configuration defined by
     * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
     * are encouraged to support extended filters.
     *
     * - Implementation-specific: Filters that are defined and supported by
     * specific vendors.
     * In the future, filters showing convergence in behavior across multiple
     * implementations will be considered for inclusion in extended or core
     * conformance levels. Filter-specific configuration for such filters
     * is specified using the ExtensionRef field. `Type` should be set to
     * "ExtensionRef" for custom filters.
     *
     * Implementers are encouraged to define custom implementation types to
     * extend the core API with implementation-specific behavior.
     *
     * If a reference to a custom filter type cannot be resolved, the filter
     * MUST NOT be skipped. Instead, requests that would have been processed by
     * that filter MUST receive a HTTP error response.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteSpecRulesBackendRefsFilters#type
     */
    readonly type: HttpRouteSpecRulesBackendRefsFiltersType;
    /**
     * URLRewrite defines a schema for a filter that modifies a request during forwarding.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesBackendRefsFilters#urlRewrite
     */
    readonly urlRewrite?: HttpRouteSpecRulesBackendRefsFiltersUrlRewrite;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFilters' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFilters(obj: HttpRouteSpecRulesBackendRefsFilters | undefined): Record<string, any> | undefined;
/**
 * ExtensionRef is an optional, implementation-specific extension to the
 * "filter" behavior.  For example, resource "myroutefilter" in group
 * "networking.example.net"). ExtensionRef MUST NOT be used for core and
 * extended filters.
 *
 * This filter can be used multiple times within the same rule.
 *
 * Support: Implementation-specific
 *
 * @schema HttpRouteSpecRulesFiltersExtensionRef
 */
export interface HttpRouteSpecRulesFiltersExtensionRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteSpecRulesFiltersExtensionRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent. For example "HTTPRoute" or "Service".
     *
     * @schema HttpRouteSpecRulesFiltersExtensionRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteSpecRulesFiltersExtensionRef#name
     */
    readonly name: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersExtensionRef' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersExtensionRef(obj: HttpRouteSpecRulesFiltersExtensionRef | undefined): Record<string, any> | undefined;
/**
 * RequestHeaderModifier defines a schema for a filter that modifies request
 * headers.
 *
 * Support: Core
 *
 * @schema HttpRouteSpecRulesFiltersRequestHeaderModifier
 */
export interface HttpRouteSpecRulesFiltersRequestHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema HttpRouteSpecRulesFiltersRequestHeaderModifier#add
     */
    readonly add?: HttpRouteSpecRulesFiltersRequestHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema HttpRouteSpecRulesFiltersRequestHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema HttpRouteSpecRulesFiltersRequestHeaderModifier#set
     */
    readonly set?: HttpRouteSpecRulesFiltersRequestHeaderModifierSet[];
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersRequestHeaderModifier' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersRequestHeaderModifier(obj: HttpRouteSpecRulesFiltersRequestHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * RequestMirror defines a schema for a filter that mirrors requests.
 * Requests are sent to the specified destination, but responses from
 * that destination are ignored.
 *
 * This filter can be used multiple times within the same rule. Note that
 * not all implementations will be able to support mirroring to multiple
 * backends.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesFiltersRequestMirror
 */
export interface HttpRouteSpecRulesFiltersRequestMirror {
    /**
     * BackendRef references a resource where mirrored requests are sent.
     *
     * Mirrored requests must be sent only to a single destination endpoint
     * within this BackendRef, irrespective of how many endpoints are present
     * within this BackendRef.
     *
     * If the referent cannot be found, this BackendRef is invalid and must be
     * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
     * condition on the Route status is set to `status: False` and not configure
     * this backend in the underlying implementation.
     *
     * If there is a cross-namespace reference to an *existing* object
     * that is not allowed by a ReferenceGrant, the controller must ensure the
     * "ResolvedRefs"  condition on the Route is set to `status: False`,
     * with the "RefNotPermitted" reason and not configure this backend in the
     * underlying implementation.
     *
     * In either error case, the Message of the `ResolvedRefs` Condition
     * should be used to provide more detail about the problem.
     *
     * Support: Extended for Kubernetes Service
     *
     * Support: Implementation-specific for any other resource
     *
     * @schema HttpRouteSpecRulesFiltersRequestMirror#backendRef
     */
    readonly backendRef: HttpRouteSpecRulesFiltersRequestMirrorBackendRef;
    /**
     * Fraction represents the fraction of requests that should be
     * mirrored to BackendRef.
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema HttpRouteSpecRulesFiltersRequestMirror#fraction
     */
    readonly fraction?: HttpRouteSpecRulesFiltersRequestMirrorFraction;
    /**
     * Percent represents the percentage of requests that should be
     * mirrored to BackendRef. Its minimum value is 0 (indicating 0% of
     * requests) and its maximum value is 100 (indicating 100% of requests).
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema HttpRouteSpecRulesFiltersRequestMirror#percent
     */
    readonly percent?: number;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersRequestMirror' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersRequestMirror(obj: HttpRouteSpecRulesFiltersRequestMirror | undefined): Record<string, any> | undefined;
/**
 * RequestRedirect defines a schema for a filter that responds to the
 * request with an HTTP redirection.
 *
 * Support: Core
 *
 * @schema HttpRouteSpecRulesFiltersRequestRedirect
 */
export interface HttpRouteSpecRulesFiltersRequestRedirect {
    /**
     * Hostname is the hostname to be used in the value of the `Location`
     * header in the response.
     * When empty, the hostname in the `Host` header of the request is used.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesFiltersRequestRedirect#hostname
     */
    readonly hostname?: string;
    /**
     * Path defines parameters used to modify the path of the incoming request.
     * The modified path is then used to construct the `Location` header. When
     * empty, the request path is used as-is.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesFiltersRequestRedirect#path
     */
    readonly path?: HttpRouteSpecRulesFiltersRequestRedirectPath;
    /**
     * Port is the port to be used in the value of the `Location`
     * header in the response.
     *
     * If no port is specified, the redirect port MUST be derived using the
     * following rules:
     *
     * * If redirect scheme is not-empty, the redirect port MUST be the well-known
     * port associated with the redirect scheme. Specifically "http" to port 80
     * and "https" to port 443. If the redirect scheme does not have a
     * well-known port, the listener port of the Gateway SHOULD be used.
     * * If redirect scheme is empty, the redirect port MUST be the Gateway
     * Listener port.
     *
     * Implementations SHOULD NOT add the port number in the 'Location'
     * header in the following cases:
     *
     * * A Location header that will use HTTP (whether that is determined via
     * the Listener protocol or the Scheme field) _and_ use port 80.
     * * A Location header that will use HTTPS (whether that is determined via
     * the Listener protocol or the Scheme field) _and_ use port 443.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesFiltersRequestRedirect#port
     */
    readonly port?: number;
    /**
     * Scheme is the scheme to be used in the value of the `Location` header in
     * the response. When empty, the scheme of the request is used.
     *
     * Scheme redirects can affect the port of the redirect, for more information,
     * refer to the documentation for the port field of this filter.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesFiltersRequestRedirect#scheme
     */
    readonly scheme?: HttpRouteSpecRulesFiltersRequestRedirectScheme;
    /**
     * StatusCode is the HTTP status code to be used in response.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesFiltersRequestRedirect#statusCode
     */
    readonly statusCode?: HttpRouteSpecRulesFiltersRequestRedirectStatusCode;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersRequestRedirect' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersRequestRedirect(obj: HttpRouteSpecRulesFiltersRequestRedirect | undefined): Record<string, any> | undefined;
/**
 * ResponseHeaderModifier defines a schema for a filter that modifies response
 * headers.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesFiltersResponseHeaderModifier
 */
export interface HttpRouteSpecRulesFiltersResponseHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema HttpRouteSpecRulesFiltersResponseHeaderModifier#add
     */
    readonly add?: HttpRouteSpecRulesFiltersResponseHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema HttpRouteSpecRulesFiltersResponseHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema HttpRouteSpecRulesFiltersResponseHeaderModifier#set
     */
    readonly set?: HttpRouteSpecRulesFiltersResponseHeaderModifierSet[];
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersResponseHeaderModifier' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersResponseHeaderModifier(obj: HttpRouteSpecRulesFiltersResponseHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * Type identifies the type of filter to apply. As with other API fields,
 * types are classified into three conformance levels:
 *
 * - Core: Filter types and their corresponding configuration defined by
 * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
 * implementations must support core filters.
 *
 * - Extended: Filter types and their corresponding configuration defined by
 * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
 * are encouraged to support extended filters.
 *
 * - Implementation-specific: Filters that are defined and supported by
 * specific vendors.
 * In the future, filters showing convergence in behavior across multiple
 * implementations will be considered for inclusion in extended or core
 * conformance levels. Filter-specific configuration for such filters
 * is specified using the ExtensionRef field. `Type` should be set to
 * "ExtensionRef" for custom filters.
 *
 * Implementers are encouraged to define custom implementation types to
 * extend the core API with implementation-specific behavior.
 *
 * If a reference to a custom filter type cannot be resolved, the filter
 * MUST NOT be skipped. Instead, requests that would have been processed by
 * that filter MUST receive a HTTP error response.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteSpecRulesFiltersType
 */
export declare enum HttpRouteSpecRulesFiltersType {
    /** RequestHeaderModifier */
    REQUEST_HEADER_MODIFIER = "RequestHeaderModifier",
    /** ResponseHeaderModifier */
    RESPONSE_HEADER_MODIFIER = "ResponseHeaderModifier",
    /** RequestMirror */
    REQUEST_MIRROR = "RequestMirror",
    /** RequestRedirect */
    REQUEST_REDIRECT = "RequestRedirect",
    /** URLRewrite */
    URL_REWRITE = "URLRewrite",
    /** ExtensionRef */
    EXTENSION_REF = "ExtensionRef"
}
/**
 * URLRewrite defines a schema for a filter that modifies a request during forwarding.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesFiltersUrlRewrite
 */
export interface HttpRouteSpecRulesFiltersUrlRewrite {
    /**
     * Hostname is the value to be used to replace the Host header value during
     * forwarding.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesFiltersUrlRewrite#hostname
     */
    readonly hostname?: string;
    /**
     * Path defines a path rewrite.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesFiltersUrlRewrite#path
     */
    readonly path?: HttpRouteSpecRulesFiltersUrlRewritePath;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersUrlRewrite' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersUrlRewrite(obj: HttpRouteSpecRulesFiltersUrlRewrite | undefined): Record<string, any> | undefined;
/**
 * HTTPHeaderMatch describes how to select a HTTP route by matching HTTP request
 * headers.
 *
 * @schema HttpRouteSpecRulesMatchesHeaders
 */
export interface HttpRouteSpecRulesMatchesHeaders {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, only the first
     * entry with an equivalent name MUST be considered for a match. Subsequent
     * entries with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * When a header is repeated in an HTTP request, it is
     * implementation-specific behavior as to how this is represented.
     * Generally, proxies should follow the guidance from the RFC:
     * https://www.rfc-editor.org/rfc/rfc7230.html#section-3.2.2 regarding
     * processing a repeated header, with special handling for "Set-Cookie".
     *
     * @schema HttpRouteSpecRulesMatchesHeaders#name
     */
    readonly name: string;
    /**
     * Type specifies how to match against the value of the header.
     *
     * Support: Core (Exact)
     *
     * Support: Implementation-specific (RegularExpression)
     *
     * Since RegularExpression HeaderMatchType has implementation-specific
     * conformance, implementations can support POSIX, PCRE or any other dialects
     * of regular expressions. Please read the implementation's documentation to
     * determine the supported dialect.
     *
     * @schema HttpRouteSpecRulesMatchesHeaders#type
     */
    readonly type?: HttpRouteSpecRulesMatchesHeadersType;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteSpecRulesMatchesHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesMatchesHeaders' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesMatchesHeaders(obj: HttpRouteSpecRulesMatchesHeaders | undefined): Record<string, any> | undefined;
/**
 * Method specifies HTTP method matcher.
 * When specified, this route will be matched only if the request has the
 * specified method.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesMatchesMethod
 */
export declare enum HttpRouteSpecRulesMatchesMethod {
    /** GET */
    GET = "GET",
    /** HEAD */
    HEAD = "HEAD",
    /** POST */
    POST = "POST",
    /** PUT */
    PUT = "PUT",
    /** DELETE */
    DELETE = "DELETE",
    /** CONNECT */
    CONNECT = "CONNECT",
    /** OPTIONS */
    OPTIONS = "OPTIONS",
    /** TRACE */
    TRACE = "TRACE",
    /** PATCH */
    PATCH = "PATCH"
}
/**
 * Path specifies a HTTP request path matcher. If this field is not
 * specified, a default prefix match on the "/" path is provided.
 *
 * @schema HttpRouteSpecRulesMatchesPath
 */
export interface HttpRouteSpecRulesMatchesPath {
    /**
     * Type specifies how to match against the path Value.
     *
     * Support: Core (Exact, PathPrefix)
     *
     * Support: Implementation-specific (RegularExpression)
     *
     * @schema HttpRouteSpecRulesMatchesPath#type
     */
    readonly type?: HttpRouteSpecRulesMatchesPathType;
    /**
     * Value of the HTTP path to match against.
     *
     * @schema HttpRouteSpecRulesMatchesPath#value
     */
    readonly value?: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesMatchesPath' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesMatchesPath(obj: HttpRouteSpecRulesMatchesPath | undefined): Record<string, any> | undefined;
/**
 * HTTPQueryParamMatch describes how to select a HTTP route by matching HTTP
 * query parameters.
 *
 * @schema HttpRouteSpecRulesMatchesQueryParams
 */
export interface HttpRouteSpecRulesMatchesQueryParams {
    /**
     * Name is the name of the HTTP query param to be matched. This must be an
     * exact string match. (See
     * https://tools.ietf.org/html/rfc7230#section-2.7.3).
     *
     * If multiple entries specify equivalent query param names, only the first
     * entry with an equivalent name MUST be considered for a match. Subsequent
     * entries with an equivalent query param name MUST be ignored.
     *
     * If a query param is repeated in an HTTP request, the behavior is
     * purposely left undefined, since different data planes have different
     * capabilities. However, it is *recommended* that implementations should
     * match against the first value of the param if the data plane supports it,
     * as this behavior is expected in other load balancing contexts outside of
     * the Gateway API.
     *
     * Users SHOULD NOT route traffic based on repeated query params to guard
     * themselves against potential differences in the implementations.
     *
     * @schema HttpRouteSpecRulesMatchesQueryParams#name
     */
    readonly name: string;
    /**
     * Type specifies how to match against the value of the query parameter.
     *
     * Support: Extended (Exact)
     *
     * Support: Implementation-specific (RegularExpression)
     *
     * Since RegularExpression QueryParamMatchType has Implementation-specific
     * conformance, implementations can support POSIX, PCRE or any other
     * dialects of regular expressions. Please read the implementation's
     * documentation to determine the supported dialect.
     *
     * @schema HttpRouteSpecRulesMatchesQueryParams#type
     */
    readonly type?: HttpRouteSpecRulesMatchesQueryParamsType;
    /**
     * Value is the value of HTTP query param to be matched.
     *
     * @schema HttpRouteSpecRulesMatchesQueryParams#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesMatchesQueryParams' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesMatchesQueryParams(obj: HttpRouteSpecRulesMatchesQueryParams | undefined): Record<string, any> | undefined;
/**
 * ExtensionRef is an optional, implementation-specific extension to the
 * "filter" behavior.  For example, resource "myroutefilter" in group
 * "networking.example.net"). ExtensionRef MUST NOT be used for core and
 * extended filters.
 *
 * This filter can be used multiple times within the same rule.
 *
 * Support: Implementation-specific
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersExtensionRef
 */
export interface HttpRouteSpecRulesBackendRefsFiltersExtensionRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersExtensionRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent. For example "HTTPRoute" or "Service".
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersExtensionRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersExtensionRef#name
     */
    readonly name: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersExtensionRef' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersExtensionRef(obj: HttpRouteSpecRulesBackendRefsFiltersExtensionRef | undefined): Record<string, any> | undefined;
/**
 * RequestHeaderModifier defines a schema for a filter that modifies request
 * headers.
 *
 * Support: Core
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifier
 */
export interface HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifier#add
     */
    readonly add?: HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifier#set
     */
    readonly set?: HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet[];
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifier' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifier(obj: HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * RequestMirror defines a schema for a filter that mirrors requests.
 * Requests are sent to the specified destination, but responses from
 * that destination are ignored.
 *
 * This filter can be used multiple times within the same rule. Note that
 * not all implementations will be able to support mirroring to multiple
 * backends.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirror
 */
export interface HttpRouteSpecRulesBackendRefsFiltersRequestMirror {
    /**
     * BackendRef references a resource where mirrored requests are sent.
     *
     * Mirrored requests must be sent only to a single destination endpoint
     * within this BackendRef, irrespective of how many endpoints are present
     * within this BackendRef.
     *
     * If the referent cannot be found, this BackendRef is invalid and must be
     * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
     * condition on the Route status is set to `status: False` and not configure
     * this backend in the underlying implementation.
     *
     * If there is a cross-namespace reference to an *existing* object
     * that is not allowed by a ReferenceGrant, the controller must ensure the
     * "ResolvedRefs"  condition on the Route is set to `status: False`,
     * with the "RefNotPermitted" reason and not configure this backend in the
     * underlying implementation.
     *
     * In either error case, the Message of the `ResolvedRefs` Condition
     * should be used to provide more detail about the problem.
     *
     * Support: Extended for Kubernetes Service
     *
     * Support: Implementation-specific for any other resource
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirror#backendRef
     */
    readonly backendRef: HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef;
    /**
     * Fraction represents the fraction of requests that should be
     * mirrored to BackendRef.
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirror#fraction
     */
    readonly fraction?: HttpRouteSpecRulesBackendRefsFiltersRequestMirrorFraction;
    /**
     * Percent represents the percentage of requests that should be
     * mirrored to BackendRef. Its minimum value is 0 (indicating 0% of
     * requests) and its maximum value is 100 (indicating 100% of requests).
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirror#percent
     */
    readonly percent?: number;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersRequestMirror' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersRequestMirror(obj: HttpRouteSpecRulesBackendRefsFiltersRequestMirror | undefined): Record<string, any> | undefined;
/**
 * RequestRedirect defines a schema for a filter that responds to the
 * request with an HTTP redirection.
 *
 * Support: Core
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirect
 */
export interface HttpRouteSpecRulesBackendRefsFiltersRequestRedirect {
    /**
     * Hostname is the hostname to be used in the value of the `Location`
     * header in the response.
     * When empty, the hostname in the `Host` header of the request is used.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirect#hostname
     */
    readonly hostname?: string;
    /**
     * Path defines parameters used to modify the path of the incoming request.
     * The modified path is then used to construct the `Location` header. When
     * empty, the request path is used as-is.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirect#path
     */
    readonly path?: HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPath;
    /**
     * Port is the port to be used in the value of the `Location`
     * header in the response.
     *
     * If no port is specified, the redirect port MUST be derived using the
     * following rules:
     *
     * * If redirect scheme is not-empty, the redirect port MUST be the well-known
     * port associated with the redirect scheme. Specifically "http" to port 80
     * and "https" to port 443. If the redirect scheme does not have a
     * well-known port, the listener port of the Gateway SHOULD be used.
     * * If redirect scheme is empty, the redirect port MUST be the Gateway
     * Listener port.
     *
     * Implementations SHOULD NOT add the port number in the 'Location'
     * header in the following cases:
     *
     * * A Location header that will use HTTP (whether that is determined via
     * the Listener protocol or the Scheme field) _and_ use port 80.
     * * A Location header that will use HTTPS (whether that is determined via
     * the Listener protocol or the Scheme field) _and_ use port 443.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirect#port
     */
    readonly port?: number;
    /**
     * Scheme is the scheme to be used in the value of the `Location` header in
     * the response. When empty, the scheme of the request is used.
     *
     * Scheme redirects can affect the port of the redirect, for more information,
     * refer to the documentation for the port field of this filter.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirect#scheme
     */
    readonly scheme?: HttpRouteSpecRulesBackendRefsFiltersRequestRedirectScheme;
    /**
     * StatusCode is the HTTP status code to be used in response.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirect#statusCode
     */
    readonly statusCode?: HttpRouteSpecRulesBackendRefsFiltersRequestRedirectStatusCode;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersRequestRedirect' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersRequestRedirect(obj: HttpRouteSpecRulesBackendRefsFiltersRequestRedirect | undefined): Record<string, any> | undefined;
/**
 * ResponseHeaderModifier defines a schema for a filter that modifies response
 * headers.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifier
 */
export interface HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifier#add
     */
    readonly add?: HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifier#set
     */
    readonly set?: HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet[];
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifier' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifier(obj: HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * Type identifies the type of filter to apply. As with other API fields,
 * types are classified into three conformance levels:
 *
 * - Core: Filter types and their corresponding configuration defined by
 * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
 * implementations must support core filters.
 *
 * - Extended: Filter types and their corresponding configuration defined by
 * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
 * are encouraged to support extended filters.
 *
 * - Implementation-specific: Filters that are defined and supported by
 * specific vendors.
 * In the future, filters showing convergence in behavior across multiple
 * implementations will be considered for inclusion in extended or core
 * conformance levels. Filter-specific configuration for such filters
 * is specified using the ExtensionRef field. `Type` should be set to
 * "ExtensionRef" for custom filters.
 *
 * Implementers are encouraged to define custom implementation types to
 * extend the core API with implementation-specific behavior.
 *
 * If a reference to a custom filter type cannot be resolved, the filter
 * MUST NOT be skipped. Instead, requests that would have been processed by
 * that filter MUST receive a HTTP error response.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersType
 */
export declare enum HttpRouteSpecRulesBackendRefsFiltersType {
    /** RequestHeaderModifier */
    REQUEST_HEADER_MODIFIER = "RequestHeaderModifier",
    /** ResponseHeaderModifier */
    RESPONSE_HEADER_MODIFIER = "ResponseHeaderModifier",
    /** RequestMirror */
    REQUEST_MIRROR = "RequestMirror",
    /** RequestRedirect */
    REQUEST_REDIRECT = "RequestRedirect",
    /** URLRewrite */
    URL_REWRITE = "URLRewrite",
    /** ExtensionRef */
    EXTENSION_REF = "ExtensionRef"
}
/**
 * URLRewrite defines a schema for a filter that modifies a request during forwarding.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersUrlRewrite
 */
export interface HttpRouteSpecRulesBackendRefsFiltersUrlRewrite {
    /**
     * Hostname is the value to be used to replace the Host header value during
     * forwarding.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersUrlRewrite#hostname
     */
    readonly hostname?: string;
    /**
     * Path defines a path rewrite.
     *
     * Support: Extended
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersUrlRewrite#path
     */
    readonly path?: HttpRouteSpecRulesBackendRefsFiltersUrlRewritePath;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersUrlRewrite' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersUrlRewrite(obj: HttpRouteSpecRulesBackendRefsFiltersUrlRewrite | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteSpecRulesFiltersRequestHeaderModifierAdd
 */
export interface HttpRouteSpecRulesFiltersRequestHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteSpecRulesFiltersRequestHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteSpecRulesFiltersRequestHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersRequestHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersRequestHeaderModifierAdd(obj: HttpRouteSpecRulesFiltersRequestHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteSpecRulesFiltersRequestHeaderModifierSet
 */
export interface HttpRouteSpecRulesFiltersRequestHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteSpecRulesFiltersRequestHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteSpecRulesFiltersRequestHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersRequestHeaderModifierSet' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersRequestHeaderModifierSet(obj: HttpRouteSpecRulesFiltersRequestHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * BackendRef references a resource where mirrored requests are sent.
 *
 * Mirrored requests must be sent only to a single destination endpoint
 * within this BackendRef, irrespective of how many endpoints are present
 * within this BackendRef.
 *
 * If the referent cannot be found, this BackendRef is invalid and must be
 * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
 * condition on the Route status is set to `status: False` and not configure
 * this backend in the underlying implementation.
 *
 * If there is a cross-namespace reference to an *existing* object
 * that is not allowed by a ReferenceGrant, the controller must ensure the
 * "ResolvedRefs"  condition on the Route is set to `status: False`,
 * with the "RefNotPermitted" reason and not configure this backend in the
 * underlying implementation.
 *
 * In either error case, the Message of the `ResolvedRefs` Condition
 * should be used to provide more detail about the problem.
 *
 * Support: Extended for Kubernetes Service
 *
 * Support: Implementation-specific for any other resource
 *
 * @schema HttpRouteSpecRulesFiltersRequestMirrorBackendRef
 */
export interface HttpRouteSpecRulesFiltersRequestMirrorBackendRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteSpecRulesFiltersRequestMirrorBackendRef#group
     */
    readonly group?: string;
    /**
     * Kind is the Kubernetes resource kind of the referent. For example
     * "Service".
     *
     * Defaults to "Service" when not specified.
     *
     * ExternalName services can refer to CNAME DNS records that may live
     * outside of the cluster and as such are difficult to reason about in
     * terms of conformance. They also may not be safe to forward to (see
     * CVE-2021-25740 for more information). Implementations SHOULD NOT
     * support ExternalName Services.
     *
     * Support: Core (Services with a type other than ExternalName)
     *
     * Support: Implementation-specific (Services with type ExternalName)
     *
     * @default Service" when not specified.
     * @schema HttpRouteSpecRulesFiltersRequestMirrorBackendRef#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteSpecRulesFiltersRequestMirrorBackendRef#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the backend. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesFiltersRequestMirrorBackendRef#namespace
     */
    readonly namespace?: string;
    /**
     * Port specifies the destination port number to use for this resource.
     * Port is required when the referent is a Kubernetes Service. In this
     * case, the port number is the service port number, not the target port.
     * For other resources, destination port might be derived from the referent
     * resource or this field.
     *
     * @schema HttpRouteSpecRulesFiltersRequestMirrorBackendRef#port
     */
    readonly port?: number;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersRequestMirrorBackendRef' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersRequestMirrorBackendRef(obj: HttpRouteSpecRulesFiltersRequestMirrorBackendRef | undefined): Record<string, any> | undefined;
/**
 * Fraction represents the fraction of requests that should be
 * mirrored to BackendRef.
 *
 * Only one of Fraction or Percent may be specified. If neither field
 * is specified, 100% of requests will be mirrored.
 *
 * @schema HttpRouteSpecRulesFiltersRequestMirrorFraction
 */
export interface HttpRouteSpecRulesFiltersRequestMirrorFraction {
    /**
     * @schema HttpRouteSpecRulesFiltersRequestMirrorFraction#denominator
     */
    readonly denominator?: number;
    /**
     * @schema HttpRouteSpecRulesFiltersRequestMirrorFraction#numerator
     */
    readonly numerator: number;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersRequestMirrorFraction' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersRequestMirrorFraction(obj: HttpRouteSpecRulesFiltersRequestMirrorFraction | undefined): Record<string, any> | undefined;
/**
 * Path defines parameters used to modify the path of the incoming request.
 * The modified path is then used to construct the `Location` header. When
 * empty, the request path is used as-is.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesFiltersRequestRedirectPath
 */
export interface HttpRouteSpecRulesFiltersRequestRedirectPath {
    /**
     * ReplaceFullPath specifies the value with which to replace the full path
     * of a request during a rewrite or redirect.
     *
     * @schema HttpRouteSpecRulesFiltersRequestRedirectPath#replaceFullPath
     */
    readonly replaceFullPath?: string;
    /**
     * ReplacePrefixMatch specifies the value with which to replace the prefix
     * match of a request during a rewrite or redirect. For example, a request
     * to "/foo/bar" with a prefix match of "/foo" and a ReplacePrefixMatch
     * of "/xyz" would be modified to "/xyz/bar".
     *
     * Note that this matches the behavior of the PathPrefix match type. This
     * matches full path elements. A path element refers to the list of labels
     * in the path split by the `/` separator. When specified, a trailing `/` is
     * ignored. For example, the paths `/abc`, `/abc/`, and `/abc/def` would all
     * match the prefix `/abc`, but the path `/abcd` would not.
     *
     * ReplacePrefixMatch is only compatible with a `PathPrefix` HTTPRouteMatch.
     * Using any other HTTPRouteMatch type on the same HTTPRouteRule will result in
     * the implementation setting the Accepted Condition for the Route to `status: False`.
     *
     * Request Path | Prefix Match | Replace Prefix | Modified Path
     *
     * @schema HttpRouteSpecRulesFiltersRequestRedirectPath#replacePrefixMatch
     */
    readonly replacePrefixMatch?: string;
    /**
     * Type defines the type of path modifier. Additional types may be
     * added in a future release of the API.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteSpecRulesFiltersRequestRedirectPath#type
     */
    readonly type: HttpRouteSpecRulesFiltersRequestRedirectPathType;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersRequestRedirectPath' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersRequestRedirectPath(obj: HttpRouteSpecRulesFiltersRequestRedirectPath | undefined): Record<string, any> | undefined;
/**
 * Scheme is the scheme to be used in the value of the `Location` header in
 * the response. When empty, the scheme of the request is used.
 *
 * Scheme redirects can affect the port of the redirect, for more information,
 * refer to the documentation for the port field of this filter.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesFiltersRequestRedirectScheme
 */
export declare enum HttpRouteSpecRulesFiltersRequestRedirectScheme {
    /** http */
    HTTP = "http",
    /** https */
    HTTPS = "https"
}
/**
 * StatusCode is the HTTP status code to be used in response.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * Support: Core
 *
 * @schema HttpRouteSpecRulesFiltersRequestRedirectStatusCode
 */
export declare enum HttpRouteSpecRulesFiltersRequestRedirectStatusCode {
    /** 301 */
    VALUE_301 = 301,
    /** 302 */
    VALUE_302 = 302
}
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteSpecRulesFiltersResponseHeaderModifierAdd
 */
export interface HttpRouteSpecRulesFiltersResponseHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteSpecRulesFiltersResponseHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteSpecRulesFiltersResponseHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersResponseHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersResponseHeaderModifierAdd(obj: HttpRouteSpecRulesFiltersResponseHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteSpecRulesFiltersResponseHeaderModifierSet
 */
export interface HttpRouteSpecRulesFiltersResponseHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteSpecRulesFiltersResponseHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteSpecRulesFiltersResponseHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersResponseHeaderModifierSet' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersResponseHeaderModifierSet(obj: HttpRouteSpecRulesFiltersResponseHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * Path defines a path rewrite.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesFiltersUrlRewritePath
 */
export interface HttpRouteSpecRulesFiltersUrlRewritePath {
    /**
     * ReplaceFullPath specifies the value with which to replace the full path
     * of a request during a rewrite or redirect.
     *
     * @schema HttpRouteSpecRulesFiltersUrlRewritePath#replaceFullPath
     */
    readonly replaceFullPath?: string;
    /**
     * ReplacePrefixMatch specifies the value with which to replace the prefix
     * match of a request during a rewrite or redirect. For example, a request
     * to "/foo/bar" with a prefix match of "/foo" and a ReplacePrefixMatch
     * of "/xyz" would be modified to "/xyz/bar".
     *
     * Note that this matches the behavior of the PathPrefix match type. This
     * matches full path elements. A path element refers to the list of labels
     * in the path split by the `/` separator. When specified, a trailing `/` is
     * ignored. For example, the paths `/abc`, `/abc/`, and `/abc/def` would all
     * match the prefix `/abc`, but the path `/abcd` would not.
     *
     * ReplacePrefixMatch is only compatible with a `PathPrefix` HTTPRouteMatch.
     * Using any other HTTPRouteMatch type on the same HTTPRouteRule will result in
     * the implementation setting the Accepted Condition for the Route to `status: False`.
     *
     * Request Path | Prefix Match | Replace Prefix | Modified Path
     *
     * @schema HttpRouteSpecRulesFiltersUrlRewritePath#replacePrefixMatch
     */
    readonly replacePrefixMatch?: string;
    /**
     * Type defines the type of path modifier. Additional types may be
     * added in a future release of the API.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteSpecRulesFiltersUrlRewritePath#type
     */
    readonly type: HttpRouteSpecRulesFiltersUrlRewritePathType;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesFiltersUrlRewritePath' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesFiltersUrlRewritePath(obj: HttpRouteSpecRulesFiltersUrlRewritePath | undefined): Record<string, any> | undefined;
/**
 * Type specifies how to match against the value of the header.
 *
 * Support: Core (Exact)
 *
 * Support: Implementation-specific (RegularExpression)
 *
 * Since RegularExpression HeaderMatchType has implementation-specific
 * conformance, implementations can support POSIX, PCRE or any other dialects
 * of regular expressions. Please read the implementation's documentation to
 * determine the supported dialect.
 *
 * @schema HttpRouteSpecRulesMatchesHeadersType
 */
export declare enum HttpRouteSpecRulesMatchesHeadersType {
    /** Exact */
    EXACT = "Exact",
    /** RegularExpression */
    REGULAR_EXPRESSION = "RegularExpression"
}
/**
 * Type specifies how to match against the path Value.
 *
 * Support: Core (Exact, PathPrefix)
 *
 * Support: Implementation-specific (RegularExpression)
 *
 * @schema HttpRouteSpecRulesMatchesPathType
 */
export declare enum HttpRouteSpecRulesMatchesPathType {
    /** Exact */
    EXACT = "Exact",
    /** PathPrefix */
    PATH_PREFIX = "PathPrefix",
    /** RegularExpression */
    REGULAR_EXPRESSION = "RegularExpression"
}
/**
 * Type specifies how to match against the value of the query parameter.
 *
 * Support: Extended (Exact)
 *
 * Support: Implementation-specific (RegularExpression)
 *
 * Since RegularExpression QueryParamMatchType has Implementation-specific
 * conformance, implementations can support POSIX, PCRE or any other
 * dialects of regular expressions. Please read the implementation's
 * documentation to determine the supported dialect.
 *
 * @schema HttpRouteSpecRulesMatchesQueryParamsType
 */
export declare enum HttpRouteSpecRulesMatchesQueryParamsType {
    /** Exact */
    EXACT = "Exact",
    /** RegularExpression */
    REGULAR_EXPRESSION = "RegularExpression"
}
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd
 */
export interface HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd(obj: HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet
 */
export interface HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet(obj: HttpRouteSpecRulesBackendRefsFiltersRequestHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * BackendRef references a resource where mirrored requests are sent.
 *
 * Mirrored requests must be sent only to a single destination endpoint
 * within this BackendRef, irrespective of how many endpoints are present
 * within this BackendRef.
 *
 * If the referent cannot be found, this BackendRef is invalid and must be
 * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
 * condition on the Route status is set to `status: False` and not configure
 * this backend in the underlying implementation.
 *
 * If there is a cross-namespace reference to an *existing* object
 * that is not allowed by a ReferenceGrant, the controller must ensure the
 * "ResolvedRefs"  condition on the Route is set to `status: False`,
 * with the "RefNotPermitted" reason and not configure this backend in the
 * underlying implementation.
 *
 * In either error case, the Message of the `ResolvedRefs` Condition
 * should be used to provide more detail about the problem.
 *
 * Support: Extended for Kubernetes Service
 *
 * Support: Implementation-specific for any other resource
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef
 */
export interface HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#group
     */
    readonly group?: string;
    /**
     * Kind is the Kubernetes resource kind of the referent. For example
     * "Service".
     *
     * Defaults to "Service" when not specified.
     *
     * ExternalName services can refer to CNAME DNS records that may live
     * outside of the cluster and as such are difficult to reason about in
     * terms of conformance. They also may not be safe to forward to (see
     * CVE-2021-25740 for more information). Implementations SHOULD NOT
     * support ExternalName Services.
     *
     * Support: Core (Services with a type other than ExternalName)
     *
     * Support: Implementation-specific (Services with type ExternalName)
     *
     * @default Service" when not specified.
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the backend. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#namespace
     */
    readonly namespace?: string;
    /**
     * Port specifies the destination port number to use for this resource.
     * Port is required when the referent is a Kubernetes Service. In this
     * case, the port number is the service port number, not the target port.
     * For other resources, destination port might be derived from the referent
     * resource or this field.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef#port
     */
    readonly port?: number;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef(obj: HttpRouteSpecRulesBackendRefsFiltersRequestMirrorBackendRef | undefined): Record<string, any> | undefined;
/**
 * Fraction represents the fraction of requests that should be
 * mirrored to BackendRef.
 *
 * Only one of Fraction or Percent may be specified. If neither field
 * is specified, 100% of requests will be mirrored.
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirrorFraction
 */
export interface HttpRouteSpecRulesBackendRefsFiltersRequestMirrorFraction {
    /**
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirrorFraction#denominator
     */
    readonly denominator?: number;
    /**
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestMirrorFraction#numerator
     */
    readonly numerator: number;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersRequestMirrorFraction' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersRequestMirrorFraction(obj: HttpRouteSpecRulesBackendRefsFiltersRequestMirrorFraction | undefined): Record<string, any> | undefined;
/**
 * Path defines parameters used to modify the path of the incoming request.
 * The modified path is then used to construct the `Location` header. When
 * empty, the request path is used as-is.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPath
 */
export interface HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPath {
    /**
     * ReplaceFullPath specifies the value with which to replace the full path
     * of a request during a rewrite or redirect.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPath#replaceFullPath
     */
    readonly replaceFullPath?: string;
    /**
     * ReplacePrefixMatch specifies the value with which to replace the prefix
     * match of a request during a rewrite or redirect. For example, a request
     * to "/foo/bar" with a prefix match of "/foo" and a ReplacePrefixMatch
     * of "/xyz" would be modified to "/xyz/bar".
     *
     * Note that this matches the behavior of the PathPrefix match type. This
     * matches full path elements. A path element refers to the list of labels
     * in the path split by the `/` separator. When specified, a trailing `/` is
     * ignored. For example, the paths `/abc`, `/abc/`, and `/abc/def` would all
     * match the prefix `/abc`, but the path `/abcd` would not.
     *
     * ReplacePrefixMatch is only compatible with a `PathPrefix` HTTPRouteMatch.
     * Using any other HTTPRouteMatch type on the same HTTPRouteRule will result in
     * the implementation setting the Accepted Condition for the Route to `status: False`.
     *
     * Request Path | Prefix Match | Replace Prefix | Modified Path
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPath#replacePrefixMatch
     */
    readonly replacePrefixMatch?: string;
    /**
     * Type defines the type of path modifier. Additional types may be
     * added in a future release of the API.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPath#type
     */
    readonly type: HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPathType;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPath' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPath(obj: HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPath | undefined): Record<string, any> | undefined;
/**
 * Scheme is the scheme to be used in the value of the `Location` header in
 * the response. When empty, the scheme of the request is used.
 *
 * Scheme redirects can affect the port of the redirect, for more information,
 * refer to the documentation for the port field of this filter.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirectScheme
 */
export declare enum HttpRouteSpecRulesBackendRefsFiltersRequestRedirectScheme {
    /** http */
    HTTP = "http",
    /** https */
    HTTPS = "https"
}
/**
 * StatusCode is the HTTP status code to be used in response.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * Support: Core
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirectStatusCode
 */
export declare enum HttpRouteSpecRulesBackendRefsFiltersRequestRedirectStatusCode {
    /** 301 */
    VALUE_301 = 301,
    /** 302 */
    VALUE_302 = 302
}
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd
 */
export interface HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd(obj: HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet
 */
export interface HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet(obj: HttpRouteSpecRulesBackendRefsFiltersResponseHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * Path defines a path rewrite.
 *
 * Support: Extended
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersUrlRewritePath
 */
export interface HttpRouteSpecRulesBackendRefsFiltersUrlRewritePath {
    /**
     * ReplaceFullPath specifies the value with which to replace the full path
     * of a request during a rewrite or redirect.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersUrlRewritePath#replaceFullPath
     */
    readonly replaceFullPath?: string;
    /**
     * ReplacePrefixMatch specifies the value with which to replace the prefix
     * match of a request during a rewrite or redirect. For example, a request
     * to "/foo/bar" with a prefix match of "/foo" and a ReplacePrefixMatch
     * of "/xyz" would be modified to "/xyz/bar".
     *
     * Note that this matches the behavior of the PathPrefix match type. This
     * matches full path elements. A path element refers to the list of labels
     * in the path split by the `/` separator. When specified, a trailing `/` is
     * ignored. For example, the paths `/abc`, `/abc/`, and `/abc/def` would all
     * match the prefix `/abc`, but the path `/abcd` would not.
     *
     * ReplacePrefixMatch is only compatible with a `PathPrefix` HTTPRouteMatch.
     * Using any other HTTPRouteMatch type on the same HTTPRouteRule will result in
     * the implementation setting the Accepted Condition for the Route to `status: False`.
     *
     * Request Path | Prefix Match | Replace Prefix | Modified Path
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersUrlRewritePath#replacePrefixMatch
     */
    readonly replacePrefixMatch?: string;
    /**
     * Type defines the type of path modifier. Additional types may be
     * added in a future release of the API.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteSpecRulesBackendRefsFiltersUrlRewritePath#type
     */
    readonly type: HttpRouteSpecRulesBackendRefsFiltersUrlRewritePathType;
}
/**
 * Converts an object of type 'HttpRouteSpecRulesBackendRefsFiltersUrlRewritePath' to JSON representation.
 */
export declare function toJson_HttpRouteSpecRulesBackendRefsFiltersUrlRewritePath(obj: HttpRouteSpecRulesBackendRefsFiltersUrlRewritePath | undefined): Record<string, any> | undefined;
/**
 * Type defines the type of path modifier. Additional types may be
 * added in a future release of the API.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteSpecRulesFiltersRequestRedirectPathType
 */
export declare enum HttpRouteSpecRulesFiltersRequestRedirectPathType {
    /** ReplaceFullPath */
    REPLACE_FULL_PATH = "ReplaceFullPath",
    /** ReplacePrefixMatch */
    REPLACE_PREFIX_MATCH = "ReplacePrefixMatch"
}
/**
 * Type defines the type of path modifier. Additional types may be
 * added in a future release of the API.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteSpecRulesFiltersUrlRewritePathType
 */
export declare enum HttpRouteSpecRulesFiltersUrlRewritePathType {
    /** ReplaceFullPath */
    REPLACE_FULL_PATH = "ReplaceFullPath",
    /** ReplacePrefixMatch */
    REPLACE_PREFIX_MATCH = "ReplacePrefixMatch"
}
/**
 * Type defines the type of path modifier. Additional types may be
 * added in a future release of the API.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPathType
 */
export declare enum HttpRouteSpecRulesBackendRefsFiltersRequestRedirectPathType {
    /** ReplaceFullPath */
    REPLACE_FULL_PATH = "ReplaceFullPath",
    /** ReplacePrefixMatch */
    REPLACE_PREFIX_MATCH = "ReplacePrefixMatch"
}
/**
 * Type defines the type of path modifier. Additional types may be
 * added in a future release of the API.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteSpecRulesBackendRefsFiltersUrlRewritePathType
 */
export declare enum HttpRouteSpecRulesBackendRefsFiltersUrlRewritePathType {
    /** ReplaceFullPath */
    REPLACE_FULL_PATH = "ReplaceFullPath",
    /** ReplacePrefixMatch */
    REPLACE_PREFIX_MATCH = "ReplacePrefixMatch"
}
/**
 * HTTPRoute provides a way to route HTTP requests. This includes the capability
to match requests by hostname, path, header, or query param. Filters can be
used to specify additional processing steps. Backends specify where matching
requests should be routed.
 *
 * @schema HTTPRouteV1Beta1
 */
export declare class HttpRouteV1Beta1 extends ApiObject {
    /**
     * Returns the apiVersion and kind for "HTTPRouteV1Beta1"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "HTTPRouteV1Beta1".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: HttpRouteV1Beta1Props): any;
    /**
     * Defines a "HTTPRouteV1Beta1" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: HttpRouteV1Beta1Props);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * HTTPRoute provides a way to route HTTP requests. This includes the capability
 * to match requests by hostname, path, header, or query param. Filters can be
 * used to specify additional processing steps. Backends specify where matching
 * requests should be routed.
 *
 * @schema HTTPRouteV1Beta1
 */
export interface HttpRouteV1Beta1Props {
    /**
     * @schema HTTPRouteV1Beta1#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec defines the desired state of HTTPRoute.
     *
     * @schema HTTPRouteV1Beta1#spec
     */
    readonly spec: HttpRouteV1Beta1Spec;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1Props' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1Props(obj: HttpRouteV1Beta1Props | undefined): Record<string, any> | undefined;
/**
 * Spec defines the desired state of HTTPRoute.
 *
 * @schema HttpRouteV1Beta1Spec
 */
export interface HttpRouteV1Beta1Spec {
    /**
     * Hostnames defines a set of hostnames that should match against the HTTP Host
     * header to select a HTTPRoute used to process the request. Implementations
     * MUST ignore any port value specified in the HTTP Host header while
     * performing a match and (absent of any applicable header modification
     * configuration) MUST forward this header unmodified to the backend.
     *
     * Valid values for Hostnames are determined by RFC 1123 definition of a
     * hostname with 2 notable exceptions:
     *
     * 1. IPs are not allowed.
     * 2. A hostname may be prefixed with a wildcard label (`*.`). The wildcard
     * label must appear by itself as the first label.
     *
     * If a hostname is specified by both the Listener and HTTPRoute, there
     * must be at least one intersecting hostname for the HTTPRoute to be
     * attached to the Listener. For example:
     *
     * * A Listener with `test.example.com` as the hostname matches HTTPRoutes
     * that have either not specified any hostnames, or have specified at
     * least one of `test.example.com` or `*.example.com`.
     * * A Listener with `*.example.com` as the hostname matches HTTPRoutes
     * that have either not specified any hostnames or have specified at least
     * one hostname that matches the Listener hostname. For example,
     * `*.example.com`, `test.example.com`, and `foo.test.example.com` would
     * all match. On the other hand, `example.com` and `test.example.net` would
     * not match.
     *
     * Hostnames that are prefixed with a wildcard label (`*.`) are interpreted
     * as a suffix match. That means that a match for `*.example.com` would match
     * both `test.example.com`, and `foo.test.example.com`, but not `example.com`.
     *
     * If both the Listener and HTTPRoute have specified hostnames, any
     * HTTPRoute hostnames that do not match the Listener hostname MUST be
     * ignored. For example, if a Listener specified `*.example.com`, and the
     * HTTPRoute specified `test.example.com` and `test.example.net`,
     * `test.example.net` must not be considered for a match.
     *
     * If both the Listener and HTTPRoute have specified hostnames, and none
     * match with the criteria above, then the HTTPRoute is not accepted. The
     * implementation must raise an 'Accepted' Condition with a status of
     * `False` in the corresponding RouteParentStatus.
     *
     * In the event that multiple HTTPRoutes specify intersecting hostnames (e.g.
     * overlapping wildcard matching and exact matching hostnames), precedence must
     * be given to rules from the HTTPRoute with the largest number of:
     *
     * * Characters in a matching non-wildcard hostname.
     * * Characters in a matching hostname.
     *
     * If ties exist across multiple Routes, the matching precedence rules for
     * HTTPRouteMatches takes over.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1Spec#hostnames
     */
    readonly hostnames?: string[];
    /**
     * ParentRefs references the resources (usually Gateways) that a Route wants
     * to be attached to. Note that the referenced parent resource needs to
     * allow this for the attachment to be complete. For Gateways, that means
     * the Gateway needs to allow attachment from Routes of this kind and
     * namespace. For Services, that means the Service must either be in the same
     * namespace for a "producer" route, or the mesh implementation must support
     * and allow "consumer" routes for the referenced Service. ReferenceGrant is
     * not applicable for governing ParentRefs to Services - it is not possible to
     * create a "producer" route for a Service in a different namespace from the
     * Route.
     *
     * There are two kinds of parent resources with "Core" support:
     *
     * * Gateway (Gateway conformance profile)
     * * Service (Mesh conformance profile, ClusterIP Services only)
     *
     * This API may be extended in the future to support additional kinds of parent
     * resources.
     *
     * ParentRefs must be _distinct_. This means either that:
     *
     * * They select different objects.  If this is the case, then parentRef
     * entries are distinct. In terms of fields, this means that the
     * multi-part key defined by `group`, `kind`, `namespace`, and `name` must
     * be unique across all parentRef entries in the Route.
     * * They do not select different objects, but for each optional field used,
     * each ParentRef that selects the same object must set the same set of
     * optional fields to different values. If one ParentRef sets a
     * combination of optional fields, all must set the same combination.
     *
     * Some examples:
     *
     * * If one ParentRef sets `sectionName`, all ParentRefs referencing the
     * same object must also set `sectionName`.
     * * If one ParentRef sets `port`, all ParentRefs referencing the same
     * object must also set `port`.
     * * If one ParentRef sets `sectionName` and `port`, all ParentRefs
     * referencing the same object must also set `sectionName` and `port`.
     *
     * It is possible to separately reference multiple distinct objects that may
     * be collapsed by an implementation. For example, some implementations may
     * choose to merge compatible Gateway Listeners together. If that is the
     * case, the list of routes attached to those resources should also be
     * merged.
     *
     * Note that for ParentRefs that cross namespace boundaries, there are specific
     * rules. Cross-namespace references are only valid if they are explicitly
     * allowed by something in the namespace they are referring to. For example,
     * Gateway has the AllowedRoutes field, and ReferenceGrant provides a
     * generic way to enable other kinds of cross-namespace reference.
     *
     * @schema HttpRouteV1Beta1Spec#parentRefs
     */
    readonly parentRefs?: HttpRouteV1Beta1SpecParentRefs[];
    /**
     * Rules are a list of HTTP matchers, filters and actions.
     *
     * @schema HttpRouteV1Beta1Spec#rules
     */
    readonly rules?: HttpRouteV1Beta1SpecRules[];
}
/**
 * Converts an object of type 'HttpRouteV1Beta1Spec' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1Spec(obj: HttpRouteV1Beta1Spec | undefined): Record<string, any> | undefined;
/**
 * ParentReference identifies an API object (usually a Gateway) that can be considered
 * a parent of this resource (usually a route). There are two kinds of parent resources
 * with "Core" support:
 *
 * * Gateway (Gateway conformance profile)
 * * Service (Mesh conformance profile, ClusterIP Services only)
 *
 * This API may be extended in the future to support additional kinds of parent
 * resources.
 *
 * The API object must be valid in the cluster; the Group and Kind must
 * be registered in the cluster for this reference to be valid.
 *
 * @schema HttpRouteV1Beta1SpecParentRefs
 */
export interface HttpRouteV1Beta1SpecParentRefs {
    /**
     * Group is the group of the referent.
     * When unspecified, "gateway.networking.k8s.io" is inferred.
     * To set the core API group (such as for a "Service" kind referent),
     * Group must be explicitly set to "" (empty string).
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecParentRefs#group
     */
    readonly group?: string;
    /**
     * Kind is kind of the referent.
     *
     * There are two kinds of parent resources with "Core" support:
     *
     * * Gateway (Gateway conformance profile)
     * * Service (Mesh conformance profile, ClusterIP Services only)
     *
     * Support for other resources is Implementation-Specific.
     *
     * @schema HttpRouteV1Beta1SpecParentRefs#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecParentRefs#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the referent. When unspecified, this refers
     * to the local namespace of the Route.
     *
     * Note that there are specific rules for ParentRefs which cross namespace
     * boundaries. Cross-namespace references are only valid if they are explicitly
     * allowed by something in the namespace they are referring to. For example:
     * Gateway has the AllowedRoutes field, and ReferenceGrant provides a
     * generic way to enable any other kind of cross-namespace reference.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecParentRefs#namespace
     */
    readonly namespace?: string;
    /**
     * Port is the network port this Route targets. It can be interpreted
     * differently based on the type of parent resource.
     *
     * When the parent resource is a Gateway, this targets all listeners
     * listening on the specified port that also support this kind of Route(and
     * select this Route). It's not recommended to set `Port` unless the
     * networking behaviors specified in a Route must apply to a specific port
     * as opposed to a listener(s) whose port(s) may be changed. When both Port
     * and SectionName are specified, the name and port of the selected listener
     * must match both specified values.
     *
     * Implementations MAY choose to support other parent resources.
     * Implementations supporting other types of parent resources MUST clearly
     * document how/if Port is interpreted.
     *
     * For the purpose of status, an attachment is considered successful as
     * long as the parent resource accepts it partially. For example, Gateway
     * listeners can restrict which Routes can attach to them by Route kind,
     * namespace, or hostname. If 1 of 2 Gateway listeners accept attachment
     * from the referencing Route, the Route MUST be considered successfully
     * attached. If no Gateway listeners accept attachment from this Route,
     * the Route MUST be considered detached from the Gateway.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecParentRefs#port
     */
    readonly port?: number;
    /**
     * SectionName is the name of a section within the target resource. In the
     * following resources, SectionName is interpreted as the following:
     *
     * * Gateway: Listener name. When both Port (experimental) and SectionName
     * are specified, the name and port of the selected listener must match
     * both specified values.
     * * Service: Port name. When both Port (experimental) and SectionName
     * are specified, the name and port of the selected listener must match
     * both specified values.
     *
     * Implementations MAY choose to support attaching Routes to other resources.
     * If that is the case, they MUST clearly document how SectionName is
     * interpreted.
     *
     * When unspecified (empty string), this will reference the entire resource.
     * For the purpose of status, an attachment is considered successful if at
     * least one section in the parent resource accepts it. For example, Gateway
     * listeners can restrict which Routes can attach to them by Route kind,
     * namespace, or hostname. If 1 of 2 Gateway listeners accept attachment from
     * the referencing Route, the Route MUST be considered successfully
     * attached. If no Gateway listeners accept attachment from this Route, the
     * Route MUST be considered detached from the Gateway.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecParentRefs#sectionName
     */
    readonly sectionName?: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecParentRefs' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecParentRefs(obj: HttpRouteV1Beta1SpecParentRefs | undefined): Record<string, any> | undefined;
/**
 * HTTPRouteRule defines semantics for matching an HTTP request based on
 * conditions (matches), processing it (filters), and forwarding the request to
 * an API object (backendRefs).
 *
 * @schema HttpRouteV1Beta1SpecRules
 */
export interface HttpRouteV1Beta1SpecRules {
    /**
     * BackendRefs defines the backend(s) where matching requests should be
     * sent.
     *
     * Failure behavior here depends on how many BackendRefs are specified and
     * how many are invalid.
     *
     * If *all* entries in BackendRefs are invalid, and there are also no filters
     * specified in this route rule, *all* traffic which matches this rule MUST
     * receive a 500 status code.
     *
     * See the HTTPBackendRef definition for the rules about what makes a single
     * HTTPBackendRef invalid.
     *
     * When a HTTPBackendRef is invalid, 500 status codes MUST be returned for
     * requests that would have otherwise been routed to an invalid backend. If
     * multiple backends are specified, and some are invalid, the proportion of
     * requests that would otherwise have been routed to an invalid backend
     * MUST receive a 500 status code.
     *
     * For example, if two backends are specified with equal weights, and one is
     * invalid, 50 percent of traffic must receive a 500. Implementations may
     * choose how that 50 percent is determined.
     *
     * When a HTTPBackendRef refers to a Service that has no ready endpoints,
     * implementations SHOULD return a 503 for requests to that backend instead.
     * If an implementation chooses to do this, all of the above rules for 500 responses
     * MUST also apply for responses that return a 503.
     *
     * Support: Core for Kubernetes Service
     *
     * Support: Extended for Kubernetes ServiceImport
     *
     * Support: Implementation-specific for any other resource
     *
     * Support for weight: Core
     *
     * @schema HttpRouteV1Beta1SpecRules#backendRefs
     */
    readonly backendRefs?: HttpRouteV1Beta1SpecRulesBackendRefs[];
    /**
     * Filters define the filters that are applied to requests that match
     * this rule.
     *
     * Wherever possible, implementations SHOULD implement filters in the order
     * they are specified.
     *
     * Implementations MAY choose to implement this ordering strictly, rejecting
     * any combination or order of filters that cannot be supported. If implementations
     * choose a strict interpretation of filter ordering, they MUST clearly document
     * that behavior.
     *
     * To reject an invalid combination or order of filters, implementations SHOULD
     * consider the Route Rules with this configuration invalid. If all Route Rules
     * in a Route are invalid, the entire Route would be considered invalid. If only
     * a portion of Route Rules are invalid, implementations MUST set the
     * "PartiallyInvalid" condition for the Route.
     *
     * Conformance-levels at this level are defined based on the type of filter:
     *
     * - ALL core filters MUST be supported by all implementations.
     * - Implementers are encouraged to support extended filters.
     * - Implementation-specific custom filters have no API guarantees across
     * implementations.
     *
     * Specifying the same filter multiple times is not supported unless explicitly
     * indicated in the filter.
     *
     * All filters are expected to be compatible with each other except for the
     * URLRewrite and RequestRedirect filters, which may not be combined. If an
     * implementation cannot support other combinations of filters, they must clearly
     * document that limitation. In cases where incompatible or unsupported
     * filters are specified and cause the `Accepted` condition to be set to status
     * `False`, implementations may use the `IncompatibleFilters` reason to specify
     * this configuration error.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRules#filters
     */
    readonly filters?: HttpRouteV1Beta1SpecRulesFilters[];
    /**
     * Matches define conditions used for matching the rule against incoming
     * HTTP requests. Each match is independent, i.e. this rule will be matched
     * if **any** one of the matches is satisfied.
     *
     * For example, take the following matches configuration:
     *
     * ```
     * matches:
     * - path:
     * value: "/foo"
     * headers:
     * - name: "version"
     * value: "v2"
     * - path:
     * value: "/v2/foo"
     * ```
     *
     * For a request to match against this rule, a request must satisfy
     * EITHER of the two conditions:
     *
     * - path prefixed with `/foo` AND contains the header `version: v2`
     * - path prefix of `/v2/foo`
     *
     * See the documentation for HTTPRouteMatch on how to specify multiple
     * match conditions that should be ANDed together.
     *
     * If no matches are specified, the default is a prefix
     * path match on "/", which has the effect of matching every
     * HTTP request.
     *
     * Proxy or Load Balancer routing configuration generated from HTTPRoutes
     * MUST prioritize matches based on the following criteria, continuing on
     * ties. Across all rules specified on applicable Routes, precedence must be
     * given to the match having:
     *
     * * "Exact" path match.
     * * "Prefix" path match with largest number of characters.
     * * Method match.
     * * Largest number of header matches.
     * * Largest number of query param matches.
     *
     * Note: The precedence of RegularExpression path matches are implementation-specific.
     *
     * If ties still exist across multiple Routes, matching precedence MUST be
     * determined in order of the following criteria, continuing on ties:
     *
     * * The oldest Route based on creation timestamp.
     * * The Route appearing first in alphabetical order by
     * "{namespace}/{name}".
     *
     * If ties still exist within an HTTPRoute, matching precedence MUST be granted
     * to the FIRST matching rule (in list order) with a match meeting the above
     * criteria.
     *
     * When no rules matching a request have been successfully attached to the
     * parent a request is coming from, a HTTP 404 status code MUST be returned.
     *
     * @schema HttpRouteV1Beta1SpecRules#matches
     */
    readonly matches?: HttpRouteV1Beta1SpecRulesMatches[];
    /**
     * Timeouts defines the timeouts that can be configured for an HTTP request.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRules#timeouts
     */
    readonly timeouts?: HttpRouteV1Beta1SpecRulesTimeouts;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRules' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRules(obj: HttpRouteV1Beta1SpecRules | undefined): Record<string, any> | undefined;
/**
 * HTTPBackendRef defines how a HTTPRoute forwards a HTTP request.
 *
 * Note that when a namespace different than the local namespace is specified, a
 * ReferenceGrant object is required in the referent namespace to allow that
 * namespace's owner to accept the reference. See the ReferenceGrant
 * documentation for details.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefs
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefs {
    /**
     * Filters defined at this level should be executed if and only if the
     * request is being forwarded to the backend defined here.
     *
     * Support: Implementation-specific (For broader support of filters, use the
     * Filters field in HTTPRouteRule.)
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefs#filters
     */
    readonly filters?: HttpRouteV1Beta1SpecRulesBackendRefsFilters[];
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefs#group
     */
    readonly group?: string;
    /**
     * Kind is the Kubernetes resource kind of the referent. For example
     * "Service".
     *
     * Defaults to "Service" when not specified.
     *
     * ExternalName services can refer to CNAME DNS records that may live
     * outside of the cluster and as such are difficult to reason about in
     * terms of conformance. They also may not be safe to forward to (see
     * CVE-2021-25740 for more information). Implementations SHOULD NOT
     * support ExternalName Services.
     *
     * Support: Core (Services with a type other than ExternalName)
     *
     * Support: Implementation-specific (Services with type ExternalName)
     *
     * @default Service" when not specified.
     * @schema HttpRouteV1Beta1SpecRulesBackendRefs#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefs#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the backend. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefs#namespace
     */
    readonly namespace?: string;
    /**
     * Port specifies the destination port number to use for this resource.
     * Port is required when the referent is a Kubernetes Service. In this
     * case, the port number is the service port number, not the target port.
     * For other resources, destination port might be derived from the referent
     * resource or this field.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefs#port
     */
    readonly port?: number;
    /**
     * Weight specifies the proportion of requests forwarded to the referenced
     * backend. This is computed as weight/(sum of all weights in this
     * BackendRefs list). For non-zero values, there may be some epsilon from
     * the exact proportion defined here depending on the precision an
     * implementation supports. Weight is not a percentage and the sum of
     * weights does not need to equal 100.
     *
     * If only one backend is specified and it has a weight greater than 0, 100%
     * of the traffic is forwarded to that backend. If weight is set to 0, no
     * traffic should be forwarded for this entry. If unspecified, weight
     * defaults to 1.
     *
     * Support for this field varies based on the context where used.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefs#weight
     */
    readonly weight?: number;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefs' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefs(obj: HttpRouteV1Beta1SpecRulesBackendRefs | undefined): Record<string, any> | undefined;
/**
 * HTTPRouteFilter defines processing steps that must be completed during the
 * request or response lifecycle. HTTPRouteFilters are meant as an extension
 * point to express processing that may be done in Gateway implementations. Some
 * examples include request or response modification, implementing
 * authentication strategies, rate-limiting, and traffic shaping. API
 * guarantee/conformance is defined based on the type of the filter.
 *
 * @schema HttpRouteV1Beta1SpecRulesFilters
 */
export interface HttpRouteV1Beta1SpecRulesFilters {
    /**
     * ExtensionRef is an optional, implementation-specific extension to the
     * "filter" behavior.  For example, resource "myroutefilter" in group
     * "networking.example.net"). ExtensionRef MUST NOT be used for core and
     * extended filters.
     *
     * This filter can be used multiple times within the same rule.
     *
     * Support: Implementation-specific
     *
     * @schema HttpRouteV1Beta1SpecRulesFilters#extensionRef
     */
    readonly extensionRef?: HttpRouteV1Beta1SpecRulesFiltersExtensionRef;
    /**
     * RequestHeaderModifier defines a schema for a filter that modifies request
     * headers.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesFilters#requestHeaderModifier
     */
    readonly requestHeaderModifier?: HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifier;
    /**
     * RequestMirror defines a schema for a filter that mirrors requests.
     * Requests are sent to the specified destination, but responses from
     * that destination are ignored.
     *
     * This filter can be used multiple times within the same rule. Note that
     * not all implementations will be able to support mirroring to multiple
     * backends.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesFilters#requestMirror
     */
    readonly requestMirror?: HttpRouteV1Beta1SpecRulesFiltersRequestMirror;
    /**
     * RequestRedirect defines a schema for a filter that responds to the
     * request with an HTTP redirection.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesFilters#requestRedirect
     */
    readonly requestRedirect?: HttpRouteV1Beta1SpecRulesFiltersRequestRedirect;
    /**
     * ResponseHeaderModifier defines a schema for a filter that modifies response
     * headers.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesFilters#responseHeaderModifier
     */
    readonly responseHeaderModifier?: HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifier;
    /**
     * Type identifies the type of filter to apply. As with other API fields,
     * types are classified into three conformance levels:
     *
     * - Core: Filter types and their corresponding configuration defined by
     * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
     * implementations must support core filters.
     *
     * - Extended: Filter types and their corresponding configuration defined by
     * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
     * are encouraged to support extended filters.
     *
     * - Implementation-specific: Filters that are defined and supported by
     * specific vendors.
     * In the future, filters showing convergence in behavior across multiple
     * implementations will be considered for inclusion in extended or core
     * conformance levels. Filter-specific configuration for such filters
     * is specified using the ExtensionRef field. `Type` should be set to
     * "ExtensionRef" for custom filters.
     *
     * Implementers are encouraged to define custom implementation types to
     * extend the core API with implementation-specific behavior.
     *
     * If a reference to a custom filter type cannot be resolved, the filter
     * MUST NOT be skipped. Instead, requests that would have been processed by
     * that filter MUST receive a HTTP error response.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteV1Beta1SpecRulesFilters#type
     */
    readonly type: HttpRouteV1Beta1SpecRulesFiltersType;
    /**
     * URLRewrite defines a schema for a filter that modifies a request during forwarding.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesFilters#urlRewrite
     */
    readonly urlRewrite?: HttpRouteV1Beta1SpecRulesFiltersUrlRewrite;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFilters' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFilters(obj: HttpRouteV1Beta1SpecRulesFilters | undefined): Record<string, any> | undefined;
/**
 * HTTPRouteMatch defines the predicate used to match requests to a given
 * action. Multiple match types are ANDed together, i.e. the match will
 * evaluate to true only if all conditions are satisfied.
 *
 * For example, the match below will match a HTTP request only if its path
 * starts with `/foo` AND it contains the `version: v1` header:
 *
 * ```
 * match:
 *
 * path:
 * value: "/foo"
 * headers:
 * - name: "version"
 * value "v1"
 *
 * ```
 *
 * @schema HttpRouteV1Beta1SpecRulesMatches
 */
export interface HttpRouteV1Beta1SpecRulesMatches {
    /**
     * Headers specifies HTTP request header matchers. Multiple match values are
     * ANDed together, meaning, a request must match all the specified headers
     * to select the route.
     *
     * @schema HttpRouteV1Beta1SpecRulesMatches#headers
     */
    readonly headers?: HttpRouteV1Beta1SpecRulesMatchesHeaders[];
    /**
     * Method specifies HTTP method matcher.
     * When specified, this route will be matched only if the request has the
     * specified method.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesMatches#method
     */
    readonly method?: HttpRouteV1Beta1SpecRulesMatchesMethod;
    /**
     * Path specifies a HTTP request path matcher. If this field is not
     * specified, a default prefix match on the "/" path is provided.
     *
     * @schema HttpRouteV1Beta1SpecRulesMatches#path
     */
    readonly path?: HttpRouteV1Beta1SpecRulesMatchesPath;
    /**
     * QueryParams specifies HTTP query parameter matchers. Multiple match
     * values are ANDed together, meaning, a request must match all the
     * specified query parameters to select the route.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesMatches#queryParams
     */
    readonly queryParams?: HttpRouteV1Beta1SpecRulesMatchesQueryParams[];
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesMatches' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesMatches(obj: HttpRouteV1Beta1SpecRulesMatches | undefined): Record<string, any> | undefined;
/**
 * Timeouts defines the timeouts that can be configured for an HTTP request.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesTimeouts
 */
export interface HttpRouteV1Beta1SpecRulesTimeouts {
    /**
     * BackendRequest specifies a timeout for an individual request from the gateway
     * to a backend. This covers the time from when the request first starts being
     * sent from the gateway to when the full response has been received from the backend.
     *
     * Setting a timeout to the zero duration (e.g. "0s") SHOULD disable the timeout
     * completely. Implementations that cannot completely disable the timeout MUST
     * instead interpret the zero duration as the longest possible value to which
     * the timeout can be set.
     *
     * An entire client HTTP transaction with a gateway, covered by the Request timeout,
     * may result in more than one call from the gateway to the destination backend,
     * for example, if automatic retries are supported.
     *
     * The value of BackendRequest must be a Gateway API Duration string as defined by
     * GEP-2257.  When this field is unspecified, its behavior is implementation-specific;
     * when specified, the value of BackendRequest must be no more than the value of the
     * Request timeout (since the Request timeout encompasses the BackendRequest timeout).
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesTimeouts#backendRequest
     */
    readonly backendRequest?: string;
    /**
     * Request specifies the maximum duration for a gateway to respond to an HTTP request.
     * If the gateway has not been able to respond before this deadline is met, the gateway
     * MUST return a timeout error.
     *
     * For example, setting the `rules.timeouts.request` field to the value `10s` in an
     * `HTTPRoute` will cause a timeout if a client request is taking longer than 10 seconds
     * to complete.
     *
     * Setting a timeout to the zero duration (e.g. "0s") SHOULD disable the timeout
     * completely. Implementations that cannot completely disable the timeout MUST
     * instead interpret the zero duration as the longest possible value to which
     * the timeout can be set.
     *
     * This timeout is intended to cover as close to the whole request-response transaction
     * as possible although an implementation MAY choose to start the timeout after the entire
     * request stream has been received instead of immediately after the transaction is
     * initiated by the client.
     *
     * The value of Request is a Gateway API Duration string as defined by GEP-2257. When this
     * field is unspecified, request timeout behavior is implementation-specific.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesTimeouts#request
     */
    readonly request?: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesTimeouts' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesTimeouts(obj: HttpRouteV1Beta1SpecRulesTimeouts | undefined): Record<string, any> | undefined;
/**
 * HTTPRouteFilter defines processing steps that must be completed during the
 * request or response lifecycle. HTTPRouteFilters are meant as an extension
 * point to express processing that may be done in Gateway implementations. Some
 * examples include request or response modification, implementing
 * authentication strategies, rate-limiting, and traffic shaping. API
 * guarantee/conformance is defined based on the type of the filter.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFilters
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFilters {
    /**
     * ExtensionRef is an optional, implementation-specific extension to the
     * "filter" behavior.  For example, resource "myroutefilter" in group
     * "networking.example.net"). ExtensionRef MUST NOT be used for core and
     * extended filters.
     *
     * This filter can be used multiple times within the same rule.
     *
     * Support: Implementation-specific
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFilters#extensionRef
     */
    readonly extensionRef?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersExtensionRef;
    /**
     * RequestHeaderModifier defines a schema for a filter that modifies request
     * headers.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFilters#requestHeaderModifier
     */
    readonly requestHeaderModifier?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifier;
    /**
     * RequestMirror defines a schema for a filter that mirrors requests.
     * Requests are sent to the specified destination, but responses from
     * that destination are ignored.
     *
     * This filter can be used multiple times within the same rule. Note that
     * not all implementations will be able to support mirroring to multiple
     * backends.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFilters#requestMirror
     */
    readonly requestMirror?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirror;
    /**
     * RequestRedirect defines a schema for a filter that responds to the
     * request with an HTTP redirection.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFilters#requestRedirect
     */
    readonly requestRedirect?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect;
    /**
     * ResponseHeaderModifier defines a schema for a filter that modifies response
     * headers.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFilters#responseHeaderModifier
     */
    readonly responseHeaderModifier?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifier;
    /**
     * Type identifies the type of filter to apply. As with other API fields,
     * types are classified into three conformance levels:
     *
     * - Core: Filter types and their corresponding configuration defined by
     * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
     * implementations must support core filters.
     *
     * - Extended: Filter types and their corresponding configuration defined by
     * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
     * are encouraged to support extended filters.
     *
     * - Implementation-specific: Filters that are defined and supported by
     * specific vendors.
     * In the future, filters showing convergence in behavior across multiple
     * implementations will be considered for inclusion in extended or core
     * conformance levels. Filter-specific configuration for such filters
     * is specified using the ExtensionRef field. `Type` should be set to
     * "ExtensionRef" for custom filters.
     *
     * Implementers are encouraged to define custom implementation types to
     * extend the core API with implementation-specific behavior.
     *
     * If a reference to a custom filter type cannot be resolved, the filter
     * MUST NOT be skipped. Instead, requests that would have been processed by
     * that filter MUST receive a HTTP error response.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFilters#type
     */
    readonly type: HttpRouteV1Beta1SpecRulesBackendRefsFiltersType;
    /**
     * URLRewrite defines a schema for a filter that modifies a request during forwarding.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFilters#urlRewrite
     */
    readonly urlRewrite?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewrite;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFilters' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFilters(obj: HttpRouteV1Beta1SpecRulesBackendRefsFilters | undefined): Record<string, any> | undefined;
/**
 * ExtensionRef is an optional, implementation-specific extension to the
 * "filter" behavior.  For example, resource "myroutefilter" in group
 * "networking.example.net"). ExtensionRef MUST NOT be used for core and
 * extended filters.
 *
 * This filter can be used multiple times within the same rule.
 *
 * Support: Implementation-specific
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersExtensionRef
 */
export interface HttpRouteV1Beta1SpecRulesFiltersExtensionRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersExtensionRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent. For example "HTTPRoute" or "Service".
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersExtensionRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersExtensionRef#name
     */
    readonly name: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersExtensionRef' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersExtensionRef(obj: HttpRouteV1Beta1SpecRulesFiltersExtensionRef | undefined): Record<string, any> | undefined;
/**
 * RequestHeaderModifier defines a schema for a filter that modifies request
 * headers.
 *
 * Support: Core
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifier
 */
export interface HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifier#add
     */
    readonly add?: HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifier#set
     */
    readonly set?: HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierSet[];
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifier' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifier(obj: HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * RequestMirror defines a schema for a filter that mirrors requests.
 * Requests are sent to the specified destination, but responses from
 * that destination are ignored.
 *
 * This filter can be used multiple times within the same rule. Note that
 * not all implementations will be able to support mirroring to multiple
 * backends.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirror
 */
export interface HttpRouteV1Beta1SpecRulesFiltersRequestMirror {
    /**
     * BackendRef references a resource where mirrored requests are sent.
     *
     * Mirrored requests must be sent only to a single destination endpoint
     * within this BackendRef, irrespective of how many endpoints are present
     * within this BackendRef.
     *
     * If the referent cannot be found, this BackendRef is invalid and must be
     * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
     * condition on the Route status is set to `status: False` and not configure
     * this backend in the underlying implementation.
     *
     * If there is a cross-namespace reference to an *existing* object
     * that is not allowed by a ReferenceGrant, the controller must ensure the
     * "ResolvedRefs"  condition on the Route is set to `status: False`,
     * with the "RefNotPermitted" reason and not configure this backend in the
     * underlying implementation.
     *
     * In either error case, the Message of the `ResolvedRefs` Condition
     * should be used to provide more detail about the problem.
     *
     * Support: Extended for Kubernetes Service
     *
     * Support: Implementation-specific for any other resource
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirror#backendRef
     */
    readonly backendRef: HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef;
    /**
     * Fraction represents the fraction of requests that should be
     * mirrored to BackendRef.
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirror#fraction
     */
    readonly fraction?: HttpRouteV1Beta1SpecRulesFiltersRequestMirrorFraction;
    /**
     * Percent represents the percentage of requests that should be
     * mirrored to BackendRef. Its minimum value is 0 (indicating 0% of
     * requests) and its maximum value is 100 (indicating 100% of requests).
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirror#percent
     */
    readonly percent?: number;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersRequestMirror' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersRequestMirror(obj: HttpRouteV1Beta1SpecRulesFiltersRequestMirror | undefined): Record<string, any> | undefined;
/**
 * RequestRedirect defines a schema for a filter that responds to the
 * request with an HTTP redirection.
 *
 * Support: Core
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirect
 */
export interface HttpRouteV1Beta1SpecRulesFiltersRequestRedirect {
    /**
     * Hostname is the hostname to be used in the value of the `Location`
     * header in the response.
     * When empty, the hostname in the `Host` header of the request is used.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirect#hostname
     */
    readonly hostname?: string;
    /**
     * Path defines parameters used to modify the path of the incoming request.
     * The modified path is then used to construct the `Location` header. When
     * empty, the request path is used as-is.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirect#path
     */
    readonly path?: HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPath;
    /**
     * Port is the port to be used in the value of the `Location`
     * header in the response.
     *
     * If no port is specified, the redirect port MUST be derived using the
     * following rules:
     *
     * * If redirect scheme is not-empty, the redirect port MUST be the well-known
     * port associated with the redirect scheme. Specifically "http" to port 80
     * and "https" to port 443. If the redirect scheme does not have a
     * well-known port, the listener port of the Gateway SHOULD be used.
     * * If redirect scheme is empty, the redirect port MUST be the Gateway
     * Listener port.
     *
     * Implementations SHOULD NOT add the port number in the 'Location'
     * header in the following cases:
     *
     * * A Location header that will use HTTP (whether that is determined via
     * the Listener protocol or the Scheme field) _and_ use port 80.
     * * A Location header that will use HTTPS (whether that is determined via
     * the Listener protocol or the Scheme field) _and_ use port 443.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirect#port
     */
    readonly port?: number;
    /**
     * Scheme is the scheme to be used in the value of the `Location` header in
     * the response. When empty, the scheme of the request is used.
     *
     * Scheme redirects can affect the port of the redirect, for more information,
     * refer to the documentation for the port field of this filter.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirect#scheme
     */
    readonly scheme?: HttpRouteV1Beta1SpecRulesFiltersRequestRedirectScheme;
    /**
     * StatusCode is the HTTP status code to be used in response.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirect#statusCode
     */
    readonly statusCode?: HttpRouteV1Beta1SpecRulesFiltersRequestRedirectStatusCode;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersRequestRedirect' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersRequestRedirect(obj: HttpRouteV1Beta1SpecRulesFiltersRequestRedirect | undefined): Record<string, any> | undefined;
/**
 * ResponseHeaderModifier defines a schema for a filter that modifies response
 * headers.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifier
 */
export interface HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifier#add
     */
    readonly add?: HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifier#set
     */
    readonly set?: HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierSet[];
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifier' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifier(obj: HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * Type identifies the type of filter to apply. As with other API fields,
 * types are classified into three conformance levels:
 *
 * - Core: Filter types and their corresponding configuration defined by
 * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
 * implementations must support core filters.
 *
 * - Extended: Filter types and their corresponding configuration defined by
 * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
 * are encouraged to support extended filters.
 *
 * - Implementation-specific: Filters that are defined and supported by
 * specific vendors.
 * In the future, filters showing convergence in behavior across multiple
 * implementations will be considered for inclusion in extended or core
 * conformance levels. Filter-specific configuration for such filters
 * is specified using the ExtensionRef field. `Type` should be set to
 * "ExtensionRef" for custom filters.
 *
 * Implementers are encouraged to define custom implementation types to
 * extend the core API with implementation-specific behavior.
 *
 * If a reference to a custom filter type cannot be resolved, the filter
 * MUST NOT be skipped. Instead, requests that would have been processed by
 * that filter MUST receive a HTTP error response.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersType
 */
export declare enum HttpRouteV1Beta1SpecRulesFiltersType {
    /** RequestHeaderModifier */
    REQUEST_HEADER_MODIFIER = "RequestHeaderModifier",
    /** ResponseHeaderModifier */
    RESPONSE_HEADER_MODIFIER = "ResponseHeaderModifier",
    /** RequestMirror */
    REQUEST_MIRROR = "RequestMirror",
    /** RequestRedirect */
    REQUEST_REDIRECT = "RequestRedirect",
    /** URLRewrite */
    URL_REWRITE = "URLRewrite",
    /** ExtensionRef */
    EXTENSION_REF = "ExtensionRef"
}
/**
 * URLRewrite defines a schema for a filter that modifies a request during forwarding.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersUrlRewrite
 */
export interface HttpRouteV1Beta1SpecRulesFiltersUrlRewrite {
    /**
     * Hostname is the value to be used to replace the Host header value during
     * forwarding.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersUrlRewrite#hostname
     */
    readonly hostname?: string;
    /**
     * Path defines a path rewrite.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersUrlRewrite#path
     */
    readonly path?: HttpRouteV1Beta1SpecRulesFiltersUrlRewritePath;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersUrlRewrite' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersUrlRewrite(obj: HttpRouteV1Beta1SpecRulesFiltersUrlRewrite | undefined): Record<string, any> | undefined;
/**
 * HTTPHeaderMatch describes how to select a HTTP route by matching HTTP request
 * headers.
 *
 * @schema HttpRouteV1Beta1SpecRulesMatchesHeaders
 */
export interface HttpRouteV1Beta1SpecRulesMatchesHeaders {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, only the first
     * entry with an equivalent name MUST be considered for a match. Subsequent
     * entries with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * When a header is repeated in an HTTP request, it is
     * implementation-specific behavior as to how this is represented.
     * Generally, proxies should follow the guidance from the RFC:
     * https://www.rfc-editor.org/rfc/rfc7230.html#section-3.2.2 regarding
     * processing a repeated header, with special handling for "Set-Cookie".
     *
     * @schema HttpRouteV1Beta1SpecRulesMatchesHeaders#name
     */
    readonly name: string;
    /**
     * Type specifies how to match against the value of the header.
     *
     * Support: Core (Exact)
     *
     * Support: Implementation-specific (RegularExpression)
     *
     * Since RegularExpression HeaderMatchType has implementation-specific
     * conformance, implementations can support POSIX, PCRE or any other dialects
     * of regular expressions. Please read the implementation's documentation to
     * determine the supported dialect.
     *
     * @schema HttpRouteV1Beta1SpecRulesMatchesHeaders#type
     */
    readonly type?: HttpRouteV1Beta1SpecRulesMatchesHeadersType;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesMatchesHeaders#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesMatchesHeaders' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesMatchesHeaders(obj: HttpRouteV1Beta1SpecRulesMatchesHeaders | undefined): Record<string, any> | undefined;
/**
 * Method specifies HTTP method matcher.
 * When specified, this route will be matched only if the request has the
 * specified method.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesMatchesMethod
 */
export declare enum HttpRouteV1Beta1SpecRulesMatchesMethod {
    /** GET */
    GET = "GET",
    /** HEAD */
    HEAD = "HEAD",
    /** POST */
    POST = "POST",
    /** PUT */
    PUT = "PUT",
    /** DELETE */
    DELETE = "DELETE",
    /** CONNECT */
    CONNECT = "CONNECT",
    /** OPTIONS */
    OPTIONS = "OPTIONS",
    /** TRACE */
    TRACE = "TRACE",
    /** PATCH */
    PATCH = "PATCH"
}
/**
 * Path specifies a HTTP request path matcher. If this field is not
 * specified, a default prefix match on the "/" path is provided.
 *
 * @schema HttpRouteV1Beta1SpecRulesMatchesPath
 */
export interface HttpRouteV1Beta1SpecRulesMatchesPath {
    /**
     * Type specifies how to match against the path Value.
     *
     * Support: Core (Exact, PathPrefix)
     *
     * Support: Implementation-specific (RegularExpression)
     *
     * @schema HttpRouteV1Beta1SpecRulesMatchesPath#type
     */
    readonly type?: HttpRouteV1Beta1SpecRulesMatchesPathType;
    /**
     * Value of the HTTP path to match against.
     *
     * @schema HttpRouteV1Beta1SpecRulesMatchesPath#value
     */
    readonly value?: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesMatchesPath' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesMatchesPath(obj: HttpRouteV1Beta1SpecRulesMatchesPath | undefined): Record<string, any> | undefined;
/**
 * HTTPQueryParamMatch describes how to select a HTTP route by matching HTTP
 * query parameters.
 *
 * @schema HttpRouteV1Beta1SpecRulesMatchesQueryParams
 */
export interface HttpRouteV1Beta1SpecRulesMatchesQueryParams {
    /**
     * Name is the name of the HTTP query param to be matched. This must be an
     * exact string match. (See
     * https://tools.ietf.org/html/rfc7230#section-2.7.3).
     *
     * If multiple entries specify equivalent query param names, only the first
     * entry with an equivalent name MUST be considered for a match. Subsequent
     * entries with an equivalent query param name MUST be ignored.
     *
     * If a query param is repeated in an HTTP request, the behavior is
     * purposely left undefined, since different data planes have different
     * capabilities. However, it is *recommended* that implementations should
     * match against the first value of the param if the data plane supports it,
     * as this behavior is expected in other load balancing contexts outside of
     * the Gateway API.
     *
     * Users SHOULD NOT route traffic based on repeated query params to guard
     * themselves against potential differences in the implementations.
     *
     * @schema HttpRouteV1Beta1SpecRulesMatchesQueryParams#name
     */
    readonly name: string;
    /**
     * Type specifies how to match against the value of the query parameter.
     *
     * Support: Extended (Exact)
     *
     * Support: Implementation-specific (RegularExpression)
     *
     * Since RegularExpression QueryParamMatchType has Implementation-specific
     * conformance, implementations can support POSIX, PCRE or any other
     * dialects of regular expressions. Please read the implementation's
     * documentation to determine the supported dialect.
     *
     * @schema HttpRouteV1Beta1SpecRulesMatchesQueryParams#type
     */
    readonly type?: HttpRouteV1Beta1SpecRulesMatchesQueryParamsType;
    /**
     * Value is the value of HTTP query param to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesMatchesQueryParams#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesMatchesQueryParams' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesMatchesQueryParams(obj: HttpRouteV1Beta1SpecRulesMatchesQueryParams | undefined): Record<string, any> | undefined;
/**
 * ExtensionRef is an optional, implementation-specific extension to the
 * "filter" behavior.  For example, resource "myroutefilter" in group
 * "networking.example.net"). ExtensionRef MUST NOT be used for core and
 * extended filters.
 *
 * This filter can be used multiple times within the same rule.
 *
 * Support: Implementation-specific
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersExtensionRef
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersExtensionRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersExtensionRef#group
     */
    readonly group: string;
    /**
     * Kind is kind of the referent. For example "HTTPRoute" or "Service".
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersExtensionRef#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersExtensionRef#name
     */
    readonly name: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersExtensionRef' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersExtensionRef(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersExtensionRef | undefined): Record<string, any> | undefined;
/**
 * RequestHeaderModifier defines a schema for a filter that modifies request
 * headers.
 *
 * Support: Core
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifier
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifier#add
     */
    readonly add?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifier#set
     */
    readonly set?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierSet[];
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifier' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifier(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * RequestMirror defines a schema for a filter that mirrors requests.
 * Requests are sent to the specified destination, but responses from
 * that destination are ignored.
 *
 * This filter can be used multiple times within the same rule. Note that
 * not all implementations will be able to support mirroring to multiple
 * backends.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirror
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirror {
    /**
     * BackendRef references a resource where mirrored requests are sent.
     *
     * Mirrored requests must be sent only to a single destination endpoint
     * within this BackendRef, irrespective of how many endpoints are present
     * within this BackendRef.
     *
     * If the referent cannot be found, this BackendRef is invalid and must be
     * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
     * condition on the Route status is set to `status: False` and not configure
     * this backend in the underlying implementation.
     *
     * If there is a cross-namespace reference to an *existing* object
     * that is not allowed by a ReferenceGrant, the controller must ensure the
     * "ResolvedRefs"  condition on the Route is set to `status: False`,
     * with the "RefNotPermitted" reason and not configure this backend in the
     * underlying implementation.
     *
     * In either error case, the Message of the `ResolvedRefs` Condition
     * should be used to provide more detail about the problem.
     *
     * Support: Extended for Kubernetes Service
     *
     * Support: Implementation-specific for any other resource
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirror#backendRef
     */
    readonly backendRef: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef;
    /**
     * Fraction represents the fraction of requests that should be
     * mirrored to BackendRef.
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirror#fraction
     */
    readonly fraction?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorFraction;
    /**
     * Percent represents the percentage of requests that should be
     * mirrored to BackendRef. Its minimum value is 0 (indicating 0% of
     * requests) and its maximum value is 100 (indicating 100% of requests).
     *
     * Only one of Fraction or Percent may be specified. If neither field
     * is specified, 100% of requests will be mirrored.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirror#percent
     */
    readonly percent?: number;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirror' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirror(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirror | undefined): Record<string, any> | undefined;
/**
 * RequestRedirect defines a schema for a filter that responds to the
 * request with an HTTP redirection.
 *
 * Support: Core
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect {
    /**
     * Hostname is the hostname to be used in the value of the `Location`
     * header in the response.
     * When empty, the hostname in the `Host` header of the request is used.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect#hostname
     */
    readonly hostname?: string;
    /**
     * Path defines parameters used to modify the path of the incoming request.
     * The modified path is then used to construct the `Location` header. When
     * empty, the request path is used as-is.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect#path
     */
    readonly path?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPath;
    /**
     * Port is the port to be used in the value of the `Location`
     * header in the response.
     *
     * If no port is specified, the redirect port MUST be derived using the
     * following rules:
     *
     * * If redirect scheme is not-empty, the redirect port MUST be the well-known
     * port associated with the redirect scheme. Specifically "http" to port 80
     * and "https" to port 443. If the redirect scheme does not have a
     * well-known port, the listener port of the Gateway SHOULD be used.
     * * If redirect scheme is empty, the redirect port MUST be the Gateway
     * Listener port.
     *
     * Implementations SHOULD NOT add the port number in the 'Location'
     * header in the following cases:
     *
     * * A Location header that will use HTTP (whether that is determined via
     * the Listener protocol or the Scheme field) _and_ use port 80.
     * * A Location header that will use HTTPS (whether that is determined via
     * the Listener protocol or the Scheme field) _and_ use port 443.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect#port
     */
    readonly port?: number;
    /**
     * Scheme is the scheme to be used in the value of the `Location` header in
     * the response. When empty, the scheme of the request is used.
     *
     * Scheme redirects can affect the port of the redirect, for more information,
     * refer to the documentation for the port field of this filter.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect#scheme
     */
    readonly scheme?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectScheme;
    /**
     * StatusCode is the HTTP status code to be used in response.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect#statusCode
     */
    readonly statusCode?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectStatusCode;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirect | undefined): Record<string, any> | undefined;
/**
 * ResponseHeaderModifier defines a schema for a filter that modifies response
 * headers.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifier
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifier {
    /**
     * Add adds the given header(s) (name, value) to the request
     * before the action. It appends to any existing values associated
     * with the header name.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * add:
     * - name: "my-header"
     * value: "bar,baz"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: foo,bar,baz
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifier#add
     */
    readonly add?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierAdd[];
    /**
     * Remove the given header(s) from the HTTP request before the action. The
     * value of Remove is a list of HTTP header names. Note that the header
     * names are case-insensitive (see
     * https://datatracker.ietf.org/doc/html/rfc2616#section-4.2).
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header1: foo
     * my-header2: bar
     * my-header3: baz
     *
     * Config:
     * remove: ["my-header1", "my-header3"]
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header2: bar
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifier#remove
     */
    readonly remove?: string[];
    /**
     * Set overwrites the request with the given header (name, value)
     * before the action.
     *
     * Input:
     * GET /foo HTTP/1.1
     * my-header: foo
     *
     * Config:
     * set:
     * - name: "my-header"
     * value: "bar"
     *
     * Output:
     * GET /foo HTTP/1.1
     * my-header: bar
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifier#set
     */
    readonly set?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierSet[];
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifier' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifier(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifier | undefined): Record<string, any> | undefined;
/**
 * Type identifies the type of filter to apply. As with other API fields,
 * types are classified into three conformance levels:
 *
 * - Core: Filter types and their corresponding configuration defined by
 * "Support: Core" in this package, e.g. "RequestHeaderModifier". All
 * implementations must support core filters.
 *
 * - Extended: Filter types and their corresponding configuration defined by
 * "Support: Extended" in this package, e.g. "RequestMirror". Implementers
 * are encouraged to support extended filters.
 *
 * - Implementation-specific: Filters that are defined and supported by
 * specific vendors.
 * In the future, filters showing convergence in behavior across multiple
 * implementations will be considered for inclusion in extended or core
 * conformance levels. Filter-specific configuration for such filters
 * is specified using the ExtensionRef field. `Type` should be set to
 * "ExtensionRef" for custom filters.
 *
 * Implementers are encouraged to define custom implementation types to
 * extend the core API with implementation-specific behavior.
 *
 * If a reference to a custom filter type cannot be resolved, the filter
 * MUST NOT be skipped. Instead, requests that would have been processed by
 * that filter MUST receive a HTTP error response.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersType
 */
export declare enum HttpRouteV1Beta1SpecRulesBackendRefsFiltersType {
    /** RequestHeaderModifier */
    REQUEST_HEADER_MODIFIER = "RequestHeaderModifier",
    /** ResponseHeaderModifier */
    RESPONSE_HEADER_MODIFIER = "ResponseHeaderModifier",
    /** RequestMirror */
    REQUEST_MIRROR = "RequestMirror",
    /** RequestRedirect */
    REQUEST_REDIRECT = "RequestRedirect",
    /** URLRewrite */
    URL_REWRITE = "URLRewrite",
    /** ExtensionRef */
    EXTENSION_REF = "ExtensionRef"
}
/**
 * URLRewrite defines a schema for a filter that modifies a request during forwarding.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewrite
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewrite {
    /**
     * Hostname is the value to be used to replace the Host header value during
     * forwarding.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewrite#hostname
     */
    readonly hostname?: string;
    /**
     * Path defines a path rewrite.
     *
     * Support: Extended
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewrite#path
     */
    readonly path?: HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePath;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewrite' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewrite(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewrite | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierAdd
 */
export interface HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierAdd(obj: HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierSet
 */
export interface HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierSet' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierSet(obj: HttpRouteV1Beta1SpecRulesFiltersRequestHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * BackendRef references a resource where mirrored requests are sent.
 *
 * Mirrored requests must be sent only to a single destination endpoint
 * within this BackendRef, irrespective of how many endpoints are present
 * within this BackendRef.
 *
 * If the referent cannot be found, this BackendRef is invalid and must be
 * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
 * condition on the Route status is set to `status: False` and not configure
 * this backend in the underlying implementation.
 *
 * If there is a cross-namespace reference to an *existing* object
 * that is not allowed by a ReferenceGrant, the controller must ensure the
 * "ResolvedRefs"  condition on the Route is set to `status: False`,
 * with the "RefNotPermitted" reason and not configure this backend in the
 * underlying implementation.
 *
 * In either error case, the Message of the `ResolvedRefs` Condition
 * should be used to provide more detail about the problem.
 *
 * Support: Extended for Kubernetes Service
 *
 * Support: Implementation-specific for any other resource
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef
 */
export interface HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef#group
     */
    readonly group?: string;
    /**
     * Kind is the Kubernetes resource kind of the referent. For example
     * "Service".
     *
     * Defaults to "Service" when not specified.
     *
     * ExternalName services can refer to CNAME DNS records that may live
     * outside of the cluster and as such are difficult to reason about in
     * terms of conformance. They also may not be safe to forward to (see
     * CVE-2021-25740 for more information). Implementations SHOULD NOT
     * support ExternalName Services.
     *
     * Support: Core (Services with a type other than ExternalName)
     *
     * Support: Implementation-specific (Services with type ExternalName)
     *
     * @default Service" when not specified.
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the backend. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef#namespace
     */
    readonly namespace?: string;
    /**
     * Port specifies the destination port number to use for this resource.
     * Port is required when the referent is a Kubernetes Service. In this
     * case, the port number is the service port number, not the target port.
     * For other resources, destination port might be derived from the referent
     * resource or this field.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef#port
     */
    readonly port?: number;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef(obj: HttpRouteV1Beta1SpecRulesFiltersRequestMirrorBackendRef | undefined): Record<string, any> | undefined;
/**
 * Fraction represents the fraction of requests that should be
 * mirrored to BackendRef.
 *
 * Only one of Fraction or Percent may be specified. If neither field
 * is specified, 100% of requests will be mirrored.
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirrorFraction
 */
export interface HttpRouteV1Beta1SpecRulesFiltersRequestMirrorFraction {
    /**
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirrorFraction#denominator
     */
    readonly denominator?: number;
    /**
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestMirrorFraction#numerator
     */
    readonly numerator: number;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersRequestMirrorFraction' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersRequestMirrorFraction(obj: HttpRouteV1Beta1SpecRulesFiltersRequestMirrorFraction | undefined): Record<string, any> | undefined;
/**
 * Path defines parameters used to modify the path of the incoming request.
 * The modified path is then used to construct the `Location` header. When
 * empty, the request path is used as-is.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPath
 */
export interface HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPath {
    /**
     * ReplaceFullPath specifies the value with which to replace the full path
     * of a request during a rewrite or redirect.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPath#replaceFullPath
     */
    readonly replaceFullPath?: string;
    /**
     * ReplacePrefixMatch specifies the value with which to replace the prefix
     * match of a request during a rewrite or redirect. For example, a request
     * to "/foo/bar" with a prefix match of "/foo" and a ReplacePrefixMatch
     * of "/xyz" would be modified to "/xyz/bar".
     *
     * Note that this matches the behavior of the PathPrefix match type. This
     * matches full path elements. A path element refers to the list of labels
     * in the path split by the `/` separator. When specified, a trailing `/` is
     * ignored. For example, the paths `/abc`, `/abc/`, and `/abc/def` would all
     * match the prefix `/abc`, but the path `/abcd` would not.
     *
     * ReplacePrefixMatch is only compatible with a `PathPrefix` HTTPRouteMatch.
     * Using any other HTTPRouteMatch type on the same HTTPRouteRule will result in
     * the implementation setting the Accepted Condition for the Route to `status: False`.
     *
     * Request Path | Prefix Match | Replace Prefix | Modified Path
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPath#replacePrefixMatch
     */
    readonly replacePrefixMatch?: string;
    /**
     * Type defines the type of path modifier. Additional types may be
     * added in a future release of the API.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPath#type
     */
    readonly type: HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPathType;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPath' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPath(obj: HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPath | undefined): Record<string, any> | undefined;
/**
 * Scheme is the scheme to be used in the value of the `Location` header in
 * the response. When empty, the scheme of the request is used.
 *
 * Scheme redirects can affect the port of the redirect, for more information,
 * refer to the documentation for the port field of this filter.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirectScheme
 */
export declare enum HttpRouteV1Beta1SpecRulesFiltersRequestRedirectScheme {
    /** http */
    HTTP = "http",
    /** https */
    HTTPS = "https"
}
/**
 * StatusCode is the HTTP status code to be used in response.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * Support: Core
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirectStatusCode
 */
export declare enum HttpRouteV1Beta1SpecRulesFiltersRequestRedirectStatusCode {
    /** 301 */
    VALUE_301 = 301,
    /** 302 */
    VALUE_302 = 302
}
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierAdd
 */
export interface HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierAdd(obj: HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierSet
 */
export interface HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierSet' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierSet(obj: HttpRouteV1Beta1SpecRulesFiltersResponseHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * Path defines a path rewrite.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersUrlRewritePath
 */
export interface HttpRouteV1Beta1SpecRulesFiltersUrlRewritePath {
    /**
     * ReplaceFullPath specifies the value with which to replace the full path
     * of a request during a rewrite or redirect.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersUrlRewritePath#replaceFullPath
     */
    readonly replaceFullPath?: string;
    /**
     * ReplacePrefixMatch specifies the value with which to replace the prefix
     * match of a request during a rewrite or redirect. For example, a request
     * to "/foo/bar" with a prefix match of "/foo" and a ReplacePrefixMatch
     * of "/xyz" would be modified to "/xyz/bar".
     *
     * Note that this matches the behavior of the PathPrefix match type. This
     * matches full path elements. A path element refers to the list of labels
     * in the path split by the `/` separator. When specified, a trailing `/` is
     * ignored. For example, the paths `/abc`, `/abc/`, and `/abc/def` would all
     * match the prefix `/abc`, but the path `/abcd` would not.
     *
     * ReplacePrefixMatch is only compatible with a `PathPrefix` HTTPRouteMatch.
     * Using any other HTTPRouteMatch type on the same HTTPRouteRule will result in
     * the implementation setting the Accepted Condition for the Route to `status: False`.
     *
     * Request Path | Prefix Match | Replace Prefix | Modified Path
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersUrlRewritePath#replacePrefixMatch
     */
    readonly replacePrefixMatch?: string;
    /**
     * Type defines the type of path modifier. Additional types may be
     * added in a future release of the API.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteV1Beta1SpecRulesFiltersUrlRewritePath#type
     */
    readonly type: HttpRouteV1Beta1SpecRulesFiltersUrlRewritePathType;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesFiltersUrlRewritePath' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesFiltersUrlRewritePath(obj: HttpRouteV1Beta1SpecRulesFiltersUrlRewritePath | undefined): Record<string, any> | undefined;
/**
 * Type specifies how to match against the value of the header.
 *
 * Support: Core (Exact)
 *
 * Support: Implementation-specific (RegularExpression)
 *
 * Since RegularExpression HeaderMatchType has implementation-specific
 * conformance, implementations can support POSIX, PCRE or any other dialects
 * of regular expressions. Please read the implementation's documentation to
 * determine the supported dialect.
 *
 * @schema HttpRouteV1Beta1SpecRulesMatchesHeadersType
 */
export declare enum HttpRouteV1Beta1SpecRulesMatchesHeadersType {
    /** Exact */
    EXACT = "Exact",
    /** RegularExpression */
    REGULAR_EXPRESSION = "RegularExpression"
}
/**
 * Type specifies how to match against the path Value.
 *
 * Support: Core (Exact, PathPrefix)
 *
 * Support: Implementation-specific (RegularExpression)
 *
 * @schema HttpRouteV1Beta1SpecRulesMatchesPathType
 */
export declare enum HttpRouteV1Beta1SpecRulesMatchesPathType {
    /** Exact */
    EXACT = "Exact",
    /** PathPrefix */
    PATH_PREFIX = "PathPrefix",
    /** RegularExpression */
    REGULAR_EXPRESSION = "RegularExpression"
}
/**
 * Type specifies how to match against the value of the query parameter.
 *
 * Support: Extended (Exact)
 *
 * Support: Implementation-specific (RegularExpression)
 *
 * Since RegularExpression QueryParamMatchType has Implementation-specific
 * conformance, implementations can support POSIX, PCRE or any other
 * dialects of regular expressions. Please read the implementation's
 * documentation to determine the supported dialect.
 *
 * @schema HttpRouteV1Beta1SpecRulesMatchesQueryParamsType
 */
export declare enum HttpRouteV1Beta1SpecRulesMatchesQueryParamsType {
    /** Exact */
    EXACT = "Exact",
    /** RegularExpression */
    REGULAR_EXPRESSION = "RegularExpression"
}
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierAdd
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierAdd(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierSet
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierSet' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierSet(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * BackendRef references a resource where mirrored requests are sent.
 *
 * Mirrored requests must be sent only to a single destination endpoint
 * within this BackendRef, irrespective of how many endpoints are present
 * within this BackendRef.
 *
 * If the referent cannot be found, this BackendRef is invalid and must be
 * dropped from the Gateway. The controller must ensure the "ResolvedRefs"
 * condition on the Route status is set to `status: False` and not configure
 * this backend in the underlying implementation.
 *
 * If there is a cross-namespace reference to an *existing* object
 * that is not allowed by a ReferenceGrant, the controller must ensure the
 * "ResolvedRefs"  condition on the Route is set to `status: False`,
 * with the "RefNotPermitted" reason and not configure this backend in the
 * underlying implementation.
 *
 * In either error case, the Message of the `ResolvedRefs` Condition
 * should be used to provide more detail about the problem.
 *
 * Support: Extended for Kubernetes Service
 *
 * Support: Implementation-specific for any other resource
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef {
    /**
     * Group is the group of the referent. For example, "gateway.networking.k8s.io".
     * When unspecified or empty string, core API group is inferred.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef#group
     */
    readonly group?: string;
    /**
     * Kind is the Kubernetes resource kind of the referent. For example
     * "Service".
     *
     * Defaults to "Service" when not specified.
     *
     * ExternalName services can refer to CNAME DNS records that may live
     * outside of the cluster and as such are difficult to reason about in
     * terms of conformance. They also may not be safe to forward to (see
     * CVE-2021-25740 for more information). Implementations SHOULD NOT
     * support ExternalName Services.
     *
     * Support: Core (Services with a type other than ExternalName)
     *
     * Support: Implementation-specific (Services with type ExternalName)
     *
     * @default Service" when not specified.
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef#kind
     */
    readonly kind?: string;
    /**
     * Name is the name of the referent.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef#name
     */
    readonly name: string;
    /**
     * Namespace is the namespace of the backend. When unspecified, the local
     * namespace is inferred.
     *
     * Note that when a namespace different than the local namespace is specified,
     * a ReferenceGrant object is required in the referent namespace to allow that
     * namespace's owner to accept the reference. See the ReferenceGrant
     * documentation for details.
     *
     * Support: Core
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef#namespace
     */
    readonly namespace?: string;
    /**
     * Port specifies the destination port number to use for this resource.
     * Port is required when the referent is a Kubernetes Service. In this
     * case, the port number is the service port number, not the target port.
     * For other resources, destination port might be derived from the referent
     * resource or this field.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef#port
     */
    readonly port?: number;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorBackendRef | undefined): Record<string, any> | undefined;
/**
 * Fraction represents the fraction of requests that should be
 * mirrored to BackendRef.
 *
 * Only one of Fraction or Percent may be specified. If neither field
 * is specified, 100% of requests will be mirrored.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorFraction
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorFraction {
    /**
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorFraction#denominator
     */
    readonly denominator?: number;
    /**
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorFraction#numerator
     */
    readonly numerator: number;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorFraction' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorFraction(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestMirrorFraction | undefined): Record<string, any> | undefined;
/**
 * Path defines parameters used to modify the path of the incoming request.
 * The modified path is then used to construct the `Location` header. When
 * empty, the request path is used as-is.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPath
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPath {
    /**
     * ReplaceFullPath specifies the value with which to replace the full path
     * of a request during a rewrite or redirect.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPath#replaceFullPath
     */
    readonly replaceFullPath?: string;
    /**
     * ReplacePrefixMatch specifies the value with which to replace the prefix
     * match of a request during a rewrite or redirect. For example, a request
     * to "/foo/bar" with a prefix match of "/foo" and a ReplacePrefixMatch
     * of "/xyz" would be modified to "/xyz/bar".
     *
     * Note that this matches the behavior of the PathPrefix match type. This
     * matches full path elements. A path element refers to the list of labels
     * in the path split by the `/` separator. When specified, a trailing `/` is
     * ignored. For example, the paths `/abc`, `/abc/`, and `/abc/def` would all
     * match the prefix `/abc`, but the path `/abcd` would not.
     *
     * ReplacePrefixMatch is only compatible with a `PathPrefix` HTTPRouteMatch.
     * Using any other HTTPRouteMatch type on the same HTTPRouteRule will result in
     * the implementation setting the Accepted Condition for the Route to `status: False`.
     *
     * Request Path | Prefix Match | Replace Prefix | Modified Path
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPath#replacePrefixMatch
     */
    readonly replacePrefixMatch?: string;
    /**
     * Type defines the type of path modifier. Additional types may be
     * added in a future release of the API.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPath#type
     */
    readonly type: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPathType;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPath' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPath(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPath | undefined): Record<string, any> | undefined;
/**
 * Scheme is the scheme to be used in the value of the `Location` header in
 * the response. When empty, the scheme of the request is used.
 *
 * Scheme redirects can affect the port of the redirect, for more information,
 * refer to the documentation for the port field of this filter.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectScheme
 */
export declare enum HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectScheme {
    /** http */
    HTTP = "http",
    /** https */
    HTTPS = "https"
}
/**
 * StatusCode is the HTTP status code to be used in response.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * Support: Core
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectStatusCode
 */
export declare enum HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectStatusCode {
    /** 301 */
    VALUE_301 = 301,
    /** 302 */
    VALUE_302 = 302
}
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierAdd
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierAdd {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierAdd#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierAdd#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierAdd' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierAdd(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierAdd | undefined): Record<string, any> | undefined;
/**
 * HTTPHeader represents an HTTP Header name and value as defined by RFC 7230.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierSet
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierSet {
    /**
     * Name is the name of the HTTP Header to be matched. Name matching MUST be
     * case-insensitive. (See https://tools.ietf.org/html/rfc7230#section-3.2).
     *
     * If multiple entries specify equivalent header names, the first entry with
     * an equivalent name MUST be considered for a match. Subsequent entries
     * with an equivalent header name MUST be ignored. Due to the
     * case-insensitivity of header names, "foo" and "Foo" are considered
     * equivalent.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierSet#name
     */
    readonly name: string;
    /**
     * Value is the value of HTTP Header to be matched.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierSet#value
     */
    readonly value: string;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierSet' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierSet(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersResponseHeaderModifierSet | undefined): Record<string, any> | undefined;
/**
 * Path defines a path rewrite.
 *
 * Support: Extended
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePath
 */
export interface HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePath {
    /**
     * ReplaceFullPath specifies the value with which to replace the full path
     * of a request during a rewrite or redirect.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePath#replaceFullPath
     */
    readonly replaceFullPath?: string;
    /**
     * ReplacePrefixMatch specifies the value with which to replace the prefix
     * match of a request during a rewrite or redirect. For example, a request
     * to "/foo/bar" with a prefix match of "/foo" and a ReplacePrefixMatch
     * of "/xyz" would be modified to "/xyz/bar".
     *
     * Note that this matches the behavior of the PathPrefix match type. This
     * matches full path elements. A path element refers to the list of labels
     * in the path split by the `/` separator. When specified, a trailing `/` is
     * ignored. For example, the paths `/abc`, `/abc/`, and `/abc/def` would all
     * match the prefix `/abc`, but the path `/abcd` would not.
     *
     * ReplacePrefixMatch is only compatible with a `PathPrefix` HTTPRouteMatch.
     * Using any other HTTPRouteMatch type on the same HTTPRouteRule will result in
     * the implementation setting the Accepted Condition for the Route to `status: False`.
     *
     * Request Path | Prefix Match | Replace Prefix | Modified Path
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePath#replacePrefixMatch
     */
    readonly replacePrefixMatch?: string;
    /**
     * Type defines the type of path modifier. Additional types may be
     * added in a future release of the API.
     *
     * Note that values may be added to this enum, implementations
     * must ensure that unknown values will not cause a crash.
     *
     * Unknown values here must result in the implementation setting the
     * Accepted Condition for the Route to `status: False`, with a
     * Reason of `UnsupportedValue`.
     *
     * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePath#type
     */
    readonly type: HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePathType;
}
/**
 * Converts an object of type 'HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePath' to JSON representation.
 */
export declare function toJson_HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePath(obj: HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePath | undefined): Record<string, any> | undefined;
/**
 * Type defines the type of path modifier. Additional types may be
 * added in a future release of the API.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPathType
 */
export declare enum HttpRouteV1Beta1SpecRulesFiltersRequestRedirectPathType {
    /** ReplaceFullPath */
    REPLACE_FULL_PATH = "ReplaceFullPath",
    /** ReplacePrefixMatch */
    REPLACE_PREFIX_MATCH = "ReplacePrefixMatch"
}
/**
 * Type defines the type of path modifier. Additional types may be
 * added in a future release of the API.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteV1Beta1SpecRulesFiltersUrlRewritePathType
 */
export declare enum HttpRouteV1Beta1SpecRulesFiltersUrlRewritePathType {
    /** ReplaceFullPath */
    REPLACE_FULL_PATH = "ReplaceFullPath",
    /** ReplacePrefixMatch */
    REPLACE_PREFIX_MATCH = "ReplacePrefixMatch"
}
/**
 * Type defines the type of path modifier. Additional types may be
 * added in a future release of the API.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPathType
 */
export declare enum HttpRouteV1Beta1SpecRulesBackendRefsFiltersRequestRedirectPathType {
    /** ReplaceFullPath */
    REPLACE_FULL_PATH = "ReplaceFullPath",
    /** ReplacePrefixMatch */
    REPLACE_PREFIX_MATCH = "ReplacePrefixMatch"
}
/**
 * Type defines the type of path modifier. Additional types may be
 * added in a future release of the API.
 *
 * Note that values may be added to this enum, implementations
 * must ensure that unknown values will not cause a crash.
 *
 * Unknown values here must result in the implementation setting the
 * Accepted Condition for the Route to `status: False`, with a
 * Reason of `UnsupportedValue`.
 *
 * @schema HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePathType
 */
export declare enum HttpRouteV1Beta1SpecRulesBackendRefsFiltersUrlRewritePathType {
    /** ReplaceFullPath */
    REPLACE_FULL_PATH = "ReplaceFullPath",
    /** ReplacePrefixMatch */
    REPLACE_PREFIX_MATCH = "ReplacePrefixMatch"
}
/**
 * ReferenceGrant identifies kinds of resources in other namespaces that are
trusted to reference the specified kinds of resources in the same namespace
as the policy.

Each ReferenceGrant can be used to represent a unique trust relationship.
Additional Reference Grants can be used to add to the set of trusted
sources of inbound references for the namespace they are defined within.

All cross-namespace references in Gateway API (with the exception of cross-namespace
Gateway-route attachment) require a ReferenceGrant.

ReferenceGrant is a form of runtime verification allowing users to assert
which cross-namespace object references are permitted. Implementations that
support ReferenceGrant MUST NOT permit cross-namespace references which have
no grant, and MUST respond to the removal of a grant by revoking the access
that the grant allowed.
 *
 * @schema ReferenceGrant
 */
export declare class ReferenceGrant extends ApiObject {
    /**
     * Returns the apiVersion and kind for "ReferenceGrant"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "ReferenceGrant".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: ReferenceGrantProps): any;
    /**
     * Defines a "ReferenceGrant" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: ReferenceGrantProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * ReferenceGrant identifies kinds of resources in other namespaces that are
 * trusted to reference the specified kinds of resources in the same namespace
 * as the policy.
 *
 * Each ReferenceGrant can be used to represent a unique trust relationship.
 * Additional Reference Grants can be used to add to the set of trusted
 * sources of inbound references for the namespace they are defined within.
 *
 * All cross-namespace references in Gateway API (with the exception of cross-namespace
 * Gateway-route attachment) require a ReferenceGrant.
 *
 * ReferenceGrant is a form of runtime verification allowing users to assert
 * which cross-namespace object references are permitted. Implementations that
 * support ReferenceGrant MUST NOT permit cross-namespace references which have
 * no grant, and MUST respond to the removal of a grant by revoking the access
 * that the grant allowed.
 *
 * @schema ReferenceGrant
 */
export interface ReferenceGrantProps {
    /**
     * @schema ReferenceGrant#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec defines the desired state of ReferenceGrant.
     *
     * @schema ReferenceGrant#spec
     */
    readonly spec?: ReferenceGrantSpec;
}
/**
 * Converts an object of type 'ReferenceGrantProps' to JSON representation.
 */
export declare function toJson_ReferenceGrantProps(obj: ReferenceGrantProps | undefined): Record<string, any> | undefined;
/**
 * Spec defines the desired state of ReferenceGrant.
 *
 * @schema ReferenceGrantSpec
 */
export interface ReferenceGrantSpec {
    /**
     * From describes the trusted namespaces and kinds that can reference the
     * resources described in "To". Each entry in this list MUST be considered
     * to be an additional place that references can be valid from, or to put
     * this another way, entries MUST be combined using OR.
     *
     * Support: Core
     *
     * @schema ReferenceGrantSpec#from
     */
    readonly from: ReferenceGrantSpecFrom[];
    /**
     * To describes the resources that may be referenced by the resources
     * described in "From". Each entry in this list MUST be considered to be an
     * additional place that references can be valid to, or to put this another
     * way, entries MUST be combined using OR.
     *
     * Support: Core
     *
     * @schema ReferenceGrantSpec#to
     */
    readonly to: ReferenceGrantSpecTo[];
}
/**
 * Converts an object of type 'ReferenceGrantSpec' to JSON representation.
 */
export declare function toJson_ReferenceGrantSpec(obj: ReferenceGrantSpec | undefined): Record<string, any> | undefined;
/**
 * ReferenceGrantFrom describes trusted namespaces and kinds.
 *
 * @schema ReferenceGrantSpecFrom
 */
export interface ReferenceGrantSpecFrom {
    /**
     * Group is the group of the referent.
     * When empty, the Kubernetes core API group is inferred.
     *
     * Support: Core
     *
     * @schema ReferenceGrantSpecFrom#group
     */
    readonly group: string;
    /**
     * Kind is the kind of the referent. Although implementations may support
     * additional resources, the following types are part of the "Core"
     * support level for this field.
     *
     * When used to permit a SecretObjectReference:
     *
     * * Gateway
     *
     * When used to permit a BackendObjectReference:
     *
     * * GRPCRoute
     * * HTTPRoute
     * * TCPRoute
     * * TLSRoute
     * * UDPRoute
     *
     * @schema ReferenceGrantSpecFrom#kind
     */
    readonly kind: string;
    /**
     * Namespace is the namespace of the referent.
     *
     * Support: Core
     *
     * @schema ReferenceGrantSpecFrom#namespace
     */
    readonly namespace: string;
}
/**
 * Converts an object of type 'ReferenceGrantSpecFrom' to JSON representation.
 */
export declare function toJson_ReferenceGrantSpecFrom(obj: ReferenceGrantSpecFrom | undefined): Record<string, any> | undefined;
/**
 * ReferenceGrantTo describes what Kinds are allowed as targets of the
 * references.
 *
 * @schema ReferenceGrantSpecTo
 */
export interface ReferenceGrantSpecTo {
    /**
     * Group is the group of the referent.
     * When empty, the Kubernetes core API group is inferred.
     *
     * Support: Core
     *
     * @schema ReferenceGrantSpecTo#group
     */
    readonly group: string;
    /**
     * Kind is the kind of the referent. Although implementations may support
     * additional resources, the following types are part of the "Core"
     * support level for this field:
     *
     * * Secret when used to permit a SecretObjectReference
     * * Service when used to permit a BackendObjectReference
     *
     * @schema ReferenceGrantSpecTo#kind
     */
    readonly kind: string;
    /**
     * Name is the name of the referent. When unspecified, this policy
     * refers to all resources of the specified Group and Kind in the local
     * namespace.
     *
     * @schema ReferenceGrantSpecTo#name
     */
    readonly name?: string;
}
/**
 * Converts an object of type 'ReferenceGrantSpecTo' to JSON representation.
 */
export declare function toJson_ReferenceGrantSpecTo(obj: ReferenceGrantSpecTo | undefined): Record<string, any> | undefined;
