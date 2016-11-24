"use strict"

export default function(body) {

    const options = {
        index: this.index,
        body: body,
    }

    return this.client.indices.putSettings(options)
}