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
        exp: 0,
        level: 1,
        coins: 0,
        gems: 0,
    },
    //Описание игры
    game: {
        status: null,               //Состояние игры
        gameWillStart: false,       //Игра начнется через несколько секунд
        iSgame: false,              //Идет ли игра
        gameId: 0,                  //Ид игры
        users: [],                  //Игроки в комнате
        totalQuestion: 0,           //Всего вопросов
        questionNumber: 1,          //Номер вопроса
        question: '',
        chosenAnswer: 0,            //Выбранный ответ
        correctAnswer: false,       //Верный ответ
        answers: [],                //Ответы
        points: 0,                  //Очков в текущей игре
        showGameResult: false,
        gameResut: []
    }
};

export default initialState;