export const LOAD_USER_INFO = "LOAD_USER_INFO";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

export function loadUserInfo() {
    return {
        type: LOAD_USER_INFO,
        socket: {
            message: LOAD_USER_INFO
        }
    }
}

export function onCloseDialogClick(dialog) {
    return {
        type: 'CLOSE_DIALOG',
        data: {dialog}
    }
}