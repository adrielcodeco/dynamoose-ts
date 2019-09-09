import {
  SchemaAttributeDefinition,
  RawSchemaAttributeDefinition
} from 'dynamoose'

export type SchemaAttribute =
  | SchemaAttributeDefinition<NumberConstructor, number>
  | SchemaAttributeDefinition<[NumberConstructor], number[]>
  | SchemaAttributeDefinition<DateConstructor, Date>
  | SchemaAttributeDefinition<StringConstructor, string>
  | SchemaAttributeDefinition<[StringConstructor], string[]>
  | SchemaAttributeDefinition<ObjectConstructor, Object>
  | SchemaAttributeDefinition<ArrayConstructor, Array<any>>
  | SchemaAttributeDefinition<any, any>
  | RawSchemaAttributeDefinition<any, any>
  | NumberConstructor
  | DateConstructor
  | StringConstructor
  | ObjectConstructor
  | ArrayConstructor
  | [NumberConstructor]
  | [StringConstructor]
