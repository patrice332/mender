import { Construct } from 'constructs';
export interface CniProps {
    readonly namespace?: string;
    readonly releaseName?: string;
    readonly helmExecutable?: string;
    readonly helmFlags?: string[];
    readonly values?: {
        [key: string]: any;
    };
}
export declare class Cni extends Construct {
    constructor(scope: Construct, id: string, props?: CniProps);
    private flattenAdditionalValues;
}
