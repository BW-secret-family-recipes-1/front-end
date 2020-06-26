import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../utils/actions";
import ObjectForm from './ObjectForm';
import * as yup from 'yup'

class SignUpForm extends React.Component {
    state = {
      user: {
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        passwordMatch: true
      },
      errors: {
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: ''
      }
    };
    

    formSchema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required("Must enter an email"),
      password: yup
        .string()
        .required('must enter a password'),
      confirm_password: yup
        .string()
        .test('match', 'Passwords must match', (confirm_password)=> {return confirm_password === this.state.user.password}),
      first_name: yup
        .string()
        .required('Please enter a first name'),
      last_name: yup
        .string()
        .required('Please enter a last name')
    })

    validate(e){
      yup.reach(this.formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid =>{
            this.setState({...this.state, errors: {...this.state.errors, [e.target.name]: ''}})
          })
          .catch(err =>{
            this.setState({...this.state, errors: {...this.state.errors, [e.target.name]: err.errors[0]}})
          })
        
    }

    

    handleChanges = e => {
        e.persist();
        this.validate(e)
        this.setState({...this.state, user: {...this.state.user, 
          [e.target.name]: e.target.value
        }});
      };

      signUp = e => {
        debugger
        e.preventDefault();
        if (this.state.user.password === this.state.user.confirm_password) {
          const newUser = {
            email: this.state.user.email,
            password: this.state.user.password
          };
          this.props.signUp(newUser, this.props.history);
          this.setState({...this.state, user:{
            email: "",
            password: "",
            confirm_password: "",
            first_name: '',
            last_name: '',
            passwordMatch: true
          }});
        } else {
          this.setState({...this.state, user: { ...this.state.user, passwordMatch: false }});
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
                  
                  <div className="form-wrapper" onSubmit={this.signUp}>
                    <div className="signup-form-header">
                      <div className="signup-logo-wrapper">
                      </div>
                      <h3>Welcome to</h3>
                      <h2>Secret Cookbook</h2>
                    </div>
                    <ObjectForm
                    object={this.state.user}
                    change={this.handleChanges}
                    submit={this.signUp}
                    errors={this.state.errors}
                    types={{
                      email: 'text',
                      password: 'password',
                      confirm_password: 'password',
                      first_name: 'text',
                      last_name: 'text'
                    }}
                    action={[
                      {
                        text: 'Sign Up',
                        action: signUp
                      }
                    ]}
                    />
                    {!this.state.user.passwordMatch ? (
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
                    </div>
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
    )(SignUpForm)
);