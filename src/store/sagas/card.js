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
        const pastScore = yield cardFunc.getLocalStore('pastScore', {
            questions_failed: 0,
            questions_correct: 0
        });
        const newState = {
            ...state,
            settings,
            pastScore
        };
        console.log(newState);
        newState.symbolNr = yield cardFunc.chooseNextSyNr(newState);
        newState.customDeck = yield cardFunc.getCustomDeckObj(newState);

        console.log('symbolNr', newState.symbolNr);
        newState.symbolObj = yield cardFunc.getCurrentSymbol(
            newState,
            newState.symbolNr
        );
        console.log('symbolObj', newState.symbolObj);

        newState.cardScore = yield cardFunc.getLocalStore(
            newState.symbolObj.index,
            {
                questions_failed: 0,
                questions_correct: 0
            }
        );

        newState.answers = cardFunc.createAnswer(
            newState.symbolObj[newState.symbolNr]
        );
        console.log('newState', newState);
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
