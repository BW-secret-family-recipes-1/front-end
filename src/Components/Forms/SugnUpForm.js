import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../utils/actions";
import ObjectForm from './ObjectForm';

class SignupForm extends React.Component {
    state = {
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: ""
    };
    errors = {
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: ''
    }

    handleChanges = e => {
        e.persist();
        this.setState({
          [e.target.name]: e.target.value
        });
      };

      signUp = e => {
        e.preventDefault();
        if (this.state.password === this.state.confirm_password) {
          const newUser = {
            email: this.state.email,
            password: this.state.password
          };
          this.props.signUp(newUser, this.props.history);
          this.setState({
            email: "",
            password: "",
            confirm_password: ""
          });
        } else {
          this.setState({ ...this.state, passwordMatch: false });
        }
      };

      render() {
        return (
            <div className="signup-page-wrapper">
            <div className="signup-form-wrapper">
              {this.props.signingUp ? (
                <h2>Loading</h2>
              ) : (
                <>
                  <ObjectForm
                    object = {this.state}
                    change = {this.handleChanges}
                    submit = {this.signUp}
                    errors = {this.errors}
                    types = {{
                      email: 'text',
                      password: 'password',
                      confirm_password: 'password',
                      first_name: 'text',
                      last_name: 'text'
                    }}
                    action = {[{text: 'Sign Up', action: signUp}]}
                  />
                    {!this.state.passwordMatch ? (
                      <p>Oops! Your passwords don't match</p>
                    ) : (
                      ""
                    )}
                    <p className="signup-small-font">
                      Already a member? Sign in{" "}
                      <Link to="/" className="signup-link">
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
      signingUp: state.signingUp
    });
    
export default withRouter(
    connect(
        mapStateToProps,
        { signUp }
    )(SignupForm)
);