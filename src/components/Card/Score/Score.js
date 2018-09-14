import React from 'react';

import css from './Score.css';

const topScore = props => (
    <div className={css.cardScore}>
        <div className={css.scoreSegment}>
            <div className="">Session Score</div>
            <div className="">
                <span>&radic; </span>
                {props.score.questions_correct}
            </div>
            <div className="">
                <span>&times; </span>
                {props.score.questions_failed}
            </div>
        </div>
        <div className={css.scoreSegment}>
            <div className="">This Card</div>
            <div className="">
                <span>&radic; </span>
                {props.cardScore.questions_correct}
            </div>
            <div className="">
                <span>&times; </span>
                {props.cardScore.questions_failed}
            </div>
        </div>
        <div className={css.scoreSegment}>
            <div className="">Total Score</div>
            <div className="">
                <span>&radic; </span>
                {props.pastScore.questions_correct}
            </div>
            <div className="">
                <span>&times; </span>
                {props.pastScore.questions_failed}
            </div>
        </div>
    </div>
);

export default topScore;
