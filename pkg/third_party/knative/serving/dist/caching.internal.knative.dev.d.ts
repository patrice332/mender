import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
/**
 * Image is a Knative abstraction that encapsulates the interface by which Knative
components express a desire to have a particular image cached.
 *
 * @schema Image
 */
export declare class Image extends ApiObject {
    /**
     * Returns the apiVersion and kind for "Image"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Image".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props?: ImageProps): any;
    /**
     * Defines a "Image" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props?: ImageProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): any;
}
/**
 * Image is a Knative abstraction that encapsulates the interface by which Knative
 * components express a desire to have a particular image cached.
 *
 * @schema Image
 */
export interface ImageProps {
    /**
     * @schema Image#metadata
     */
    readonly metadata?: ApiObjectMetadata;
    /**
     * Spec holds the desired state of the Image (from the client).
     *
     * @schema Image#spec
     */
    readonly spec?: ImageSpec;
}
/**
 * Converts an object of type 'ImageProps' to JSON representation.
 */
export declare function toJson_ImageProps(obj: ImageProps | undefined): Record<string, any> | undefined;
/**
 * Spec holds the desired state of the Image (from the client).
 *
 * @schema ImageSpec
 */
export interface ImageSpec {
    /**
     * Image is the name of the container image url to cache across the cluster.
     *
     * @schema ImageSpec#image
     */
    readonly image: string;
    /**
     * ImagePullSecrets contains the names of the Kubernetes Secrets containing login
     * information used by the Pods which will run this container.
     *
     * @schema ImageSpec#imagePullSecrets
     */
    readonly imagePullSecrets?: ImageSpecImagePullSecrets[];
    /**
     * ServiceAccountName is the name of the Kubernetes ServiceAccount as which the Pods
     * will run this container.  This is potentially used to authenticate the image pull
     * if the service account has attached pull secrets.  For more information:
     * https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#add-imagepullsecrets-to-a-service-account
     *
     * @schema ImageSpec#serviceAccountName
     */
    readonly serviceAccountName?: string;
}
/**
 * Converts an object of type 'ImageSpec' to JSON representation.
 */
export declare function toJson_ImageSpec(obj: ImageSpec | undefined): Record<string, any> | undefined;
/**
 * LocalObjectReference contains enough information to let you locate the
 * referenced object inside the same namespace.
 *
 * @schema ImageSpecImagePullSecrets
 */
export interface ImageSpecImagePullSecrets {
    /**
     * Name of the referent.
     * This field is effectively required, but due to backwards compatibility is
     * allowed to be empty. Instances of this type with an empty value here are
     * almost certainly wrong.
     * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     *
     * @schema ImageSpecImagePullSecrets#name
     */
    readonly name?: string;
}
/**
 * Converts an object of type 'ImageSpecImagePullSecrets' to JSON representation.
 */
export declare function toJson_ImageSpecImagePullSecrets(obj: ImageSpecImagePullSecrets | undefined): Record<string, any> | undefined;
