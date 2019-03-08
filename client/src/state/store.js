import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { logger } from 'redux-logger';

import ticketsReducer from './tickets/ticketsReducer';
import searchReducer from './search/searchReducer';

const reducer = {
    tickets: ticketsReducer,
    search: searchReducer,
};

let middleware = [...getDefaultMiddleware()];
if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
}

const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
