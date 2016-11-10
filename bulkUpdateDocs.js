/*
client.bulk({
  body: [
    // action description
    { index:  { _index: 'myindex', _type: 'mytype', _id: 1 } },
     // the document to index
    { title: 'foo' },
    // action description
    { update: { _index: 'myindex', _type: 'mytype', _id: 2 } },
    // the document to update
    { doc: { title: 'foo' } },
    // action description
    { delete: { _index: 'myindex', _type: 'mytype', _id: 3 } },
    // no document needed for this delete
  ]
}, function (err, resp) {
  // ...
});
*/

'use strict'

module.exports = function(docs) {
	if (docs.length) {
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
				doc: doc
			}]
		}))

		return this.client.bulk(body)
	} else {
		return Promise.resolve(0)
	}
}