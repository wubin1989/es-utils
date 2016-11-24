"use strict"

import * as _ from "lodash"
import moment from 'moment/src/moment'
import logJobStatus from "./logJobStatus"

/*
    eg.:
        kv = ["tags", "userid"]
        kv = {
            tags:{
                value: ["apple"],
                replace: false
            }
            userid: "123456"
        }
*/
export default function(kv, size, query, sum) {

    const kvCopy = _.cloneDeep(kv)

    const _query = {
        "query": {
            "match_all": {}
        }
    }

    if (query) {
        _query.query = query
    }

    console.log(JSON.stringify(_query, null, 4))

    const options = {
        index: this.index,
        type: this.type,
        scroll: "60s",
        size: size || 1000,
        body: _query,
        search_type: "scan",
    }

    let count = 0

    const that = this

    return new Promise((resolve) => {
        let start = moment()
        const startCopy = _.cloneDeep(start)

        that.client.search(options, async function getMoreUntilDone(err, response) {
            try {
                if (err) {
                    throw new Error(err)
                }
                const more = response.hits.hits.length
                let docs = _.map(response.hits.hits, (hit) => {
                    const id = hit._id
                    const doc = {}

                    if (kvCopy.constructor.name === "Array") {
                        _.forEach(kvCopy, (k) => {
                            if (k.constructor.name === "String") {
                                const key = k.trim()
                                doc[key] = hit._source[key]
                            } else {
                                throw new Error("your provided field name is not string!")
                            }
                        })
                    } else if (kvCopy.constructor.name === "Object") {
                        _.forOwn(kvCopy, (v, k) => {
                            let _value = _.cloneDeep(v)
                            if (v.constructor.name === "Object") {
                                if (v.replace === false) {
                                    const source_value = _.cloneDeep(hit._source[k])
                                    _value = v.value
                                    if (source_value) {
                                        if (_value.constructor.name === "Object" && source_value.constructor.name === "Object") {
                                            _value = _.merge(_value, hit._source[k])
                                        } else if (_value.constructor.name === "Array" && source_value.constructor.name === "Array") {
                                            _value = [...new Set(hit._source[k].concat(_value))]
                                        }
                                    }
                                }
                            }
                            doc[k] = _value
                        })
                    } else {
                        if (kvCopy.constructor.name === "String") {
                            const key = kvCopy.trim()
                            doc[key] = hit._source[key]
                        } else {
                            throw new Error("your provided field name is not string!")
                        }
                    }

                    return {
                        id: id,
                        doc: doc
                    }
                })

                if (docs.length) {
                    const bulkUpdateResult = await that.bulkUpdate(docs)
                    if (bulkUpdateResult.errors) {
                        console.log("bulk update operation encounter some errors, please check the response: " + JSON.stringify(bulkUpdateResult, null, 4))
                    }
                }

                count += more

                let compare = response.hits.total

                if (sum && (compare > sum)) {
                    compare = sum
                }

                const now = moment()
                start = logJobStatus(now, start, startCopy, more, count, compare)
                docs = null

                if (count < compare) {
                    that.client.scroll({
                        scrollId: response._scroll_id,
                        scroll: "60s",
                    }, getMoreUntilDone)
                } else {
                    return resolve("scroll and update finished")
                }
            } catch (err) {
                console.log(err)
            }
        })
    })
}