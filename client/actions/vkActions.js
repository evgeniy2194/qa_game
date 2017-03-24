export const VA_API = 'VK_API';
export const LOGIN = 'LOGIN';

//Константы авторизации вконтакте
export const AUTH_START     = 'AUTH_START';
export const AUTH_SUCCESS   = 'AUTH_SUCCESS';
export const AUTH_FAILURE   = 'AUTH_FAILURE';

//Константы загрузки информации о пользователе
export const LOADING_USER   = 'LOADING_USER';
export const LOADED_USER    = 'LOADED_USER';
export const FAILURE_LOAD   = 'FAILURE_LOAD';

export function loginUser(){
    return {
        type: VA_API,
        callVkApi: {
            type: LOGIN,
            actions: [ AUTH_START, AUTH_SUCCESS, AUTH_FAILURE ]
        }
    }
}

export function loadUser(){
    return {
        type: VA_API,
        callVkApi: {
            url: 'users.get',
            actions: [ LOADING_USER, LOADED_USER, FAILURE_LOAD ]
        }
    }
}