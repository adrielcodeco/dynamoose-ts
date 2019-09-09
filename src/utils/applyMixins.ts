export function applyMixins (derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      const propertyDescriptor = Object.getOwnPropertyDescriptor(
        baseCtor.prototype,
        name
      )
      Object.defineProperty(derivedCtor.prototype, name, propertyDescriptor!)
    })
  })
}
