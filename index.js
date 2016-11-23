(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-polyfill"), require("elasticsearch"), require("lodash"), require("moment"), require("fs_util"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-polyfill", "elasticsearch", "lodash", "moment", "fs_util"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("babel-polyfill"), require("elasticsearch"), require("lodash"), require("moment"), require("fs_util")) : factory(root["babel-polyfill"], root["elasticsearch"], root["lodash"], root["moment"], root["fs_util"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_20__) {
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

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _elasticsearch = __webpack_require__(3);
	
	var elasticsearch = _interopRequireWildcard(_elasticsearch);
	
	var _lodash = __webpack_require__(4);
	
	var _ = _interopRequireWildcard(_lodash);
	
	var _dateHistogram3 = __webpack_require__(5);
	
	var _dateHistogram4 = _interopRequireDefault(_dateHistogram3);
	
	var _hourHistogram3 = __webpack_require__(7);
	
	var _hourHistogram4 = _interopRequireDefault(_hourHistogram3);
	
	var _scroll3 = __webpack_require__(8);
	
	var _scroll4 = _interopRequireDefault(_scroll3);
	
	var _search3 = __webpack_require__(9);
	
	var _search4 = _interopRequireDefault(_search3);
	
	var _createIndex3 = __webpack_require__(10);
	
	var _createIndex4 = _interopRequireDefault(_createIndex3);
	
	var _getMapping3 = __webpack_require__(11);
	
	var _getMapping4 = _interopRequireDefault(_getMapping3);
	
	var _putMapping3 = __webpack_require__(12);
	
	var _putMapping4 = _interopRequireDefault(_putMapping3);
	
	var _getSetting3 = __webpack_require__(13);
	
	var _getSetting4 = _interopRequireDefault(_getSetting3);
	
	var _putSetting3 = __webpack_require__(14);
	
	var _putSetting4 = _interopRequireDefault(_putSetting3);
	
	var _update2 = __webpack_require__(15);
	
	var _update3 = _interopRequireDefault(_update2);
	
	var _bulkUpdate2 = __webpack_require__(16);
	
	var _bulkUpdate3 = _interopRequireDefault(_bulkUpdate2);
	
	var _bulkIndex3 = __webpack_require__(17);
	
	var _bulkIndex4 = _interopRequireDefault(_bulkIndex3);
	
	var _scrollAndBulkUpdate3 = __webpack_require__(18);
	
	var _scrollAndBulkUpdate4 = _interopRequireDefault(_scrollAndBulkUpdate3);
	
	var _scrollAndAppendFile3 = __webpack_require__(19);
	
	var _scrollAndAppendFile4 = _interopRequireDefault(_scrollAndAppendFile3);
	
	var _searchById3 = __webpack_require__(21);
	
	var _searchById4 = _interopRequireDefault(_searchById3);
	
	var _mgetByIds3 = __webpack_require__(22);
	
	var _mgetByIds4 = _interopRequireDefault(_mgetByIds3);
	
	var _count3 = __webpack_require__(23);
	
	var _count4 = _interopRequireDefault(_count3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var EsUtil = function () {
	    function EsUtil(config, index, type) {
	        _classCallCheck(this, EsUtil);
	
	        this.client = new elasticsearch.Client(_.cloneDeep(config));
	        this.index = index;
	        this.type = type;
	    }
	
	    _createClass(EsUtil, [{
	        key: "dateHistogram",
	        value: function dateHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
	            var _dateHistogram = _dateHistogram4.default.bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date);
	            return _dateHistogram();
	        }
	    }, {
	        key: "hourHistogram",
	        value: function hourHistogram(fields, pageSize, sortByField, dateField, query, start_date, end_date) {
	            var _hourHistogram = _hourHistogram4.default.bind(this, fields, pageSize, sortByField, dateField, query, start_date, end_date);
	            return _hourHistogram();
	        }
	    }, {
	        key: "scroll",
	        value: function scroll(source, size, sum, sortByField, query) {
	            var _scroll = _scroll4.default.bind(this, source, size, sum, sortByField, query);
	            return _scroll();
	        }
	    }, {
	        key: "search",
	        value: function search(pageSize, sortByField, query, page_index, aggs) {
	            var _search = _search4.default.bind(this, pageSize, sortByField, query, page_index, aggs);
	            return _search();
	        }
	    }, {
	        key: "createIndex",
	        value: function createIndex(body) {
	            var _createIndex = _createIndex4.default.bind(this, body);
	            return _createIndex();
	        }
	    }, {
	        key: "getMapping",
	        value: function getMapping() {
	            var _getMapping = _getMapping4.default.bind(this);
	            return _getMapping();
	        }
	    }, {
	        key: "putMapping",
	        value: function putMapping(body) {
	            var _putMapping = _putMapping4.default.bind(this, body);
	            return _putMapping();
	        }
	    }, {
	        key: "getSetting",
	        value: function getSetting() {
	            var _getSetting = _getSetting4.default.bind(this);
	            return _getSetting();
	        }
	    }, {
	        key: "putSetting",
	        value: function putSetting(body) {
	            var _putSetting = _putSetting4.default.bind(this, body);
	            return _putSetting();
	        }
	    }, {
	        key: "update",
	        value: function update(body) {
	            var _updateDoc = _update3.default.bind(this, body);
	            return _updateDoc();
	        }
	    }, {
	        key: "bulkUpdate",
	        value: function bulkUpdate(docs) {
	            var _bulkUpdateDocs = _bulkUpdate3.default.bind(this, docs);
	            return _bulkUpdateDocs();
	        }
	    }, {
	        key: "bulkIndex",
	        value: function bulkIndex(docs) {
	            var _bulkIndex = _bulkIndex4.default.bind(this, docs);
	            return _bulkIndex();
	        }
	    }, {
	        key: "scrollAndBulkUpdate",
	        value: function scrollAndBulkUpdate(kv, size, query, sum) {
	            var _scrollAndBulkUpdate = _scrollAndBulkUpdate4.default.bind(this, kv, size, query, sum);
	            return _scrollAndBulkUpdate();
	        }
	    }, {
	        key: "scrollAndAppendFile",
	        value: function scrollAndAppendFile(size, query, field, sum, file) {
	            var _scrollAndAppendFile = _scrollAndAppendFile4.default.bind(this, size, query, field, sum, file);
	            return _scrollAndAppendFile();
	        }
	    }, {
	        key: "searchById",
	        value: function searchById(id) {
	            var _searchById = _searchById4.default.bind(this, id);
	            return _searchById();
	        }
	    }, {
	        key: "mgetByIds",
	        value: function mgetByIds(ids) {
	            var _mgetByIds = _mgetByIds4.default.bind(this, ids);
	            return _mgetByIds();
	        }
	    }, {
	        key: "count",
	        value: function count(query) {
	            var _count = _count4.default.bind(this, query);
	            return _count();
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (fields, pageSize, sortByField, dateField, query, start_date, end_date) {
	    if (!fields) {
	        fields = [];
	    }
	    var _query = {
	        "query": {
	            "match_all": {}
	        }
	    };
	    if (query) {
	        _query.query = query;
	    }
	    return this.client.search({
	        index: this.index,
	        type: this.type,
	        body: {
	            query: _query,
	            aggs: {
	                volumn: {
	                    date_histogram: {
	                        field: dateField,
	                        interval: "day",
	                        format: "yyyy-M-d",
	                        time_zone: "+08:00",
	                        min_doc_count: 0,
	                        extended_bounds: {
	                            min: start_date.getTime(),
	                            max: moment(end_date).subtract(1, "days").toDate().getTime()
	                        }
	                    },
	                    aggs: function (fields) {
	                        var obj = {};
	                        for (var i = 0; i < fields.length; i++) {
	                            var field = fields[i];
	                            obj[field + "_sum"] = {
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
	        sort: sortByField + ":desc"
	    });
	};
	
	var _moment = __webpack_require__(6);
	
	var moment = _interopRequireWildcard(_moment);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (fields, pageSize, sortByField, dateField, query, start_date, end_date) {
	    if (!fields) {
	        fields = [];
	    }
	    var _query = {
	        "query": {
	            "match_all": {}
	        }
	    };
	    if (query) {
	        _query.query = query;
	    }
	    return this.client.search({
	        index: this.index,
	        type: this.type,
	        body: {
	            query: _query,
	            aggs: {
	                volumn: {
	                    date_histogram: {
	                        field: dateField,
	                        interval: "hour",
	                        format: "yyyy-M-d H:mm",
	                        time_zone: "+08:00",
	                        min_doc_count: 0,
	                        extended_bounds: {
	                            min: start_date.getTime(),
	                            max: moment(end_date).subtract(1, "hours").toDate().getTime()
	                        }
	                    },
	                    aggs: function (fields) {
	                        var obj = {};
	                        for (var i = 0; i < fields.length; i++) {
	                            var field = fields[i];
	                            obj[field + "_sum"] = {
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
	        sort: (sortByField || "_score") + ":desc"
	    });
	};
	
	var _moment = __webpack_require__(6);
	
	var moment = _interopRequireWildcard(_moment);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (source, size, query, sum, sortByField) {
	
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
	        scroll: "60s",
	        size: size || 50,
	        body: _query
	    };
	
	    if (Array.isArray(source) && source.length === 0) {
	        source = null;
	    }
	    if (source || source === false) {
	        options._source = source;
	    }
	    if (sortByField) {
	        options.sort = sortByField;
	    } else {
	        options.search_type = "scan";
	    }
	
	    var allValues = [];
	    var that = this;
	    return new Promise(function (resolve, reject) {
	        that.client.search(options, function getMoreUntilDone(err, response) {
	            if (err) {
	                return reject(err);
	            }
	            response.hits.hits.forEach(function (hit) {
	                allValues.push(hit);
	            });
	
	            var compare = response.hits.total;
	            if (sum && compare > sum) {
	                compare = sum;
	            }
	            if (allValues.length < compare) {
	                that.client.scroll({
	                    scrollId: response._scroll_id,
	                    scroll: "60s"
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (pageSize, sortByField, query, page_index, aggs) {
	
	    var _query = {
	        "query": {
	            "match_all": {}
	        }
	    };
	    if (query) {
	        _query.query = query;
	    }
	
	    if (aggs) {
	        _query.aggs = aggs;
	    }
	
	    console.log(JSON.stringify(_query, null, 4));
	    console.log("-------------------------------");
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        body: _query,
	        size: pageSize || 0,
	        from: page_index ? page_index * pageSize : 0
	    };
	
	    if (sortByField) {
	        options.sort = sortByField + ":desc";
	    }
	
	    return this.client.search(options);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (body) {
	    var _this = this;
	
	    return this.client.indices.exists({
	        index: this.index,
	        local: true
	    }).then(function (resp) {
	        if (!resp) {
	            return _this.client.indices.create({
	                index: _this.index,
	                body: body
	            });
	        } else {
	            throw new Error("the index: " + _this.index + " has already exists!!!");
	        }
	    });
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function () {
		return this.client.indices.getMapping({
			index: this.index,
			type: this.type
		});
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (body) {
	
	    var options = {
	        index: this.index,
	        type: this.type,
	        body: body,
	        updateAllTypes: false
	    };
	
	    return this.client.indices.putMapping(options);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function () {
		return this.client.indices.getSettings({
			index: this.index
		});
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (body) {
	
		var options = {
			index: this.index,
			body: body
		};
	
		return this.client.indices.putSettings(options);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (body) {
	
		var options = {
			index: this.index,
			type: this.type,
			body: body,
			updateAllTypes: false
		};
	
		return this.client.indices.putMapping(options);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (docs) {
	    var _ = __webpack_require__(4);
	    var body = _.flatten(_.map(docs, function (item) {
	        var id = item.id;
	        var doc = item.doc;
	        return [{
	            update: {
	                _id: id
	            }
	        }, {
	            doc: doc,
	            "detect_noop": false
	        }];
	    }));
	    var options = {
	        index: this.index,
	        type: this.type,
	        body: body,
	        refresh: true
	    };
	
	    return this.client.bulk(options);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (docs) {
	    var _ = __webpack_require__(4);
	    var body = _.flatten(_.map(docs, function (item) {
	        var id = item.id;
	        var doc = item.doc;
	        return [{
	            index: id ? {
	                _id: id
	            } : {}
	        }, doc];
	    }));
	    var options = {
	        index: this.index,
	        type: this.type,
	        body: body,
	        refresh: true
	    };
	
	    return this.client.bulk(options);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (kv, size, query, sum) {
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
	        scroll: "60s",
	        size: size || 1000,
	        body: _query,
	        search_type: "scan"
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
	                                _context.prev = 0;
	
	                                if (!err) {
	                                    _context.next = 3;
	                                    break;
	                                }
	
	                                throw new Error(err);
	
	                            case 3:
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
	                                                    var source_value = _.cloneDeep(hit._source[k]);
	                                                    _value = v.value;
	                                                    if (source_value) {
	                                                        if (_value.constructor.name === "Object" && source_value.constructor.name === "Object") {
	                                                            _value = _.merge(_value, hit._source[k]);
	                                                        } else if (_value.constructor.name === "Array" && source_value.constructor.name === "Array") {
	                                                            _value = [].concat(_toConsumableArray(new Set(hit._source[k].concat(_value))));
	                                                        }
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
	
	                                _context.next = 8;
	                                return that.bulkUpdate(docs);
	
	                            case 8:
	                                bulkUpdateResult = _context.sent;
	
	                                if (bulkUpdateResult.errors) {
	                                    console.log("bulk update operation encounter some errors, please check the response: " + JSON.stringify(bulkUpdateResult, null, 4));
	                                }
	
	                            case 10:
	                                now = moment();
	                                diff = moment.utc(moment.duration(now.diff(start)).asMilliseconds()).format("HH:mm:ss.SSS");
	                                totalDiff = moment.utc(moment.duration(now.diff(startCopy)).asMilliseconds()).format("HH:mm:ss.SSS");
	                                raw_speed = more ? (now - start) / more : "--";
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
	                                time_remain = raw_speed !== "--" ? moment.utc(moment.duration(raw_speed * doc_remain).asMilliseconds()).format("HH:mm:ss.SSS") : "--";
	
	
	                                console.log("Finished: " + count + "\tRatio: " + (compare ? (count / compare).toFixed(2) * 100 : 100) + "%\tTimeCost: " + diff + "\tSpeed: " + speed + "doc/s\tTimeRemaining: " + time_remain + "\tTotalTimeCost: " + totalDiff);
	
	                                start = _.cloneDeep(now);
	                                docs = null;
	
	                                if (!(count < compare)) {
	                                    _context.next = 28;
	                                    break;
	                                }
	
	                                that.client.scroll({
	                                    scrollId: response._scroll_id,
	                                    scroll: "60s"
	                                }, getMoreUntilDone);
	                                _context.next = 29;
	                                break;
	
	                            case 28:
	                                return _context.abrupt("return", resolve("scroll and update finished"));
	
	                            case 29:
	                                _context.next = 34;
	                                break;
	
	                            case 31:
	                                _context.prev = 31;
	                                _context.t0 = _context["catch"](0);
	
	                                console.log(_context.t0);
	
	                            case 34:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this, [[0, 31]]);
	            }));
	
	            function getMoreUntilDone(_x, _x2) {
	                return _ref.apply(this, arguments);
	            }
	
	            return getMoreUntilDone;
	        }());
	    });
	};
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (size, query, field, sum, file) {
	    var _ = __webpack_require__(4);
	    var moment = __webpack_require__(6);
	    var appendFile = __webpack_require__(20).appendFile;
	    var checkExists = __webpack_require__(20).checkExists;
	
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
	        scroll: "60s",
	        size: size || 1000,
	        body: _query,
	        search_type: "scan"
	    };
	
	    if (field) {
	        if (field.constructor.name === "String") {
	            options._source = [field];
	        } else if (field.constructor.name === "Array") {
	            options._source = field;
	        } else {
	            throw new Error("Invalid field parameter provided! Only string or array acceptable!");
	        }
	    }
	
	    var count = 0;
	
	    var that = this;
	
	    var ensureFile = checkExists(file);
	
	    return new Promise(function (resolve, reject) {
	        var start = moment();
	        var startCopy = _.cloneDeep(start);
	
	        that.client.search(options, function getMoreUntilDone(err, response) {
	            if (err) {
	                return reject(err);
	            }
	
	            var more = response.hits.hits.length;
	            var data = _.reduce(response.hits.hits, function (sum, hit) {
	                if (options._source) {
	                    (function () {
	                        var fields = _.cloneDeep(options._source);
	                        var len = fields.length;
	                        _.forEach(fields, function (f, i) {
	                            sum += hit._source[f] || " ";
	                            if (i < len - 1) {
	                                sum += "\t";
	                            } else {
	                                sum += "\n";
	                            }
	                        });
	                    })();
	                } else {
	                    sum += JSON.stringify(hit._source) + "\n";
	                }
	                return sum;
	            }, "");
	
	            if (data) {
	                try {
	                    if (ensureFile) {
	                        appendFile(file, data);
	                    }
	                } catch (err) {
	                    return reject(err);
	                }
	            }
	
	            var now = moment();
	            var diff = moment.utc(moment.duration(now.diff(start)).asMilliseconds()).format("HH:mm:ss.SSS");
	            var totalDiff = moment.utc(moment.duration(now.diff(startCopy)).asMilliseconds()).format("HH:mm:ss.SSS");
	            var raw_speed = more ? (now - start) / more : "--";
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
	
	            var time_remain = raw_speed !== "--" ? moment.utc(moment.duration(raw_speed * doc_remain).asMilliseconds()).format("HH:mm:ss.SSS") : "--";
	
	            console.log("Finished: " + count + "\tRatio: " + (compare ? (count / compare).toFixed(2) * 100 : 100) + "%\tTimeCost: " + diff + "\tSpeed: " + speed + "doc/s\tTimeRemaining: " + time_remain + "\tTotalTimeCost: " + totalDiff);
	
	            start = _.cloneDeep(now);
	            data = null;
	
	            if (count < compare) {
	                that.client.scroll({
	                    scrollId: response._scroll_id,
	                    scroll: "60s"
	                }, getMoreUntilDone);
	            } else {
	                return resolve("append file finished");
	            }
	        });
	    });
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (id) {
	
		var options = {
			index: this.index,
			type: this.type,
			id: id,
			refresh: true
		};
	
		console.log(options);
	
		return this.client.get(options);
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (ids) {
	
		var options = {
			index: this.index,
			type: this.type,
			body: {
				ids: ids
			},
			refresh: true
		};
	
		return this.client.mget(options);
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (query) {
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
			body: _query
		};
		return this.client.count(options);
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map