import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
/**
 *
 *
 * @schema AuthorizationPolicy
 */
export declare class AuthorizationPolicy extends ApiObject {
    /**
     * Returns the apiVersion and kind for "AuthorizationPolicy"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "AuthorizationPolicy".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: AuthorizationPolicyProps): any;
    /**
     * Defines a "AuthorizationPolicy" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: AuthorizationPolicyProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * @schema AuthorizationPolicy
 */
export interface AuthorizationPolicyProps {
    /**
     * @schema AuthorizationPolicy#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Configuration for access control on workloads. See more details at: https://istio.io/docs/reference/config/security/authorization-policy.html
     *
     * @schema AuthorizationPolicy#spec
     */
    readonly spec?: AuthorizationPolicySpec;
}
/**
 * Converts an object of type 'AuthorizationPolicyProps' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyProps(obj: AuthorizationPolicyProps | undefined): Record<string, any> | undefined;
/**
 * Configuration for access control on workloads. See more details at: https://istio.io/docs/reference/config/security/authorization-policy.html
 *
 * @schema AuthorizationPolicySpec
 */
export interface AuthorizationPolicySpec {
    /**
     * Optional.
     *
     * Valid Options: ALLOW, DENY, AUDIT, CUSTOM
     *
     * @schema AuthorizationPolicySpec#action
     */
    readonly action?: AuthorizationPolicySpecAction;
    /**
     * Specifies detailed configuration of the CUSTOM action.
     *
     * @schema AuthorizationPolicySpec#provider
     */
    readonly provider?: AuthorizationPolicySpecProvider;
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpec#rules
     */
    readonly rules?: AuthorizationPolicySpecRules[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpec#selector
     */
    readonly selector?: AuthorizationPolicySpecSelector;
    /**
     * @schema AuthorizationPolicySpec#targetRef
     */
    readonly targetRef?: AuthorizationPolicySpecTargetRef;
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpec#targetRefs
     */
    readonly targetRefs?: AuthorizationPolicySpecTargetRefs[];
}
/**
 * Converts an object of type 'AuthorizationPolicySpec' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpec(obj: AuthorizationPolicySpec | undefined): Record<string, any> | undefined;
/**
 * Optional.
 *
 * Valid Options: ALLOW, DENY, AUDIT, CUSTOM
 *
 * @schema AuthorizationPolicySpecAction
 */
export declare enum AuthorizationPolicySpecAction {
    /** ALLOW */
    ALLOW = "ALLOW",
    /** DENY */
    DENY = "DENY",
    /** AUDIT */
    AUDIT = "AUDIT",
    /** CUSTOM */
    CUSTOM = "CUSTOM"
}
/**
 * Specifies detailed configuration of the CUSTOM action.
 *
 * @schema AuthorizationPolicySpecProvider
 */
export interface AuthorizationPolicySpecProvider {
    /**
     * Specifies the name of the extension provider.
     *
     * @schema AuthorizationPolicySpecProvider#name
     */
    readonly name?: string;
}
/**
 * Converts an object of type 'AuthorizationPolicySpecProvider' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecProvider(obj: AuthorizationPolicySpecProvider | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicySpecRules
 */
export interface AuthorizationPolicySpecRules {
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRules#from
     */
    readonly from?: AuthorizationPolicySpecRulesFrom[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRules#to
     */
    readonly to?: AuthorizationPolicySpecRulesTo[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRules#when
     */
    readonly when?: AuthorizationPolicySpecRulesWhen[];
}
/**
 * Converts an object of type 'AuthorizationPolicySpecRules' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecRules(obj: AuthorizationPolicySpecRules | undefined): Record<string, any> | undefined;
/**
 * Optional.
 *
 * @schema AuthorizationPolicySpecSelector
 */
export interface AuthorizationPolicySpecSelector {
    /**
     * One or more labels that indicate a specific set of pods/VMs on which a policy should be applied.
     *
     * @schema AuthorizationPolicySpecSelector#matchLabels
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'AuthorizationPolicySpecSelector' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecSelector(obj: AuthorizationPolicySpecSelector | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicySpecTargetRef
 */
export interface AuthorizationPolicySpecTargetRef {
    /**
     * group is the group of the target resource.
     *
     * @schema AuthorizationPolicySpecTargetRef#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema AuthorizationPolicySpecTargetRef#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema AuthorizationPolicySpecTargetRef#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema AuthorizationPolicySpecTargetRef#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'AuthorizationPolicySpecTargetRef' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecTargetRef(obj: AuthorizationPolicySpecTargetRef | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicySpecTargetRefs
 */
export interface AuthorizationPolicySpecTargetRefs {
    /**
     * group is the group of the target resource.
     *
     * @schema AuthorizationPolicySpecTargetRefs#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema AuthorizationPolicySpecTargetRefs#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema AuthorizationPolicySpecTargetRefs#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema AuthorizationPolicySpecTargetRefs#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'AuthorizationPolicySpecTargetRefs' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecTargetRefs(obj: AuthorizationPolicySpecTargetRefs | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicySpecRulesFrom
 */
export interface AuthorizationPolicySpecRulesFrom {
    /**
     * Source specifies the source of a request.
     *
     * @schema AuthorizationPolicySpecRulesFrom#source
     */
    readonly source?: AuthorizationPolicySpecRulesFromSource;
}
/**
 * Converts an object of type 'AuthorizationPolicySpecRulesFrom' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecRulesFrom(obj: AuthorizationPolicySpecRulesFrom | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicySpecRulesTo
 */
export interface AuthorizationPolicySpecRulesTo {
    /**
     * Operation specifies the operation of a request.
     *
     * @schema AuthorizationPolicySpecRulesTo#operation
     */
    readonly operation?: AuthorizationPolicySpecRulesToOperation;
}
/**
 * Converts an object of type 'AuthorizationPolicySpecRulesTo' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecRulesTo(obj: AuthorizationPolicySpecRulesTo | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicySpecRulesWhen
 */
export interface AuthorizationPolicySpecRulesWhen {
    /**
     * The name of an Istio attribute.
     *
     * @schema AuthorizationPolicySpecRulesWhen#key
     */
    readonly key: string;
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesWhen#notValues
     */
    readonly notValues?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesWhen#values
     */
    readonly values?: string[];
}
/**
 * Converts an object of type 'AuthorizationPolicySpecRulesWhen' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecRulesWhen(obj: AuthorizationPolicySpecRulesWhen | undefined): Record<string, any> | undefined;
/**
 * Source specifies the source of a request.
 *
 * @schema AuthorizationPolicySpecRulesFromSource
 */
export interface AuthorizationPolicySpecRulesFromSource {
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#ipBlocks
     */
    readonly ipBlocks?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#namespaces
     */
    readonly namespaces?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#notIpBlocks
     */
    readonly notIpBlocks?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#notNamespaces
     */
    readonly notNamespaces?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#notPrincipals
     */
    readonly notPrincipals?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#notRemoteIpBlocks
     */
    readonly notRemoteIpBlocks?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#notRequestPrincipals
     */
    readonly notRequestPrincipals?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#notServiceAccounts
     */
    readonly notServiceAccounts?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#principals
     */
    readonly principals?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#remoteIpBlocks
     */
    readonly remoteIpBlocks?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#requestPrincipals
     */
    readonly requestPrincipals?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesFromSource#serviceAccounts
     */
    readonly serviceAccounts?: string[];
}
/**
 * Converts an object of type 'AuthorizationPolicySpecRulesFromSource' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecRulesFromSource(obj: AuthorizationPolicySpecRulesFromSource | undefined): Record<string, any> | undefined;
/**
 * Operation specifies the operation of a request.
 *
 * @schema AuthorizationPolicySpecRulesToOperation
 */
export interface AuthorizationPolicySpecRulesToOperation {
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesToOperation#hosts
     */
    readonly hosts?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesToOperation#methods
     */
    readonly methods?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesToOperation#notHosts
     */
    readonly notHosts?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesToOperation#notMethods
     */
    readonly notMethods?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesToOperation#notPaths
     */
    readonly notPaths?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesToOperation#notPorts
     */
    readonly notPorts?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesToOperation#paths
     */
    readonly paths?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicySpecRulesToOperation#ports
     */
    readonly ports?: string[];
}
/**
 * Converts an object of type 'AuthorizationPolicySpecRulesToOperation' to JSON representation.
 */
export declare function toJson_AuthorizationPolicySpecRulesToOperation(obj: AuthorizationPolicySpecRulesToOperation | undefined): Record<string, any> | undefined;
/**
 *
 *
 * @schema AuthorizationPolicyV1Beta1
 */
export declare class AuthorizationPolicyV1Beta1 extends ApiObject {
    /**
     * Returns the apiVersion and kind for "AuthorizationPolicyV1Beta1"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "AuthorizationPolicyV1Beta1".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: AuthorizationPolicyV1Beta1Props): any;
    /**
     * Defines a "AuthorizationPolicyV1Beta1" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: AuthorizationPolicyV1Beta1Props);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * @schema AuthorizationPolicyV1Beta1
 */
export interface AuthorizationPolicyV1Beta1Props {
    /**
     * @schema AuthorizationPolicyV1Beta1#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Configuration for access control on workloads. See more details at: https://istio.io/docs/reference/config/security/authorization-policy.html
     *
     * @schema AuthorizationPolicyV1Beta1#spec
     */
    readonly spec?: AuthorizationPolicyV1Beta1Spec;
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1Props' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1Props(obj: AuthorizationPolicyV1Beta1Props | undefined): Record<string, any> | undefined;
/**
 * Configuration for access control on workloads. See more details at: https://istio.io/docs/reference/config/security/authorization-policy.html
 *
 * @schema AuthorizationPolicyV1Beta1Spec
 */
export interface AuthorizationPolicyV1Beta1Spec {
    /**
     * Optional.
     *
     * Valid Options: ALLOW, DENY, AUDIT, CUSTOM
     *
     * @schema AuthorizationPolicyV1Beta1Spec#action
     */
    readonly action?: AuthorizationPolicyV1Beta1SpecAction;
    /**
     * Specifies detailed configuration of the CUSTOM action.
     *
     * @schema AuthorizationPolicyV1Beta1Spec#provider
     */
    readonly provider?: AuthorizationPolicyV1Beta1SpecProvider;
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1Spec#rules
     */
    readonly rules?: AuthorizationPolicyV1Beta1SpecRules[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1Spec#selector
     */
    readonly selector?: AuthorizationPolicyV1Beta1SpecSelector;
    /**
     * @schema AuthorizationPolicyV1Beta1Spec#targetRef
     */
    readonly targetRef?: AuthorizationPolicyV1Beta1SpecTargetRef;
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1Spec#targetRefs
     */
    readonly targetRefs?: AuthorizationPolicyV1Beta1SpecTargetRefs[];
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1Spec' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1Spec(obj: AuthorizationPolicyV1Beta1Spec | undefined): Record<string, any> | undefined;
/**
 * Optional.
 *
 * Valid Options: ALLOW, DENY, AUDIT, CUSTOM
 *
 * @schema AuthorizationPolicyV1Beta1SpecAction
 */
export declare enum AuthorizationPolicyV1Beta1SpecAction {
    /** ALLOW */
    ALLOW = "ALLOW",
    /** DENY */
    DENY = "DENY",
    /** AUDIT */
    AUDIT = "AUDIT",
    /** CUSTOM */
    CUSTOM = "CUSTOM"
}
/**
 * Specifies detailed configuration of the CUSTOM action.
 *
 * @schema AuthorizationPolicyV1Beta1SpecProvider
 */
export interface AuthorizationPolicyV1Beta1SpecProvider {
    /**
     * Specifies the name of the extension provider.
     *
     * @schema AuthorizationPolicyV1Beta1SpecProvider#name
     */
    readonly name?: string;
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecProvider' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecProvider(obj: AuthorizationPolicyV1Beta1SpecProvider | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicyV1Beta1SpecRules
 */
export interface AuthorizationPolicyV1Beta1SpecRules {
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRules#from
     */
    readonly from?: AuthorizationPolicyV1Beta1SpecRulesFrom[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRules#to
     */
    readonly to?: AuthorizationPolicyV1Beta1SpecRulesTo[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRules#when
     */
    readonly when?: AuthorizationPolicyV1Beta1SpecRulesWhen[];
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecRules' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecRules(obj: AuthorizationPolicyV1Beta1SpecRules | undefined): Record<string, any> | undefined;
/**
 * Optional.
 *
 * @schema AuthorizationPolicyV1Beta1SpecSelector
 */
export interface AuthorizationPolicyV1Beta1SpecSelector {
    /**
     * One or more labels that indicate a specific set of pods/VMs on which a policy should be applied.
     *
     * @schema AuthorizationPolicyV1Beta1SpecSelector#matchLabels
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecSelector' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecSelector(obj: AuthorizationPolicyV1Beta1SpecSelector | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicyV1Beta1SpecTargetRef
 */
export interface AuthorizationPolicyV1Beta1SpecTargetRef {
    /**
     * group is the group of the target resource.
     *
     * @schema AuthorizationPolicyV1Beta1SpecTargetRef#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema AuthorizationPolicyV1Beta1SpecTargetRef#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema AuthorizationPolicyV1Beta1SpecTargetRef#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema AuthorizationPolicyV1Beta1SpecTargetRef#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecTargetRef' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecTargetRef(obj: AuthorizationPolicyV1Beta1SpecTargetRef | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicyV1Beta1SpecTargetRefs
 */
export interface AuthorizationPolicyV1Beta1SpecTargetRefs {
    /**
     * group is the group of the target resource.
     *
     * @schema AuthorizationPolicyV1Beta1SpecTargetRefs#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema AuthorizationPolicyV1Beta1SpecTargetRefs#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema AuthorizationPolicyV1Beta1SpecTargetRefs#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema AuthorizationPolicyV1Beta1SpecTargetRefs#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecTargetRefs' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecTargetRefs(obj: AuthorizationPolicyV1Beta1SpecTargetRefs | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicyV1Beta1SpecRulesFrom
 */
export interface AuthorizationPolicyV1Beta1SpecRulesFrom {
    /**
     * Source specifies the source of a request.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFrom#source
     */
    readonly source?: AuthorizationPolicyV1Beta1SpecRulesFromSource;
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecRulesFrom' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecRulesFrom(obj: AuthorizationPolicyV1Beta1SpecRulesFrom | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicyV1Beta1SpecRulesTo
 */
export interface AuthorizationPolicyV1Beta1SpecRulesTo {
    /**
     * Operation specifies the operation of a request.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesTo#operation
     */
    readonly operation?: AuthorizationPolicyV1Beta1SpecRulesToOperation;
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecRulesTo' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecRulesTo(obj: AuthorizationPolicyV1Beta1SpecRulesTo | undefined): Record<string, any> | undefined;
/**
 * @schema AuthorizationPolicyV1Beta1SpecRulesWhen
 */
export interface AuthorizationPolicyV1Beta1SpecRulesWhen {
    /**
     * The name of an Istio attribute.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesWhen#key
     */
    readonly key: string;
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesWhen#notValues
     */
    readonly notValues?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesWhen#values
     */
    readonly values?: string[];
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecRulesWhen' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecRulesWhen(obj: AuthorizationPolicyV1Beta1SpecRulesWhen | undefined): Record<string, any> | undefined;
/**
 * Source specifies the source of a request.
 *
 * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource
 */
export interface AuthorizationPolicyV1Beta1SpecRulesFromSource {
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#ipBlocks
     */
    readonly ipBlocks?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#namespaces
     */
    readonly namespaces?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#notIpBlocks
     */
    readonly notIpBlocks?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#notNamespaces
     */
    readonly notNamespaces?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#notPrincipals
     */
    readonly notPrincipals?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#notRemoteIpBlocks
     */
    readonly notRemoteIpBlocks?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#notRequestPrincipals
     */
    readonly notRequestPrincipals?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#notServiceAccounts
     */
    readonly notServiceAccounts?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#principals
     */
    readonly principals?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#remoteIpBlocks
     */
    readonly remoteIpBlocks?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#requestPrincipals
     */
    readonly requestPrincipals?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesFromSource#serviceAccounts
     */
    readonly serviceAccounts?: string[];
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecRulesFromSource' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecRulesFromSource(obj: AuthorizationPolicyV1Beta1SpecRulesFromSource | undefined): Record<string, any> | undefined;
/**
 * Operation specifies the operation of a request.
 *
 * @schema AuthorizationPolicyV1Beta1SpecRulesToOperation
 */
export interface AuthorizationPolicyV1Beta1SpecRulesToOperation {
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesToOperation#hosts
     */
    readonly hosts?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesToOperation#methods
     */
    readonly methods?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesToOperation#notHosts
     */
    readonly notHosts?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesToOperation#notMethods
     */
    readonly notMethods?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesToOperation#notPaths
     */
    readonly notPaths?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesToOperation#notPorts
     */
    readonly notPorts?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesToOperation#paths
     */
    readonly paths?: string[];
    /**
     * Optional.
     *
     * @schema AuthorizationPolicyV1Beta1SpecRulesToOperation#ports
     */
    readonly ports?: string[];
}
/**
 * Converts an object of type 'AuthorizationPolicyV1Beta1SpecRulesToOperation' to JSON representation.
 */
export declare function toJson_AuthorizationPolicyV1Beta1SpecRulesToOperation(obj: AuthorizationPolicyV1Beta1SpecRulesToOperation | undefined): Record<string, any> | undefined;
/**
 *
 *
 * @schema PeerAuthentication
 */
export declare class PeerAuthentication extends ApiObject {
    /**
     * Returns the apiVersion and kind for "PeerAuthentication"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "PeerAuthentication".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: PeerAuthenticationProps): any;
    /**
     * Defines a "PeerAuthentication" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: PeerAuthenticationProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * @schema PeerAuthentication
 */
export interface PeerAuthenticationProps {
    /**
     * @schema PeerAuthentication#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Peer authentication configuration for workloads. See more details at: https://istio.io/docs/reference/config/security/peer_authentication.html
     *
     * @schema PeerAuthentication#spec
     */
    readonly spec?: PeerAuthenticationSpec;
}
/**
 * Converts an object of type 'PeerAuthenticationProps' to JSON representation.
 */
export declare function toJson_PeerAuthenticationProps(obj: PeerAuthenticationProps | undefined): Record<string, any> | undefined;
/**
 * Peer authentication configuration for workloads. See more details at: https://istio.io/docs/reference/config/security/peer_authentication.html
 *
 * @schema PeerAuthenticationSpec
 */
export interface PeerAuthenticationSpec {
    /**
     * Mutual TLS settings for workload.
     *
     * @schema PeerAuthenticationSpec#mtls
     */
    readonly mtls?: PeerAuthenticationSpecMtls;
    /**
     * Port specific mutual TLS settings.
     *
     * @schema PeerAuthenticationSpec#portLevelMtls
     */
    readonly portLevelMtls?: {
        [key: string]: PeerAuthenticationSpecPortLevelMtls;
    };
    /**
     * The selector determines the workloads to apply the PeerAuthentication on.
     *
     * @schema PeerAuthenticationSpec#selector
     */
    readonly selector?: PeerAuthenticationSpecSelector;
}
/**
 * Converts an object of type 'PeerAuthenticationSpec' to JSON representation.
 */
export declare function toJson_PeerAuthenticationSpec(obj: PeerAuthenticationSpec | undefined): Record<string, any> | undefined;
/**
 * Mutual TLS settings for workload.
 *
 * @schema PeerAuthenticationSpecMtls
 */
export interface PeerAuthenticationSpecMtls {
    /**
     * Defines the mTLS mode used for peer authentication.
     *
     * Valid Options: DISABLE, PERMISSIVE, STRICT
     *
     * @schema PeerAuthenticationSpecMtls#mode
     */
    readonly mode?: PeerAuthenticationSpecMtlsMode;
}
/**
 * Converts an object of type 'PeerAuthenticationSpecMtls' to JSON representation.
 */
export declare function toJson_PeerAuthenticationSpecMtls(obj: PeerAuthenticationSpecMtls | undefined): Record<string, any> | undefined;
/**
 * @schema PeerAuthenticationSpecPortLevelMtls
 */
export interface PeerAuthenticationSpecPortLevelMtls {
    /**
     * Defines the mTLS mode used for peer authentication.
     *
     * Valid Options: DISABLE, PERMISSIVE, STRICT
     *
     * @schema PeerAuthenticationSpecPortLevelMtls#mode
     */
    readonly mode?: PeerAuthenticationSpecPortLevelMtlsMode;
}
/**
 * Converts an object of type 'PeerAuthenticationSpecPortLevelMtls' to JSON representation.
 */
export declare function toJson_PeerAuthenticationSpecPortLevelMtls(obj: PeerAuthenticationSpecPortLevelMtls | undefined): Record<string, any> | undefined;
/**
 * The selector determines the workloads to apply the PeerAuthentication on.
 *
 * @schema PeerAuthenticationSpecSelector
 */
export interface PeerAuthenticationSpecSelector {
    /**
     * One or more labels that indicate a specific set of pods/VMs on which a policy should be applied.
     *
     * @schema PeerAuthenticationSpecSelector#matchLabels
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'PeerAuthenticationSpecSelector' to JSON representation.
 */
export declare function toJson_PeerAuthenticationSpecSelector(obj: PeerAuthenticationSpecSelector | undefined): Record<string, any> | undefined;
/**
 * Defines the mTLS mode used for peer authentication.
 *
 * Valid Options: DISABLE, PERMISSIVE, STRICT
 *
 * @schema PeerAuthenticationSpecMtlsMode
 */
export declare enum PeerAuthenticationSpecMtlsMode {
    /** UNSET */
    UNSET = "UNSET",
    /** DISABLE */
    DISABLE = "DISABLE",
    /** PERMISSIVE */
    PERMISSIVE = "PERMISSIVE",
    /** STRICT */
    STRICT = "STRICT"
}
/**
 * Defines the mTLS mode used for peer authentication.
 *
 * Valid Options: DISABLE, PERMISSIVE, STRICT
 *
 * @schema PeerAuthenticationSpecPortLevelMtlsMode
 */
export declare enum PeerAuthenticationSpecPortLevelMtlsMode {
    /** UNSET */
    UNSET = "UNSET",
    /** DISABLE */
    DISABLE = "DISABLE",
    /** PERMISSIVE */
    PERMISSIVE = "PERMISSIVE",
    /** STRICT */
    STRICT = "STRICT"
}
/**
 *
 *
 * @schema PeerAuthenticationV1Beta1
 */
export declare class PeerAuthenticationV1Beta1 extends ApiObject {
    /**
     * Returns the apiVersion and kind for "PeerAuthenticationV1Beta1"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "PeerAuthenticationV1Beta1".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: PeerAuthenticationV1Beta1Props): any;
    /**
     * Defines a "PeerAuthenticationV1Beta1" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: PeerAuthenticationV1Beta1Props);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * @schema PeerAuthenticationV1Beta1
 */
export interface PeerAuthenticationV1Beta1Props {
    /**
     * @schema PeerAuthenticationV1Beta1#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Peer authentication configuration for workloads. See more details at: https://istio.io/docs/reference/config/security/peer_authentication.html
     *
     * @schema PeerAuthenticationV1Beta1#spec
     */
    readonly spec?: PeerAuthenticationV1Beta1Spec;
}
/**
 * Converts an object of type 'PeerAuthenticationV1Beta1Props' to JSON representation.
 */
export declare function toJson_PeerAuthenticationV1Beta1Props(obj: PeerAuthenticationV1Beta1Props | undefined): Record<string, any> | undefined;
/**
 * Peer authentication configuration for workloads. See more details at: https://istio.io/docs/reference/config/security/peer_authentication.html
 *
 * @schema PeerAuthenticationV1Beta1Spec
 */
export interface PeerAuthenticationV1Beta1Spec {
    /**
     * Mutual TLS settings for workload.
     *
     * @schema PeerAuthenticationV1Beta1Spec#mtls
     */
    readonly mtls?: PeerAuthenticationV1Beta1SpecMtls;
    /**
     * Port specific mutual TLS settings.
     *
     * @schema PeerAuthenticationV1Beta1Spec#portLevelMtls
     */
    readonly portLevelMtls?: {
        [key: string]: PeerAuthenticationV1Beta1SpecPortLevelMtls;
    };
    /**
     * The selector determines the workloads to apply the PeerAuthentication on.
     *
     * @schema PeerAuthenticationV1Beta1Spec#selector
     */
    readonly selector?: PeerAuthenticationV1Beta1SpecSelector;
}
/**
 * Converts an object of type 'PeerAuthenticationV1Beta1Spec' to JSON representation.
 */
export declare function toJson_PeerAuthenticationV1Beta1Spec(obj: PeerAuthenticationV1Beta1Spec | undefined): Record<string, any> | undefined;
/**
 * Mutual TLS settings for workload.
 *
 * @schema PeerAuthenticationV1Beta1SpecMtls
 */
export interface PeerAuthenticationV1Beta1SpecMtls {
    /**
     * Defines the mTLS mode used for peer authentication.
     *
     * Valid Options: DISABLE, PERMISSIVE, STRICT
     *
     * @schema PeerAuthenticationV1Beta1SpecMtls#mode
     */
    readonly mode?: PeerAuthenticationV1Beta1SpecMtlsMode;
}
/**
 * Converts an object of type 'PeerAuthenticationV1Beta1SpecMtls' to JSON representation.
 */
export declare function toJson_PeerAuthenticationV1Beta1SpecMtls(obj: PeerAuthenticationV1Beta1SpecMtls | undefined): Record<string, any> | undefined;
/**
 * @schema PeerAuthenticationV1Beta1SpecPortLevelMtls
 */
export interface PeerAuthenticationV1Beta1SpecPortLevelMtls {
    /**
     * Defines the mTLS mode used for peer authentication.
     *
     * Valid Options: DISABLE, PERMISSIVE, STRICT
     *
     * @schema PeerAuthenticationV1Beta1SpecPortLevelMtls#mode
     */
    readonly mode?: PeerAuthenticationV1Beta1SpecPortLevelMtlsMode;
}
/**
 * Converts an object of type 'PeerAuthenticationV1Beta1SpecPortLevelMtls' to JSON representation.
 */
export declare function toJson_PeerAuthenticationV1Beta1SpecPortLevelMtls(obj: PeerAuthenticationV1Beta1SpecPortLevelMtls | undefined): Record<string, any> | undefined;
/**
 * The selector determines the workloads to apply the PeerAuthentication on.
 *
 * @schema PeerAuthenticationV1Beta1SpecSelector
 */
export interface PeerAuthenticationV1Beta1SpecSelector {
    /**
     * One or more labels that indicate a specific set of pods/VMs on which a policy should be applied.
     *
     * @schema PeerAuthenticationV1Beta1SpecSelector#matchLabels
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'PeerAuthenticationV1Beta1SpecSelector' to JSON representation.
 */
export declare function toJson_PeerAuthenticationV1Beta1SpecSelector(obj: PeerAuthenticationV1Beta1SpecSelector | undefined): Record<string, any> | undefined;
/**
 * Defines the mTLS mode used for peer authentication.
 *
 * Valid Options: DISABLE, PERMISSIVE, STRICT
 *
 * @schema PeerAuthenticationV1Beta1SpecMtlsMode
 */
export declare enum PeerAuthenticationV1Beta1SpecMtlsMode {
    /** UNSET */
    UNSET = "UNSET",
    /** DISABLE */
    DISABLE = "DISABLE",
    /** PERMISSIVE */
    PERMISSIVE = "PERMISSIVE",
    /** STRICT */
    STRICT = "STRICT"
}
/**
 * Defines the mTLS mode used for peer authentication.
 *
 * Valid Options: DISABLE, PERMISSIVE, STRICT
 *
 * @schema PeerAuthenticationV1Beta1SpecPortLevelMtlsMode
 */
export declare enum PeerAuthenticationV1Beta1SpecPortLevelMtlsMode {
    /** UNSET */
    UNSET = "UNSET",
    /** DISABLE */
    DISABLE = "DISABLE",
    /** PERMISSIVE */
    PERMISSIVE = "PERMISSIVE",
    /** STRICT */
    STRICT = "STRICT"
}
/**
 *
 *
 * @schema RequestAuthentication
 */
export declare class RequestAuthentication extends ApiObject {
    /**
     * Returns the apiVersion and kind for "RequestAuthentication"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "RequestAuthentication".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: RequestAuthenticationProps): any;
    /**
     * Defines a "RequestAuthentication" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: RequestAuthenticationProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * @schema RequestAuthentication
 */
export interface RequestAuthenticationProps {
    /**
     * @schema RequestAuthentication#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Request authentication configuration for workloads. See more details at: https://istio.io/docs/reference/config/security/request_authentication.html
     *
     * @schema RequestAuthentication#spec
     */
    readonly spec?: RequestAuthenticationSpec;
}
/**
 * Converts an object of type 'RequestAuthenticationProps' to JSON representation.
 */
export declare function toJson_RequestAuthenticationProps(obj: RequestAuthenticationProps | undefined): Record<string, any> | undefined;
/**
 * Request authentication configuration for workloads. See more details at: https://istio.io/docs/reference/config/security/request_authentication.html
 *
 * @schema RequestAuthenticationSpec
 */
export interface RequestAuthenticationSpec {
    /**
     * Define the list of JWTs that can be validated at the selected workloads' proxy.
     *
     * @schema RequestAuthenticationSpec#jwtRules
     */
    readonly jwtRules?: RequestAuthenticationSpecJwtRules[];
    /**
     * Optional.
     *
     * @schema RequestAuthenticationSpec#selector
     */
    readonly selector?: RequestAuthenticationSpecSelector;
    /**
     * @schema RequestAuthenticationSpec#targetRef
     */
    readonly targetRef?: RequestAuthenticationSpecTargetRef;
    /**
     * Optional.
     *
     * @schema RequestAuthenticationSpec#targetRefs
     */
    readonly targetRefs?: RequestAuthenticationSpecTargetRefs[];
}
/**
 * Converts an object of type 'RequestAuthenticationSpec' to JSON representation.
 */
export declare function toJson_RequestAuthenticationSpec(obj: RequestAuthenticationSpec | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationSpecJwtRules
 */
export interface RequestAuthenticationSpecJwtRules {
    /**
     * The list of JWT [audiences](https://tools.ietf.org/html/rfc7519#section-4.1.3) that are allowed to access.
     *
     * @schema RequestAuthenticationSpecJwtRules#audiences
     */
    readonly audiences?: string[];
    /**
     * If set to true, the original token will be kept for the upstream request.
     *
     * @schema RequestAuthenticationSpecJwtRules#forwardOriginalToken
     */
    readonly forwardOriginalToken?: boolean;
    /**
     * List of cookie names from which JWT is expected.
     *
     * @schema RequestAuthenticationSpecJwtRules#fromCookies
     */
    readonly fromCookies?: string[];
    /**
     * List of header locations from which JWT is expected.
     *
     * @schema RequestAuthenticationSpecJwtRules#fromHeaders
     */
    readonly fromHeaders?: RequestAuthenticationSpecJwtRulesFromHeaders[];
    /**
     * List of query parameters from which JWT is expected.
     *
     * @schema RequestAuthenticationSpecJwtRules#fromParams
     */
    readonly fromParams?: string[];
    /**
     * Identifies the issuer that issued the JWT.
     *
     * @schema RequestAuthenticationSpecJwtRules#issuer
     */
    readonly issuer?: string;
    /**
     * JSON Web Key Set of public keys to validate signature of the JWT.
     *
     * @schema RequestAuthenticationSpecJwtRules#jwks
     */
    readonly jwks?: string;
    /**
     * URL of the provider's public key set to validate signature of the JWT.
     *
     * @schema RequestAuthenticationSpecJwtRules#jwks_uri
     */
    readonly jwksUri?: string;
    /**
     * This field specifies a list of operations to copy the claim to HTTP headers on a successfully verified token.
     *
     * @schema RequestAuthenticationSpecJwtRules#outputClaimToHeaders
     */
    readonly outputClaimToHeaders?: RequestAuthenticationSpecJwtRulesOutputClaimToHeaders[];
    /**
     * This field specifies the header name to output a successfully verified JWT payload to the backend.
     *
     * @schema RequestAuthenticationSpecJwtRules#outputPayloadToHeader
     */
    readonly outputPayloadToHeader?: string;
    /**
     * The maximum amount of time that the resolver, determined by the PILOT_JWT_ENABLE_REMOTE_JWKS environment variable, will spend waiting for the JWKS to be fetched.
     *
     * @schema RequestAuthenticationSpecJwtRules#timeout
     */
    readonly timeout?: string;
}
/**
 * Converts an object of type 'RequestAuthenticationSpecJwtRules' to JSON representation.
 */
export declare function toJson_RequestAuthenticationSpecJwtRules(obj: RequestAuthenticationSpecJwtRules | undefined): Record<string, any> | undefined;
/**
 * Optional.
 *
 * @schema RequestAuthenticationSpecSelector
 */
export interface RequestAuthenticationSpecSelector {
    /**
     * One or more labels that indicate a specific set of pods/VMs on which a policy should be applied.
     *
     * @schema RequestAuthenticationSpecSelector#matchLabels
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'RequestAuthenticationSpecSelector' to JSON representation.
 */
export declare function toJson_RequestAuthenticationSpecSelector(obj: RequestAuthenticationSpecSelector | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationSpecTargetRef
 */
export interface RequestAuthenticationSpecTargetRef {
    /**
     * group is the group of the target resource.
     *
     * @schema RequestAuthenticationSpecTargetRef#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema RequestAuthenticationSpecTargetRef#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema RequestAuthenticationSpecTargetRef#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema RequestAuthenticationSpecTargetRef#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'RequestAuthenticationSpecTargetRef' to JSON representation.
 */
export declare function toJson_RequestAuthenticationSpecTargetRef(obj: RequestAuthenticationSpecTargetRef | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationSpecTargetRefs
 */
export interface RequestAuthenticationSpecTargetRefs {
    /**
     * group is the group of the target resource.
     *
     * @schema RequestAuthenticationSpecTargetRefs#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema RequestAuthenticationSpecTargetRefs#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema RequestAuthenticationSpecTargetRefs#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema RequestAuthenticationSpecTargetRefs#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'RequestAuthenticationSpecTargetRefs' to JSON representation.
 */
export declare function toJson_RequestAuthenticationSpecTargetRefs(obj: RequestAuthenticationSpecTargetRefs | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationSpecJwtRulesFromHeaders
 */
export interface RequestAuthenticationSpecJwtRulesFromHeaders {
    /**
     * The HTTP header name.
     *
     * @schema RequestAuthenticationSpecJwtRulesFromHeaders#name
     */
    readonly name: string;
    /**
     * The prefix that should be stripped before decoding the token.
     *
     * @schema RequestAuthenticationSpecJwtRulesFromHeaders#prefix
     */
    readonly prefix?: string;
}
/**
 * Converts an object of type 'RequestAuthenticationSpecJwtRulesFromHeaders' to JSON representation.
 */
export declare function toJson_RequestAuthenticationSpecJwtRulesFromHeaders(obj: RequestAuthenticationSpecJwtRulesFromHeaders | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationSpecJwtRulesOutputClaimToHeaders
 */
export interface RequestAuthenticationSpecJwtRulesOutputClaimToHeaders {
    /**
     * The name of the claim to be copied from.
     *
     * @schema RequestAuthenticationSpecJwtRulesOutputClaimToHeaders#claim
     */
    readonly claim: string;
    /**
     * The name of the header to be created.
     *
     * @schema RequestAuthenticationSpecJwtRulesOutputClaimToHeaders#header
     */
    readonly header: string;
}
/**
 * Converts an object of type 'RequestAuthenticationSpecJwtRulesOutputClaimToHeaders' to JSON representation.
 */
export declare function toJson_RequestAuthenticationSpecJwtRulesOutputClaimToHeaders(obj: RequestAuthenticationSpecJwtRulesOutputClaimToHeaders | undefined): Record<string, any> | undefined;
/**
 *
 *
 * @schema RequestAuthenticationV1Beta1
 */
export declare class RequestAuthenticationV1Beta1 extends ApiObject {
    /**
     * Returns the apiVersion and kind for "RequestAuthenticationV1Beta1"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "RequestAuthenticationV1Beta1".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: RequestAuthenticationV1Beta1Props): any;
    /**
     * Defines a "RequestAuthenticationV1Beta1" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: RequestAuthenticationV1Beta1Props);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * @schema RequestAuthenticationV1Beta1
 */
export interface RequestAuthenticationV1Beta1Props {
    /**
     * @schema RequestAuthenticationV1Beta1#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Request authentication configuration for workloads. See more details at: https://istio.io/docs/reference/config/security/request_authentication.html
     *
     * @schema RequestAuthenticationV1Beta1#spec
     */
    readonly spec?: RequestAuthenticationV1Beta1Spec;
}
/**
 * Converts an object of type 'RequestAuthenticationV1Beta1Props' to JSON representation.
 */
export declare function toJson_RequestAuthenticationV1Beta1Props(obj: RequestAuthenticationV1Beta1Props | undefined): Record<string, any> | undefined;
/**
 * Request authentication configuration for workloads. See more details at: https://istio.io/docs/reference/config/security/request_authentication.html
 *
 * @schema RequestAuthenticationV1Beta1Spec
 */
export interface RequestAuthenticationV1Beta1Spec {
    /**
     * Define the list of JWTs that can be validated at the selected workloads' proxy.
     *
     * @schema RequestAuthenticationV1Beta1Spec#jwtRules
     */
    readonly jwtRules?: RequestAuthenticationV1Beta1SpecJwtRules[];
    /**
     * Optional.
     *
     * @schema RequestAuthenticationV1Beta1Spec#selector
     */
    readonly selector?: RequestAuthenticationV1Beta1SpecSelector;
    /**
     * @schema RequestAuthenticationV1Beta1Spec#targetRef
     */
    readonly targetRef?: RequestAuthenticationV1Beta1SpecTargetRef;
    /**
     * Optional.
     *
     * @schema RequestAuthenticationV1Beta1Spec#targetRefs
     */
    readonly targetRefs?: RequestAuthenticationV1Beta1SpecTargetRefs[];
}
/**
 * Converts an object of type 'RequestAuthenticationV1Beta1Spec' to JSON representation.
 */
export declare function toJson_RequestAuthenticationV1Beta1Spec(obj: RequestAuthenticationV1Beta1Spec | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationV1Beta1SpecJwtRules
 */
export interface RequestAuthenticationV1Beta1SpecJwtRules {
    /**
     * The list of JWT [audiences](https://tools.ietf.org/html/rfc7519#section-4.1.3) that are allowed to access.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#audiences
     */
    readonly audiences?: string[];
    /**
     * If set to true, the original token will be kept for the upstream request.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#forwardOriginalToken
     */
    readonly forwardOriginalToken?: boolean;
    /**
     * List of cookie names from which JWT is expected.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#fromCookies
     */
    readonly fromCookies?: string[];
    /**
     * List of header locations from which JWT is expected.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#fromHeaders
     */
    readonly fromHeaders?: RequestAuthenticationV1Beta1SpecJwtRulesFromHeaders[];
    /**
     * List of query parameters from which JWT is expected.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#fromParams
     */
    readonly fromParams?: string[];
    /**
     * Identifies the issuer that issued the JWT.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#issuer
     */
    readonly issuer?: string;
    /**
     * JSON Web Key Set of public keys to validate signature of the JWT.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#jwks
     */
    readonly jwks?: string;
    /**
     * URL of the provider's public key set to validate signature of the JWT.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#jwks_uri
     */
    readonly jwksUri?: string;
    /**
     * This field specifies a list of operations to copy the claim to HTTP headers on a successfully verified token.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#outputClaimToHeaders
     */
    readonly outputClaimToHeaders?: RequestAuthenticationV1Beta1SpecJwtRulesOutputClaimToHeaders[];
    /**
     * This field specifies the header name to output a successfully verified JWT payload to the backend.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#outputPayloadToHeader
     */
    readonly outputPayloadToHeader?: string;
    /**
     * The maximum amount of time that the resolver, determined by the PILOT_JWT_ENABLE_REMOTE_JWKS environment variable, will spend waiting for the JWKS to be fetched.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRules#timeout
     */
    readonly timeout?: string;
}
/**
 * Converts an object of type 'RequestAuthenticationV1Beta1SpecJwtRules' to JSON representation.
 */
export declare function toJson_RequestAuthenticationV1Beta1SpecJwtRules(obj: RequestAuthenticationV1Beta1SpecJwtRules | undefined): Record<string, any> | undefined;
/**
 * Optional.
 *
 * @schema RequestAuthenticationV1Beta1SpecSelector
 */
export interface RequestAuthenticationV1Beta1SpecSelector {
    /**
     * One or more labels that indicate a specific set of pods/VMs on which a policy should be applied.
     *
     * @schema RequestAuthenticationV1Beta1SpecSelector#matchLabels
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'RequestAuthenticationV1Beta1SpecSelector' to JSON representation.
 */
export declare function toJson_RequestAuthenticationV1Beta1SpecSelector(obj: RequestAuthenticationV1Beta1SpecSelector | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationV1Beta1SpecTargetRef
 */
export interface RequestAuthenticationV1Beta1SpecTargetRef {
    /**
     * group is the group of the target resource.
     *
     * @schema RequestAuthenticationV1Beta1SpecTargetRef#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema RequestAuthenticationV1Beta1SpecTargetRef#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema RequestAuthenticationV1Beta1SpecTargetRef#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema RequestAuthenticationV1Beta1SpecTargetRef#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'RequestAuthenticationV1Beta1SpecTargetRef' to JSON representation.
 */
export declare function toJson_RequestAuthenticationV1Beta1SpecTargetRef(obj: RequestAuthenticationV1Beta1SpecTargetRef | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationV1Beta1SpecTargetRefs
 */
export interface RequestAuthenticationV1Beta1SpecTargetRefs {
    /**
     * group is the group of the target resource.
     *
     * @schema RequestAuthenticationV1Beta1SpecTargetRefs#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema RequestAuthenticationV1Beta1SpecTargetRefs#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema RequestAuthenticationV1Beta1SpecTargetRefs#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema RequestAuthenticationV1Beta1SpecTargetRefs#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'RequestAuthenticationV1Beta1SpecTargetRefs' to JSON representation.
 */
export declare function toJson_RequestAuthenticationV1Beta1SpecTargetRefs(obj: RequestAuthenticationV1Beta1SpecTargetRefs | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationV1Beta1SpecJwtRulesFromHeaders
 */
export interface RequestAuthenticationV1Beta1SpecJwtRulesFromHeaders {
    /**
     * The HTTP header name.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRulesFromHeaders#name
     */
    readonly name: string;
    /**
     * The prefix that should be stripped before decoding the token.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRulesFromHeaders#prefix
     */
    readonly prefix?: string;
}
/**
 * Converts an object of type 'RequestAuthenticationV1Beta1SpecJwtRulesFromHeaders' to JSON representation.
 */
export declare function toJson_RequestAuthenticationV1Beta1SpecJwtRulesFromHeaders(obj: RequestAuthenticationV1Beta1SpecJwtRulesFromHeaders | undefined): Record<string, any> | undefined;
/**
 * @schema RequestAuthenticationV1Beta1SpecJwtRulesOutputClaimToHeaders
 */
export interface RequestAuthenticationV1Beta1SpecJwtRulesOutputClaimToHeaders {
    /**
     * The name of the claim to be copied from.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRulesOutputClaimToHeaders#claim
     */
    readonly claim: string;
    /**
     * The name of the header to be created.
     *
     * @schema RequestAuthenticationV1Beta1SpecJwtRulesOutputClaimToHeaders#header
     */
    readonly header: string;
}
/**
 * Converts an object of type 'RequestAuthenticationV1Beta1SpecJwtRulesOutputClaimToHeaders' to JSON representation.
 */
export declare function toJson_RequestAuthenticationV1Beta1SpecJwtRulesOutputClaimToHeaders(obj: RequestAuthenticationV1Beta1SpecJwtRulesOutputClaimToHeaders | undefined): Record<string, any> | undefined;
