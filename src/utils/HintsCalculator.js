/**
 * Created by vision on 7/26/17.
 */
import {HintsStore} from "./store";

export function CalculateHints(user) {

    let hintsCost = {};

    Object.keys(HintsStore.getAll()).map(hintName => {
        hintsCost[hintName] = HintsStore.getCostByNameAndCount(hintName, user.hints.hintsUsedCounter[hintName] ? user.hints.hintsUsedCounter[hintName] : 0);
    });

    return hintsCost;
}