class GameCreator {
    users = [];
    queue;
    startGame;
    config;

    constructor(config, QueueStore, startGame) {
        this.startGame = startGame;
        this.queue = QueueStore;
        this.config = config;
    }

    run() {
        let self = this;

        setInterval(function () {
            if (self.queue.size() >= self.config.game.playersCount) {
                self.getUsers();
            }
        }, 1000);
    }

    getUsers() {
        let self = this;
        let allUsers = self.queue.getAll();

        for (let userId in allUsers) {
            self.users.push(allUsers[userId]);
        }

        if (self.users.length === self.config.game.playersCount) {
            self.startGame(self.users, self.config.game);
            self.removeFromQueue();
        }
    }

    removeFromQueue() {
        let self = this;

        self.users.forEach(user => {
            self.queue.remove(user.id);
        });

        self.users = [];
    }
}

export default GameCreator;