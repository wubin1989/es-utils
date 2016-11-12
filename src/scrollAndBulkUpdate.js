'use strict';

module.exports = function(field, size, value, query, sum, replace) {
    const _ = require('lodash')

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
        scroll: '60s',
        size: size || 1000,
        body: _query,
        search_type: 'scan',
    };

    let count = 0

    const that = this

    return new Promise((resolve, reject) => {

        that.client.search(options, async function getMoreUntilDone(err, response) {
            if (err) {
                return reject(err);
            };

            try {
                const more = response.hits.hits.length
                const docs = _.map(response.hits.hits, (hit) => {
                    const id = hit._id
                    const doc = {
                        [field]: value || hit._source[field]
                    }
                    if (value && !replace) {
                        if (hit._source[field].constructor.name === "Object" && value.constructor.name === "Object") {
                            value = _.merge(value, hit._source[field])
                        } else if (hit._source[field].constructor.name === "Array" && value.constructor.name === "Array") {
                            value = hit._source[field].push(...value)
                        }
                        doc[field] = value
                    }
                    return {
                        id: id,
                        doc: doc
                    }
                })

                if (docs.length) {
                    const bulkUpdateResult = await that.bulkUpdateDocs(docs)
                }

                count += more

                let compare = response.hits.total

                if (sum && (response.hits.total > sum)) {
                    compare = sum
                }

                console.log(`${more} has been updated successfully, current progress is ${(count/compare).toFixed(2)*100}%`);

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