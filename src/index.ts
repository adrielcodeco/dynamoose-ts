import 'reflect-metadata'
import dynamoose from 'dynamoose'
import { Table } from '#/decorators/table'
import { Field } from '#/decorators/field'
import { ModelWrapper } from '#/dynamoose/modelWrapper'

// const dynalite = require('dynalite')

const startUpAndReturnDynamo = async () => {
  // const dynaliteServer = dynalite({path: './mydb', createTableMs: 50})
  // await dynaliteServer.listen(8000)
  // return dynaliteServer
}

const createDynamooseInstance = () => {
  dynamoose.AWS.config.update({
    region: 'us-east-1',
    // dynamodb: {
    //   endpoint: 'http://127.0.0.1:8000'
    // }
  })
  dynamoose.local() // This defaults to "http://localhost:8000"
}

@Table()
class Test {
  @Field('test_id', { hashKey: true })
  public id!: Number
  @Field()
  public name!: string
  @Field()
  public lastname?: string
  @Field()
  public email!: string
  @Field()
  public createdAt!: Date
  @Field()
  public updatedAt?: Date
}

const bootStrap = async () => {
  await startUpAndReturnDynamo()
  createDynamooseInstance()

  const TestCtor = ModelWrapper(Test)

  const test = new TestCtor({
    id: 1,
    name: 'test',
    email: 'teste@hotmail.com',
    createdAt: new Date()
  })
  await test.save()
  const salvedTest = await TestCtor.get({ id: 1 })
  console.log(salvedTest)
}

bootStrap()
