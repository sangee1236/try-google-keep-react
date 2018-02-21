import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose  } from 'redux'
import logger from 'redux-logger'
import { Provider} from 'react-redux'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lists from  './reducers/ListReducers';
import thunk from 'redux-thunk';
import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(lists, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk, logger)));

ReactDOM.render(
    <BrowserRouter>
     <MuiThemeProvider>
        <Provider store={store}>
            <App />
        </Provider>
        </MuiThemeProvider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
