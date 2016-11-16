"use strict"

const moment = require("moment")

module.exports = function(fields, pageSize, sortByField, dateField, query, start_date, end_date){
    if(!fields){
        fields = []
    }
    const _query = {
        "query": {
            "match_all": {}
        }
    }
    if (query) {
        _query.query = query
    }
    return this.client.search({
        index: this.index,
        type: this.type,
        body: {
            query: _query,
            aggs: {
                volumn: {
                    date_histogram: {
                        field: dateField,
                        interval: "day",
                        format: "yyyy-M-d",
                        time_zone: "+08:00",
                        min_doc_count: 0,
                        extended_bounds: {
                            min: start_date.getTime(),
                            max: moment(end_date).subtract(1, "days").toDate().getTime()
                        }
                    },
                    aggs: ((fields)=>{
                        let obj = {}
                        for (let i=0; i<fields.length;i++) {
                            let field = fields[i]
                            obj[field + "_sum"] = {
                                sum: {
                                    field: field
                                }
                            }
                        }
                        return obj
                    })(fields)
                }
            }
        },
        size: pageSize,
        sort: sortByField + ":desc",
    })
}