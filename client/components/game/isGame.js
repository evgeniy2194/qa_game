import React, {Component} from 'react';

export default class isGame extends Component {

    getAnswerButtonColor(answerId) {
        /**
         * Выбранный ответ
         * @type {number}
         */
        const chosenAnswer = this.props.game.round.chosenAnswer;

        /**
         * Верный ли ответ
         * @type {boolean}
         */
        const isCorrectAnswer = this.props.game.round.isCorrectAnswer;

        let className = 'btn ';

        if (chosenAnswer === answerId) {
            className += isCorrectAnswer ? 'btn-green' : 'btn-red';
        } else {
            className += 'btn-orange';
        }

        return className;
    }

    onAnswerQuestionClick(gameId, answerId) {
        this.props.onAnswerQuestionClick(gameId, answerId);
    }

    onHintClick(hint, gameId, questionId) {
        this.props.onHintClick(hint, gameId)
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
                <div>Вопрос { game.round.questionNumber }/{ game.totalQuestion }</div>
                <br/>
                <div>{ game.round.question } </div>
                <br/>
                { game.round.answers.map(
                    (answer) => {
                        return (
                            <button key={ answer.id }
                                    className={ this.getAnswerButtonColor(answer.id) }
                                    disabled={ !!game.round.chosenAnswer }
                                    onClick={ this.onAnswerQuestionClick.bind(this, game.gameId, answer.id)}>
                                { game.round.wrongAnswers.indexOf(answer.id) === -1 ? answer.answer : '' }
                            </button>
                        );
                    })
                }
                <br/>
                <div className="hints">
                    <button onClick={ this.onHintClick.bind(this, '50/50', game.gameId, game.round.questionId) }>
                        50/50
                    </button>
                </div>
            </div>
        )
    }
}