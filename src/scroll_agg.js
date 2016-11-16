"use strict"

module.exports = function(field, size, sum, query) {
    if (!sum) {
        sum = 500
    }

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
        fields: field,
        search_type: "scan",
    }

    let allValues = []
    const that = this
    return new Promise((resolve, reject) => {
        that.client.search(options, function getMoreUntilDone(err, response) {
            if (err) {
                return reject(err)
            }
            response.hits.hits.forEach(function(hit) {
                if (typeof field === "string") {
                    allValues.push(hit.fields ? hit.fields[field][0] : "")
                } else {
                    allValues.push(hit.fields ? hit.fields : "")
                }
            })

            let compare = sum
            if (response.hits.total < sum) {
                compare = response.hits.total
            }
            console.log(compare)
            if (allValues.length < compare) {
                console.log(allValues.length)
                that.client.scroll({
                    scrollId: response._scroll_id,
                    scroll: "60s",
                }, getMoreUntilDone)
            } else {
                console.log("OK")
                let resolved = allValues
                return resolve(resolved)
            }
        })
    })
}
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //