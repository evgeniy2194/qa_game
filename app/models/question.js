import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {                 //Вопрос
        type: String,
    },
    answers: [{                 //Ответы
        id: {
            type: Number,
            unique: true
        },
        answer: String,
    }],
    correctAnswerId: Number,
    created_at: {               //Дата создания
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model('question', questionSchema);

export default Question;

// Question.create({
//     question: "Сколько раз старик из сказки А. С. Пушкина вызывал Золотую рыбку?",
//     answers: [
//         { id: 1, answer: "3" },
//         { id: 2, answer: "4" },
//         { id: 3, answer: "5" },
//         { id: 4, answer: "6" }
//     ],
//     correctAnswerId: 3,
// });
//
// Question.create({
//     question: "Сколько килобайт в 1 мегабайте?",
//     answers: [
//         { id: 1, answer: "1000" },
//         { id: 2, answer: "16" },
//         { id: 3, answer: "512" },
//         { id: 4, answer: "1024" }
//     ],
//     correctAnswerId: 4,
// });
//
// Question.create({
//     question: "Сколько пар хромосом распределяется на одного (здорового) человека?",
//     answers: [
//         { id: 1, answer: "23" },
//         { id: 2, answer: "24" },
//         { id: 3, answer: "11" },
//         { id: 4, answer: "12" }
//     ],
//     correctAnswerId: 1,
// });
//
// Question.create({
//     question: "В какое море впадает река Днестр?",
//     answers: [
//         { id: 1, answer: "Мертвое" },
//         { id: 2, answer: "Красное" },
//         { id: 3, answer: "Синее" },
//         { id: 4, answer: "Черное" }
//     ],
//     correctAnswerId: 4,
// });