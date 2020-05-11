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
import { history } from "../utils/Utils"
import ROOT_URL from '../../constants'
import * as UTIL from '../utils/Utils';

class SignupDetails extends Component {
    constructor(props) {

        super(props)

        this.state = {
            nickName: '',
            screenName: '',
            role: '',
            email: '',
            password: '',
            oauthFlag: false,
            authFlag: false,
            authFailed: false
        }

    }

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

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (formValues) => {
        // this.setState({
        //     this.state.nickName: formValues.nickname,
        //     screenName: formValues.screenname,
        //     email: this.props.match.params.email,
        //     password: ""
        // });
        this.state.nickName = formValues.nickname
        this.state.screenName = formValues.screenname
        this.state.email = this.props.match.params.email
        if (this.state.email.includes("sjsu")) {
            this.state.role = "Admin";
        }
        else {
            this.state.role = "User";
        }
        this.state.oauthFlag = true;
        console.log("val" + this.state.email)
        this.signupHandler(this.state);
    }

    signupHandler(data) {
        axios.defaults.withCredentials = true
        fetch(`${ROOT_URL}/api/signup`, {
            method: 'POST',
            mode: 'cors',
            headers: { ...UTIL.getUserHTTPHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 200) {
                console.log('Response signup pooler: ', res.data)
                this.setState({
                    authFlag: true
                })
                alert("Verification mail has been sent. Please verify before login.!!")
                window.location.replace('/login')
            } else if (res.status == 302) {
                alert("User is already registered with same email id");
                window.location.reload();
                this.setState({
                    authFlag: false
                })
            } else {
                console.log('Failed')
                this.setState({ authFailed: true })
                alert("User registeration failed because of sever error")
            }
        })
    }

    render() {

        let invalidtag = null
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
            return (
                <form
                    className='ui form error'
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <div>
                        <div class='container'>
                            <div class='login-form'>
                                <div class='main-div'>
                                    <div class='panel'>
                                        <h2>Thank you for Google signup!</h2>
                                        <h2>Please provide below details</h2>
                                        {invalidtag}
                                    </div>
                                    <Field
                                        name='screenname'
                                        type='text'
                                        component={this.renderInput}
                                        label='Screenname'
                                    />
                                    <br />
                                    <Field
                                        name='nickname'
                                        type='text'
                                        component={this.renderInput}
                                        label='Nickname'
                                    />
                                    <br />
                                    <br />
                                    <button type='submit' class='btn btn-info'>
                                        Signup!
                </button>
                                    <br />
                                    <br />
                                    <br></br>
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
        error.email = 'Enter a valid ScreenName'
    }
    if (!formValues.password) {
        error.password = 'Enter a valid NickName'
    }
    return error
}


export default
    reduxForm({
        form: 'streamSignupDetails',
        validate: validate
    })(SignupDetails)




