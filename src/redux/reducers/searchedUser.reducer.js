const searchedUser = (state = [], action) => {
    switch (action.type) {
        case 'USER_SEARCH_RESULT':
            return action.payload.data;
        default:
            return state;
    }
};

export default searchedUser;