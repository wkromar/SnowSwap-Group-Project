const editItem = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_GEAR":
      return action.payload;
    default:
      return state;
  }
};

export default editItem;
