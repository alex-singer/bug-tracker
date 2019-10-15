/* global db print */
/* eslint no-restricted-globals: "off" */

db.issues.remove({});
db.deleted_issues.remove({});

const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Raven',
    effort: 5,
    created: new Date('2019-10-01'),
    due: undefined,
    title: 'What the heck is going on?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut neque lorem. Aenean ut mollis leo. Aliquam posuere velit a magna feugiat, ut ullamcorper lacus porta. Vestibulum venenatis augue orci, eu dignissim neque lobortis a. Donec vitae lorem condimentum, ultricies neque a, sollicitudin mi. Vivamus a posuere ante. Pellentesque eu luctus nibh, id commodo urna. Nulla consectetur luctus nibh, id dictum orci sodales non. Sed congue leo id nisi elementum dignissim. Suspendisse suscipit sapien dui, pharetra laoreet metus accumsan in. Donec pharetra turpis vitae tellus dapibus, aliquet luctus orci finibus. ',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Alex',
    effort: 5,
    created: new Date('2019-10-01'),
    due: new Date('2019-10-10'),
    title: 'What the heckin heck is going on?',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut neque lorem. Aenean ut mollis leo. Aliquam posuere velit a magna feugiat, ut ullamcorper lacus porta. Vestibulum venenatis augue orci, eu dignissim neque lobortis a. Donec vitae lorem condimentum, ultricies neque a, sollicitudin mi. Vivamus a posuere ante. Pellentesque eu luctus nibh, id commodo urna. Nulla consectetur luctus nibh, id dictum orci sodales non. Sed congue leo id nisi elementum dignissim. Suspendisse suscipit sapien dui, pharetra laoreet metus accumsan in. Donec pharetra turpis vitae tellus dapibus, aliquet luctus orci finibus. ',
  },
];

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print(`Inserted ${count} issues`);

db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });

db.deleted_issues.createIndex({ id: 1 }, { unique: true });
