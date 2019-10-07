"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = IssueTable;

function IssueTable(_ref) {
  var issues = _ref.issues;
  var issueRows = issues.map(function (issue) {
    return React.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    });
  });
  return React.createElement("table", {
    className: "bordered-table"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "ID"), React.createElement("th", null, "Status"), React.createElement("th", null, "Owner"), React.createElement("th", null, "Effort"), React.createElement("th", null, "Created"), React.createElement("th", null, "Due"), React.createElement("th", null, "Title"))), React.createElement("tbody", null, issueRows));
}

function IssueRow(_ref2) {
  var issue = _ref2.issue;
  return React.createElement("tr", null, React.createElement("td", null, issue.id), React.createElement("td", null, issue.status), React.createElement("td", null, issue.owner), React.createElement("td", null, issue.effort), React.createElement("td", null, issue.created.toDateString()), React.createElement("td", null, issue.due ? issue.due.toDateString() : ''), React.createElement("td", null, issue.title));
}