(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-polyfill"), require("elasticsearch"), require("lodash"), require("moment"), require("fs_util"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-polyfill", "elasticsearch", "lodash", "moment", "fs_util"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("babel-polyfill"), require("elasticsearch"), require("lodash"), require("moment"), require("fs_util")) : factory(root["babel-polyfill"], root["elasticsearch"], root["lodash"], root["moment"], root["fs_util"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_18__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var elasticsearch = __webpack_require__(3);
	var _ = __webpack_require__(4);
	
	var EsUtil = function () {
		function EsUtil(config, index, type) {
			_classCallCheck(this, EsUtil);
	
			this.client = new elasticsearch.Client(_.cloneDeep(config));
			this.index = index;
			this.type = type;
		}
	
		_createClass(EsUtil, [{
			key: 'dateHistogram',
			value: function dateHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
				var _dateHistogram = __webpack_require__(5).bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date);
				return _dateHistogram();
			}
		}, {
			key: 'hourHistogram',
			value: function hourHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
				var _hourHistogram = __webpack_require__(7).bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date);
				return _hourHistogram();
			}
		}, {
			key: 'scroll',
			value: function scroll(fields, size, sum, sortByField, query, wantedField) {
				var _scroll = __webpack_require__(8).bind(this, fields, size, sum, sortByField, query, wantedField);
				return _scroll();
			}
		}, {
			key: 'scroll_agg',
			value: function scroll_agg(field, size, sum, query) {
				var _scroll_agg = __webpack_require__(9).bind(this, field, size, sum, query);
				return _scroll_agg();
			}
		}, {
			key: 'search',
			value: function search(pageSize, sortByField, query, page_index, aggs) {
				var _search = __webpack_require__(10).bind(this, pageSize, sortByField, query, page_index, aggs);
				return _search();
			}
		}, {
			key: 'createIndex',
			value: function createIndex(mapping) {
				var _createIndex = __webpack_require__(11).bind(this, mapping);
				return _createIndex();
			}
		}, {
			key: 'getMapping',
			value: function getMapping() {
				var _getMapping = __webpack_require__(12).bind(this);
				return _getMapping();
			}
		}, {
			key: 'putMapping',
			value: function putMapping(body) {
				var _putMapping = __webpack_require__(13).bind(this, body);
				return _putMapping();
			}
		}, {
			key: 'updateDoc',
			value: function updateDoc(body) {
				var _updateDoc = __webpack_require__(14).bind(this, body);
				return _updateDoc();
			}
		}, {
			key: 'bulkUpdateDocs',
			value: function bulkUpdateDocs(docs) {
				var _bulkUpdateDocs = __webpack_require__(15).bind(this, docs);
				return _bulkUpdateDocs();
			}
		}, {
			key: 'scrollAndBulkUpdate',
			value: function scrollAndBulkUpdate(kv, size, query, sum) {
				var _scrollAndBulkUpdate = __webpack_require__(16).bind(this, kv, size, query, sum);
				return _scrollAndBulkUpdate();
			}
		}, {
			key: 'scrollAndAppendFile',
			value: function scrollAndAppendFile(size, query, sum, file) {
				var _scrollAndAppendFile = __webpack_require__(17).bind(this, size, query, sum, file);
				return _scrollAndAppendFile();
			}
		}, {
			key: 'searchById',
			value: function searchById(id) {
				var _searchById = __webpack_require__(19).bind(this, id);
				return _searchById();
			}
		}]);
	
		return EsUtil;
	}();
	
	module.exports = EsUtil;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var moment = __webpack_require__(6);
	
	module.exports = function (fields, pageSize, sortByField, dateField, query, start_date, end_date) {
	    if (!fields) {
	        fields = [];
	    }
	    return this.client.search({
	        index: this.index,
	        type: this.type,
	        body: {
	            query: query,
	            aggs: {
	                volumn: {
	                    date_histogram: {
	                        field: dateField,
	                        interval: 'day',
	                        format: 'yyyy-M-d',
	                        time_zone: '+08:00',
	                        min_doc_count: 0,
	                        extended_bounds: {
	                            min: start_date.getTime(),
	                            max: moment(end_date).subtract(1, 'days').toDate().getTime()
	                        }
	                    },
	                    aggs: function (fields) {
	                        var obj = {};
	                        for (var i = 0; i < fields.length; i++) {
	                            var field = fields[i];
	                            obj[field + '_sum'] = {
	                                sum: {
	                                    field: field
	                                }
	                            };
	                        }
	                        return obj;
	                    }(fields)
	                }
	            }
	        },
	        size: pageSize,
	        sort: sortByField + ':desc'
	    });
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var moment = __webpack_require__(6);
	
	module.exports = function (fields, pageSize, sortByField, dateField, query, start_date, end_date) {
	    if (!fields) {
	        fields = [];
	    }
	    return this.client.search({
	        index: this.index,
	        type: this.type,
	        body: {
	            query: query,
	            aggs: {
	                volumn: {
	                    date_histogram: {
	                        field: dateField,
	                        interval: 'hour',
	                        format: 'yyyy-M-d H:mm',
	                        time_zone: '+08:00',
	                        min_doc_count: 0,
	                        extended_bounds: {
	                            min: start_date.getTime(),
	                            max: moment(end_date).subtract(1, 'hours').toDate().getTime()
	                        }
	                    },
	                    aggs: function (fields) {
	                        var obj = {};
	                        for (var i = 0; i < fields.length; i++) {
	                            var field = fields[i];
	                            obj[field + '_sum'] = {
	                                sum: {
	                                    field: field
	                                }
	                            };
	                        }
	                        return obj;
	                    }(fields)
	                }
	            }
	        },
	        size: pageSize || 0,
	        sort: (sortByField || '_score') + ':desc'
	    });
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (fields, size, sum, sortByField, query, wantedField) {
	    if (!sum) {
	        sum = 500;
	    }
	
	    var _query = {
	        query: query
	    };
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        scroll: '60s',
	        size: size || 50,
	        body: _query,
	        search_type: 'scan'
	    };
	
	    if (fields) {
	        options.fields = fields;
	    }
	    if (sortByField) {
	        options.sort = sortByField + ':desc';
	    }
	    if (!wantedField) {
	        wantedField = 'fields';
	    }
	
	    var allValues = [];
	    var that = this;
	    return new Promise(function (resolve, reject) {
	        that.client.search(options, function getMoreUntilDone(err, response) {
	            if (err) {
	                return reject(err);
	            };
	            response.hits.hits.forEach(function (hit) {
	                if (!fields) {
	                    allValues.push(hit);
	                } else {
	                    if (!Array.isArray(wantedField)) {
	                        var value = hit[wantedField];
	                        if (value) {
	                            allValues.push(value);
	                        } else {
	                            console.log(value);
	                            console.log(hit);
	                        }
	                    } else {
	                        var _value = {};
	                        for (var i = 0; i < wantedField.length; i++) {
	                            _value[wantedField[i]] = hit[wantedField[i]] || {};
	                        }
	                        allValues.push(_value);
	                    }
	                }
	            });
	
	            var compare = sum;
	            if (response.hits.total < sum) {
	                compare = response.hits.total;
	            }
	            if (allValues.length < compare) {
	                that.client.scroll({
	                    scrollId: response._scroll_id,
	                    scroll: '60s'
	                }, getMoreUntilDone);
	            } else {
	                var resolved = allValues;
	                if (sortByField) {
	                    resolved = {
	                        sortBy: sortByField,
	                        data: allValues
	                    };
	                }
	                return resolve(resolved);
	            }
	        });
	    });
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (field, size, sum, query) {
	    if (!sum) {
	        sum = 500;
	    }
	
	    var _query = {
	        query: query
	    };
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        scroll: '60s',
	        size: size || 50,
	        body: _query,
	        fields: field,
	        search_type: 'scan'
	    };
	
	    var allValues = [];
	    var that = this;
	    return new Promise(function (resolve, reject) {
	        that.client.search(options, function getMoreUntilDone(err, response) {
	            if (err) {
	                return reject(err);
	            };
	            response.hits.hits.forEach(function (hit) {
	                if (typeof field === 'string') {
	                    allValues.push(hit.fields ? hit.fields[field][0] : '');
	                } else {
	                    allValues.push(hit.fields ? hit.fields : '');
	                }
	            });
	
	            var compare = sum;
	            if (response.hits.total < sum) {
	                compare = response.hits.total;
	            }
	            console.log(compare);
	            if (allValues.length < compare) {
	                console.log(allValues.length);
	                that.client.scroll({
	                    scrollId: response._scroll_id,
	                    scroll: '60s'
	                }, getMoreUntilDone);
	            } else {
	                console.log('OK');
	                var resolved = allValues;
	                return resolve(resolved);
	            }
	        });
	    });
	};
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (pageSize, sortByField, query, page_index, aggs) {
	
	    var _query = {
	        query: query
	    };
	
	    if (aggs) {
	        _query.aggs = aggs;
	    }
	
	    console.log(JSON.stringify(_query, null, 4));
	    console.log('-------------------------------');
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        body: _query,
	        size: pageSize || 0,
	        from: page_index ? page_index * pageSize : 0
	    };
	
	    if (sortByField) {
	        options.sort = sortByField + ':desc';
	    }
	
	    return this.client.search(options);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (mapping) {
		var _this = this;
	
		return this.client.indices.exists({
			index: this.index,
			local: true
		}).then(function (resp) {
			if (!resp) {
				return _this.client.indices.create({
					index: _this.index,
					body: {
						mappings: mapping
					}
				});
			} else {
				throw new Error('the index: ' + index + 'has already exists!!!');
			}
		});
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		return this.client.indices.getMapping({
			index: this.index,
			type: this.type
		});
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (body) {
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        body: body,
	        updateAllTypes: false
	    };
	
	    return this.client.indices.putMapping(options);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (body) {
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        body: body,
	        updateAllTypes: false
	    };
	
	    return this.client.indices.putMapping(options);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (docs) {
		var _ = __webpack_require__(4);
		var that = this;
		var body = _.flatten(_.map(docs, function (item) {
			var id = item.id;
			var doc = item.doc;
			return [{
				update: {
					_index: that.index,
					_type: that.type,
					_id: id
				}
			}, {
				doc: doc,
				"detect_noop": false
			}];
		}));
	
		return that.client.bulk({
			body: body,
			refresh: true
		});
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	    eg.:
	        kv = ["tags", "userid"]
	        kv = {
	            tags:{
	                value: ["apple"],
	                replace: false
	            }
	            userid: "123456"
	        }
	*/
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	module.exports = function (kv, size, query, sum) {
	    var _ = __webpack_require__(4);
	    var moment = __webpack_require__(6);
	
	    var kvCopy = _.cloneDeep(kv);
	
	    var _query = {
	        "query": {
	            "match_all": {}
	        }
	    };
	
	    if (query) {
	        _query.query = query;
	    }
	
	    console.log(JSON.stringify(_query, null, 4));
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        scroll: '60s',
	        size: size || 1000,
	        body: _query,
	        search_type: 'scan'
	    };
	
	    var count = 0;
	
	    var that = this;
	
	    return new Promise(function (resolve, reject) {
	        var start = moment();
	        var startCopy = _.cloneDeep(start);
	
	        that.client.search(options, function () {
	            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, response) {
	                var more, docs, bulkUpdateResult, now, diff, totalDiff, raw_speed, speed, compare, doc_remain, time_remain;
	                return regeneratorRuntime.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                if (!err) {
	                                    _context.next = 2;
	                                    break;
	                                }
	
	                                return _context.abrupt('return', reject(err));
	
	                            case 2:
	                                ;
	
	                                _context.prev = 3;
	                                more = response.hits.hits.length;
	                                docs = _.map(response.hits.hits, function (hit) {
	                                    var id = hit._id;
	                                    var doc = {};
	
	                                    if (kvCopy.constructor.name === "Array") {
	                                        _.forEach(kvCopy, function (k) {
	                                            if (k.constructor.name === "String") {
	                                                var key = k.trim();
	                                                doc[key] = hit._source[key];
	                                            } else {
	                                                throw new Error("your provided field name is not string!");
	                                            }
	                                        });
	                                    } else if (kvCopy.constructor.name === "Object") {
	                                        _.forOwn(kvCopy, function (v, k) {
	                                            var _value = _.cloneDeep(v);
	                                            if (v.constructor.name === "Object") {
	                                                if (v.replace === false) {
	                                                    _value = v.value;
	                                                    if (_value.constructor.name === "Object" && hit._source[k].constructor.name === "Object") {
	                                                        _value = _.merge(_value, hit._source[k]);
	                                                    } else if (_value.constructor.name === "Array" && hit._source[k].constructor.name === "Array") {
	                                                        _value = [].concat(_toConsumableArray(new Set(hit._source[k].concat(_value))));
	                                                    }
	                                                }
	                                            }
	                                            doc[k] = _value;
	                                        });
	                                    } else {
	                                        if (kvCopy.constructor.name === "String") {
	                                            var key = kvCopy.trim();
	                                            doc[key] = hit._source[key];
	                                        } else {
	                                            throw new Error("your provided field name is not string!");
	                                        }
	                                    }
	
	                                    return {
	                                        id: id,
	                                        doc: doc
	                                    };
	                                });
	
	                                if (!docs.length) {
	                                    _context.next = 10;
	                                    break;
	                                }
	
	                                _context.next = 9;
	                                return that.bulkUpdateDocs(docs);
	
	                            case 9:
	                                bulkUpdateResult = _context.sent;
	
	                            case 10:
	                                now = moment();
	                                diff = moment.utc(moment.duration(now.diff(start)).asMilliseconds()).format("HH:mm:ss.SSS");
	                                totalDiff = moment.utc(moment.duration(now.diff(startCopy)).asMilliseconds()).format("HH:mm:ss.SSS");
	                                raw_speed = more ? (now - start) / more : '--';
	                                speed = (more / ((now - start) / 1000)).toFixed(2);
	
	
	                                count += more;
	
	                                compare = response.hits.total;
	
	
	                                if (sum && response.hits.total > sum) {
	                                    compare = sum;
	                                }
	
	                                doc_remain = compare - count;
	
	                                if (doc_remain < 0) {
	                                    doc_remain = 0;
	                                }
	                                time_remain = raw_speed !== '--' ? moment.utc(moment.duration(raw_speed * doc_remain).asMilliseconds()).format("HH:mm:ss.SSS") : '--';
	
	
	                                console.log('Finished: ' + count + '\tRatio: ' + (compare ? (count / compare).toFixed(2) * 100 : 100) + '%\tTimeCost: ' + diff + '\tSpeed: ' + speed + 'doc/s\tTimeRemaining: ' + time_remain + '\tTotalTimeCost: ' + totalDiff);
	
	                                start = _.cloneDeep(now);
	
	                                if (!(count < compare)) {
	                                    _context.next = 27;
	                                    break;
	                                }
	
	                                that.client.scroll({
	                                    scrollId: response._scroll_id,
	                                    scroll: '60s'
	                                }, getMoreUntilDone);
	                                _context.next = 28;
	                                break;
	
	                            case 27:
	                                return _context.abrupt('return', resolve('scroll and update finished'));
	
	                            case 28:
	                                _context.next = 33;
	                                break;
	
	                            case 30:
	                                _context.prev = 30;
	                                _context.t0 = _context['catch'](3);
	
	                                console.log(_context.t0);
	
	                            case 33:
	                            case 'end':
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this, [[3, 30]]);
	            }));
	
	            function getMoreUntilDone(_x, _x2) {
	                return _ref.apply(this, arguments);
	            }
	
	            return getMoreUntilDone;
	        }());
	    });
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (size, query, sum, file) {
	    var _ = __webpack_require__(4);
	    var moment = __webpack_require__(6);
	    var appendFile = __webpack_require__(18).appendFile;
	
	    var _query = {
	        "query": {
	            "match_all": {}
	        }
	    };
	
	    if (query) {
	        _query.query = query;
	    }
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        scroll: '60s',
	        size: size || 1000,
	        body: _query,
	        search_type: 'scan'
	    };
	
	    var count = 0;
	
	    var that = this;
	
	    return new Promise(function (resolve, reject) {
	        var start = moment();
	        var startCopy = _.cloneDeep(start);
	
	        that.client.search(options, function getMoreUntilDone(err, response) {
	            if (err) {
	                return reject(err);
	            }
	
	            var more = response.hits.hits.length;
	            var data = _.reduce(response.hits.hits, function (sum, hit) {
	                sum += hit._source.content_full + '\n';
	                return sum;
	            }, "");
	
	            if (data) {
	                try {
	                    appendFile(file, data);
	                } catch (err) {
	                    return reject(err);
	                }
	            }
	
	            var now = moment();
	            var diff = moment.utc(moment.duration(now.diff(start)).asMilliseconds()).format("HH:mm:ss.SSS");
	            var totalDiff = moment.utc(moment.duration(now.diff(startCopy)).asMilliseconds()).format("HH:mm:ss.SSS");
	            var raw_speed = more ? (now - start) / more : '--';
	            var speed = (more / ((now - start) / 1000)).toFixed(2);
	
	            count += more;
	
	            var compare = response.hits.total;
	
	            if (sum && response.hits.total > sum) {
	                compare = sum;
	            }
	
	            var doc_remain = compare - count;
	            if (doc_remain < 0) {
	                doc_remain = 0;
	            }
	
	            var time_remain = raw_speed !== '--' ? moment.utc(moment.duration(raw_speed * doc_remain).asMilliseconds()).format("HH:mm:ss.SSS") : '--';
	
	            console.log('Finished: ' + count + '\tRatio: ' + (compare ? (count / compare).toFixed(2) * 100 : 100) + '%\tTimeCost: ' + diff + '\tSpeed: ' + speed + 'doc/s\tTimeRemaining: ' + time_remain + '\tTotalTimeCost: ' + totalDiff);
	
	            start = _.cloneDeep(now);
	
	            if (count < compare) {
	                that.client.scroll({
	                    scrollId: response._scroll_id,
	                    scroll: '60s'
	                }, getMoreUntilDone);
	            } else {
	                return resolve('append file finished');
	            }
	        });
	    });
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (id) {
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        id: id,
	        refresh: true
	    };
	
	    console.log(options);
	
	    return this.client.get(options);
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map