export function sendUserInfo(user) {
    return {
        type: 'USER_INFO',
        data: {
            id: user.id,
            uid: user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            level: user.level,
            expTotal: user.expTotal,
            expToLevel: user.expToLevel,
            coins: user.coins,
            gems: user.gems
        }
    }
}

export function sendQuestsInfo(data) {
    let quests = [];
    data = data instanceof Array ? data : [data];

    data.forEach(quest => {
        quests.push({
            description: quest.description,
            requirements: quest.requirements,
            rewardCount: quest.rewardCount,
            rewardType: quest.rewardType,
            questId: quest.id,
            userQuestId: quest.UserQuest.id,
            progress: quest.UserQuest.progress,
            isDone: quest.UserQuest.isDone,
            isReceivedReward: quest.UserQuest.isReceivedReward
        });
    });

    return {
        type: 'QUESTS_INFO',
        data: quests
    }
}