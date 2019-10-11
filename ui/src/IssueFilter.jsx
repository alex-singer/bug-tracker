import React from "react";
import { withRouter } from "react-router-dom";
import URLSearchParams from 'url-search-params';
// eslint-disable-next-line react/prefer-stateless-function

class IssueFilter extends React.Component {
  constructor({ location: { search }}) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      owner: params.get('owner') || '',
      status: params.get('status') || '',
      changed: false,
    }
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search:  prevSearch }} = prevProps;
    const { location: { search }} = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeOwner(e) {
    this.setState({ owner: e.target.value, changed: true });
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  showOriginalFilter() {
    const { location: { search }} = this.props;
    const params = new URLSearchParams(search);
    this.setState ({
      owner: params.get('owner') || '',
      status: params.get('status') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { owner } = this.state;
    const { status } = this.state;
    const { history } = this.props;

    let searchString = '?';
    owner ? searchString += `owner=${owner}&`: '';
    status ? searchString += `status=${status}&`: '';

    history.push({
      pathname: '/issues',
      search: searchString,
    });
  }

  render() {
    const { owner, status, changed } = this.state;
    return (
      <div>
        Owner:
        {' '}
        <input type="text" value={owner} onChange={this.onChangeOwner}></input>
        Status:
        {' '}
        <select value={status} onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Closed">Closed</option>
        </select>
        {' '}
        <button type="button" onClick={this.applyFilter}>Apply</button>
        {' '}
        <button
          type="button"
          onClick={this.showOriginalFilter}
          disabled={!changed}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default withRouter(IssueFilter);
