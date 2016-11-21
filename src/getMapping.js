"use strict"

export default function() {
	return this.client.indices.getMapping({
		index: this.index,
		type: this.type
	})
}