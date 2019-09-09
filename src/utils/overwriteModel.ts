import {
  PutOptions,
  ModelSchema,
  QueryFilter,
  QueryInterface,
  QueryResult,
  ScanFilter,
  ScanInterface,
  UpdateUpdate,
  UpdateOptions,
  QueryKey,
  ScanResult,
  ScanKey
} from 'dynamoose'

export type BatchPutCallback<DataSchema> = (
  err: Error,
  items: ModelSchema<DataSchema>[]
) => void
export type CreateCallback<DataSchema> = (
  err: Error,
  model: ModelSchema<DataSchema>
) => void
export type UpdteCallback<DataSchema> = (
  err: Error,
  items: ModelSchema<DataSchema>[]
) => void

export function overwriteModel (
  model: any,
  instance: any,
  fromTo: { from: (value: any) => any; to: (value: any) => any }
) {
  model.batchPut = <DataSchema>(
    items: DataSchema[],
    optionsOrCallback?: PutOptions | BatchPutCallback<DataSchema>,
    callback?: BatchPutCallback<DataSchema>
  ): Promise<ModelSchema<DataSchema>[]> => {
    return instance
      .batchPut(items.map(i => fromTo.from(i)), optionsOrCallback, callback)
      .then((modelSchemas: ModelSchema<DataSchema>[]) =>
        modelSchemas.map(i => fromTo.to(i))
      )
  }

  model.create = <DataSchema>(
    item: DataSchema,
    optionsOrCallback?: PutOptions | CreateCallback<DataSchema>,
    callback?: CreateCallback<DataSchema>
  ): Promise<ModelSchema<DataSchema>> => {
    return instance
      .create(fromTo.from(item), optionsOrCallback, callback)
      .then((modelSchema: ModelSchema<DataSchema>) => fromTo.to(modelSchema))
  }

  model.get = <DataSchema, KeySchema>(
    key: KeySchema,
    callback?: (err: Error, data: DataSchema) => void
  ): Promise<ModelSchema<DataSchema> | undefined> => {
    return instance
      .get(fromTo.from(key), callback)
      .then((modelSchema: ModelSchema<DataSchema> | undefined) =>
        fromTo.to(modelSchema)
      )
  }

  model.batchGet = <DataSchema, KeySchema>(
    keys: KeySchema[],
    callback?: (err: Error, data: DataSchema) => void
  ): Promise<ModelSchema<DataSchema>[]> => {
    return instance
      .batchGet(keys.map(i => fromTo.from(i)), callback)
      .then((modelSchemas: ModelSchema<DataSchema>[]) =>
        modelSchemas.map(i => fromTo.to(i))
      )
  }

  model.delete = <KeySchema>(
    key: KeySchema,
    callback?: (err: Error) => void
  ): Promise<undefined> => {
    return instance.delete(fromTo.from(key), callback)
  }

  model.batchDelete = <KeySchema>(
    keys: KeySchema[],
    callback?: (err: Error) => void
  ): Promise<undefined> => {
    return instance.batchDelete(keys.map(i => fromTo.from(i)), callback)
  }

  model.query = <DataSchema>(
    query: QueryFilter,
    callback?: (err: Error, results: ModelSchema<DataSchema>[]) => void
  ): QueryInterface<
    ModelSchema<DataSchema>,
    QueryResult<ModelSchema<DataSchema>>
  > => {
    return instance.query(fromTo.from(query), callback).then(overwriteQuery)
  }

  model.queryOne = <DataSchema>(
    query: QueryFilter,
    callback?: (err: Error, results: ModelSchema<DataSchema>) => void
  ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
    return instance
      .queryOne(fromTo.from(query), callback)
      .then(overwriteQueryOne)
  }

  model.scan = <DataSchema>(
    filter?: ScanFilter,
    callback?: (err: Error, results: ModelSchema<DataSchema>[]) => void
  ): ScanInterface<ModelSchema<DataSchema>> => {
    return instance.scan(fromTo.from(filter), callback).then(overwriteScan)
  }

  model.update = <DataSchema, KeySchema>(
    key: KeySchema,
    update: UpdateUpdate<DataSchema>,
    optionsOrCallback?: UpdateOptions | UpdteCallback<DataSchema>,
    callback?: UpdteCallback<DataSchema>
  ): Promise<ModelSchema<DataSchema>> => {
    return instance
      .update(fromTo.from(key), update, optionsOrCallback, callback)
      .then((modelSchema: ModelSchema<DataSchema>) => fromTo.to(modelSchema))
  }
}

