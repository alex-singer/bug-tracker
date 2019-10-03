const express = require("express");
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const fs = require("fs");

let aboutMessage = "Issue Tracker API v1.0";

const issuesDB = [
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

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "A Date() type in GraphQL as a scalar",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    issueAdd,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

function issueAdd(_, { issue }) {
  issueValidate(issue);
  issue.created = new Date();
  issue.id = issuesDB.length + 1;
  issuesDB.push(issue);
  return issue;
}

function issueValidate(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push("Field 'title' must be at least 3 characters long.")
  }
  if (issue.status == "Assigned" && !issue.owner) {
    errors.push("Field 'owner' is required when status is 'Assigned'");
  }
  if(errors.length > 0) {
    throw new UserInputError("Invalid input(s)", { errors });
  }
}

function issueList() {
  return issuesDB;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use('/', express.static('public'));

server.applyMiddleware({ app, path: "/graphql" });

app.listen(3000, () => {
  console.log("App started on port 3000")
});

