export const SET_APP_PARAMS = 'SET_APP_PARAMS';

export function setAppParams(data){
    return {
        type: SET_APP_PARAMS,
        data: data
    }
};