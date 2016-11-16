"use strict"

const elasticsearch = require("elasticsearch")
const _ = require("lodash")

class EsUtil {
    constructor(config, index, type) {
        this.client = new elasticsearch.Client(_.cloneDeep(config))
        this.index = index
        this.type = type
    }

    dateHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
        const _dateHistogram = require("./dateHistogram").bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date)
        return _dateHistogram()
    }

    hourHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
        const _hourHistogram = require("./hourHistogram").bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date)
        return _hourHistogram()
    }

    scroll(fields, size, sum, sortByField, query, wantedField) {
        const _scroll = require("./scroll").bind(this, fields, size, sum, sortByField, query, wantedField)
        return _scroll()
    }

    scroll_agg(field, size, sum, query) {
        const _scroll_agg = require("./scroll_agg").bind(this, field, size, sum, query)
        return _scroll_agg()
    }

    search(pageSize, sortByField, query, page_index, aggs) {
        const _search = require("./search").bind(this, pageSize, sortByField, query, page_index, aggs)
        return _search()
    }

    createIndex(body) {
        const _createIndex = require("./createIndex").bind(this, body)
        return _createIndex()
    }

    getMapping() {
        const _getMapping = require("./getMapping").bind(this)
        return _getMapping()
    }

    putMapping(body) {
        const _putMapping = require("./putMapping").bind(this, body)
        return _putMapping()
    }

    getSetting() {
        const _getSetting = require("./getSetting").bind(this)
        return _getSetting()
    }

    putSetting(body) {
        const _putSetting = require("./putSetting").bind(this, body)
        return _putSetting()
    }

    update(body) {
        const _updateDoc = require("./update").bind(this, body)
        return _updateDoc()
    }

    bulkUpdate(docs) {
        const _bulkUpdateDocs = require("./bulkUpdate").bind(this, docs)
        return _bulkUpdateDocs()
    }

    bulkIndex(docs) {
        const _bulkIndex = require("./bulkIndex").bind(this, docs)
        return _bulkIndex()
    }

    scrollAndBulkUpdate(kv, size, query, sum) {
        const _scrollAndBulkUpdate = require("./scrollAndBulkUpdate").bind(this, kv, size, query, sum)
        return _scrollAndBulkUpdate()
    }

    scrollAndAppendFile(size, query, field, sum, file) {
        const _scrollAndAppendFile = require("./scrollAndAppendFile").bind(this, size, query, field, sum, file)
        return _scrollAndAppendFile()
    }

    searchById(id) {
        const _searchById = require("./searchById").bind(this, id)
        return _searchById()
    }

    mgetByIds(ids) {
        const _mgetByIds = require("./mgetByIds").bind(this, ids)
        return _mgetByIds()
    }

    count(query) {
        const _count = require("./count").bind(this, query)
        return _count()
    }
}

module.exports = EsUtil