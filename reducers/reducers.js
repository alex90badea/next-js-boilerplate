import {combineReducers} from 'redux';

import base from './base';
import translations from './translations';
import user from './user';

export default combineReducers({
    base,
    translations,
    user,
});
