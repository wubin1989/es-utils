"use strict"

export default function(pageSize, sortByField, query, page_index, aggs) {

    const _query = {
        "query": {
            "match_all": {}
        }
    }
    if (query) {
        _query.query = query
    }

    if (aggs) {
        _query.aggs = aggs
    }

    console.log(JSON.stringify(_query, null, 4))
    console.log("-------------------------------")

    let options = {
        index: this.index,
        type: this.type,
        body: _query,
        size: pageSize || 0,
        from: page_index ? page_index * pageSize : 0,
    }


    if (sortByField) {
        options.sort = sortByField
    }

    return this.client
        .search(options)
}