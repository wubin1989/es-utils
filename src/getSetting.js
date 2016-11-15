'use strict';

module.exports = function() {
	return this.client.indices.getSettings({
		index: this.index,
	})
}