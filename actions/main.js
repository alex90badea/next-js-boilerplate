export const OPEN_MODAL_LOGIN = 'open-login-modal';
export const SET_TRANSLATION = 'set-translation';

export const setModalLogin = (opened) => {
    return dispatch => {
        dispatch({
            type: OPEN_MODAL_LOGIN,
            payload: opened
        });
    }

};

export const setTranslation = (payload) => {
    return dispatch => {
        dispatch({
            type: SET_TRANSLATION,
            payload
        });
    }
};