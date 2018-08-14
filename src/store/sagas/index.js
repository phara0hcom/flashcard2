import { takeEvery } from 'redux-saga/effects';
//import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import { initCardSaga } from './card';

export function* watchCard() {
    yield takeEvery(actionTypes.INITIATE_APP, initCardSaga);
}
