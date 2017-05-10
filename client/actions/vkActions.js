export const VK_API = 'VK_API';
export const LOGIN = 'LOGIN';

//Константы авторизации вконтакте
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

//Константы загрузки информации о пользователе
export const LOADING_USER = 'LOADING_USER';
export const LOADED_USER = 'LOADED_USER';
export const FAILURE_LOAD = 'FAILURE_LOAD';

//Константы загрузки друзей
export const LOADING_FRIENDS = 'LOADING_FRIENDS';
export const LOADED_FRIENDS = 'LOADED_FRIENDS';

export function loginUser() {
    return {
        type: VK_API,
        callVkApi: {
            type: LOGIN,
            actions: [AUTH_START, AUTH_SUCCESS, AUTH_FAILURE]
        }
    }
}

export function loadUser() {
    return {
        type: VK_API,
        callVkApi: {
            url: 'users.get',
            actions: [LOADING_USER, LOADED_USER, FAILURE_LOAD]
        }
    }
}

export function loadAppFriendsIds(next) {
    return {
        type: VK_API,
        callVkApi: {
            url: 'friends.getAppUsers',
            next: next,
            actions: [LOADING_FRIENDS, LOADED_FRIENDS, FAILURE_LOAD]
        },
    }
}

export function loadAppFriendsInfo(friendsIds) {
    return {
        type: VK_API,
        callVkApi: {
            url: 'users.get',
            params: {
                user_ids: friendsIds,
                fields: 'photo_50',
            },
            actions: [LOADING_FRIENDS, LOADED_FRIENDS, FAILURE_LOAD]
        },
    }
}