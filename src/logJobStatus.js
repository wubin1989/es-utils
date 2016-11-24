"use strict"

import * as _ from "lodash"
const moment = require("moment")

export default function(current, previous, initial, more, count, compare) {
    const diff = moment.utc(moment.duration(current.diff(previous)).asMilliseconds()).format("HH:mm:ss.SSS")
    const totalDiff = moment.utc(moment.duration(current.diff(initial)).asMilliseconds()).format("HH:mm:ss.SSS")
    const raw_speed = more ? (current - previous) / more : "--"
    const speed = (more / ((current - previous) / 1000)).toFixed(2)
    let doc_remain = compare - count
    if (doc_remain < 0) {
        doc_remain = 0
    }
    const time_remain = (raw_speed !== "--") ? moment.utc(moment.duration(raw_speed * doc_remain).asMilliseconds()).format("HH:mm:ss.SSS") : "--"
    console.log(`Finished: ${count}\tRatio: ${compare ? (count/compare).toFixed(2)*100 : 100}%\tTimeCost: ${diff}\tSpeed: ${speed}doc/s\tTimeRemaining: ${time_remain}\tTotalTimeCost: ${totalDiff}`)
    return _.cloneDeep(current)
}