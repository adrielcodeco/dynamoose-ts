import { FieldMetadata } from '#/metadata/fieldMetadata'
import { MetadataKeys } from '#/metadata/metadataKeys'

export function createFromTo (originalModel: any) {
  let fields: FieldMetadata[] =
    Reflect.getMetadata(MetadataKeys.Table_Fields, originalModel) || []
  fields = fields.filter(f => f.linked)
  return {
    from: (value: any) => {
      const stringReplace = (value: string) => {
        const field = fields.find(i => i.propertyName == value)
        if (field) {
          return field.name
        }
        return value
      }
      const objReplace = (value: any) => {
        fields.map(f => {
          if (Reflect.has(value, f.propertyName!)) {
            value[f.name] = value[f.propertyName!]
            delete value[f.propertyName!]
          }
        })
        return value
      }
      if (typeof value == 'string') {
        return stringReplace(value)
      } else if (value instanceof Array) {
        if (value.length) {
          if (typeof value[0] == 'string') {
            return value.map(i => stringReplace(i))
          } else {
            return value.map(i => objReplace(i))
          }
        } else {
          return value
        }
      } else {
        return objReplace(value)
      }
    },
    to: (value: any) => {
      const stringReplace = (value: string) => {
        const field = fields.find(i => i.name == value)
        if (field) {
          return field.propertyName!
        }
        return value
      }
      const objReplace = (value: any) => {
        fields.map(f => {
          if (Reflect.has(value, f.name)) {
            value[f.propertyName!] = value[f.name]
            delete value[f.name]
          }
        })
        return value
      }
      if (typeof value == 'string') {
        return stringReplace(value)
      } else if (value instanceof Array) {
        if (value.length) {
          if (typeof value[0] == 'string') {
            return value.map(i => stringReplace(i))
          } else {
            return value.map(i => objReplace(i))
          }
        } else {
          return value
        }
      } else {
        return objReplace(value)
      }
    }
  }
}
