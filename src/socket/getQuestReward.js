import sendMessage from './sendMessage';
import {sendUserInfo, sendQuestsInfo} from '../actions/userActions';

export default function (user, data) {
    let userQuestId = data.userQuestId;
    let quests = user.quests;

    quests.forEach(quest => {
        let userQuest = quest.UserQuest;

        if (userQuest.id === userQuestId && userQuest.isDone && !userQuest.isReceivedReward) {
            let rewardCount = quest.rewardCount;
            let rewardType = quest.rewardType;
            let model = user.model;

            switch (rewardType) {
                case 'gems':
                    model.gems += rewardCount;
                    userQuest.isReceivedReward = true;

                    model.save();
                    userQuest.save();

                    sendMessage(user, sendUserInfo(model));
                    sendMessage(user, sendQuestsInfo(quests));

                    break;
            }
        }
    });
}