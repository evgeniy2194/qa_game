const initialState = {
    //Настройки приложения
    app: {
        load: false,
        apiId: '',
        apiSettings: '',
        userId: '',
        accessToken: '',
        authKey: '',
        user: {
            firstName: '',
            lastName: ''
        }
    },
    //Игрок
    user: {
        uid: '',
        authKey: '',
        firstName: '',
        lastName: '',
        totalExp: 0,
        expToNextLevel: 0,
        level: 1,
        coins: 0,
        gems: 0,
        friends: []
    },
    //Описание игры
    game: {
        status: null,                   //Состояние игры
        gameId: 0,                      //Ид игры
        users: [],                      //Игроки в комнате
        totalQuestion: 0,               //Всего вопросов
        points: 0,                      //Очков в текущей игре
        showGameResult: false,
        gameResut: [],
        questionId: null,           //Ид вопроса
        questionNumber: 1,          //Номер вопроса
        question: '',
        chosenAnswer: 0,            //Выбранный ответ
        isCorrectAnswer: false,     //Верный ответ
        answers: [],                //Ответы
        wrongAnswers: [],           //Неверные ответы (При использовании подсказки)
        is50HintUsed: false,
        endTime: null,
        hintsCosts: {}
    }
};

export default initialState;