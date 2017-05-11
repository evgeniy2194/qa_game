class StoreClass {
    constructor() {
        this.store = {};
    }

    add(key, value) {
        this.store[key] = (value === undefined) ? key : value;
    }

    remove(key) {
        delete this.store[key];
    }

    size() {
        return Object.keys(this.store).length;
    }

    get(key) {
        return this.store[key];
    }

    getAll() {
        return this.store;
    }
}

class QueueStoreClass extends StoreClass {

    cut(number) {
        let players = [];
        let j = 0;

        for (let prop in this.store) {
            if (j >= number) break;

            players.push(this.store[prop]);
            delete this.store[prop];
        }

        return players;
    }
}

let UsersStore = new StoreClass();
let GamesStore = new StoreClass();
let QueueStore = new QueueStoreClass();

export {UsersStore, GamesStore, QueueStore};