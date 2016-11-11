'use strict';

module.exports = (file, data) => {
	const fs = require('fs')
	const path = require('path')
	const dir = path.dirname(file)
	const checkExists = require('./checkExists')
	if (checkExists(dir)) {
		fs.appendFileSync(file, data)
	}
}