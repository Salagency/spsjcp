import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import './index.css';
// import App from './components/App';
import Home from './components/home/home';
import Create from './components/create/create';
import Scan from './components/scan/scan';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router
    onUpdate={() => {
      window.scrollTo(0, 0);
    }}
    history={browserHistory}
  >
    <Route path="/" component={Home} />
    <Route path="/create" component={Create} />
    <Route path="/scan" component={Scan} />
  </Router>
, document.getElementById('root')
);
registerServiceWorker();
