import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { loginuser, getProfile } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from "react-google-login";

// Define a Login Component
class Login extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      email: '',
      password: '',
      authFlag: false,
      authFailed: false
    }

  }
  // Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
      authFailed: false
    })
  }
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <label style={{ color: 'red' }}>{error}</label>
        </div>
      )
    }
  }

  renderInput = ({ input, type, label, meta }) => {
    return (
      <div>
        <div htmlFor='email' style={{ color: '#6b6b83' }}>
          {label}
        </div>
        <div class='form-group'>
          <input class='form-control' type={type} {...input} />
          {this.renderError(meta)}
        </div>
      </div>
    )
  }

  onSubmit = formValues => {
    console.log('OnSubmit' + formValues)
    let data = {
      email: formValues.email,
      password: formValues.password
    }
    axios.defaults.withCredentials = true
    this.props.loginuser(data, res => {
      if (res.status === 200) {
        console.log('Inside response', res.data)
        this.setState({
          authFlag: true
        })

        const user = jwtDecode(res.data.token)
        console.log(user)

        sessionStorage.setItem('email', user.email)

        sessionStorage.setItem('id', res.data.id)
        sessionStorage.setItem('first_name', res.data.first_name)
        sessionStorage.setItem('last_name', res.data.last_name)
        sessionStorage.setItem('username', res.data.username)
        this.props.history.push('/home')
        window.location.reload()
      } else {
        alert('Please enter valid credentials')
      }
    })

  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {

    let redirectVar = null
    let invalidtag = null
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/login' />
    }
    let redirecthome = null
    if (this.state.authFlag) {
      redirecthome = <Redirect to='/home' />
    }
    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }

    let loggedIn = (localStorage.getItem("name") === null);
    if (!loggedIn) {
      return (<Redirect to='/estimateprice' />);
    }
    else {

      const responseGoogle = (response) => {
        // var data = {
        //   email: response.profileObj.email,
        //   username: response.profileObj.name
        // }
        // console.log(response.profileObj);
        // alert('data:' + data);
        if (typeof (response.profileObj.name) !== 'undefined' && response.profileObj.name !== null) {
          localStorage.setItem('name', response.profileObj.name);
          localStorage.setItem('userType', "user");
          localStorage.setItem('userName', response.profileObj.name);
          window.location.reload();
        }

        // axios.defaults.withCredentials = true;
        // axios.post(`${ROOT_URL}/users/signupWithGoogle`, data)
        //     .then(res => {
        //         console.log(res.status + "Resulyt bkwsde");
        //         // var resultData = res.data[0];
        //         if (res.status === 200) {

        //             console.log("Correct Login");
        //             //localStorage.setItem('token', resultData.x);
        //             localStorage.setItem('name', response.profileObj.name);
        //             localStorage.setItem('userType', "user");
        //             localStorage.setItem('userName', response.profileObj.name);
        //             this.setState({
        //                 authFlag: true
        //             })
        //             this.props.history.pun
        //             sh('/estimateprice')
        //         }
        //         else {

        //             console.log("Invaid Login");
        //             this.setState({
        //                 authFlag: false,
        //                 errorMessage: "Invalid Login",

        //                 password: "",
        //                 name: "",
        //             })
        //         }
        //     });
      }

      const responseFacebook = (response) => {

        if (typeof (response.email) !== 'undefined' && response.email !== null) {
          localStorage.setItem('name', response.email);
          localStorage.setItem('userType', "user");
          localStorage.setItem('userName', response.name);
          window.location.reload();
        }


        // alert('data:' + data);
        // alert(JSON.stringify(response))
        // var data = {
        //     email: response.email,
        //     username: response.name
        // }
        // axios.defaults.withCredentials = true;
        // axios.post(`${ROOT_URL}/users/signupWithFacebook`, data)
        //     .then(res => {
        //         alert(res.status + "Resulyt bkwsde");
        //         // var resultData = res.data[0];
        //         if (res.status === 200) {

        //             console.log("Correct Login");
        //             //localStorage.setItem('token', resultData.x);
        //             localStorage.setItem('name', res.data.email);
        //             localStorage.setItem('userType', "user");
        //             localStorage.setItem('userName', res.data.username);
        //             this.setState({
        //                 authFlag: true
        //             })
        //             this.props.history.push('/estimateprice')
        //         }
        //         else {
        //             console.log("Invaid Login");
        //             this.setState({
        //                 authFlag: false,
        //                 errorMessage: "Invalid Login",
        //                 password: "",
        //                 name: ""
        //             })
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
      }

      const failureGoogle = (response) => {
        console.log(response);
      }

      // const responseGoogle = (response) => {
      //     var data = {
      //         email: response.profileObj.email,
      //         username: response.profileObj.name
      //     }
      //     console.log(response.profileObj);
      //     console.log('data:' + data);

      //     axios.defaults.withCredentials = true;
      //     axios.post(`${ROOT_URL}/users/signupWithGoogle`, data)
      //         .then(res => {
      //             console.log(res.status + "Resulyt bkwsde");
      //             // var resultData = res.data[0];
      //             if (res.status === 200) {

      //                 console.log("Correct Login");
      //                 //localStorage.setItem('token', resultData.x);
      //                 localStorage.setItem('name' , res.data.email);
      //                 localStorage.setItem('userType' , "user");
      //                 localStorage.setItem('userName' , res.data.username);
      //                 this.setState({
      //                     authFlag: true
      //                 })
      //                 this.props.history.push('/userPage')
      //             }
      //             else {

      //                 console.log("Invaid Login");
      //                 this.setState({
      //                     authFlag: false,
      //                     errorMessage: "Invalid Login",

      //                     password: "",
      //                     name: "",
      //                 })
      //             }
      //         });
      // }

      // const failureGoogle = (response) => {
      //   //  alert("Login using Google Failed. Please check console for more details.");
      //     console.log(response);
      // }

      return (
        <form
          className='ui form error'
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <div>
            {redirectVar}
            {redirecthome}
            <div class='container'>
              <div class='login-form'>
                <div class='main-div'>
                  <div class='panel'>
                    <h2>Sign in with your CartShare account</h2>
                    {invalidtag}
                  </div>
                  <Field
                    name='email'
                    type='text'
                    component={this.renderInput}
                    label='Email'
                  />
                  <br />
                  <Field
                    name='password'
                    type='password'
                    component={this.renderInput}
                    label='Password'
                  />
                  <br />
                  <br />
                  <button type='submit' class='btn btn-info'>
                    Login
                </button>
                  <br />
                  <br />
                  <div style={{ textAlign: 'center' }} class='form-group'>
                    <span>New to CartShare? </span><Link to='/signup'>Sign up now >></Link>
                  </div>
                  {/* <GoogleLogin
                    clientId="84996024599-n7n6fr55qf3d6ii8seoe20l2snbd59q1.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                    buttonText="LOGIN WITH GOOGLE"
                    // render={renderProps => (
                    //     <button class="my-facebook-button-class" onClick={renderProps.onClick} disabled={renderProps.disabled}>LOGIN WITH GOOGLE</button>
                    // )}
                    onSuccess={responseGoogle}
                    onFailure={failureGoogle}
                  />
                  <br></br>
                  <br></br>
                  <FacebookLogin
                    appId="433867077242221"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                    textButton='LOGIN WITH FACEBOOK'
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    }
  }
}

const validate = formValues => {
  const error = {}
  if (!formValues.email) {
    error.email = 'Enter a valid email'
  }
  if (!formValues.password) {
    error.password = 'Enter a valid Password'
  }
  return error
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  { loginuser, getProfile }
)(
  reduxForm({
    form: 'streamLogin',
    validate: validate
  })(Login)
)



