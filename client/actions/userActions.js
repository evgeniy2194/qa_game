export const LOAD_USER_INFO = "LOAD_USER_INFO";

export function loadUserInfo(){
    return {
        type: LOAD_USER_INFO,
        socket: {
            message: LOAD_USER_INFO
        }
    }
}