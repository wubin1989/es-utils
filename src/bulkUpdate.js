"use strict"

import * as _ from "lodash"

export default function(docs) {
    const body = _.flatten(_.map(docs, (item) => {
        const id = item.id
        const doc = item.doc
        return [{
            update: {
                _id: id
            }
        }, {
            doc: doc,
            "detect_noop": false,
        }]
    }))
    const options = {
        index: this.index,
        type: this.type,
        body: body,
        refresh: true,
    }

    return this.client.bulk(options)
}