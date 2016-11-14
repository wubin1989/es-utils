'use strict';

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
module.exports = function(kv, size, query, sum) {
    const _ = require('lodash')
    const moment = require('moment')

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
        scroll: '60s',
        size: size || 1000,
        body: _query,
        search_type: 'scan',
    };

    let count = 0

    const that = this

    return new Promise((resolve, reject) => {
        let start = moment()
        const startCopy = _.cloneDeep(start)

        that.client.search(options, async function getMoreUntilDone(err, response) {
            if (err) {
                return reject(err);
            };

            try {
                const more = response.hits.hits.length
                const docs = _.map(response.hits.hits, (hit) => {
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
                                    _value = v.value
                                    if (_value.constructor.name === "Object" && hit._source[k].constructor.name === "Object") {
                                        _value = _.merge(_value, hit._source[k])
                                    } else if (_value.constructor.name === "Array" && hit._source[k].constructor.name === "Array") {
                                        _value = [...new Set(hit._source[k].concat(_value))]
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
                    const bulkUpdateResult = await that.bulkUpdateDocs(docs)
                }

                const now = moment()
                const diff = moment.utc(moment.duration(now.diff(start)).asMilliseconds()).format("HH:mm:ss.SSS")
                const totalDiff = moment.utc(moment.duration(now.diff(startCopy)).asMilliseconds()).format("HH:mm:ss.SSS")
                const raw_speed = more ? (now - start) / more : '--'
                const speed = (raw_speed !== '--') ? (raw_speed / 1000).toFixed(2) : '--'

                count += more

                let compare = response.hits.total

                if (sum && (response.hits.total > sum)) {
                    compare = sum
                }

                let doc_remain = compare - count
                if (doc_remain < 0) {
                    doc_remain = 0
                }
                const time_remain = (raw_speed !== '--') ? moment.utc(moment.duration(raw_speed * doc_remain).asMilliseconds()).format("HH:mm:ss.SSS") : '--'

                console.log(`Finished: ${more}\tRatio: ${compare ? (count/compare).toFixed(2)*100 : 100}%\tTimeCost: ${diff}\tSpeed: ${speed}s/doc\tTimeRemaining: ${time_remain}\tTotalTimeCost: ${totalDiff}`)

                start = _.cloneDeep(now)

                if (count < compare) {
                    that.client.scroll({
                        scrollId: response._scroll_id,
                        scroll: '60s',
                    }, getMoreUntilDone);
                } else {
                    return resolve('scroll and update finished');
                }
            } catch (err) {
                console.log(err);
            }
        })
    });
}