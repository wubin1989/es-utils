'use strict';

module.exports = function(pageSize, sortByField, query, page_index, aggs){

    const query = {
        query: query,
    }

    if (aggs) {
        query.aggs = aggs;
    }

    console.log(JSON.stringify(query, null, 4))
    console.log('-------------------------------')
    
    let options = {
        index: this.index,
        type: this.type,
        body: query,
        size: pageSize || 0,
        from: page_index ? page_index * pageSize : 0,
    };


    if (sortByField) {
        options.sort = sortByField + ':desc';
    }

    return this.client
        .search(options);
}