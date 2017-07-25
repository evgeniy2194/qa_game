export function sendUserInfo(user) {
    return {
        type: 'USER_INFO',
        data: {
            uid:        user.uid,
            firstName:  user.firstName,
            lastName:   user.lastName,
            expTotal:   user.expTotal,
            expToLevel: user.expToLevel,
            coins:      user.coins,
            gems:       user.gems
        }
    }
}