'use strict';

module.exports = function(fields, size, sum, sortByField, query, wantedField) {
    if (!sum) {
        sum = 500;
    }

    const _query = {
        query: query
    }

    let options = {
        index: this.index,
        type: this.type,
        scroll: '60s',
        size: size || 50,
        body: _query,
        search_type: 'scan',
    };

    if (fields) {
        options.fields = fields;
    }
    if (sortByField) {
        options.sort = sortByField + ':desc';
    }
    if (!wantedField) {
        wantedField = 'fields';
    }

    let allValues = [];
    const that = this
    return new Promise((resolve, reject) => {
        that.client.search(options, function getMoreUntilDone(err, response) {
            if (err) {
                return reject(err);
            };
            response.hits.hits.forEach(function(hit) {
                if (!fields) {
                    allValues.push(hit);
                } else {
                    if (!Array.isArray(wantedField)) {
                        let value = hit[wantedField];
                        if (value) {
                            allValues.push(value);
                        } else {
                            console.log(value);
                            console.log(hit);
                        }
                    } else {
                        let value = {};
                        for (let i = 0; i < wantedField.length; i++) {
                            value[wantedField[i]] = hit[wantedField[i]] || {};
                        }
                        allValues.push(value);
                    }
                }
            });

            let compare = sum;
            if (response.hits.total < sum) {
                compare = response.hits.total;
            }
            if (allValues.length < compare) {
                that.client.scroll({
                    scrollId: response._scroll_id,
                    scroll: '60s',
                }, getMoreUntilDone);
            } else {
                let resolved = allValues;
                if (sortByField) {
                    resolved = {
                        sortBy: sortByField,
                        data: allValues,
                    };
                }
                return resolve(resolved);
            }
        })
    });
}