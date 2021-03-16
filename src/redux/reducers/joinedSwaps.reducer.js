const joinedSwaps = (state = [], action) => {

    switch (action.type) {
        case 'SET_JOINED_SWAPS':
            return action.payload;

        default:
            return state;
    }
};

export default joinedSwaps;