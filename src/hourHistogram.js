'use strict';

const moment = require('moment');

module.exports = function(fields, pageSize, sortByField, dateField, query, start_date, end_date){
    if(!fields){
        fields = [];
    }
    return this.client.search({
            index: this.index,
            type: this.type,
            body: {
                query: query,
                aggs: {
                    volumn: {
                        date_histogram: {
                            field: dateField,
                            interval: 'hour',
                            format: 'yyyy-M-d H:mm',
                            time_zone: '+08:00',
                            min_doc_count: 0,
                            extended_bounds: {
                                min: start_date.getTime(),
                                max: moment(end_date).subtract(1, 'hours').toDate().getTime()
                            }
                        },
                        aggs: ((fields)=>{
                            let obj = {};
                            for (let i=0; i<fields.length;i++) {
                                let field = fields[i];
                                obj[field + '_sum'] = {
                                    sum: {
                                        field: field
                                    }
                                }
                            }
                            return obj;
                        })(fields)
                    }
                }
            },
            size: pageSize || 0,
            sort: (sortByField || '_score') + ':desc',
        });
}