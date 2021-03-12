const allSwaps = (state = [], action) => {

    switch (action.type) {
        case 'SET_ALL_SWAPS':
            return action.payload;

        default:
            return state;
    }
};

export default allSwaps;