function overwriteScan (fromTo: {
  from: (value: any) => any;
  to: (value: any) => any;
}) {
  return <DataSchema>(
    scanInterface: ScanInterface<ModelSchema<DataSchema>>
  ): ScanInterface<ModelSchema<DataSchema>> => {
    const oldExec = scanInterface.exec
    const oldAll = scanInterface.all
    const oldParallel = scanInterface.parallel
    const oldUsing = scanInterface.using
    const oldConsistent = scanInterface.consistent
    const oldWhere = scanInterface.where
    const oldFilter = scanInterface.filter
    const oldAnd = scanInterface.and
    const oldNot = scanInterface.not
    const oldNull = scanInterface.null
    const oldEq = scanInterface.eq
    const oldLt = scanInterface.lt
    const oldLe = scanInterface.le
    const oldGe = scanInterface.ge
    const oldGt = scanInterface.gt
    const oldBeginsWith = scanInterface.beginsWith
    const oldBetween = scanInterface.between
    const oldContains = scanInterface.contains
    const oldIn = scanInterface.in
    const oldLimit = scanInterface.limit
    const oldStartAt = scanInterface.startAt
    const oldAttributes = scanInterface.attributes
    const oldCount = scanInterface.count
    const oldCounts = scanInterface.counts

    scanInterface.exec = (
      callback?: (
        err: Error,
        result: ScanResult<ModelSchema<DataSchema>>
      ) => void
    ): Promise<ScanResult<ModelSchema<DataSchema>>> => {
      return oldExec(callback).then(
        (result: ScanResult<ModelSchema<DataSchema>>) => {
          result.lastKey = fromTo.to(result.lastKey)
          result.map(i => fromTo.to(i))
          return result
        }
      )
    }
    scanInterface.all = (
      delay?: number,
      max?: number
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldAll(delay, max))
    }
    scanInterface.parallel = (
      totalSegments: number
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldParallel(totalSegments))
    }
    scanInterface.using = (
      indexName: string
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldUsing(fromTo.to(indexName)))
    }
    scanInterface.consistent = (
      filter?: any
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldConsistent(fromTo.to(filter)))
    }
    scanInterface.where = (
      filter: any
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldWhere(fromTo.to(filter)))
    }
    scanInterface.filter = (
      filter: any
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldFilter(fromTo.to(filter)))
    }
    scanInterface.and = (): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldAnd())
    }
    scanInterface.not = (): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldNot())
    }
    scanInterface.null = (): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldNull())
    }
    scanInterface.eq = (value: any): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldEq(fromTo.to(value)))
    }
    scanInterface.lt = (value: any): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldLt(fromTo.to(value)))
    }
    scanInterface.le = (value: any): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldLe(fromTo.to(value)))
    }
    scanInterface.ge = (value: any): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldGe(fromTo.to(value)))
    }
    scanInterface.gt = (value: any): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldGt(fromTo.to(value)))
    }
    scanInterface.beginsWith = (
      value: any
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldBeginsWith(fromTo.to(value)))
    }
    scanInterface.between = (
      valueA: any,
      valueB: any
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(
        oldBetween(fromTo.to(valueA), fromTo.to(valueB))
      )
    }
    scanInterface.contains = (
      value: any
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldContains(fromTo.to(value)))
    }
    scanInterface.in = (value: any): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldIn(fromTo.to(value)))
    }
    scanInterface.limit = (
      limit: number
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldLimit(limit))
    }
    scanInterface.startAt = (
      key: ScanKey
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldStartAt(fromTo.to(key)))
    }
    scanInterface.attributes = (
      value: any
    ): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldAttributes(fromTo.to(value)))
    }
    scanInterface.count = (): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldCount())
    }
    scanInterface.counts = (): ScanInterface<ModelSchema<DataSchema>> => {
      return overwriteScan(fromTo)(oldCounts())
    }

    return scanInterface
  }
}

