import { ModelConstructor } from 'dynamoose';
export declare type Constructor<T = {}> = new (...args: any[]) => T;
export declare function ModelWrapper<T>(modelConstructor: Constructor<T>): ModelConstructor<T, Partial<T>>;
//# sourceMappingURL=modelWrapper.d.ts.map