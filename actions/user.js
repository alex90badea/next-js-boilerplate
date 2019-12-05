import Http from '../libs/http';

export const SET_USER = 'set-user';

export const setUser = (payload, jwt) => {
    if (jwt) { Http._setJwtCookie(jwt); }
    return dispatch => {
        dispatch({
            type: SET_USER,
            payload
        });
    }

};
