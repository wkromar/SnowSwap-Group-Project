
// Reducer to send the object to filter what is displayed on the DOM

const filterReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_FILTER_OBJECT':
        return action.payload;
      default:
        return state;
    }
};


  export default filterReducer;