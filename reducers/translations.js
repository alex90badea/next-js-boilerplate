import {SET_TRANSLATION} from '../actions/main';
import en from '../translations/en';

export default (state = {...en}, action) => {
    switch (action.type) {
        case SET_TRANSLATION:
            state = {...action.payload};
            break;
    }

    return state;
};
