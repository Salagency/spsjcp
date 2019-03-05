import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import './index.css';
// import App from './components/App';
import Home from './components/home/home';
import Create from './components/create/create';
import Search from './components/search/search';
import Admin from './components/admin/admin';
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
    <Route path="/search" component={Search} />
    <Route path="/admin" component={Admin} />
  </Router>
, document.getElementById('root')
);
registerServiceWorker();
