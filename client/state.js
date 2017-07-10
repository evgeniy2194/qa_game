import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducers from './reducers';
import promisesMiddleware from './middlewares/promisesMiddleware';

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(promisesMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/index');
        store.replaceReducer(nextRootReducer);
    })
}

export default store;