import * as mainActions from "../actions/main";

const base = (state = {
    modalLogin: false,
}, action) => {

    switch (action.type) {
        
        case mainActions.OPEN_MODAL_LOGIN:
            return {...state, modalLogin: action.payload};
        default:
            return state;
    }
};

export default base;