function overwriteQuery (fromTo: {
  from: (value: any) => any;
  to: (value: any) => any;
}) {
  return <DataSchema>(
    queryInterface: QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    >
  ): QueryInterface<
    ModelSchema<DataSchema>,
    QueryResult<ModelSchema<DataSchema>>
  > => {
    const oldExec = queryInterface.exec
    const oldWhere = queryInterface.where
    const oldFilter = queryInterface.filter
    const oldAnd = queryInterface.and
    const oldOr = queryInterface.or
    const oldNot = queryInterface.not
    const oldNull = queryInterface.null
    const oldEq = queryInterface.eq
    const oldLt = queryInterface.lt
    const oldLe = queryInterface.le
    const oldGe = queryInterface.ge
    const oldGt = queryInterface.gt
    const oldBeginsWith = queryInterface.beginsWith
    const oldBetween = queryInterface.between
    const oldContains = queryInterface.contains
    const oldIn = queryInterface.in
    const oldLimit = queryInterface.limit
    const oldConsistent = queryInterface.consistent
    const oldDescending = queryInterface.descending
    const oldAscending = queryInterface.ascending
    const oldStartAt = queryInterface.startAt
    const oldAttributes = queryInterface.attributes
    const oldCount = queryInterface.count
    const oldCounts = queryInterface.counts
    const oldUsing = queryInterface.using

    queryInterface.exec = (
      callback?: (
        err: Error,
        result: QueryResult<ModelSchema<DataSchema>>
      ) => void
    ): Promise<QueryResult<ModelSchema<DataSchema>>> => {
      return oldExec(callback).then(
        (result: QueryResult<ModelSchema<DataSchema>>) => {
          result.lastKey = fromTo.to(result.lastKey)
          result.map(i => fromTo.to(i))
          return result
        }
      )
    }
    queryInterface.where = (
      rangeKey: string
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldWhere(fromTo.to(rangeKey)))
    }
    queryInterface.filter = (
      filter: string
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldFilter(fromTo.to(filter)))
    }
    queryInterface.and = (): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldAnd())
    }
    queryInterface.or = (): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldOr())
    }
    queryInterface.not = (): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldNot())
    }
    queryInterface.null = (): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldNull())
    }
    queryInterface.eq = (
      value: any
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldEq(fromTo.to(value)))
    }
    queryInterface.lt = (
      value: any
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldLt(fromTo.to(value)))
    }
    queryInterface.le = (
      value: any
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldLe(fromTo.to(value)))
    }
    queryInterface.ge = (
      value: any
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldGe(fromTo.to(value)))
    }
    queryInterface.gt = (
      value: any
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldGt(fromTo.to(value)))
    }
    queryInterface.beginsWith = (
      value: string
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldBeginsWith(fromTo.to(value)))
    }
    queryInterface.between = (
      valueA: any,
      valueB: any
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(
        oldBetween(fromTo.to(valueA), fromTo.to(valueB))
      )
    }
    queryInterface.contains = (
      value: string
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldContains(fromTo.to(value)))
    }
    queryInterface.in = (
      values: any[]
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldIn(fromTo.to(values)))
    }
    queryInterface.limit = (
      limit: number
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldLimit(limit))
    }
    queryInterface.consistent = (): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldConsistent())
    }
    queryInterface.descending = (): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldDescending())
    }
    queryInterface.ascending = (): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldAscending())
    }
    queryInterface.startAt = (
      key: QueryKey
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldStartAt(fromTo.to(key)))
    }
    queryInterface.attributes = (
      attributes: string[]
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldAttributes(fromTo.to(attributes)))
    }
    queryInterface.count = (): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldCount())
    }
    queryInterface.counts = (): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldCounts())
    }
    queryInterface.using = (
      indexName: string
    ): QueryInterface<
      ModelSchema<DataSchema>,
      QueryResult<ModelSchema<DataSchema>>
    > => {
      return overwriteQuery(fromTo)(oldUsing(fromTo.to(indexName)))
    }
    return queryInterface
  }
}

