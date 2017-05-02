import React, {Component} from 'react';

export default class Game extends Component {

    /**
     * User answered on question
     */
    answer(gameId, answerId) {
        this.props.answerGame(gameId, answerId);
    }

    getAnswerButtonColor(answerId) {
        const chosenAnswer = this.props.game.chosenAnswer;
        const correctAnswer = this.props.game.correctAnswer;

        let className = 'btn ';

        if (chosenAnswer == answerId) {
            className += correctAnswer ? 'btn-green' : 'btn-red';
        } else {
            className += 'btn-orange';
        }

        return className;
    }

    render() {

        const game = this.props.game;
        const findGame = this.props.findGame;
        const cancelFindGame = this.props.cancelFindGame;

        let gameTpl;

        if (game.gameWillStart) {
            gameTpl = (
                <div>Игра начнется через 3 секунд</div>
            )
        } else if (game.iSgame && game.question) {
            gameTpl = (
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
                                        onClick={ this.answer.bind(this, game.gameId, answer.id)}>
                                    { answer.answer }
                                </button>
                            );
                        })
                    }
                </div>
            );
        } else if (game.waitingPayers) {
            gameTpl = (
                <div>
                    <span>Ищем игроков...</span><br/>
                    <button className="btn btn-blue" onClick={ cancelFindGame }>Выйти</button>
                </div>
            );
        } else {
            let tpl = "";

            if (game.showGameResult) {

                const result = game.gameResut;
                const keys = Object.keys(result);

                keys.sort().reverse();

                keys.forEach(key => {
                    const users = result[key];

                    users.forEach(user => {
                        tpl += key + ' ' + user.firstName + ' ' + user.lastName + ' coins: ' + user.coins + ' exp: ' + user.exp + ' gems: ' + user.gems;
                    });
                });

                tpl = ( <div><span>Результаты игры:</span><br/>{ tpl } </div>);
            }
            gameTpl = ( <div>{ tpl }<button className="btn btn-orange" onClick={ findGame }>Играть</button></div> );
        }

        return ( <div id="gameArea">{ gameTpl }</div> );
    }
}