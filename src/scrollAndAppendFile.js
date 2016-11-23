"use strict"

export default function(size, query, field, sum, file) {
    const _ = require("lodash")
    const moment = require("moment")
    const appendFile = require("fs_util").appendFile
    const checkExists = require("fs_util").checkExists

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
        size: size || 1000,
        body: _query,
        search_type: "scan",
    }

    if (field) {
        if (field.constructor.name === "String") {
            options._source = [field]
        } else if (field.constructor.name === "Array") {
            options._source = field
        } else {
            throw new Error("Invalid field parameter provided! Only string or array acceptable!")
        }
    }

    let count = 0

    const that = this

    const ensureFile = checkExists(file)

    return new Promise((resolve, reject) => {
        let start = moment()
        const startCopy = _.cloneDeep(start)

        that.client.search(options, function getMoreUntilDone(err, response) {
            if (err) {
                return reject(err)
            }

            const more = response.hits.hits.length
            let data = _.reduce(response.hits.hits, (sum, hit) => {
                if (options._source) {
                    const fields = _.cloneDeep(options._source)
                    const len = fields.length
                    _.forEach(fields, (f, i) => {
                        sum += hit._source[f] || " "
                        if (i < (len - 1)) {
                            sum += "\t"
                        } else {
                            sum += "\n"
                        }
                    })
                } else {
                    sum += JSON.stringify(hit._source) + "\n"
                }
                return sum
            }, "")

            if (data) {
                try {
                    if (ensureFile) {
                        appendFile(file, data)
                    }
                } catch (err) {
                    return reject(err)
                }
            }

            const now = moment()
            const diff = moment.utc(moment.duration(now.diff(start)).asMilliseconds()).format("HH:mm:ss.SSS")
            const totalDiff = moment.utc(moment.duration(now.diff(startCopy)).asMilliseconds()).format("HH:mm:ss.SSS")
            const raw_speed = more ? (now - start) / more : "--"
            const speed = (more / ((now - start) / 1000)).toFixed(2)

            count += more

            let compare = response.hits.total

            if (sum && (response.hits.total > sum)) {
                compare = sum
            }

            let doc_remain = compare - count
            if (doc_remain < 0) {
                doc_remain = 0
            }

            const time_remain = (raw_speed !== "--") ? moment.utc(moment.duration(raw_speed * doc_remain).asMilliseconds()).format("HH:mm:ss.SSS") : "--"

            console.log(`Finished: ${count}\tRatio: ${compare ? (count/compare).toFixed(2)*100 : 100}%\tTimeCost: ${diff}\tSpeed: ${speed}doc/s\tTimeRemaining: ${time_remain}\tTotalTimeCost: ${totalDiff}`)

            start = _.cloneDeep(now)
            data = null

            if (count < compare) {
                that.client.scroll({
                    scrollId: response._scroll_id,
                    scroll: "60s",
                }, getMoreUntilDone)
            } else {
                return resolve("append file finished")
            }

        })
    })
}