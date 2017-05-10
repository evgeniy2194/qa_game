import store from './configureStore';

export function onConnect() {

}

export function onDisconnect() {
}

export function onMessage(data) {
    store.dispatch(data);
}