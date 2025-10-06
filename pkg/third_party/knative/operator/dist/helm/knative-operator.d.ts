import { Construct } from 'constructs';
export interface KnativeoperatorProps {
    readonly namespace?: string;
    readonly releaseName?: string;
    readonly helmExecutable?: string;
    readonly helmFlags?: string[];
    readonly values?: {
        [key: string]: any;
    };
}
export declare class Knativeoperator extends Construct {
    constructor(scope: Construct, id: string, props?: KnativeoperatorProps);
    private flattenAdditionalValues;
}
