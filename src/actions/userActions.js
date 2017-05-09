export function sendUserInfo(user){
    return {
        type: 'USER_INFO',
        data: user
    }
}