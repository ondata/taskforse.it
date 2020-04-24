webpackHotUpdate("static/development/pages/index.js",{

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: CONTAINER_MAXWIDTH, PRIMARY_COLOR, getMeta, getTaskForses, getTaskForse, getMembers, getMember, getMembersByTaskForse, getResources, getResource, getResourcesByTaskForse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTAINER_MAXWIDTH", function() { return CONTAINER_MAXWIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRIMARY_COLOR", function() { return PRIMARY_COLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMeta", function() { return getMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTaskForses", function() { return getTaskForses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTaskForse", function() { return getTaskForse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMembers", function() { return getMembers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMember", function() { return getMember; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMembersByTaskForse", function() { return getMembersByTaskForse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResources", function() { return getResources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResourcesByTaskForse", function() { return getResourcesByTaskForse; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



var GSHEET_PREFIX = "https://spreadsheets.google.com/feeds/cells";
var GSHEET_SUFFIX = "public/full?alt=json";
var GSHEET_ID = "15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8";
var GSHEET_SHEET_META = 1;
var GSHEET_SHEET_TASKFORSES = 2;
var GSHEET_SHEET_MEMBERS = 3;
var GSHEET_SHEET_RESOURCES = 4;
var CONTAINER_MAXWIDTH = "xs";
var PRIMARY_COLOR = "#fd1d59";
function getMeta() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getMeta$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = normalizeGSheetJSON;
          _context.next = 3;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(getGSheetUrl(GSHEET_SHEET_META)));

        case 3:
          _context.t1 = _context.sent;
          return _context.abrupt("return", (0, _context.t0)(_context.t1));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
}
function getTaskForses() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getTaskForses$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = normalizeGSheetJSON;
          _context2.next = 3;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(getGSheetUrl(GSHEET_SHEET_TASKFORSES)));

        case 3:
          _context2.t1 = _context2.sent;
          return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, null, Promise);
}
function getTaskForse(id) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getTaskForse$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!id) {
            _context3.next = 12;
            break;
          }

          _context3.t2 = lodash__WEBPACK_IMPORTED_MODULE_2__["find"];
          _context3.next = 4;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(getTaskForses());

        case 4:
          _context3.t3 = _context3.sent;

          _context3.t4 = function (e) {
            return e["Id"] === id;
          };

          _context3.t1 = (0, _context3.t2)(_context3.t3, _context3.t4);

          if (_context3.t1) {
            _context3.next = 9;
            break;
          }

          _context3.t1 = {};

        case 9:
          _context3.t0 = _context3.t1;
          _context3.next = 13;
          break;

        case 12:
          _context3.t0 = {};

        case 13:
          return _context3.abrupt("return", _context3.t0);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, null, Promise);
}
function getMembers() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getMembers$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.t0 = normalizeGSheetJSON;
          _context4.next = 3;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(getGSheetUrl(GSHEET_SHEET_MEMBERS)));

        case 3:
          _context4.t1 = _context4.sent;
          return _context4.abrupt("return", (0, _context4.t0)(_context4.t1));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, null, Promise);
}
function getMember(id) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getMember$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!id) {
            _context5.next = 12;
            break;
          }

          _context5.t2 = lodash__WEBPACK_IMPORTED_MODULE_2__["find"];
          _context5.next = 4;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(getMembers());

        case 4:
          _context5.t3 = _context5.sent;

          _context5.t4 = function (e) {
            return e["Id"] === id;
          };

          _context5.t1 = (0, _context5.t2)(_context5.t3, _context5.t4);

          if (_context5.t1) {
            _context5.next = 9;
            break;
          }

          _context5.t1 = {};

        case 9:
          _context5.t0 = _context5.t1;
          _context5.next = 13;
          break;

        case 12:
          _context5.t0 = {};

        case 13:
          return _context5.abrupt("return", _context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, null, Promise);
}
function getMembersByTaskForse(id) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getMembersByTaskForse$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!id) {
            _context6.next = 9;
            break;
          }

          _context6.t1 = lodash__WEBPACK_IMPORTED_MODULE_2__["filter"];
          _context6.next = 4;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(getMembers());

        case 4:
          _context6.t2 = _context6.sent;

          _context6.t3 = function (e) {
            return e["Task forse"] === id;
          };

          _context6.t0 = (0, _context6.t1)(_context6.t2, _context6.t3);
          _context6.next = 10;
          break;

        case 9:
          _context6.t0 = [];

        case 10:
          return _context6.abrupt("return", _context6.t0);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, null, Promise);
}
function getResources() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getResources$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.t0 = normalizeGSheetJSON;
          _context7.next = 3;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(getGSheetUrl(GSHEET_SHEET_RESOURCES)));

        case 3:
          _context7.t1 = _context7.sent;
          return _context7.abrupt("return", (0, _context7.t0)(_context7.t1));

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, null, Promise);
}
function getResource(id) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getResource$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!id) {
            _context8.next = 12;
            break;
          }

          _context8.t2 = lodash__WEBPACK_IMPORTED_MODULE_2__["find"];
          _context8.next = 4;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(getResources());

        case 4:
          _context8.t3 = _context8.sent;

          _context8.t4 = function (e) {
            return e["Id"] === id;
          };

          _context8.t1 = (0, _context8.t2)(_context8.t3, _context8.t4);

          if (_context8.t1) {
            _context8.next = 9;
            break;
          }

          _context8.t1 = {};

        case 9:
          _context8.t0 = _context8.t1;
          _context8.next = 13;
          break;

        case 12:
          _context8.t0 = {};

        case 13:
          return _context8.abrupt("return", _context8.t0);

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, null, Promise);
}
function getResourcesByTaskForse(id) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function getResourcesByTaskForse$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!id) {
            _context9.next = 9;
            break;
          }

          _context9.t1 = lodash__WEBPACK_IMPORTED_MODULE_2__["filter"];
          _context9.next = 4;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(getResources());

        case 4:
          _context9.t2 = _context9.sent;

          _context9.t3 = function (e) {
            return e["Task forse"] === id;
          };

          _context9.t0 = (0, _context9.t1)(_context9.t2, _context9.t3);
          _context9.next = 10;
          break;

        case 9:
          _context9.t0 = [];

        case 10:
          return _context9.abrupt("return", _context9.t0);

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, null, Promise);
}

