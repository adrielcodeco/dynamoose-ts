"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function overwriteModel(model, instance, fromTo) {
    model.batchPut = function (items, optionsOrCallback, callback) {
        return instance
            .batchPut(items.map(function (i) { return fromTo.from(i); }), optionsOrCallback, callback)
            .then(function (modelSchemas) {
            return modelSchemas.map(function (i) { return fromTo.to(i); });
        });
    };
    model.create = function (item, optionsOrCallback, callback) {
        return instance
            .create(fromTo.from(item), optionsOrCallback, callback)
            .then(function (modelSchema) { return fromTo.to(modelSchema); });
    };
    model.get = function (key, callback) {
        return instance
            .get(fromTo.from(key), callback)
            .then(function (modelSchema) {
            return fromTo.to(modelSchema);
        });
    };
    model.batchGet = function (keys, callback) {
        return instance
            .batchGet(keys.map(function (i) { return fromTo.from(i); }), callback)
            .then(function (modelSchemas) {
            return modelSchemas.map(function (i) { return fromTo.to(i); });
        });
    };
    model.delete = function (key, callback) {
        return instance.delete(fromTo.from(key), callback);
    };
    model.batchDelete = function (keys, callback) {
        return instance.batchDelete(keys.map(function (i) { return fromTo.from(i); }), callback);
    };
    model.query = function (query, callback) {
        return instance.query(fromTo.from(query), callback).then(overwriteQuery);
    };
    model.queryOne = function (query, callback) {
        return instance
            .queryOne(fromTo.from(query), callback)
            .then(overwriteQueryOne);
    };
    model.scan = function (filter, callback) {
        return instance.scan(fromTo.from(filter), callback).then(overwriteScan);
    };
    model.update = function (key, update, optionsOrCallback, callback) {
        return instance
            .update(fromTo.from(key), update, optionsOrCallback, callback)
            .then(function (modelSchema) { return fromTo.to(modelSchema); });
    };
}
exports.overwriteModel = overwriteModel;
function overwriteScan(fromTo) {
    return function (scanInterface) {
        var oldExec = scanInterface.exec;
        var oldAll = scanInterface.all;
        var oldParallel = scanInterface.parallel;
        var oldUsing = scanInterface.using;
        var oldConsistent = scanInterface.consistent;
        var oldWhere = scanInterface.where;
        var oldFilter = scanInterface.filter;
        var oldAnd = scanInterface.and;
        var oldNot = scanInterface.not;
        var oldNull = scanInterface.null;
        var oldEq = scanInterface.eq;
        var oldLt = scanInterface.lt;
        var oldLe = scanInterface.le;
        var oldGe = scanInterface.ge;
        var oldGt = scanInterface.gt;
        var oldBeginsWith = scanInterface.beginsWith;
        var oldBetween = scanInterface.between;
        var oldContains = scanInterface.contains;
        var oldIn = scanInterface.in;
        var oldLimit = scanInterface.limit;
        var oldStartAt = scanInterface.startAt;
        var oldAttributes = scanInterface.attributes;
        var oldCount = scanInterface.count;
        var oldCounts = scanInterface.counts;
        scanInterface.exec = function (callback) {
            return oldExec(callback).then(function (result) {
                result.lastKey = fromTo.to(result.lastKey);
                result.map(function (i) { return fromTo.to(i); });
                return result;
            });
        };
        scanInterface.all = function (delay, max) {
            return overwriteScan(fromTo)(oldAll(delay, max));
        };
        scanInterface.parallel = function (totalSegments) {
            return overwriteScan(fromTo)(oldParallel(totalSegments));
        };
        scanInterface.using = function (indexName) {
            return overwriteScan(fromTo)(oldUsing(fromTo.to(indexName)));
        };
        scanInterface.consistent = function (filter) {
            return overwriteScan(fromTo)(oldConsistent(fromTo.to(filter)));
        };
        scanInterface.where = function (filter) {
            return overwriteScan(fromTo)(oldWhere(fromTo.to(filter)));
        };
        scanInterface.filter = function (filter) {
            return overwriteScan(fromTo)(oldFilter(fromTo.to(filter)));
        };
        scanInterface.and = function () {
            return overwriteScan(fromTo)(oldAnd());
        };
        scanInterface.not = function () {
            return overwriteScan(fromTo)(oldNot());
        };
        scanInterface.null = function () {
            return overwriteScan(fromTo)(oldNull());
        };
        scanInterface.eq = function (value) {
            return overwriteScan(fromTo)(oldEq(fromTo.to(value)));
        };
        scanInterface.lt = function (value) {
            return overwriteScan(fromTo)(oldLt(fromTo.to(value)));
        };
        scanInterface.le = function (value) {
            return overwriteScan(fromTo)(oldLe(fromTo.to(value)));
        };
        scanInterface.ge = function (value) {
            return overwriteScan(fromTo)(oldGe(fromTo.to(value)));
        };
        scanInterface.gt = function (value) {
            return overwriteScan(fromTo)(oldGt(fromTo.to(value)));
        };
        scanInterface.beginsWith = function (value) {
            return overwriteScan(fromTo)(oldBeginsWith(fromTo.to(value)));
        };
        scanInterface.between = function (valueA, valueB) {
            return overwriteScan(fromTo)(oldBetween(fromTo.to(valueA), fromTo.to(valueB)));
        };
        scanInterface.contains = function (value) {
            return overwriteScan(fromTo)(oldContains(fromTo.to(value)));
        };
        scanInterface.in = function (value) {
            return overwriteScan(fromTo)(oldIn(fromTo.to(value)));
        };
        scanInterface.limit = function (limit) {
            return overwriteScan(fromTo)(oldLimit(limit));
        };
        scanInterface.startAt = function (key) {
            return overwriteScan(fromTo)(oldStartAt(fromTo.to(key)));
        };
        scanInterface.attributes = function (value) {
            return overwriteScan(fromTo)(oldAttributes(fromTo.to(value)));
        };
        scanInterface.count = function () {
            return overwriteScan(fromTo)(oldCount());
        };
        scanInterface.counts = function () {
            return overwriteScan(fromTo)(oldCounts());
        };
        return scanInterface;
    };
}
function overwriteQuery(fromTo) {
    return function (queryInterface) {
        var oldExec = queryInterface.exec;
        var oldWhere = queryInterface.where;
        var oldFilter = queryInterface.filter;
        var oldAnd = queryInterface.and;
        var oldOr = queryInterface.or;
        var oldNot = queryInterface.not;
        var oldNull = queryInterface.null;
        var oldEq = queryInterface.eq;
        var oldLt = queryInterface.lt;
        var oldLe = queryInterface.le;
        var oldGe = queryInterface.ge;
        var oldGt = queryInterface.gt;
        var oldBeginsWith = queryInterface.beginsWith;
        var oldBetween = queryInterface.between;
        var oldContains = queryInterface.contains;
        var oldIn = queryInterface.in;
        var oldLimit = queryInterface.limit;
        var oldConsistent = queryInterface.consistent;
        var oldDescending = queryInterface.descending;
        var oldAscending = queryInterface.ascending;
        var oldStartAt = queryInterface.startAt;
        var oldAttributes = queryInterface.attributes;
        var oldCount = queryInterface.count;
        var oldCounts = queryInterface.counts;
        var oldUsing = queryInterface.using;
        queryInterface.exec = function (callback) {
            return oldExec(callback).then(function (result) {
                result.lastKey = fromTo.to(result.lastKey);
                result.map(function (i) { return fromTo.to(i); });
                return result;
            });
        };
        queryInterface.where = function (rangeKey) {
            return overwriteQuery(fromTo)(oldWhere(fromTo.to(rangeKey)));
        };
        queryInterface.filter = function (filter) {
            return overwriteQuery(fromTo)(oldFilter(fromTo.to(filter)));
        };
        queryInterface.and = function () {
            return overwriteQuery(fromTo)(oldAnd());
        };
        queryInterface.or = function () {
            return overwriteQuery(fromTo)(oldOr());
        };
        queryInterface.not = function () {
            return overwriteQuery(fromTo)(oldNot());
        };
        queryInterface.null = function () {
            return overwriteQuery(fromTo)(oldNull());
        };
        queryInterface.eq = function (value) {
            return overwriteQuery(fromTo)(oldEq(fromTo.to(value)));
        };
        queryInterface.lt = function (value) {
            return overwriteQuery(fromTo)(oldLt(fromTo.to(value)));
        };
        queryInterface.le = function (value) {
            return overwriteQuery(fromTo)(oldLe(fromTo.to(value)));
        };
        queryInterface.ge = function (value) {
            return overwriteQuery(fromTo)(oldGe(fromTo.to(value)));
        };
        queryInterface.gt = function (value) {
            return overwriteQuery(fromTo)(oldGt(fromTo.to(value)));
        };
        queryInterface.beginsWith = function (value) {
            return overwriteQuery(fromTo)(oldBeginsWith(fromTo.to(value)));
        };
        queryInterface.between = function (valueA, valueB) {
            return overwriteQuery(fromTo)(oldBetween(fromTo.to(valueA), fromTo.to(valueB)));
        };
        queryInterface.contains = function (value) {
            return overwriteQuery(fromTo)(oldContains(fromTo.to(value)));
        };
        queryInterface.in = function (values) {
            return overwriteQuery(fromTo)(oldIn(fromTo.to(values)));
        };
        queryInterface.limit = function (limit) {
            return overwriteQuery(fromTo)(oldLimit(limit));
        };
        queryInterface.consistent = function () {
            return overwriteQuery(fromTo)(oldConsistent());
        };
        queryInterface.descending = function () {
            return overwriteQuery(fromTo)(oldDescending());
        };
        queryInterface.ascending = function () {
            return overwriteQuery(fromTo)(oldAscending());
        };
        queryInterface.startAt = function (key) {
            return overwriteQuery(fromTo)(oldStartAt(fromTo.to(key)));
        };
        queryInterface.attributes = function (attributes) {
            return overwriteQuery(fromTo)(oldAttributes(fromTo.to(attributes)));
        };
        queryInterface.count = function () {
            return overwriteQuery(fromTo)(oldCount());
        };
        queryInterface.counts = function () {
            return overwriteQuery(fromTo)(oldCounts());
        };
        queryInterface.using = function (indexName) {
            return overwriteQuery(fromTo)(oldUsing(fromTo.to(indexName)));
        };
        return queryInterface;
    };
}
function overwriteQueryOne(fromTo) {
    return function (queryInterface) {
        var oldExec = queryInterface.exec;
        var oldWhere = queryInterface.where;
        var oldFilter = queryInterface.filter;
        var oldAnd = queryInterface.and;
        var oldOr = queryInterface.or;
        var oldNot = queryInterface.not;
        var oldNull = queryInterface.null;
        var oldEq = queryInterface.eq;
        var oldLt = queryInterface.lt;
        var oldLe = queryInterface.le;
        var oldGe = queryInterface.ge;
        var oldGt = queryInterface.gt;
        var oldBeginsWith = queryInterface.beginsWith;
        var oldBetween = queryInterface.between;
        var oldContains = queryInterface.contains;
        var oldIn = queryInterface.in;
        var oldLimit = queryInterface.limit;
        var oldConsistent = queryInterface.consistent;
        var oldDescending = queryInterface.descending;
        var oldAscending = queryInterface.ascending;
        var oldStartAt = queryInterface.startAt;
        var oldAttributes = queryInterface.attributes;
        var oldCount = queryInterface.count;
        var oldCounts = queryInterface.counts;
        var oldUsing = queryInterface.using;
        queryInterface.exec = function (callback) {
            return oldExec(callback).then(function (model) {
                return fromTo.to(model);
            });
        };
        queryInterface.where = function (rangeKey) {
            return overwriteQueryOne(fromTo)(oldWhere(fromTo.from(rangeKey)));
        };
        queryInterface.filter = function (filter) {
            return overwriteQueryOne(fromTo)(oldFilter(fromTo.from(filter)));
        };
        queryInterface.and = function () {
            return overwriteQueryOne(fromTo)(oldAnd());
        };
        queryInterface.or = function () {
            return overwriteQueryOne(fromTo)(oldOr());
        };
        queryInterface.not = function () {
            return overwriteQueryOne(fromTo)(oldNot());
        };
        queryInterface.null = function () {
            return overwriteQueryOne(fromTo)(oldNull());
        };
        queryInterface.eq = function (value) {
            return overwriteQueryOne(fromTo)(oldEq(fromTo.from(value)));
        };
        queryInterface.lt = function (value) {
            return overwriteQueryOne(fromTo)(oldLt(fromTo.from(value)));
        };
        queryInterface.le = function (value) {
            return overwriteQueryOne(fromTo)(oldLe(fromTo.from(value)));
        };
        queryInterface.ge = function (value) {
            return overwriteQueryOne(fromTo)(oldGe(fromTo.from(value)));
        };
        queryInterface.gt = function (value) {
            return overwriteQueryOne(fromTo)(oldGt(fromTo.from(value)));
        };
        queryInterface.beginsWith = function (value) {
            return overwriteQueryOne(fromTo)(oldBeginsWith(fromTo.from(value)));
        };
        queryInterface.between = function (valueA, valueB) {
            return overwriteQueryOne(fromTo)(oldBetween(fromTo.from(valueA), fromTo.from(valueB)));
        };
        queryInterface.contains = function (value) {
            return overwriteQueryOne(fromTo)(oldContains(fromTo.from(value)));
        };
        queryInterface.in = function (values) {
            return overwriteQueryOne(fromTo)(oldIn(fromTo.from(values)));
        };
        queryInterface.limit = function (limit) {
            return overwriteQueryOne(fromTo)(oldLimit(limit));
        };
        queryInterface.consistent = function () {
            return overwriteQueryOne(fromTo)(oldConsistent());
        };
        queryInterface.descending = function () {
            return overwriteQueryOne(fromTo)(oldDescending());
        };
        queryInterface.ascending = function () {
            return overwriteQueryOne(fromTo)(oldAscending());
        };
        queryInterface.startAt = function (key) {
            return overwriteQueryOne(fromTo)(oldStartAt(fromTo.from(key)));
        };
        queryInterface.attributes = function (attributes) {
            return overwriteQueryOne(fromTo)(oldAttributes(fromTo.from(attributes)));
        };
        queryInterface.count = function () {
            return overwriteQueryOne(fromTo)(oldCount());
        };
        queryInterface.counts = function () {
            return overwriteQueryOne(fromTo)(oldCounts());
        };
        queryInterface.using = function (indexName) {
            return overwriteQueryOne(fromTo)(oldUsing(fromTo.from(indexName)));
        };
        return queryInterface;
    };
}
//# sourceMappingURL=overwriteModel.js.map