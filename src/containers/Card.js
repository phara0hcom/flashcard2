import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../store/actions/';
import Answers from '../components/Answers/Answers';

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

    render() {
        console.log('cardProp.cardState', this.props);
        if (this.props.cardState === 'LOADING') {
            return (
                <div className="card card__UP card__nothing">
                    <div className="card__side card__side--front">LOADING</div>
                </div>
            );
        }

        return (
            <div
                className={
                    `card card__${this.props.face} card__` +
                    this.wrongAnsw(this.props.last_answer)
                }
            >
                <div className="card__side card__side--front">
                    <div className="card__score">
                        <div className="row">
                            <div className="col-1-of-3 card__score--current u-margin-bottom-small">
                                <div className="">Session Score</div>
                                <div className="">
                                    <span>&radic; </span>
                                    {this.props.score.questions_correct}
                                </div>
                                <div className="">
                                    <span>&times; </span>
                                    {this.props.score.questions_failed}
                                </div>
                            </div>
                            <div className="col-1-of-3 card__score--currentCard u-margin-bottom-small">
                                <div className="">This Card</div>
                                <div className="">
                                    <span>&radic; </span>
                                    {this.props.cardScore.questions_correct}
                                </div>
                                <div className="">
                                    <span>&times; </span>
                                    {this.props.cardScore.questions_failed}
                                </div>
                            </div>
                            <div className="col-1-of-3 card__score--currentCard u-margin-bottom-small">
                                <div className="">Total Score</div>
                                <div className="">
                                    <span>&radic; </span>
                                    {this.props.pastScore.questions_correct}
                                </div>
                                <div className="">
                                    <span>&times; </span>
                                    {this.props.pastScore.questions_failed}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card__front--symbol">
                        {this.props.symbolObj.symbol}
                    </div>
                    <Answers
                        lastAnswer={this.props.last_answer}
                        answers={this.props.answers}
                        answered={this.props.answered}
                        symbolObj={this.props.symbolObj}
                        click={this.props.click_answer}
                    />
                </div>
                <div
                    className="card__side card__side--back"
                    onClick={() => this.props.next_question(this.props)}
                >
                    <div className="card__back--inner">
                        <div className="card__back--symbol card__back--flex">
                            {this.props.symbolObj.symbol}
                        </div>
                        <div className="card__back--equal card__back--flex">
                            =
                        </div>
                        <div className="card__back--answer card__back--flex">
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
        onInitiateApp: state => dispatch(actions.initiateApp(state))
        // click_answer,
        // reset_last_answer,
        // next_question
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);
