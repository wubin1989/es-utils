"use strict"

module.exports = function(){
    return this.client.indices.getMapping({
        index: this.index,
        type: this.type
    })
}