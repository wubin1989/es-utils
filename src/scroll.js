"use strict"

import * as _ from "lodash"
import logJobStatus from "./logJobStatus"
const moment = require("moment")

export default function(source, size, query, sum, sortByField) {

    const _query = {
        "query": {
            "match_all": {}
        }
    }
    if (query) {
        _query.query = query
    }

    const options = {
        index: this.index,
        type: this.type,
        scroll: "60s",
        size: size || 50,
        body: _query,
        source: true,
    }

    if ((source && source.constructor.name === "String") || (source && Array.isArray(source) && source.length !== 0) || (source === false)) {
        options.source = source
    }
    if (sortByField) {
        options.sort = sortByField
    }

    const allValues = []
    const that = this
    return new Promise((resolve, reject) => {

        let start = moment()
        const startCopy = _.cloneDeep(start)

        that.client.search(options, function getMoreUntilDone(err, response) {
            if (err) return reject(err)

            const more = response.hits.hits.length

            let compare = response.hits.total
            if (sum && compare > sum) {
                compare = sum
            }

            let count = allValues.length

            if (!more && count && count < compare) return reject(new Error('while count less than compare, scroll gets nothing'))

            response.hits.hits.forEach(function(hit) {
                allValues.push(hit)
            })

            count = allValues.length

            const now = moment()
            start = logJobStatus(now, start, startCopy, more, count, compare)

            if (count < compare) {
                that.client.scroll({
                    scrollId: response._scroll_id,
                    scroll: "60s",
                }, getMoreUntilDone)
            } else {
                let resolved = allValues
                if (sortByField) {
                    resolved = {
                        sortBy: sortByField,
                        data: allValues,
                    }
                }
                return resolve(resolved)
            }
        })
    })
}