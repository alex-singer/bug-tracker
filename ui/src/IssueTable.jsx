import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

export default function IssueTable({ issues, closeIssue }) {
  const issueRows = issues.map((issue, index) => 
    <IssueRow key={issue.id} 
      issue={issue} 
      index={index} 
      closeIssue={closeIssue}
    />);

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

const IssueRow = withRouter(({ 
    issue, location: { search }, index, closeIssue }) => {
  const selectLocation = { pathname: `/issues/${issue.id}`, search };
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.effort}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.due ? issue.due.toDateString() : '' }</td>
      <td>{issue.title}</td>
      <td>
        <Link to={`/edit/${issue.id}`}>Edit</Link>
        {' | '}
        <NavLink to={selectLocation}>Select</NavLink>
        {' | '}
        <button type="button" onClick={() => { closeIssue(index); }}>
          Close
        </button>
      </td>
    </tr>
  );
});
