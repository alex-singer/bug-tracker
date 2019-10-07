"use strict";

var _IssueList = _interopRequireDefault(require("./IssueList.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* globals React ReactDOM */

/* eslint "react/no-multi-comp": "off" */
var element = React.createElement(_IssueList["default"], null);
ReactDOM.render(element, document.getElementById('contents'));