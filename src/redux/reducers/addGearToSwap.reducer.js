const initialState = {
    gearToAdd: []
  };

const addGearToSwapReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch (type) {
      case 'ADD_GEAR_TO_SWAP':
        return {...state, gearToAdd: [...state.gearToAdd, payload]};
      case 'REMOVE_GEAR_FROM_SWAP':
          // payload === id
        return {
            ...state,
            gearToAdd: state.gearToAdd.filter((item) => item.id !== payload)
        }
      default:
        return state;
    }
};


  export default addGearToSwapReducer;
