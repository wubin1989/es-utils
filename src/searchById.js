'use strict';

module.exports = function(id) {

    const options = {
        index: this.index,
        type: this.type,
        id: id,
        refresh: true
    }

    console.log(options)

    return this.client.get(options)
}