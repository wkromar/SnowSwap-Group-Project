const selectedSwapReducer = (state = {}, action) => {
    switch (action.type) {

        case 'SET_SELECTED_SWAP':
            return action.payload;

        default:
            return state;
    }
};
export default selectedSwapReducer;