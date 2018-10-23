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
        case actionTypes.SET_NEXT_QUESTION:
            console.log('SET_NEXT_QUESTION action', action);
            return {
                ...state,
                answers: action.answers,
                face: 'UP',
                cardScore: {
                    questions_failed: action.cardScore.questions_failed,
                    questions_correct: action.cardScore.questions_correct
                },
                symbolNr: action.symbolNr,
                symbolObj: action.symbolObj
            };
        default:
            return state;
    }
};

export default reducer;
