'use strict';

module.exports = function(body){
    
    /*
    "properties": {
        "title": {
          "type": "string",
          "index": "analyzed",
          "fields": {
            "raw": {
              "type": "string",
              "index": "not_analyzed"
            }
          }
        }
      }
    */
    const options = {
        index: index,
        type: type,
        body: body,
        updateAllTypes: false,
    };

    return this.client.indices.putMapping(options)
}