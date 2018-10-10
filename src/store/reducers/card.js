import * as actionTypes from '../actions/actionTypes';

const initialState = {
    face: 'UP',
    cardState: 'LOADING',
    fetchingSavedata: false,
    fetchSavedataError: false,
    symbolNr: null,
    last_answer: null,
    answers: [],
    answered: [],
    customDeck: [],
    score: {
        questions_failed: 0,
        questions_correct: 0
    },
    pastScore: {
        questions_failed: 0,
        questions_correct: 0
    },
    cardScore: {
        questions_failed: 0,
        questions_correct: 0
    },
    settings: {
        decks: ['basicKatakana'],
        deckFunc: 'RANDOM_IN_DECK'
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INITIATE_APP:
            return {
                ...state,
                cardState: 'GO',
                fetchingSavedata: false,
                symbolNr: action.symbolNr,
                symbolObj: action.symbolObj,
                customDeck: action.customDeck,
                answers: action.answers,
                pastScore: action.pastScore,
                cardScore: action.cardScore,
                settings: action.settings
            };
        case actionTypes.ANSWER_QUESTION:
            console.log('ANSWER_QUESTION action', action);
            return {
                ...state
            };
        default:
            return state;
    }
};

export default reducer;
