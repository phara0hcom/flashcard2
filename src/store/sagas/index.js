import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import { initCardSaga, nextQuestionSaga } from './card';

function* watchInitApp() {
    yield takeEvery(actionTypes.INITIATE_APP, initCardSaga);
}

function* watchNextQuestion() {
    yield takeEvery(actionTypes.NEXT_QUESTION, nextQuestionSaga);
}

export function* watchCard() {
    yield all([watchInitApp(), watchNextQuestion()]);
}
