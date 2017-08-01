/**
 * Created by vision on 8/1/17.
 */
import GemsAndCoinsUsing from '../database/models/';
import {User, Quest, UserQuest} from '../database/models';
import moment from 'moment';

export function decreaseGems(user, amount) {

}

export function increaseGems(user, amount) {

}

export function decreaseCoins(user, amount) {

}

export function increaseCoins(user, amount) {

}

/**
 * Find exists user or create new
 * Include Quests array
 *
 * @param data object
 */
export function findOrCreate(data) {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    return User.findOrCreate({
        where: {
            uid: data.uid
        },
        defaults: data,
        include: [{
            model: Quest,
            as: 'quests',
            through: {
                where: {
                    isReceivedReward: false,
                    dateFrom: {$lte: now},
                    dateTill: {$gt: now}
                }
            }
        }]
    }).then(response => {
        return response[0];
    });
}

/**
 * Generete random quest for user
 *
 * @param user
 * @returns {Promise}
 */
export function genereteRandomQuest(user) {
    return Quest.findOne({
        order: [Sequelize.fn('RAND')]
    }).then(quest => {
        return user.addQuest(quest, {
            through: {
                progress: 0,
                isDone: false,
                isReceivedReward: false,
                dateFrom: moment().format('YYYY-MM-DD HH:mm:ss'),
                dateTill: moment().add(12, 'hours').format('YYYY-MM-DD HH:mm:ss')
            }
        });
    });
}

export function getActiveQuests(user) {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    return user.getQuests({
        through: {
            model: UserQuest,
            where: {
                isReceivedReward: false,
                dateFrom: {$lte: now},
                dateTill: {$gt: now}
            }
        }
    });
}

function _changeGemsAmount() {

}

function _changeCoinsAmount() {

}