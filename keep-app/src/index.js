import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { Provider} from 'react-redux'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ListReducers from  './reducers/ListReducers';
import thunk from 'redux-thunk';
import "./index.css";

const store = createStore(ListReducers, applyMiddleware(thunk, logger));

ReactDOM.render(
    <BrowserRouter>
     <MuiThemeProvider>
        <Provider store={store}>
            <App />
        </Provider>
        </MuiThemeProvider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
