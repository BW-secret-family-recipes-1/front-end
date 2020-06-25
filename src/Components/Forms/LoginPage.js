
import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../utils/actions";
import { withRouter } from "react-router";
import { Form, Label, Input } from 'reactstrap';
import LabeledInput from './LabeledInput';
import '../../App.css';

class LoginPage extends React.Component {
  state = {
    credentials: {
      email: "",
      password: ""
    }
  };

  handleChanges = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  logIn = e => {
    e.preventDefault();
    this.props.logIn(this.state.credentials, this.props.history);
    this.setState({
      credentials: {
        email: "",
        password: ""
      }
    });
  };

  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/user" />;
    }
    return (
      <div className="login-wrapper">
        <div>
          {this.props.loggingIn ? (
            <h2>Loading</h2>
          ) : (
            <>
              <form onSubmit={this.logIn}>
                <div className="login-header">
                  <h2>Your Secret Cookbook</h2>
                  <h3>Log in</h3>
                </div>
                <p>Email</p>
                <input
                  type="text"
                  required
                  name="email"
                  onChange={this.handleChanges}
                  value={this.input}
                />
                <p>Password</p>
                <input
                  type="password"
                  required
                  name="password"
                  onChange={this.handleChanges}
                  value={this.input}
                />
                <button className="login-btn" type="submit">
                  Log In
                </button>
                <p className="login-small-font">
                  Not a member? Sign up{" "}
                  <Link className="login-link" to="/signup">
                    here
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggingIn: state.loggingIn,
  success: state.success
});

export default withRouter(
  connect(
    mapStateToProps,
    { logIn }
  )(LoginPage)
);