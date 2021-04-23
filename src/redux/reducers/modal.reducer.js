const modalReducer = (
  state = {
    detailView: false,
    enlargeView: false,
    addGearView: false,
    ItemPublicJoinView: false,
    ContactPublicJoinView: false,
    AbleToContact: false,
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
    case "OPEN_ITEM_JOIN":
      return { ...state, ItemPublicJoinView: true };
    case "CLOSE_ITEM_JOIN":
      return { ...state, ItemPublicJoinView: false };
    case "OPEN_CONTACT_JOIN":
      return { ...state, ContactPublicJoinView: true };
    case "CLOSE_CONTACT_JOIN":
      return { ...state, ContactPublicJoinView: false };
    case "ABLE_TO_CONTACT":
      return { ...state, AbleToContact: true };

    default:
      return state;
  }
};

export default modalReducer;
