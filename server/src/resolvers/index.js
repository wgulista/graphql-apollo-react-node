const find = require('ramda/src/find');
const propEq = require('ramda/src/propEq');

const users = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

module.exports = { 
    Query: {
        users: () => users,
        user: (_, { id }) => find(propEq('id', id))(users)
    }
};