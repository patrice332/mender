import { Construct } from 'constructs';
export interface IstiodProps {
    readonly namespace?: string;
    readonly releaseName?: string;
    readonly helmExecutable?: string;
    readonly helmFlags?: string[];
    readonly values?: {
        [key: string]: any;
    };
}
export declare class Istiod extends Construct {
    constructor(scope: Construct, id: string, props?: IstiodProps);
    private flattenAdditionalValues;
}
