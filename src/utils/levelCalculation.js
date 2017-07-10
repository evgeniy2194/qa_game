export function getExpToLevel(lvl) {
    return 100 * Math.pow(lvl - 1, 2);
}

export function getLevelByExp(exp) {
    return Math.ceil(Math.sqrt(exp / 100));
}