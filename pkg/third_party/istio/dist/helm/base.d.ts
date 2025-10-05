import { Construct } from 'constructs';
export interface BaseProps {
    readonly namespace?: string;
    readonly releaseName?: string;
    readonly helmExecutable?: string;
    readonly helmFlags?: string[];
    readonly values?: {
        [key: string]: any;
    };
}
export declare class Base extends Construct {
    constructor(scope: Construct, id: string, props?: BaseProps);
    private flattenAdditionalValues;
}
