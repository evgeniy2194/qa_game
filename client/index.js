import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app';
import {Provider} from 'react-redux';
import store from './utils/configureStore';
import {getAppParams} from './utils/queryParser';
import {setAppParams} from './actions/appActions';
import {loadAppFriendsIds, loadAppFriendsInfo} from "./actions/vkActions";

store.subscribe(() => console.log('[UPDATE_STORE]', store.getState()));

store.dispatch(setAppParams(getAppParams()));
store.dispatch(loadAppFriendsIds(loadAppFriendsInfo));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));