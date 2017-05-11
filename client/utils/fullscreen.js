function isFulscreen() {
    return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
}

function requestFullscreen() {
    const elem = document.getElementById("app");

    if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else {
        elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

function exitFullscreen() {
    if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else {
        document.webkitCancelFullScreen();
    }
}

function toggleFullscreen() {
    if (isFulscreen()) {
        exitFullscreen();
    } else {
        requestFullscreen();
    }
}

export {isFulscreen, requestFullscreen, exitFullscreen, toggleFullscreen}