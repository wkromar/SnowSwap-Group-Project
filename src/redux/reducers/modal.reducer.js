const modalReducer = (
  state = { detailView: false, enlargeView: false, addGearView: false },
  action
) => {
  switch (action.type) {
    case "OPEN_DETAIL_VIEW":
      return { ...state, detailView: true };
    case "CLOSE_DETAIL_VIEW":
      return { ...state, detailView: false };
    case "ENLARGE_IMAGE_OPEN":
      return { ...state, enlargeView: true };
    case "ENLARGE_IMAGE_CLOSE":
      return { ...state, enlargeView: false };
    case "OPEN_ADD_VIEW":
      return { ...state, addGearView: true };
    case "CLOSE_ADD_VIEW":
      return { ...state, addGearView: false };
    default:
      return state;
  }
};

export default modalReducer;
