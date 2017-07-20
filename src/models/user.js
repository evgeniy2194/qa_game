import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: {                  //Ид вконтакте
        type: Number,
        required: true,
        unique: true
    },
    level: {                //Уровень
        type: Number,
        default: 1
    },
    totalExp: {                  //Опыта всего за игру
        type: Number,
        default: 0
    },
    expToNextLevel: {                 //Нужно опыта до следующего уровня
        type: Number,
        default: 0
    },
    coins: {                //Монет на счету
        type: Number,
        default: 0
    },
    gems: {                 //Гемов
        type: Number,
        default: 0
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {             //Фамилия
        type: String,
        required: true
    },
    created_at: {           //Дата создания
        type: Date,
        default: Date.now
    },
    updated_at: {           //Дата изменения
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', userSchema);

export default User;