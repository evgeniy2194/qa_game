const middleware = store => next => action => {

    if(action.callApi === undefined){
        return next(action);
    }

    const [ startAction, successAction, failureAction ] = action.callApi.actions;

    store.dispatch({ type: startAction });

    action.promise
        .then((data) => {
            store.dispatch({
                type: successAction,
                data
            });
        })
        .then((error) => {
            store.dispatch({
                type: failureAction,
                error
            })
        });
};

export default middleware;