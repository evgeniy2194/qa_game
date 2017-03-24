export default function(state = {}, action){
    switch(action.type){
        case 'LOADED_USER_FROM_VK':
        case 'USER_INFO':
            return { ...state, ...action.data };
        default:
            return state;
    }
}