/**
 * Copyright 2019-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import dynamoose from 'dynamoose'
import { Table } from '#/decorators/table'
import { Field } from '#/decorators/field'
import { ModelWrapper } from '#/dynamoose/modelWrapper'
export {}

dynamoose.AWS.config.update({
  region: 'us-east-1'
})
dynamoose.local()

@Table()
// @ts-ignore
class Test1 {
  @Field()
  id!: number
  @Field()
  name?: string
  @Field()
  lastName?: string
}

test('Model.create(object)', async () => {
  expect(async () => {
    const Test = ModelWrapper(Test1)
    Test.create({ id: 1 })
  }).not.toThrow()
})

test('Model.get(key)', async () => {
  const Test = ModelWrapper(Test1)
  const test = Test.get({ id: 1 })
  expect(test).toBeDefined()
})
