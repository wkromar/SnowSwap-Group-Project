const swapItems = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SWAP_ITEMS':
        return action.payload;
      default:
        return state;
    }
  };


  export default swapItems;