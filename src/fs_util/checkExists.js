'use strict';

module.exports = (dir) => {
	const fs = require('fs');
	try {
		const stats = fs.statSync(dir)
	} catch (err) {
		if (err.code === 'ENOENT') {
			fs.mkdirSync(dir)
		}
	}
	return true
}