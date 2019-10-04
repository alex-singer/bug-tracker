db.issues.remove({});

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

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print(`Inserted ${count} issues`);

db.counters.remove({ _id: "issues" });
db.counters.insert({ _id: "issues", current: count });

db.issues.createIndex({ id: 1}, { unique: true });
db.issues.createIndex({ status: 1});
db.issues.createIndex({ owner: 1});
db.issues.createIndex({ created: 1});

