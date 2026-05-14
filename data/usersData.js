const initialUsers = [
    {id: 1, name: 'Aline Dias', completed: false, userId: 1},
    {id: 2, name: 'Roberto Carlos', completed: false, userId: 2}
];

const users = [...initialUsers]

function resetUsers() {
    users.length = 0;
    users.push(...initialUsers);
}

module.exports = {
    users,
    resetUsers
}