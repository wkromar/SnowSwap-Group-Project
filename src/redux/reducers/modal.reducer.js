
const modalReducer = (state = {detailView: false}, action) => {
    switch (action.type) {
      case 'OPEN_DETAIL_VIEW':
        return {...state, detailView: true};
      case 'CLOSE_DETAIL_VIEW':
        return {...state, detailView: false};
      default:
        return state;
    }
  };

  export default modalReducer;