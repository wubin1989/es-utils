'use strict';

module.exports = function(field, size, value, query, sum) {
    const _ = require('lodash')

    const _query = {
        "query": {
            "match_all": {}
        }
    }

    const options = {
        index: this.index,
        type: this.type,
        scroll: '60s',
        size: size || 1000,
        body: query || _query,
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
                const total = response.hits.total
                const docs = _.map(response.hits.hits, (hit) => {
                    const id = hit._id
                    const doc = {
                        [field]: value || hit._source[field]
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
                console.log(`${more} has been updated successfully, current progress is ${(count/total).toFixed(2)*100}%`);

                let compare = total;

                if (sum && response.hits.total > sum) {
                    compare = sum
                }

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