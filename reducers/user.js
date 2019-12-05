import * as userActions from "../actions/user";

const user = (state = {
    user: false,
}, action) => {

    switch (action.type) {
        
        case userActions.SET_USER:
            return {...state, user: action.payload};
        default:
            return state;
    }
};

export default user;
