import VK from '../libs/vk';

const middleware = (store) => next => action => {

    if (action.callVkApi === undefined) {
        return next(action);
    }

    const [startAction, successAction] = action.callVkApi.actions;

    store.dispatch({type: startAction});

    VK.api(action.callVkApi.url, action.callVkApi.params || {}, (data) => {
        if (typeof action.callVkApi.next === "function") {
            store.dispatch(action.callVkApi.next(data.response));
        } else {
            store.dispatch({
                type: successAction,
                data: data.response
            });
        }
    });
};

export default middleware;