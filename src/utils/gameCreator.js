class GameCreator {
    players = [];
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
                self.getPlayers();
            }
        }, 1000);
    }

    getPlayers() {
        let self = this;
        let allPlayers = self.queue.getAll();

        for (let playerId in allPlayers) {
            self.players.push(allPlayers[playerId]);
        }

        if (self.players.length === self.config.game.playersCount) {
            self.startGame(self.players, self.config.game);
            self.removeFromQueue();
        }
    }

    removeFromQueue() {
        let self = this;

        self.players.forEach(player => {
            self.queue.remove(player.id);
        });

        self.players = [];
    }
}

export default GameCreator;