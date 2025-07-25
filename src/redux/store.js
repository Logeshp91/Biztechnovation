import { createStore ,applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from '@redux-devtools/extension';

import rootSaga from './saga';
import rootReducer from './reducer';

const SagaMiddleware =createSagaMiddleware();

const store = createStore(
    rootReducer,  
        {},
    composeWithDevTools(applyMiddleware(SagaMiddleware))
);
SagaMiddleware.run(rootSaga);

export default store;