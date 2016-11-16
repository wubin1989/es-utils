"use strict"

module.exports = function(ids) {

    const options = {
        index: this.index,
        type: this.type,
        body: {
            ids: ids
        },
        refresh: true
    }

    return this.client.mget(options)
}