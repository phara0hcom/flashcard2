import React from 'react';
import css from './Answer.css';

const answer = props => {
    let disblesAttr = false;
    const stringKey = props.id + '';
    const correctAnsClass = props.correct ? css.btnPrimeCorrect : null;

    const btnClass = [css.btn, css.btnPrime, correctAnsClass].join(' ');

    if (props.lastAnswer === true) {
        disblesAttr = true;
    }

    if (props.answered.indexOf(stringKey) !== -1) {
        disblesAttr = true;
    }
    return (
        <input
            type="button"
            data-btnnr={stringKey}
            disabled={disblesAttr}
            className={btnClass}
            onClick={() => props.click(stringKey, props.correct)}
            key={`answerBtnKey_${props.id}`}
            value={props.symbol}
        />
    );
};

export default answer;
