import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import authService from "./services/authService";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import Admin from "./components/admin";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  state = {};
  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer autoClose={2000} />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            {/* <Route path="/profile" component={Profile} /> */}
            <Route path="/profile" render={() => <Profile user={user} />} />
            <Route
              path="/movies/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <MovieForm {...props} />;
              }}
            />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/admin" component={Admin} />
            <Route path="/" exact component={Movies} />
            <Route pah="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}
