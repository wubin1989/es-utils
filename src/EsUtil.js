'use strict';

const elasticsearch = require('elasticsearch')
const _ = require('lodash')

class EsUtil {
	constructor(config, index, type) {
		this.client = new elasticsearch.Client(_.cloneDeep(config))
		this.index = index
		this.type = type
	}

	dateHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
		const _dateHistogram = require('./dateHistogram').bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date)
		return _dateHistogram()
	}

	hourHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
		const _hourHistogram = require('./hourHistogram').bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date)
		return _hourHistogram()
	}

	scroll(fields, size, sum, sortByField, query, wantedField) {
		const _scroll = require('./scroll').bind(this, fields, size, sum, sortByField, query, wantedField)
		return _scroll()
	}

	scroll_agg(field, size, sum, query) {
		const _scroll_agg = require('./scroll_agg').bind(this, field, size, sum, query)
		return _scroll_agg()
	}

	search(pageSize, sortByField, query, page_index, aggs) {
		const _search = require('./search').bind(this, pageSize, sortByField, query, page_index, aggs)
		return _search()
	}

	createIndex(mapping) {
		const _createIndex = require('./createIndex').bind(this, mapping)
		return _createIndex()
	}

	getMapping() {
		const _getMapping = require('./getMapping').bind(this)
		return _getMapping()
	}

	putMapping(body) {
		const _putMapping = require('./putMapping').bind(this, body)
		return _putMapping()
	}

	updateDoc(body) {
		const _updateDoc = require('./updateDoc').bind(this, body)
		return _updateDoc()
	}

	bulkUpdateDocs(docs) {
		const _bulkUpdateDocs = require('./bulkUpdateDocs').bind(this, docs)
		return _bulkUpdateDocs()
	}

	scrollAndBulkUpdate(field, size, value, query, sum) {
		const _scrollAndBulkUpdate = require('./scrollAndBulkUpdate').bind(this, field, size, value, query, sum, replace)
		return _scrollAndBulkUpdate()
	}

	scrollAndAppendFile(size, query, sum, file) {
		const _scrollAndAppendFile = require('./scrollAndAppendFile').bind(this, size, query, sum, file)
		return _scrollAndAppendFile()
	}
}

module.exports = EsUtil