const ownedSwaps = (state = [], action) => {
    switch (action.type) {
        case 'SET_OWNED_SWAPS':
            return action.payload;
        default:
            return state;
    }
};

export default ownedSwaps;