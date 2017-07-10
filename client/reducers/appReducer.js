import {SET_APP_PARAMS} from '../actions/appActions';

export default function (state = {}, action) {
    switch (action.type) {
        case SET_APP_PARAMS:
            return {...state, ...action.data};
        default:
            return state;
    }
}