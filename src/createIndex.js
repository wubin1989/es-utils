'use strict';

module.exports = function(mapping){
	return this.client.indices.exists({
                index: this.index,
                local: true
              })
		.then((resp) => {
			if(!resp){
				return EsClient.indices.create({
						index: index,
						body: {
						  mappings: mapping
						}
					})
			}else{
				throw new Error('the index: ' + index + 'has already exists!!!')
			}
		})
}