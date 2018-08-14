import React from 'react';

const answer = props => {
    let disblesAttr = false;
    const stringKey = props.key + '';
    const correctAnsClass = props.answer.correct ? ' btn-prime-correct' : '';

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
            className={`btn btn-prime ${correctAnsClass}`}
            onClick={props.click}
            key={`answerBtnKey_${props.key}`}
            value={props.symbol}
        />
    );
};

export default answer;
