import decks from '../../../decks/';

export const returnDeck = state => {
    let customDeck = [];
    const decksNames = state.settings.decks;
    customDeck = decksNames.map(decksName => decks[decksName]);
    let customDeckRtn = [];
    customDeck.forEach(element => {
        customDeckRtn = customDeckRtn.concat(element);
    });
    return customDeckRtn;
};

export const getLocalStore = async (name, defaultVal) => {
    const settings = await localStorage.getItem(name);
    if (settings) {
        return {
            ...defaultVal,
            settings
        };
    } else {
        await localStorage.setItem(name, defaultVal);
        return {
            ...defaultVal
        };
    }
};

export const chooseNextSyNr = state => {
    const deck = returnDeck(state);

    switch (state.settings.deckFunc) {
        case 'RANDOM':
            return Math.floor(Math.random() * deck.length);

        case 'RANDOM_IN_DECK':
            if (
                state.symbolNr === null ||
                deck.length - 1 === state.symbolNr ||
                isNaN(state.symbolNr)
            ) {
                return 0;
            }
            return ++state.symbolNr;

        default:
            return Math.floor(Math.random() * deck.length);
    }
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */

const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const shuffleArrayInit = DeckLength => {
    let deckNrs = [];
    for (let i = DeckLength - 1; i >= 0; i--) {
        deckNrs = deckNrs.concat([i]);
    }
    return shuffleArray(deckNrs);
};

export const getCustomDeckObj = state => {
    console.log('getCustomDeckObj', state);
    switch (state.settings.deckFunc) {
        case 'RANDOM':
            return [];

        case 'RANDOM_IN_DECK': {
            const concatDeck = returnDeck(state);
            return shuffleArrayInit(concatDeck.length);
        }
        default:
            return [];
    }
};

export const getCurrentSymbol = (state, symbolNr) => {
    const concatDecks = returnDeck(state);

    switch (state.settings.deckFunc) {
        case 'RANDOM':
            return concatDecks[symbolNr];

        case 'RANDOM_IN_DECK':
            console.log(
                'getCurrentSymbol >> state.customDeck[symbolNr]',
                state.customDeck[symbolNr]
            );
            console.log(
                'getCurrentSymbol >> concatDecks[state.customDeck[symbolNr]]',
                concatDecks[state.customDeck[symbolNr]]
            );
            return concatDecks[state.customDeck[symbolNr]];

        default:
            return [];
    }
};

export const createAnswer = symbolObj => {
    let answers = [];
    const correctKey = Math.floor(Math.random() * 4);

    for (let i = 0; i < 4; i++) {
        if (i === correctKey) {
            answers.push({ symbol: symbolObj.roman, correct: true });
        } else {
            answers.push({
                symbol: symbolObj.wrong_answers[i],
                correct: false
            });
        }
    }

    return answers;
};
