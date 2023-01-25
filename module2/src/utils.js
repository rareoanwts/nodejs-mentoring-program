const getAutoSuggestUsers = (loginSubstring, limit) => {
    return global.users.filter(({ login, isDeleted }) =>
        !isDeleted && login.includes(loginSubstring)).slice(0, limit);
};

const getUserById = userId => global.users.find(({ id }) => id === userId);

module.exports = {
    getAutoSuggestUsers,
    getUserById
};
