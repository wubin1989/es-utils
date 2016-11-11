'use strict'

module.exports = function(docs) {
	const _ = require('lodash')
	const that = this
	const body = _.flatten(_.map(docs, (item) => {
		const id = item.id
		const doc = item.doc
		return [{
			update: {
				_index: that.index,
				_type: that.type,
				_id: id
			}
		}, {
			doc: doc,
			"detect_noop": false,
		}]
	}))

	return that.client.bulk({
		body: body,
		refresh: true,
	})
}