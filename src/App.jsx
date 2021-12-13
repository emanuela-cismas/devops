import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Animals from './pages/Animals';
import Appointments from './pages/Appointments';
const App = () => {
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route component={Home} exact path="/home" />
        <Route component={Login} exact path="/" />
        <Route component={Login} exact path="/login" />
        <Route component={Animals} exact path="/animals/:idCategory" />
        <Route component={Register} exact path="/register" />
      </Switch>
    </BrowserRouter>
  </React.Fragment>;
};

export default App;
