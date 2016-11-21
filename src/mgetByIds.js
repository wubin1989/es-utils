"use strict"

export default function(ids) {

	const options = {
		index: this.index,
		type: this.type,
		body: {
			ids: ids
		},
		refresh: true
	}

	return this.client.mget(options)
}