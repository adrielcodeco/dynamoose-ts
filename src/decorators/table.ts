import dynamoose from 'dynamoose'
import { FieldMetadata } from '#/metadata/fieldMetadata'
import { MetadataKeys } from '#/metadata/metadataKeys'
import { applyMixins } from '#/utils/applyMixins'
import { createFromTo } from '#/utils/createFromTo'
import { linkNamedFields } from '#/utils/linkNamedFields'
import { overwriteModel } from '#/utils/overwriteModel'

export interface TableOptions {
  name: string
}

export function Table<T extends { new (...args: any[]): {} }> (
  name?: string
): (constructor: T) => any
export function Table<T extends { new (...args: any[]): {} }> (
  options?: TableOptions
): (constructor: T) => any
export function Table<T extends { new (...args: any[]): {} }> (
  nameOroptions?: string | TableOptions
): (constructor: T) => any {
  return (constructor: T) => {
    let name = constructor.name
    if (nameOroptions) {
      if (typeof nameOroptions == 'string') {
        name = nameOroptions
      } else if (nameOroptions.name) {
        name = nameOroptions.name
      }
    }
    const schema: any = {}
    const fields: FieldMetadata[] =
      Reflect.getMetadata(MetadataKeys.Table_Fields, constructor) || []
    for (let field of fields) {
      schema[field.name] = field.schema
    }
    let newModel: any = dynamoose.model(name, schema)
    applyMixins(newModel, [constructor])
    let newConstructorFunction: any = function (...args: any[]) {
      const model = new newModel(...args)
      linkNamedFields(model, constructor)
      // @ts-ignore
      this._model = model
      return model
    }
    newConstructorFunction.superConstructor = constructor
    Object.defineProperty(newConstructorFunction, 'name', {
      writable: true,
      value: name
    })
    overwriteModel(newConstructorFunction, newModel, createFromTo(constructor))
    return newConstructorFunction
  }
}
