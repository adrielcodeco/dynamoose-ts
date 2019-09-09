import { ModelSchema } from 'dynamoose';
export declare type BatchPutCallback<DataSchema> = (err: Error, items: ModelSchema<DataSchema>[]) => void;
export declare type CreateCallback<DataSchema> = (err: Error, model: ModelSchema<DataSchema>) => void;
export declare type UpdteCallback<DataSchema> = (err: Error, items: ModelSchema<DataSchema>[]) => void;
export declare function overwriteModel(model: any, instance: any, fromTo: {
    from: (value: any) => any;
    to: (value: any) => any;
}): void;
//# sourceMappingURL=overwriteModel.d.ts.map