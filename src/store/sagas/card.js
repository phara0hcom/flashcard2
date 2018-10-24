import { put } from 'redux-saga/effects';

import * as cardFunc from './functions/card';
import * as actions from '../actions/';

export function* initCardSaga(state) {
    //get localStorgidge
    console.log('initCardSaga State ', state);
    try {
        const settings = yield cardFunc.getLocalStore(
            'appSettings',
            state.settings
        );
        console.log('initCardSaga state.settings:', state.settings);
        console.log('initCardSaga settings:', settings);
        const pastScore = yield cardFunc.getLocalStore('pastScore', {
            questions_failed: 0,
            questions_correct: 0
        });
        const newState = {
            ...state,
            settings,
            pastScore
        };

        newState.symbolNr = yield cardFunc.chooseNextSyNr(newState);
        newState.customDeck = yield cardFunc.getCustomDeckObj(newState);

        newState.symbolObj = yield cardFunc.getCurrentSymbol(
            newState,
            newState.symbolNr
        );

        newState.cardScore = yield cardFunc.getLocalStore(
            newState.symbolObj.index,
            {
                questions_failed: 0,
                questions_correct: 0
            }
        );

        newState.answers = cardFunc.createAnswer(newState.symbolObj);

        yield put(
            actions.setInitiateApp({
                ...newState
            })
        );
    } catch (error) {
        yield console.log(error);
        yield put(actions.initiateAppFailed(error));
    }
}

export function* nextQuestionSaga(state) {
    try {
        console.log('nextQuestionSaga state', state);
        const newState = yield cardFunc.chooseNext(state);
        newState.answers = cardFunc.createAnswer(newState.symbolObj);
        yield put(actions.setNextQuestion(newState));
    } catch (error) {
        console.log('nextQuestionSaga ERROR', error);
    }
}
