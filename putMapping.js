'use strict';

module.exports = function(body){
    
    const options = {
        index: this.index,
        type: this.type,
        body: body,
        updateAllTypes: false,
    };

    return this.client.indices.putMapping(options)
}