import React, {Component} from 'react';
import Timer from '../timer';
import HintCostArea from '../hintsCostArea';

export default class isGame extends Component {

    getAnswerButtonColor(answerId) {
        /**
         * Выбранный ответ
         * @type {number}
         */
        const chosenAnswer = this.props.game.chosenAnswer;

        /**
         * Верный ли ответ
         * @type {boolean}
         */
        const isCorrectAnswer = this.props.game.isCorrectAnswer;

        let isWrong = false;
        let className = 'btn ';

        this.props.game.answers.map(answer => {
            if (answer.id === answerId) {
                isWrong = answer.isWrong;
            }
        });

        if (chosenAnswer === answerId) {
            className += isCorrectAnswer ? 'btn-green' : 'btn-red';
        } else if (isWrong) {
            className += 'btn-outline-secondary';
        } else {
            className += 'btn-orange';
        }

        return className;
    }

    onAnswerQuestionClick(gameId, answerId) {
        this.props.onAnswerQuestionClick(gameId, answerId);
    }

    onHintClick(hint, gameId, questionId) {
        this.props.onHintClick({
            hint: hint,
            gameId: gameId,
            questionId: questionId,
        })
    }

    onLeaveGameClick() {
        this.props.onLeaveGameClick({});
    }

    render() {
        const game = this.props.game;

        return (
            <div>
                <Timer endTime={game.endTime}/>

                <div>
                    Играют: <br/>
                    { game.users.map(user => {
                        return ( <div key={user.uid}>{ user.firstName } { user.lastName }</div> );
                    })}
                </div>
                <br/>
                <div>Вопрос { game.questionNumber }/{ game.totalQuestion }</div>
                <br/>
                <div>{ game.question } </div>
                <br/>
                { game.answers.map(answer => {
                    return (
                        <button key={ answer.id }
                                className={ this.getAnswerButtonColor(answer.id) }
                                disabled={ !!game.chosenAnswer || answer.isWrong }
                                onClick={ this.onAnswerQuestionClick.bind(this, game.gameId, answer.id)}>
                            {answer.answer}
                        </button>
                    );
                })}
                <br/>
                <div className="hints">
                    <div>
                        <button onClick={ this.onHintClick.bind(this, 'hint50', game.gameId, game.questionId) }
                                disabled={ game.is50HintUsed }>
                            50/50
                        </button>
                        <HintCostArea gemsCost={ game.hintsCosts.hint50 ? game.hintsCosts.hint50.gems : 0 }
                                      coinsCost={ game.hintsCosts.hint50 ? game.hintsCosts.hint50.coins : 0 }/>
                    </div>
                    <div>
                        <button onClick={ this.onHintClick.bind(this, 'veryExpensive', game.gameId, game.questionId) }
                                disabled={ game.isVeryExpensiveUsed }>
                            Very Expensive
                        </button>
                        <HintCostArea
                            gemsCost={ game.hintsCosts.veryExpensive ? game.hintsCosts.veryExpensive.gems : 0 }
                            coinsCost={ game.hintsCosts.veryExpensive ? game.hintsCosts.veryExpensive.coins : 0 }/>
                    </div>
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