import Store from './store';

class QueueStore extends Store {

    cut(number){
        let players = [];
        let j = 0;

        for(let prop in this.store){
            if(j >= number) break;

            players.push(this.store[prop]);
            delete this.store[prop];
        }

        return players;
    }
}

export default new QueueStore();