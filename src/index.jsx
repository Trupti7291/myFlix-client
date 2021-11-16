import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
<<<<<<< HEAD
import { MainView } from './components/main-view/main-view';
=======
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
>>>>>>> myFlix-client

import MainView from './components/main-view/main-view';


// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
<<<<<<< HEAD
            <container>
                <MainView />
            </container>
=======
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
>>>>>>> myFlix-client
        );
    }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);