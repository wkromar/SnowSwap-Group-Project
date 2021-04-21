const modalReducer = (
  state = {
    detailView: false,
    enlargeView: false,
    addGearView: false,
    publicJoinView: false,
  },
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
    case "SWAP_CODE_OPEN":
      return { ...state, swapCodeView: true };
    case "SWAP_CODE_CLOSE":
      return { ...state, swapCodeView: false };
    case "OPEN_ADD_VIEW":
      return { ...state, addGearView: true };
    case "CLOSE_ADD_VIEW":
      return { ...state, addGearView: false };
    case "OPEN_PUBLIC_JOIN":
      return { ...state, publicJoinView: true };
    case "CLOSE_PUBLIC_JOIN":
      return { ...state, publicJoinView: false };
    case "PUBLIC_JOIN_MODAL":
      return {
        ...state,
        StateOfJoin: {
          item: false,
          contact: false,
        },
      };

    default:
      return state;
  }
};

export default modalReducer;
