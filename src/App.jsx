class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
    };
    this.createIssue = this.createIssue.bind(this);
  }

  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({ issues: newIssueList });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ issues: initialIssues });
    }, 500);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues}/>
        <hr />
        <IssueAdd createIssue={this.createIssue}/>
      </React.Fragment>
    );
  }
}

class IssueFilter extends React.Component {
  render() {
    return (
      <div>Placeholder</div>
    );
  }
}

const initialIssues = [
  {
    id: 1,
    status: "New",
    owner: "Raven",
    effort: 5,
    created: new Date('2019-10-01'),
    due: undefined,
    title: "What the heck is going on?",
  },
  {
    id: 2,
    status: "New",
    owner: "Alex",
    effort: 5,
    created: new Date('2019-10-01'),
    due: new Date('2019-10-10'),
    title: "What the heckin heck is going on?",
  },
];

const IssueTable = (props) => {
  const issueRows = props.issues.map( issue => 
      <IssueRow key={issue.id} issue={issue} />
  );

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
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}

const IssueRow = (props) => {
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.effort}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.due ? issue.due.toDateString() : ""}</td>
      <td>{issue.title}</td>
    </tr>
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      status: "New",
    }
    this.props.createIssue(issue);
    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} name="issueAdd">
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <button>Add</button>
      </form>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
