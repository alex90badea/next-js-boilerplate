import {applyMiddleware, createStore } from 'redux';
import reducers from './reducers/reducers';
import thunk from 'redux-thunk';


export const store = (initialState = {}) => {
    return createStore(reducers, initialState, applyMiddleware(thunk));
};
