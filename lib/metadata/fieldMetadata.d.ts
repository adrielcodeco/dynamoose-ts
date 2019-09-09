import { SchemaAttribute } from "../dynamoose/schemaAttribute";
export interface FieldMetadata {
    name: string;
    linked: boolean;
    propertyName?: string;
    schema: Partial<SchemaAttribute>;
}
//# sourceMappingURL=fieldMetadata.d.ts.map