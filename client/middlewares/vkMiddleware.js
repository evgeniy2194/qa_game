import VK from '../libs/vk';

const middleware = (store) => next => action => {

    if(action.callVkApi === undefined){
        return next(action);
    }

    const [ startAction, successAction ] = action.callVkApi.actions;

    store.dispatch({ type: startAction });

    VK.api(action.callVkApi.url, (data) => {
            store.dispatch({
                type: successAction,
                data: data.response[0]
            });
        }
    );
};

export default middleware;