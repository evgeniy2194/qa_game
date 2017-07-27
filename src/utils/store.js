class StoreClass {
    store = {};

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

class QuestionsStoreClass extends StoreClass {
    keys = [];

    add(key, value) {
        super.add(key, value);
        this.keys.push(key);
    }

    remove(key) {
        super.remove(key);

        const index = this.keys.indexOf(key);
        if (index !== -1) {
            this.keys.splice(index, 1);
        }
    }

    size() {
        return this.keys.length;
    }

    getRandom(count) {
        let items = [];
        let total = this.size();

        for (let i = 0; i < count; i++) {
            const random = Math.floor(Math.random() * total);

            items.push(this.get(this.keys[random]));
        }

        return items;
    }
}

class HintsStoreClass extends StoreClass{
    defaultCosts = {
        'hint50': {
            'costs': [
                {'coins': 100, 'gems': 0},
                {'coins': 110, 'gems': 2},
                {'coins': 120, 'gems': 4},
                {'coins': 130, 'gems': 8}
            ]
        },
        'veryExpensive': {
            'costs': [
                {'coins': 100, 'gems': 100},
                {'coins': 110, 'gems': 200},
                {'coins': 120, 'gems': 400},
                {'coins': 130, 'gems': 800}
            ]
        }
    };

    getAll(){

        return this.defaultCosts;

        return super.getAll();
    }

    get(key){
        return this.defaultCosts[key];
        return super.get(key);
    }

    getCostByNameAndCount(key, count){
        return this.defaultCosts[key]['costs'][count];
    }

}

let UsersStore = new StoreClass();
let GamesStore = new StoreClass();
let QueueStore = new StoreClass();
let QuestionsStore = new QuestionsStoreClass();
let HintsStore = new HintsStoreClass();

export {UsersStore, GamesStore, QueueStore, QuestionsStore, HintsStore};