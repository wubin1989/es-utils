"use strict"

import * as elasticsearch from "elasticsearch"
import * as _ from "lodash"
import dateHistogram from "./dateHistogram"
import hourHistogram from "./hourHistogram"
import scroll from "./scroll"
import search from "./search"
import createIndex from "./createIndex"
import getMapping from "./getMapping"
import putMapping from "./putMapping"
import getSetting from "./getSetting"
import putSetting from "./putSetting"
import update from "./update"
import bulkUpdate from "./bulkUpdate"
import bulkIndex from "./bulkIndex"
import scrollAndBulkUpdate from "./scrollAndBulkUpdate"
import scrollAndAppendFile from "./scrollAndAppendFile"
import searchById from "./searchById"
import mgetByIds from "./mgetByIds"

class EsUtil {
    constructor(config, index, type) {
        this.client = new elasticsearch.Client(_.cloneDeep(config))
        this.index = index
        this.type = type
    }

    dateHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
        const _dateHistogram = dateHistogram.bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date)
        return _dateHistogram()
    }

    hourHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
        const _hourHistogram = hourHistogram.bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date)
        return _hourHistogram()
    }

    scroll(source, size, sum, sortByField, query) {
        const _scroll = scroll.bind(this, source, size, sum, sortByField, query)
        return _scroll()
    }

    search(pageSize, sortByField, query, page_index, aggs) {
        const _search = search.bind(this, pageSize, sortByField, query, page_index, aggs)
        return _search()
    }

    createIndex(body) {
        const _createIndex = createIndex.bind(this, body)
        return _createIndex()
    }

    getMapping() {
        const _getMapping = getMapping.bind(this)
        return _getMapping()
    }

    putMapping(body) {
        const _putMapping = putMapping.bind(this, body)
        return _putMapping()
    }

    getSetting() {
        const _getSetting = getSetting.bind(this)
        return _getSetting()
    }

    putSetting(body) {
        const _putSetting = putSetting.bind(this, body)
        return _putSetting()
    }

    update(body) {
        const _updateDoc = update.bind(this, body)
        return _updateDoc()
    }

    bulkUpdate(docs) {
        const _bulkUpdateDocs = bulkUpdate.bind(this, docs)
        return _bulkUpdateDocs()
    }

    bulkIndex(docs) {
        const _bulkIndex = bulkIndex.bind(this, docs)
        return _bulkIndex()
    }

    scrollAndBulkUpdate(kv, size, query, sum) {
        const _scrollAndBulkUpdate = scrollAndBulkUpdate.bind(this, kv, size, query, sum)
        return _scrollAndBulkUpdate()
    }

    scrollAndAppendFile(size, query, field, sum, file) {
        const _scrollAndAppendFile = scrollAndAppendFile.bind(this, size, query, field, sum, file)
        return _scrollAndAppendFile()
    }

    searchById(id) {
        const _searchById = searchById.bind(this, id)
        return _searchById()
    }

    mgetByIds(ids) {
        const _mgetByIds = mgetByIds.bind(this, ids)
        return _mgetByIds()
    }
}

module.exports = EsUtil