/**
 * Created by vision on 8/1/17.
 */
import GemsAndCoinsUsing from '../database/models/';
import Sequelize from 'sequelize';
import {User, Quest, UserQuest} from '../database/models';
import moment from 'moment';
import connect from '../database/connect';
import sendMessage from '../socket/sendMessage';
import {sendQuestsInfo} from '../actions/userActions';

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
                dateFrom: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                dateTill: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
            }
        });
    }).then(() => {
        return getActiveQuests(user);
    });
}

/**
 * Returns active user quests
 *
 * @param user
 * @returns array
 */
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

/**
 * Refreshes user quests and sends info about it
 *
 * @param user
 */
export function refreshQuests(user) {
    const quests = user.quests;

    quests.forEach(quest => {
        let check = quest.check;
        let promises = [];
        let userQuest = quest.UserQuest;

        //Array of Promises
        if (!userQuest.isDone) {
            promises.push(
                connect.query(check, {
                    replacements: {
                        userId: user.id,
                        dateStart: userQuest.dateFrom,
                        dateTill: userQuest.dateTill
                    }
                }).spread(results => {
                    userQuest.progress = (results[0] && results[0].progress) || 0;
                    userQuest.isDone = userQuest.progress >= quest.requirements;

                    return userQuest.save();
                })
            );
        }

        //Waits for complete all promises and sends info
        Promise.all(promises).then(() => {
            sendMessage(user, sendQuestsInfo(user.quests));
        });
    });
}

export function getExpToLevel(lvl) {
    return 100 * Math.pow(lvl - 1, 2);
}

export function getLevelByExp(exp) {
    return Math.ceil(Math.sqrt(exp / 100));
}

function _changeGemsAmount() {

}

function _changeCoinsAmount() {

}