import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../store/actions/';

import Answers from '../components/Answers/Answers';
import Score from '../components/Card/Score/Score';

import css from './Card.css';

class Card extends Component {
    componentWillMount() {
        this.props.onInitiateApp({
            settings: this.props.settings,
            pastScore: this.props.pastScore,
            cardScore: this.props.cardScore
        });
    }

    wrongAnsw = last_answer => {
        // const { store } = this.context;
        // console.log(last_answer);
        // if (last_answer === false) {
        //     setTimeout(() => {
        //         store.dispatch(reset_last_answer());
        //     }, 800);
        //     return 'wrong';
        // } else if (last_answer === true) {
        //     setTimeout(() => {
        //         store.dispatch(reset_last_answer());
        //     }, 800);
        //     return 'correct';
        // } else {
        //     return 'nothing';
        // }
    };

    clickAnswer = event => {
        this.props.onClickAnswer({
            value: event.target.value,
            btnNr: event.target.dataset.btnnr
        });
    };

    render() {
        console.log('cardProp.cardState', this.props);
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
            css[`card__${this.props.face}`],
            css[
                `card__ +
        ${this.wrongAnsw(this.props.last_answer)}`
            ]
        ].join(' ');
        return (
            <div className={cardCss}>
                <div className={[css.cardSide, css.cardSideFront].join(' ')}>
                    <Score
                        score={this.props.score}
                        cardScore={this.props.cardScore}
                        pastScore={this.props.pastScore}
                    />

                    <div className={css.card__frontSymbol}>
                        {this.props.symbolObj.symbol}
                    </div>
                    <Answers
                        lastAnswer={this.props.last_answer}
                        answers={this.props.answers}
                        answered={this.props.answered}
                        symbolObj={this.props.symbolObj}
                        click={this.clickAnswer}
                    />
                </div>
                <div
                    className={[css.card__side, css.card__sideBack].join(' ')}
                    onClick={() => this.props.next_question(this.props)}
                >
                    <div className={css.card__backInner}>
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
        face: state.card.face,
        fetchingSavedata: state.card.fetchingSavedata,
        symbolNr: state.card.symbolNr,
        symbolObj: state.card.symbolObj,
        answers: state.card.answers,
        answered: state.card.answered,
        pastScore: state.card.pastScore,
        cardScore: state.card.cardScore,
        settings: state.card.settings,
        score: state.card.score,
        last_answer: state.card.last_answer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitiateApp: state => dispatch(actions.initiateApp(state)),
        onClickAnswer: btnData => dispatch(actions.clickAnswer(btnData))

        // reset_last_answer,
        // next_question
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);
