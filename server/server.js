const express = require("express");
const { ApolloServer } = require("apollo-server-express");
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

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
  },
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

function issueList() {
  return issuesDB;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"),
  resolvers,
});

const app = express();

app.use('/', express.static('public'));

server.applyMiddleware({ app, path: "/graphql" });

app.listen(3000, () => {
  console.log("App started on port 3000")
});

