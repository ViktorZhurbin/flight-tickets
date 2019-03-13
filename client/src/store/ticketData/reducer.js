import { createReducer } from 'redux-starter-kit';

import {
    requestTickets,
    requestTicketsSuccess,
    resetTickets,
} from './actions';

const initialState = {
    isLoading: false,
    ticketData: {},
    hasTickets: false,
};

const reducer = createReducer(initialState, {
    [requestTickets]: state => ({
        ...state,
        isLoading: true,
    }),

    [requestTicketsSuccess]: (state, { payload }) => ({
        ...state,
        isLoading: false,
        ticketData: payload,
        hasTickets: payload && payload.allTickets
            && payload.allTickets.length > 0,
    }),

    [resetTickets]: () => initialState,
});

export default reducer;
