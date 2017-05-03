import React, {Component} from 'react';

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

        let className = 'btn ';

        if (chosenAnswer == answerId) {
            className += isCorrectAnswer ? 'btn-green' : 'btn-red';
        } else {
            className += 'btn-orange';
        }

        return className;
    }

    render() {

        const game = this.props.game;

        return (
            <div>
                <div>
                    Играют: <br/>
                    { game.users.map(
                        (user) => {
                            return ( <div>{ user.firstName } { user.lastName }</div> );
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
                                    disabled={ !!game.chosenAnswer }
                                    onClick={ this.props.onAnswerGameClick(game.gameId, answer.id)}>
                                { answer.answer }
                            </button>
                        );
                    })
                }
            </div>
        )
    }
}