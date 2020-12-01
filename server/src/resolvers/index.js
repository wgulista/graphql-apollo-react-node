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
        user: (parent, { id }) => find(propEq('id', id))(users)
    },
    Mutation: {
        createUser: (parent, { firstName, lastName }) => {
            const id = users.length + 1;
            users.push({id, firstName, lastName});
            return users;
        },
        deleteUser: (parent, { id }) => {
            const userIdCheck = users.findIndex(user => user.id === id);
            if (userIdCheck !== -1) {
                users.splice(userIdCheck, 1);
                return users.filter(user => user.id !== id);
            } else {
                throw new Error('Unknown ID');
            }
        }
    }
};