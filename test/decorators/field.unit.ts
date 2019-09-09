/**
 * Copyright 2019-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import dynamoose from 'dynamoose'
import { Table } from '#/decorators/table'
export {}

const requireTest = () => {
  jest.resetModules()
  dynamoose.AWS.config.update({
    region: 'us-east-1'
  })
  dynamoose.local()
  return require('#/decorators/field')
}

test('require', () => {
  expect.assertions(2)
  const unit = requireTest()
  expect(unit).toHaveProperty('Field')
  expect(Object.keys(unit).length).toEqual(1)
})

describe('decorate without options', () => {
  test('decorate not throw', () => {
    expect.assertions(1)
    const unit = requireTest()

    expect(() => {
      @Table()
      // @ts-ignore
      class Test1 {
        @unit.Field()
        id!: number
      }
    }).not.toThrow()
  })

  test('instantiate', () => {
    expect.assertions(1)
    const unit = requireTest()

    @Table()
    // @ts-ignore
    class Test {
      @unit.Field()
      id!: number
    }

    const test = new Test()
    expect(test).toBeDefined()
  })
})
