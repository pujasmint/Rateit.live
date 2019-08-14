import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Nav from "./components/nav";
import AuthService from "./api/authservice";
import { withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.user === null) {
      this.service
        .getLoggedInUser()
        .then(response => this.setLoggedInUser(response))
        .catch(err => {
          console.log("Error while uploading the file: ", err);
        });
    }
  }

  setLoggedInUser = user => {
    this.setState({
      user
    });
    this.props.history.push("/");
  };



  logout = () => {
    this.service
      .logOut()
      .then(() => this.setLoggedInUser(null))
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    this.fetchUser();
    return (
      <>
        <Nav logout={this.logout} user={this.state.user}/>
        <Switch>
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                setLoggedInUser={this.setLoggedInUser}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/signup"
            render={props => (
              <Signup
                {...props}
                setLoggedInUser={this.setLoggedInUser}
                user={this.state.user}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);