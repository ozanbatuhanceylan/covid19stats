import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import CountryDetail from './pages/CountryDetail/index'
import Home from './pages/Home/home'

  class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/country/:countryCode" component={CountryDetail} />
              </Switch>
            
          </Router>
        );
     }
  }

  export default RouterComponent;