var getGSheetUrl = function getGSheetUrl(sheet) {
  return "".concat(GSHEET_PREFIX, "/").concat(GSHEET_ID, "/").concat(sheet, "/").concat(GSHEET_SUFFIX);
};

function normalizeGSheetJSON(response) {
  var dataKeys = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["map"])(Object(lodash__WEBPACK_IMPORTED_MODULE_2__["filter"])(response.data.feed.entry, function (e) {
    return +e["gs$cell"].row === 1;
  }), function (e) {
    return +e["gs$cell"]["$t"] || e["gs$cell"]["$t"] || null;
  });
  var dataValues = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["map"])(Object(lodash__WEBPACK_IMPORTED_MODULE_2__["values"])(Object(lodash__WEBPACK_IMPORTED_MODULE_2__["groupBy"])(Object(lodash__WEBPACK_IMPORTED_MODULE_2__["filter"])(response.data.feed.entry, function (e) {
    return +e["gs$cell"].row > 1;
  }), function (e) {
    return e["gs$cell"].row;
  })), function (row) {
    return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["map"])(Object(lodash__WEBPACK_IMPORTED_MODULE_2__["range"])(dataKeys.length), function (col) {
      var e = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["find"])(row, function (c) {
        return +c["gs$cell"].col === col + 1;
      });
      return e ? +e["gs$cell"]["$t"] || e["gs$cell"]["$t"] : null;
    });
  });
  return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["map"])(dataValues, function (v) {
    return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["zipObject"])(dataKeys, v);
  });
}

/***/ })

})
//# sourceMappingURL=index.js.63e5c0427701432a0f2c.hot-update.js.map