const gearDetails = (state = {}, action) => {
    switch (action.type) {
      case 'SELECTED_PIECE':
        return action.payload;
      default:
        return state;
    }
  };


  export default gearDetails;