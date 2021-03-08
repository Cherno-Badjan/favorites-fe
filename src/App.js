import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import FavoritesPage from './FavoritesPage/FavoritesPage.js';
import Header from './Components/Header.js';
import SearchPage from './SearchPage/SearchPage.js';
import PrivateRouter from './Components/PrivateRouter.js';
import SignUpPage from './AuthPages/SignUpPage.js';
import { getUserFromLs, putUserInLs } from './localStorageUtils';
import HomePage from './Home/HomePage';
import LoginPage from './AuthPages/LoginPage.js';


export default class App extends Component {
  state = {
    user: getUserFromLs(),
  }
  handleUserChange = (user) => {
    this.setState({ user })

    putUserInLs(user);
  }

  handleLogout = () => {
    this.handleUserChange();
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <Router>
          <Header user={this.state.user}
            handleLogout={this.handleLogout} />
          <Switch>
            <Route path="/" exact render={(routerProps) => <HomePage {...routerProps} />} />
            <Route path="/search" exact render={(routerProps) => <SearchPage {...routerProps} user={this.state.user} />} />
            <PrivateRouter path="/favorites" exact token={user && user.token} render={(routerProps) => <FavoritesPage user={this.state.user} {...routerProps} />} />
            <Route path="/signup" exact render={(routerProps) => <SignUpPage handleUserChange={this.handleUserChange} {...routerProps} />} />
            <Route path="/login" exact render={(routerProps) => <LoginPage handleUserChange={this.handleUserChange} {...routerProps} />} />
          </Switch>

        </Router>

      </div >

    )
  };
}

