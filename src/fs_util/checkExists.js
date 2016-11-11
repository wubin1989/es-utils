'use strict';

module.exports = (file) => {
	const fs = require('fs');
	const path = require('path')

	try {
		const stats = fs.statSync(file)
		if (stats.isFile()) {
			fs.unlinkSync(file)
		} else {
			throw new Error("Invalid! not a file path!")
		}
	} catch (err) {
		if (err.code === 'ENOENT') {
			const shell = require('shelljs')
			const dir = path.dirname(file)
			shell.mkdir('-p', dir)
		}
	}
	return true
}