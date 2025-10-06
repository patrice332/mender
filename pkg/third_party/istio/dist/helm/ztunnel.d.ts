import { Construct } from 'constructs';
export interface ZtunnelProps {
    readonly namespace?: string;
    readonly releaseName?: string;
    readonly helmExecutable?: string;
    readonly helmFlags?: string[];
    readonly values?: {
        [key: string]: any;
    };
}
export declare class Ztunnel extends Construct {
    constructor(scope: Construct, id: string, props?: ZtunnelProps);
    private flattenAdditionalValues;
}
