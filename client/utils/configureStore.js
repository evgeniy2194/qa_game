import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducers from '../reducers/index';
import promisesMiddleware from '../middlewares/promisesMiddleware';
import sockerMiddlevare from '../middlewares/socketMiddleware';
import vkMiddlevare from '../middlewares/vkMiddleware';
import initialState from '../config/initialState';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(promisesMiddleware, vkMiddlevare, sockerMiddlevare)(createStore);
const store = createStoreWithMiddleware(reducer, initialState);

if (module.hot) {
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
    });
}

export default store;