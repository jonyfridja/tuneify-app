import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router';

import './App.css';
import './app.scss';

import Navbar from './cmps/Navbar';
import TuneApp from './pages/TuneApp';

const history = createBrowserHistory();

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={TuneApp} />
          </Switch>
        </Router>
      </div>
    );
  }
}
