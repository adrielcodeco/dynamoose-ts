import { SchemaAttribute } from '#/dynamoose/schemaAttribute'
import { FieldMetadata } from '#/metadata/fieldMetadata'
import { MetadataKeys } from '#/metadata/metadataKeys'

export function Field (): Function
export function Field (name: string): Function
export function Field (options: Partial<SchemaAttribute>): Function
export function Field (
  name: string,
  options: Partial<SchemaAttribute>
): Function
export function Field (
  nameOrOptions?: string | Partial<SchemaAttribute>,
  options?: Partial<SchemaAttribute>
): Function {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const fields: FieldMetadata[] =
      Reflect.getMetadata(MetadataKeys.Table_Fields, target.constructor) || []
    let name = propertyName
    let linked = false
    let schema: Partial<SchemaAttribute> | undefined = undefined
    if (typeof nameOrOptions == 'string') {
      name = nameOrOptions as string
      linked = true
      if (options) {
        schema = options
      } else {
        schema = {}
      }
    } else if (nameOrOptions) {
      schema = nameOrOptions as Partial<SchemaAttribute>
    } else {
      schema = {}
    }
    if (!Reflect.has(schema, 'type')) {
      const type = Reflect.getMetadata('design:type', target, propertyName)
      Reflect.set(schema, 'type', type)
    }
    let field: FieldMetadata = { name, linked, propertyName, schema: schema! }
    fields.push(field)
    Reflect.defineMetadata(
      MetadataKeys.Table_Fields,
      fields,
      target.constructor
    )
  }
}
