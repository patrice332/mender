import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
/**
 *
 *
 * @schema WasmPlugin
 */
export declare class WasmPlugin extends ApiObject {
    /**
     * Returns the apiVersion and kind for "WasmPlugin"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "WasmPlugin".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: WasmPluginProps): any;
    /**
     * Defines a "WasmPlugin" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: WasmPluginProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * @schema WasmPlugin
 */
export interface WasmPluginProps {
    /**
     * @schema WasmPlugin#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Extend the functionality provided by the Istio proxy through WebAssembly filters. See more details at: https://istio.io/docs/reference/config/proxy_extensions/wasm-plugin.html
     *
     * @schema WasmPlugin#spec
     */
    readonly spec: WasmPluginSpec;
}
/**
 * Converts an object of type 'WasmPluginProps' to JSON representation.
 */
export declare function toJson_WasmPluginProps(obj: WasmPluginProps | undefined): Record<string, any> | undefined;
/**
 * Extend the functionality provided by the Istio proxy through WebAssembly filters. See more details at: https://istio.io/docs/reference/config/proxy_extensions/wasm-plugin.html
 *
 * @schema WasmPluginSpec
 */
export interface WasmPluginSpec {
    /**
     * Specifies the failure behavior for the plugin due to fatal errors.
     *
     * Valid Options: FAIL_CLOSE, FAIL_OPEN, FAIL_RELOAD
     *
     * @schema WasmPluginSpec#failStrategy
     */
    readonly failStrategy?: WasmPluginSpecFailStrategy;
    /**
     * The pull behaviour to be applied when fetching Wasm module by either OCI image or `http/https`.
     *
     * Valid Options: IfNotPresent, Always
     *
     * @schema WasmPluginSpec#imagePullPolicy
     */
    readonly imagePullPolicy?: WasmPluginSpecImagePullPolicy;
    /**
     * Credentials to use for OCI image pulling.
     *
     * @schema WasmPluginSpec#imagePullSecret
     */
    readonly imagePullSecret?: string;
    /**
     * Specifies the criteria to determine which traffic is passed to WasmPlugin.
     *
     * @schema WasmPluginSpec#match
     */
    readonly match?: WasmPluginSpecMatch[];
    /**
     * Determines where in the filter chain this `WasmPlugin` is to be injected.
     *
     * Valid Options: AUTHN, AUTHZ, STATS
     *
     * @schema WasmPluginSpec#phase
     */
    readonly phase?: WasmPluginSpecPhase;
    /**
     * The configuration that will be passed on to the plugin.
     *
     * @schema WasmPluginSpec#pluginConfig
     */
    readonly pluginConfig?: any;
    /**
     * The plugin name to be used in the Envoy configuration (used to be called `rootID`).
     *
     * @schema WasmPluginSpec#pluginName
     */
    readonly pluginName?: string;
    /**
     * Determines ordering of `WasmPlugins` in the same `phase`.
     *
     * @schema WasmPluginSpec#priority
     */
    readonly priority?: number;
    /**
     * Criteria used to select the specific set of pods/VMs on which this plugin configuration should be applied.
     *
     * @schema WasmPluginSpec#selector
     */
    readonly selector?: WasmPluginSpecSelector;
    /**
     * SHA256 checksum that will be used to verify Wasm module or OCI container.
     *
     * @schema WasmPluginSpec#sha256
     */
    readonly sha256?: string;
    /**
     * @schema WasmPluginSpec#targetRef
     */
    readonly targetRef?: WasmPluginSpecTargetRef;
    /**
     * Optional.
     *
     * @schema WasmPluginSpec#targetRefs
     */
    readonly targetRefs?: WasmPluginSpecTargetRefs[];
    /**
     * Specifies the type of Wasm Extension to be used.
     *
     * Valid Options: HTTP, NETWORK
     *
     * @schema WasmPluginSpec#type
     */
    readonly type?: WasmPluginSpecType;
    /**
     * URL of a Wasm module or OCI container.
     *
     * @schema WasmPluginSpec#url
     */
    readonly url: string;
    /**
     * @schema WasmPluginSpec#verificationKey
     */
    readonly verificationKey?: string;
    /**
     * Configuration for a Wasm VM.
     *
     * @schema WasmPluginSpec#vmConfig
     */
    readonly vmConfig?: WasmPluginSpecVmConfig;
}
/**
 * Converts an object of type 'WasmPluginSpec' to JSON representation.
 */
export declare function toJson_WasmPluginSpec(obj: WasmPluginSpec | undefined): Record<string, any> | undefined;
/**
 * Specifies the failure behavior for the plugin due to fatal errors.
 *
 * Valid Options: FAIL_CLOSE, FAIL_OPEN, FAIL_RELOAD
 *
 * @schema WasmPluginSpecFailStrategy
 */
export declare enum WasmPluginSpecFailStrategy {
    /** FAIL_CLOSE */
    FAIL_UNDERSCORE_CLOSE = "FAIL_CLOSE",
    /** FAIL_OPEN */
    FAIL_UNDERSCORE_OPEN = "FAIL_OPEN",
    /** FAIL_RELOAD */
    FAIL_UNDERSCORE_RELOAD = "FAIL_RELOAD"
}
/**
 * The pull behaviour to be applied when fetching Wasm module by either OCI image or `http/https`.
 *
 * Valid Options: IfNotPresent, Always
 *
 * @schema WasmPluginSpecImagePullPolicy
 */
export declare enum WasmPluginSpecImagePullPolicy {
    /** UNSPECIFIED_POLICY */
    UNSPECIFIED_UNDERSCORE_POLICY = "UNSPECIFIED_POLICY",
    /** IfNotPresent */
    IF_NOT_PRESENT = "IfNotPresent",
    /** Always */
    ALWAYS = "Always"
}
/**
 * @schema WasmPluginSpecMatch
 */
export interface WasmPluginSpecMatch {
    /**
     * Criteria for selecting traffic by their direction.
     *
     * Valid Options: CLIENT, SERVER, CLIENT_AND_SERVER
     *
     * @schema WasmPluginSpecMatch#mode
     */
    readonly mode?: WasmPluginSpecMatchMode;
    /**
     * Criteria for selecting traffic by their destination port.
     *
     * @schema WasmPluginSpecMatch#ports
     */
    readonly ports?: WasmPluginSpecMatchPorts[];
}
/**
 * Converts an object of type 'WasmPluginSpecMatch' to JSON representation.
 */
export declare function toJson_WasmPluginSpecMatch(obj: WasmPluginSpecMatch | undefined): Record<string, any> | undefined;
/**
 * Determines where in the filter chain this `WasmPlugin` is to be injected.
 *
 * Valid Options: AUTHN, AUTHZ, STATS
 *
 * @schema WasmPluginSpecPhase
 */
export declare enum WasmPluginSpecPhase {
    /** UNSPECIFIED_PHASE */
    UNSPECIFIED_UNDERSCORE_PHASE = "UNSPECIFIED_PHASE",
    /** AUTHN */
    AUTHN = "AUTHN",
    /** AUTHZ */
    AUTHZ = "AUTHZ",
    /** STATS */
    STATS = "STATS"
}
/**
 * Criteria used to select the specific set of pods/VMs on which this plugin configuration should be applied.
 *
 * @schema WasmPluginSpecSelector
 */
export interface WasmPluginSpecSelector {
    /**
     * One or more labels that indicate a specific set of pods/VMs on which a policy should be applied.
     *
     * @schema WasmPluginSpecSelector#matchLabels
     */
    readonly matchLabels?: {
        [key: string]: string;
    };
}
/**
 * Converts an object of type 'WasmPluginSpecSelector' to JSON representation.
 */
export declare function toJson_WasmPluginSpecSelector(obj: WasmPluginSpecSelector | undefined): Record<string, any> | undefined;
/**
 * @schema WasmPluginSpecTargetRef
 */
export interface WasmPluginSpecTargetRef {
    /**
     * group is the group of the target resource.
     *
     * @schema WasmPluginSpecTargetRef#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema WasmPluginSpecTargetRef#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema WasmPluginSpecTargetRef#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema WasmPluginSpecTargetRef#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'WasmPluginSpecTargetRef' to JSON representation.
 */
export declare function toJson_WasmPluginSpecTargetRef(obj: WasmPluginSpecTargetRef | undefined): Record<string, any> | undefined;
/**
 * @schema WasmPluginSpecTargetRefs
 */
export interface WasmPluginSpecTargetRefs {
    /**
     * group is the group of the target resource.
     *
     * @schema WasmPluginSpecTargetRefs#group
     */
    readonly group?: string;
    /**
     * kind is kind of the target resource.
     *
     * @schema WasmPluginSpecTargetRefs#kind
     */
    readonly kind: string;
    /**
     * name is the name of the target resource.
     *
     * @schema WasmPluginSpecTargetRefs#name
     */
    readonly name: string;
    /**
     * namespace is the namespace of the referent.
     *
     * @schema WasmPluginSpecTargetRefs#namespace
     */
    readonly namespace?: string;
}
/**
 * Converts an object of type 'WasmPluginSpecTargetRefs' to JSON representation.
 */
export declare function toJson_WasmPluginSpecTargetRefs(obj: WasmPluginSpecTargetRefs | undefined): Record<string, any> | undefined;
/**
 * Specifies the type of Wasm Extension to be used.
 *
 * Valid Options: HTTP, NETWORK
 *
 * @schema WasmPluginSpecType
 */
export declare enum WasmPluginSpecType {
    /** UNSPECIFIED_PLUGIN_TYPE */
    UNSPECIFIED_UNDERSCORE_PLUGIN_UNDERSCORE_TYPE = "UNSPECIFIED_PLUGIN_TYPE",
    /** HTTP */
    HTTP = "HTTP",
    /** NETWORK */
    NETWORK = "NETWORK"
}
/**
 * Configuration for a Wasm VM.
 *
 * @schema WasmPluginSpecVmConfig
 */
export interface WasmPluginSpecVmConfig {
    /**
     * Specifies environment variables to be injected to this VM.
     *
     * @schema WasmPluginSpecVmConfig#env
     */
    readonly env?: WasmPluginSpecVmConfigEnv[];
}
/**
 * Converts an object of type 'WasmPluginSpecVmConfig' to JSON representation.
 */
export declare function toJson_WasmPluginSpecVmConfig(obj: WasmPluginSpecVmConfig | undefined): Record<string, any> | undefined;
/**
 * Criteria for selecting traffic by their direction.
 *
 * Valid Options: CLIENT, SERVER, CLIENT_AND_SERVER
 *
 * @schema WasmPluginSpecMatchMode
 */
export declare enum WasmPluginSpecMatchMode {
    /** UNDEFINED */
    UNDEFINED = "UNDEFINED",
    /** CLIENT */
    CLIENT = "CLIENT",
    /** SERVER */
    SERVER = "SERVER",
    /** CLIENT_AND_SERVER */
    CLIENT_UNDERSCORE_AND_UNDERSCORE_SERVER = "CLIENT_AND_SERVER"
}
/**
 * @schema WasmPluginSpecMatchPorts
 */
export interface WasmPluginSpecMatchPorts {
    /**
     * @schema WasmPluginSpecMatchPorts#number
     */
    readonly number: number;
}
/**
 * Converts an object of type 'WasmPluginSpecMatchPorts' to JSON representation.
 */
export declare function toJson_WasmPluginSpecMatchPorts(obj: WasmPluginSpecMatchPorts | undefined): Record<string, any> | undefined;
/**
 * @schema WasmPluginSpecVmConfigEnv
 */
export interface WasmPluginSpecVmConfigEnv {
    /**
     * Name of the environment variable.
     *
     * @schema WasmPluginSpecVmConfigEnv#name
     */
    readonly name: string;
    /**
     * Value for the environment variable.
     *
     * @schema WasmPluginSpecVmConfigEnv#value
     */
    readonly value?: string;
    /**
     * Source for the environment variable's value.
     *
     * Valid Options: INLINE, HOST
     *
     * @schema WasmPluginSpecVmConfigEnv#valueFrom
     */
    readonly valueFrom?: WasmPluginSpecVmConfigEnvValueFrom;
}
/**
 * Converts an object of type 'WasmPluginSpecVmConfigEnv' to JSON representation.
 */
export declare function toJson_WasmPluginSpecVmConfigEnv(obj: WasmPluginSpecVmConfigEnv | undefined): Record<string, any> | undefined;
/**
 * Source for the environment variable's value.
 *
 * Valid Options: INLINE, HOST
 *
 * @schema WasmPluginSpecVmConfigEnvValueFrom
 */
export declare enum WasmPluginSpecVmConfigEnvValueFrom {
    /** INLINE */
    INLINE = "INLINE",
    /** HOST */
    HOST = "HOST"
}
