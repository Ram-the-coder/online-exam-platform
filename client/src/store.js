import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers'
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// import { createBrowserHistory } from 'history';

// export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const middleWare = [thunk];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWare)));

export default store;