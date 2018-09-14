import React from 'react';

import Answer from './Answer/Answer';

const Answers = props => {
    return (
        <div className="card__btn-box">
            {props.answers.map((data, i) => (
                <Answer
                    key={i}
                    id={i}
                    {...data}
                    answer={data}
                    onClick={props.click}
                    lastAnswer={props.lastAnswer}
                    answered={props.answered}
                />
            ))}
        </div>
    );
};

export default Answers;
