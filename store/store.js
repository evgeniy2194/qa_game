export default class Store {
    constructor () {
        this.store = {};
    }

    add(key, value){
        this.store[key] = (value === undefined) ? key : value;
    }

    remove(key){
        delete this.store[key];
    }

    size(){
        return Object.keys(this.store).length;
    }

    get(key){
        return this.store[key];
    }

    getAll(){
        return this.store;
    }
}