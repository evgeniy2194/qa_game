import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app';
import {Provider} from 'react-redux';
import store from './store/configureStore';
import queryStore from './store/queryStore';
import {listenSocket} from './socket/socket';
import {setAppParams} from './actions/appActions';
import {loadAppFriendsIds, loadAppFriendsInfo} from "./actions/vkActions";

store.subscribe(() => console.log('[UPDATE_STORE]', store.getState()));
store.dispatch(setAppParams(queryStore));
store.dispatch(loadAppFriendsIds(loadAppFriendsInfo));

listenSocket(store);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));