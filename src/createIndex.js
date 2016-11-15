'use strict';

module.exports = function(mapping) {
	return this.client.indices.exists({
			index: this.index,
			local: true
		})
		.then((resp) => {
			if (!resp) {
				return this.client.indices.create({
					index: this.index,
					body: {
						mappings: mapping
					}
				})
			} else {
				throw new Error('the index: ' + index + 'has already exists!!!')
			}
		})
}