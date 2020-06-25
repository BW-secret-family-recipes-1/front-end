
import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../../utils/actions";
import { withRouter } from "react-router";
import { Form, Label, Input } from 'reactstrap';
import LabeledInput from './LabeledInput';
import ObjectForm from './ObjectForm';

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
     {if (localStorage.getItem("token")) {
       return <Redirect to="/user" />;
     }}
    return (
      <div className="login-page-wrapper">
        <div className="login-form-wrapper">
          {this.props.loggingIn ? (
            <h2>Loading</h2>
          ) : (
            <>
              <ObjectForm
                object={this.state.credentials}
                change={this.handleChanges}
                submit={logIn}
                errors={{
                  email: '',
                  password: ''
                }}
                types={{
                  email: 'text',
                  password: 'password'
                }}
                action={[{text: 'Log In', action: logIn}]}
              />
              
                <p className="login-small-font">
                  Not a member? Sign up{" "}
                  <Link className="login-link" to="/signup">
                    here
                  </Link>
                </p>
              
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