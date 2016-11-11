'use strict';

module.exports = function(size, query, sum, file) {
    const _ = require('lodash')
    const appendFile = require('./fs_util').appendFile

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

        that.client.search(options, function getMoreUntilDone(err, response) {
            if (err) {
                return reject(err)
            }

            const more = response.hits.hits.length
            const data = _.reduce(response.hits.hits, (sum, hit) => {
                sum += (hit._source.content_full + '\n')
                return sum
            }, "")

            if (data) {
                try {
                    appendFile(file, data)
                } catch (err) {
                    return reject(err)
                }
            }

            count += more

            let compare = response.hits.total

            if (sum && (response.hits.total > sum)) {
                compare = sum
            }

            console.log(`${more} has been append successfully, current progress is ${(count/compare).toFixed(2)*100}%`);

            if (count < compare) {
                that.client.scroll({
                    scrollId: response._scroll_id,
                    scroll: '60s',
                }, getMoreUntilDone);
            } else {
                return resolve('scroll and update finished');
            }

        })
    });
}