function overwriteQueryOne (fromTo: {
  from: (value: any) => any;
  to: (value: any) => any;
}) {
  return <DataSchema>(
    queryInterface: QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    >
  ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
    const oldExec = queryInterface.exec
    const oldWhere = queryInterface.where
    const oldFilter = queryInterface.filter
    const oldAnd = queryInterface.and
    const oldOr = queryInterface.or
    const oldNot = queryInterface.not
    const oldNull = queryInterface.null
    const oldEq = queryInterface.eq
    const oldLt = queryInterface.lt
    const oldLe = queryInterface.le
    const oldGe = queryInterface.ge
    const oldGt = queryInterface.gt
    const oldBeginsWith = queryInterface.beginsWith
    const oldBetween = queryInterface.between
    const oldContains = queryInterface.contains
    const oldIn = queryInterface.in
    const oldLimit = queryInterface.limit
    const oldConsistent = queryInterface.consistent
    const oldDescending = queryInterface.descending
    const oldAscending = queryInterface.ascending
    const oldStartAt = queryInterface.startAt
    const oldAttributes = queryInterface.attributes
    const oldCount = queryInterface.count
    const oldCounts = queryInterface.counts
    const oldUsing = queryInterface.using

    queryInterface.exec = (
      callback?: (err: Error, result: ModelSchema<DataSchema>) => void
    ): Promise<ModelSchema<DataSchema>> => {
      return oldExec(callback).then((model: ModelSchema<DataSchema>) =>
        fromTo.to(model)
      )
    }
    queryInterface.where = (
      rangeKey: string
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldWhere(fromTo.from(rangeKey)))
    }
    queryInterface.filter = (
      filter: string
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldFilter(fromTo.from(filter)))
    }
    queryInterface.and = (): QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    > => {
      return overwriteQueryOne(fromTo)(oldAnd())
    }
    queryInterface.or = (): QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    > => {
      return overwriteQueryOne(fromTo)(oldOr())
    }
    queryInterface.not = (): QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    > => {
      return overwriteQueryOne(fromTo)(oldNot())
    }
    queryInterface.null = (): QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    > => {
      return overwriteQueryOne(fromTo)(oldNull())
    }
    queryInterface.eq = (
      value: any
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldEq(fromTo.from(value)))
    }
    queryInterface.lt = (
      value: any
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldLt(fromTo.from(value)))
    }
    queryInterface.le = (
      value: any
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldLe(fromTo.from(value)))
    }
    queryInterface.ge = (
      value: any
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldGe(fromTo.from(value)))
    }
    queryInterface.gt = (
      value: any
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldGt(fromTo.from(value)))
    }
    queryInterface.beginsWith = (
      value: string
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldBeginsWith(fromTo.from(value)))
    }
    queryInterface.between = (
      valueA: any,
      valueB: any
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(
        oldBetween(fromTo.from(valueA), fromTo.from(valueB))
      )
    }
    queryInterface.contains = (
      value: string
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldContains(fromTo.from(value)))
    }
    queryInterface.in = (
      values: any[]
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldIn(fromTo.from(values)))
    }
    queryInterface.limit = (
      limit: number
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldLimit(limit))
    }
    queryInterface.consistent = (): QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    > => {
      return overwriteQueryOne(fromTo)(oldConsistent())
    }
    queryInterface.descending = (): QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    > => {
      return overwriteQueryOne(fromTo)(oldDescending())
    }
    queryInterface.ascending = (): QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    > => {
      return overwriteQueryOne(fromTo)(oldAscending())
    }
    queryInterface.startAt = (
      key: QueryKey
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldStartAt(fromTo.from(key)))
    }
    queryInterface.attributes = (
      attributes: string[]
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldAttributes(fromTo.from(attributes)))
    }
    queryInterface.count = (): QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    > => {
      return overwriteQueryOne(fromTo)(oldCount())
    }
    queryInterface.counts = (): QueryInterface<
      ModelSchema<DataSchema>,
      ModelSchema<DataSchema>
    > => {
      return overwriteQueryOne(fromTo)(oldCounts())
    }
    queryInterface.using = (
      indexName: string
    ): QueryInterface<ModelSchema<DataSchema>, ModelSchema<DataSchema>> => {
      return overwriteQueryOne(fromTo)(oldUsing(fromTo.from(indexName)))
    }
    return queryInterface
  }
}
