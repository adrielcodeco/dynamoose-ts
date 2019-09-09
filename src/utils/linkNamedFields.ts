import { FieldMetadata } from '#/metadata/fieldMetadata'
import { MetadataKeys } from '#/metadata/metadataKeys'

export function linkNamedFields (newModel: any, originalModel: any) {
  let fields: FieldMetadata[] =
    Reflect.getMetadata(MetadataKeys.Table_Fields, originalModel) || []
  fields = fields.filter(f => f.linked)

  for (let field of fields) {
    const entityDescriptor = Reflect.getOwnPropertyDescriptor(
      newModel,
      field.propertyName!
    )
    Reflect.defineProperty(newModel, field.name, {
      writable: true,
      enumerable: false,
      value: Reflect.get(newModel, field.propertyName!)
    })
    const modelDescriptor = Reflect.getOwnPropertyDescriptor(
      newModel,
      field.name
    )
    let modelSet = modelDescriptor!.set
    let entitySet = entityDescriptor!.set
    modelDescriptor!.set = function (value: any) {
      const oldValue = Reflect.get(newModel, field.propertyName!)
      if (oldValue != value) {
        Reflect.set(newModel, field.propertyName!, value)
      }
      entitySet!.call(newModel, value)
    }
    entityDescriptor!.set = function (value: any) {
      const oldValue = Reflect.get(newModel, field.name)
      if (oldValue != value) {
        Reflect.set(newModel, field.name, value)
      }
      modelSet!.call(newModel, value)
    }
  }
}
