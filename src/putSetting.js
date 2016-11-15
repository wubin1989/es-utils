'use strict';

module.exports = function(body) {

	const options = {
		index: this.index,
		body: body,
	}

	return this.client.indices.putSettings(options)
}