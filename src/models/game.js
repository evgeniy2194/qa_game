import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    users: [{                       //Игроки
        firstName: String,
        lastName: String,
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    questions:[{                    //Вопросы
        question: String,
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'question'
        }
    }],
    answers: [{                     //Как отвечали игроки на вопросы
        question: {                 //Вопрос
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'question'
            },
            usersAnswers: [{             //Ответы
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                },
                answerId: Number,
                correct: Boolean
            }]
        },

    }],
    createdAt: {                    //Создана в
        type: Date,
        default: Date.now()
    },
    finishedAt: {                   //Завершилась в
        type: Date,
        default: null
    },
    winner: {                       //Кто выиграл
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    }
});

const Game = mongoose.model('game', questionSchema);

export default Game;