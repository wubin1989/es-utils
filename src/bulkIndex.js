"use strict"

module.exports = function(docs) {
    const _ = require("lodash")
    const body = _.flatten(_.map(docs, (item) => {
        const id = item.id
        const doc = item.doc
        return [{
            index: id ? {
                _id: id
            } : {}
        }, doc]
    }))
    const options = {
        index: this.index,
        type: this.type,
        body: body,
        refresh: true,
    }

    return this.client.bulk(options)
}