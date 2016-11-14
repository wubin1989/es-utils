'use strict';

module.exports = function(id) {

    const options = {
        index: this.index,
        type: this.type,
        id: id,
    }

    return this.client.get(options)
}