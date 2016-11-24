"use strict"

export default function() {
    return this.client.indices.getSettings({
        index: this.index,
    })
}