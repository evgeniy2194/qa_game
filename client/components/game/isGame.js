import React, {Component} from 'react';

export default class isGame extends Component {

    getAnswerButtonColor(answerId) {
        /**
         * Выбранный ответ
         * @type {number}
         */
        const chosenAnswer = this.props.game.chosenAnswer;

        let isWrong = false;


        this.props.game.answers.map(answer =>{
            if(answer.id == answerId){
                isWrong = answer.isWrong;
            }
        });
        /**
         * Верный ли ответ
         * @type {boolean}
         */
        const isCorrectAnswer = this.props.game.isCorrectAnswer;

        let className = 'btn ';

        if (chosenAnswer === answerId) {
            className += isCorrectAnswer ? 'btn-green' : 'btn-red';
        }else if(isWrong) {
            className += 'btn-outline-secondary';

        }else{

            className += 'btn-orange';
        }

        return className;
    }

    onAnswerQuestionClick(gameId, answerId) {
        this.props.onAnswerQuestionClick(gameId, answerId);
    }

    onHintClick(hint, gameId, questionId, userId) {
        this.props.onHintClick({
            hint: hint,
            gameId: gameId,
            questionId: questionId,
        })
    }
    onLeaveGameClick(){
        this.props.onLeaveGameClick({});
    }
    render() {

        const game = this.props.game;

        return (
            <div>
                <div>
                    Играют: <br/>
                    { game.users.map(
                        (user) => {
                            return ( <div key={user.uid}>{ user.firstName } { user.lastName }</div> );
                        })
                    }
                </div>
                <br/>
                <div>Вопрос { game.questionNumber }/{ game.totalQuestion }</div>
                <br/>
                <div>{ game.question } </div>
                <br/>
                { game.answers.map(
                    (answer) => {
                        return (
                            <button key={ answer.id }
                                    className={ this.getAnswerButtonColor(answer.id) }
                                    disabled={ !!game.chosenAnswer ||  answer.isWrong }
                                    onClick={ this.onAnswerQuestionClick.bind(this, game.gameId, answer.id)}
                                    >
                                    {answer.answer}
                            </button>
                        );
                    })
                }
                <br/>
                <div className="hints">
                    <button onClick={ this.onHintClick.bind(this, '50/50', game.gameId, game.questionId) }
                            disabled={ game.is50HintUsed }>
                        50/50
                    </button>
                </div>
                <div className="leaveButton">
                    <button onClick={ this.onLeaveGameClick.bind(this) }>
                        Выйти из игры
                    </button>
                </div>
            </div>
        )
    }
}