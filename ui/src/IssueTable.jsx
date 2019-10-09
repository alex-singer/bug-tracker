import React from "react";

export default function IssueTable({ issues }) {
  const issueRows = issues.map((issue) => <IssueRow key={issue.id} issue={issue} />);

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Effort</th>
          <th>Created</th>
          <th>Due</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}

function IssueRow({ issue }) {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.effort}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.due ? issue.due.toDateString() : '' }</td>
      <td>{issue.title}</td>
      <td><a href={`/#/edit/${issue.id}`}>Edit</a></td>
    </tr>
  );
}
