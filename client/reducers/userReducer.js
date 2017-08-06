export default function (state = {}, action) {
    switch (action.type) {
        case 'LOADED_USER_FROM_VK':
        case 'USER_INFO':
            return {...state, ...action.data};
        case 'LOADED_FRIENDS':
            return {...state, ...{friends: action.data || []}};
        case 'QUESTS_INFO':
            return {...state, ...{quests: action.data || []}};
        case 'LEVEL_UP':
            state.dialogs.push({
                type: 'LEVEL_UP',
                data: {level: action.data.level}
            });
            return {...state};
        case 'CLOSE_DIALOG':
            const index = state.dialogs.indexOf(action.data.dialog);
            if (index !== -1) {
                state.dialogs.splice(index, 1);
            }
            return {...state};
        default:
            return state;
    }
}