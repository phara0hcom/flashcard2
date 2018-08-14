import React from 'react';

import Answer from './Answer/Answer';

const Answers = props => {
    return (
        <div className="card__btn-box">
            {this.props.answers.map((data, i) => (
                <Answer
                    key={i}
                    answer={data}
                    onClick={this.props.click}
                    lastAnswer={this.props.lastAnswer}
                    answered={this.props.answered}
                />
            ))}
        </div>
    );
};

export default Answers;
