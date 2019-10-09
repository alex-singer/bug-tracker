import React from "react";

import IssueFilter from './IssueFilter.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueTable from './IssueTable.jsx';
import graphQLFetch from './graphQLFetch';
import UrlSearchParams from 'url-search-params';

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
    };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  async loadData() {
    const { location: { search } } = this.props;
    const params =  new URLSearchParams(search);
    const vars = {};
    if (params.get('status')) vars.status = params.get('status');
    console.log(vars.status);

    const query = `query issueList($status: StatusType) {
      issueList (status: $status) {
        id title status owner created effort due
      }
    }`;

    const data = await graphQLFetch(query, vars);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  render() {
    const { issues } = this.state;
    return (
      <>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </>
    );
  }
}
