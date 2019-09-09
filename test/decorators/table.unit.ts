/**
 * Copyright 2019-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import dynamoose from 'dynamoose'
import { MetadataKeys } from '#/metadata/metadataKeys'
import { Field } from '#/decorators/field'
export {}

const requireTest = () => {
  jest.resetModules()
  dynamoose.AWS.config.update({
    region: 'us-east-1'
  })
  dynamoose.local()
  return require('#/decorators/table')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Table')
  expect(Object.keys(unit).length).toEqual(1)
})

describe('decorate without options', () => {
  test('decorate not throw', () => {
    expect.assertions(1)
    const unit = requireTest()

    expect(() => {
      @unit.Table()
      // @ts-ignore
      class Test1 {}
    }).not.toThrow()
  })

  test('check model name', () => {
    expect.assertions(1)
    const unit = requireTest()

    @unit.Table()
    // @ts-ignore
    class Test {}

    expect(Test.name).toEqual('Test')
  })

  test('decorate without fields', () => {
    expect.assertions(1)
    const unit = requireTest()

    @unit.Table()
    // @ts-ignore
    class Test {}

    let fields = Reflect.getMetadata(MetadataKeys.Table_Fields, Test) || []
    expect(fields).toHaveLength(0)
  })

  test('decorate with fields', () => {
    expect.assertions(1)
    const unit = requireTest()

    @unit.Table()
    // @ts-ignore
    class Test {
      @Field()
      id!: number
    }

    let fields =
      Reflect.getMetadata(
        MetadataKeys.Table_Fields,
        (Test as any).superConstructor
      ) || []
    expect(fields).toHaveLength(1)
  })

  test('instantiate', () => {
    expect.assertions(1)
    const unit = requireTest()

    @unit.Table()
    // @ts-ignore
    class Test {
      @Field()
      id!: number
    }

    const test = new Test()
    expect(test).toBeDefined()
  })
})

describe('decorate with options', () => {
  test('decorate not throw', () => {
    expect.assertions(1)
    const unit = requireTest()

    expect(() => {
      @unit.Table('table1')
      // @ts-ignore
      class Test1 {}
    }).not.toThrow()
  })

  test('check model name', () => {
    expect.assertions(1)
    const unit = requireTest()

    @unit.Table('table1')
    // @ts-ignore
    class Test {}

    expect(Test.name).toEqual('table1')
  })

  test('decorate without fields', () => {
    expect.assertions(1)
    const unit = requireTest()

    @unit.Table('table1')
    // @ts-ignore
    class Test {}

    let fields = Reflect.getMetadata(MetadataKeys.Table_Fields, Test) || []
    expect(fields).toHaveLength(0)
  })

  test('decorate with fields', () => {
    expect.assertions(1)
    const unit = requireTest()

    @unit.Table('table1')
    // @ts-ignore
    class Test {
      @Field()
      id!: number
    }

    let fields =
      Reflect.getMetadata(
        MetadataKeys.Table_Fields,
        (Test as any).superConstructor
      ) || []
    expect(fields).toHaveLength(1)
  })

  test('instantiate', () => {
    expect.assertions(1)
    const unit = requireTest()

    @unit.Table('table1')
    // @ts-ignore
    class Test {
      @Field()
      id!: number
    }

    const test = new Test()
    expect(test).toBeDefined()
  })
})
