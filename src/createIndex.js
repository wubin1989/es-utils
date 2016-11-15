'use strict';

module.exports = function(body) {
	return this.client.indices.exists({
			index: this.index,
			local: true
		})
		.then((resp) => {
			if (!resp) {
				return this.client.indices.create({
					index: this.index,
					body: body,
				})
			} else {
				throw new Error('the index: ' + this.index + ' has already exists!!!')
			}
		})
}