import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../store/actions/';

import Answers from '../components/Answers/Answers';
import Score from '../components/Card/Score/Score';

import css from './Card.css';

class Card extends Component {
    state = {
        face: 'UP',
        last_answer: null,
        answered: [],
        score: {
            questions_failed: 0,
            questions_correct: 0
        },
        cardScore: {
            questions_failed: 0,
            questions_correct: 0
        },
        pastScore: {
            questions_failed: 0,
            questions_correct: 0
        }
    };

    componentWillMount() {
        this.props.onInitiateApp({
            settings: this.props.settings,
            pastScore: this.props.pastScore,
            cardScore: this.props.cardScore
        });
    }

    wrongAnsw = last_answer => {
        console.log(last_answer);
        if (last_answer === false) {
            setTimeout(() => {
                this.setState(prevState => {
                    const newScore = {
                        ...prevState.score
                    };
                    return {
                        last_answer: null,
                        score: {
                            questions_failed: newScore.questions_failed + 1,
                            questions_correct: newScore.questions_correct
                        }
                    };
                });
            }, 800);
            return 'wrong';
        } else if (last_answer === true) {
            setTimeout(() => {
                this.setState(prevState => {
                    const newScore = {
                        ...prevState.score
                    };
                    return {
                        last_answer: null,
                        face: 'DOWN',
                        score: {
                            questions_failed: newScore.questions_failed,
                            questions_correct: newScore.questions_correct + 1
                        }
                    };
                });
            }, 800);
            return 'correct';
        } else {
            return 'nothing';
        }
    };

    clickAnswer = (btnNr, correct) => {
        this.setState(prevState => {
            return {
                answered: !correct
                    ? [...prevState.answered, btnNr]
                    : ['0', '1', '2', '3'],
                last_answer: correct
            };
        });
    };

    next_question = () => {
        console.log('this.next_question', this.props);
        this.props.nextQuestion(this.props);
        this.setState({
            face: 'UP',
            last_answer: null,
            answered: [],
            cardScore: {
                questions_failed: 0,
                questions_correct: 0
            },
            pastScore: {
                questions_failed: 0,
                questions_correct: 0
            }
        });
    };

    scoreCalc = (past, current) => {
        const failed = past.questions_failed + current.questions_failed;
        const correct = past.questions_correct + current.questions_correct;

        return {
            questions_failed: failed,
            questions_correct: correct
        };
    };

    render() {
        if (this.props.cardState === 'LOADING') {
            return (
                <div className={css.card}>
                    <div
                        className={[css.cardSide, css.cardSideFront].join(' ')}
                    >
                        LOADING
                    </div>
                </div>
            );
        }
        const cardCss = [
            css.card,
            css[`card__${this.state.face}`],
            css[`card__${this.wrongAnsw(this.state.last_answer)}`]
        ].join(' ');
        console.log('cardCss >>', cardCss);
        const sessionScore = this.scoreCalc(this.props.score, this.state.score);
        const scoreCard = this.scoreCalc(
            this.props.cardScore,
            this.state.cardScore
        );
        const pastScore = this.scoreCalc(
            this.props.pastScore,
            this.state.pastScore
        );
        return (
            <div className={cardCss}>
                <div className={[css.cardSide, css.cardSideFront].join(' ')}>
                    <Score
                        score={sessionScore}
                        cardScore={scoreCard}
                        pastScore={pastScore}
                    />

                    <div className={css.card__frontSymbol}>
                        {this.props.symbolObj.symbol}
                    </div>
                    <Answers
                        lastAnswer={this.state.last_answer}
                        answers={this.props.answers}
                        answered={this.state.answered}
                        symbolObj={this.props.symbolObj}
                        click={this.clickAnswer}
                    />
                </div>
                <div
                    className={[css.cardSide, css.cardSideBack].join(' ')}
                    onClick={this.next_question}
                >
                    <div className={css.cardBackInner}>
                        <div
                            className={[
                                css.card__frontSymbol,
                                css.card__backFlex
                            ].join(' ')}
                        >
                            {this.props.symbolObj.symbol}
                        </div>
                        <div className={css.card__backFlex}>=</div>
                        <div className={css.card__backFlex}>
                            {this.props.symbolObj.roman}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Card.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => {
    return {
        cardState: state.card.cardState,
        customDeck: state.card.customDeck,
        fetchingSavedata: state.card.fetchingSavedata,
        symbolNr: state.card.symbolNr,
        symbolObj: state.card.symbolObj,
        answers: state.card.answers,
        pastScore: state.card.pastScore,
        cardScore: state.card.cardScore,
        settings: state.card.settings,
        score: state.card.score
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitiateApp: state => dispatch(actions.initiateApp(state)),
        onClickAnswer: btnData => dispatch(actions.clickAnswer(btnData)),
        nextQuestion: state => dispatch(actions.nextQuestion(state))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);
