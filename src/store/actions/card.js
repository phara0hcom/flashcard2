import * as actionTypes from '../actions/actionTypes';

export const setInitiateApp = newState => {
    console.log('initiateApp state', newState);
    return {
        ...newState,
        type: actionTypes.SET_INITIATE_APP
    };
};

export const initiateAppFailed = error => {
    return {
        type: actionTypes.INITIATE_APP_ERROR,
        error
    };
};

export const initiateApp = state => {
    return {
        ...state,
        type: actionTypes.INITIATE_APP
    };
};

export const clickAnswer = btnData => {
    return {
        type: actionTypes.ANSWER_QUESTION,
        ...btnData
    };
};
