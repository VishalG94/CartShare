import React, { Component } from 'react'
import '../../App.css'
// import './AddStore.css'
import axios from 'axios'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import { Field, reduxForm } from 'redux-form'
import ROOT_URL from '../../constants.js'

import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row, Util
} from 'reactstrap';
import Banner from '../Banner/Banner'
import StoreBanner from '../StoreBanner/StoreBanner'
import * as UTIL from '../utils/Utils'
// import { Button, Card, Image } from 'semantic-ui-react'

// Define a Login Component
class PoolHome extends Component {
    // call the constructor method
    constructor(props) {
        // Call the constrictor of Super class i.e The Component
        super(props) // maintain the state required for this component
        this.state = {
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            store: [],
            storeDetails: [],
            authFlag: false,
            failed: false,
            success: false
        } // Bind the handlers to this class // this.usernameChangeHandler = this.usernameChangeHandler.bind(this) // this.passwordChangeHandler = this.passwordChangeHandler.bind(this) // this.submitLogin = this.submitLogin.bind(this)
    } // Call the Will Mount to set the auth Flag to false

    // componentWillMount() {

    //     axios.defaults.withCredentials = true
    //     axios
    //         .get(`${ROOT_URL}/getstores`, { params: '' })
    //         .then(response => {
    //             // console.log(response)
    //             console.log("Inside Product Creation" + JSON.stringify(response.data));
    //             sessionStorage.setItem("Allstores", JSON.stringify(response.data));
    //             this.setState({ storeDetails: response.data })

    //             let data1 = (response.data).map(store => {
    //                 return store.name;
    //             })
    //             console.log(data1);
    //             this.setState({
    //                 store: data1
    //             })
    //         })
    // }

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    // onSubmit = formValues => {
    //     console.log("Inside Store Creation" + formValues);
    //     let data = {
    //         name: formValues.name,
    //         address: {
    //             street: formValues.street,
    //             city: formValues.city,
    //             state: formValues.state,
    //             zip: formValues.zip
    //         }
    //     }
    //     // console.log(data)
    //     axios.defaults.withCredentials = true;
    //     axios.post(`${ROOT_URL}/stores`, data).then(response => {
    //         // update the state with the response data
    //         this.setState({
    //             failed: false,
    //             success: true
    //         })
    //         console.log('Axios post:', response.data);
    //     }).catch(error => {
    //         console.log(error);
    //         this.setState({
    //             failed: true,
    //             success: false
    //         })
    //     });
    // }

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div>
                    <label style={{ color: 'red' }}>{error}</label>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta, className = { className } }) => {
        return (
            <div>
                <div htmlFor='email' style={{ color: '#6b6b83' }}>
                    {label}
                </div>
                <input
                    className='form-control'
                    style={{ marginRight: '10px' }}
                    {...input}
                />
                {this.renderError(meta)}
            </div>
        )
    }

    render() {

        let redirectVar = null
        let invalidtag = null


        let bannerDetails = this.state.storeDetails;
        let bannerNew = []

        let noPoolMember = null;
        var userRole = UTIL.getUserRole();
        if (userRole === "User") {
            noPoolMember = (
                <div style={{ position: "relative", marginTop: "25%", marginLeft: "32%" }}>
                    <h3 style={{ fontWeight: "bold", color: "A9A9A9" }}>
                        Currently you are not in any pool!!
                    </h3>

                    <h4 style={{ color: "grey" }}>
                        Options : <a href='/createpool'>Create Pool</a>     |     <a href='/searchpool'>Browse Pools</a>
                    </h4>
                </div>)
        } else if (userRole === "POOL_LEADER") {
            noPoolMember = (
                <div style={{ position: "relative", marginTop: "25%", marginLeft: "23%" }}>
                    <h3 style={{ fontWeight: "bold", color: "A9A9A9" }}>
                        Currently you're a {userRole} in PoolX!!
                    </h3>

                    <h4 style={{ color: "grey" }}>
                        Options : <a href='/deletepool'>Delete Pool</a>     |     <a href='/viewpool'>View Pool</a>

                    </h4>
                </div>)
        } else {
            noPoolMember = (
                <div style={{ position: "relative", marginTop: "25%", marginLeft: "27%" }}>
                    <h3 style={{ fontWeight: "bold", color: "A9A9A9" }}>
                        Currently you're a {userRole} in PoolX!!
                    </h3>

                    <h4 style={{ color: "grey" }}>
                        <a href='/viewpool'>Click here</a> to send a message to other pool members
                    </h4>
                </div>)
        }



        var getNewproductsArray = (bannerDetails, countperrow) => {
            let count = bannerDetails.length
            let bannerNew = []
            // let countperrow=2;
            while (count > 0) {
                let bannerrow = [];
                if (count - countperrow >= 0) {
                    for (let i = 0; i < countperrow; i++) {
                        bannerrow.push(bannerDetails[count - 1])
                        count--;
                    }

                } else {
                    console.log(count);
                    for (let j = count; j > 0; j--) {
                        console.log(j);
                        bannerrow.push(bannerDetails[j - 1])
                        count--;
                    }
                }
                bannerNew.push(bannerrow)
            }
            return bannerNew;
        }
        bannerNew = getNewproductsArray(bannerDetails, 4);
        let bannerFinal = bannerNew.map((data) => {
            return <StoreBanner bannerDetails={data}></StoreBanner>
        })

        if (this.state.failed) {
            invalidtag = (
                <label style={{ color: 'red' }}>*Store already exists!</label>
            )
        }

        if (this.state.success) {
            invalidtag = (
                <label style={{ color: 'green' }}>Successfully created new Store</label>
            )
        }


        return (

            < div >
                {/* {redirectVar} */}
                <div>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <LeftNavbar />
                        </div>
                        <div class='split-center_home'>
                            <div class='login-form'>

                                <div class='panel'>
                                    <br></br>
                                    <h2 style={{ marginLeft: '20px' }}>Pool Options</h2>
                                    <hr></hr>
                                </div>

                                <div className="row">
                                    <div className='col-12'>
                                        {noPoolMember}
                                        {/* <div className="row">
                                            <div className="col-sm-2"></div>
                                            <div className='col-sm-2'>

                                                <Link to="createpool">
                                                    <button type="submit" className='btn btn-info'>
                                                        Create Pool
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className='col-sm-2'>
                                                <Link to="searchpool">
                                                    <button type="submit" className='btn btn-info'>
                                                        Search Pool
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className='col-sm-2'>
                                                <button className='btn btn-info'>Delete Pool</button>
                                            </div>
                                            <div className='col-sm-2'>
                                                <button className='btn btn-info'>View Pool</button>
                                            </div>
                                        </div> */}

                                    </div>


                                </div>



                                {bannerFinal}
                                <br />
                                <br />
                                <br />
                                {invalidtag}

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}




const validate = formValues => {
    const error = {}
    if (!formValues.name) {
        error.name = 'Enter a valid name'
    }
    if (!formValues.street) {
        error.street = 'Enter a valid street'
    }
    if (!formValues.city) {
        error.city = 'Enter a valid city'
    }
    if (!formValues.state) {
        error.state = 'Enter a valid state'
    }

    if (!formValues.zip) {
        error.zip = 'Enter a valid zip'
    }
    return error
}

const mapStateToProps = state => {
    return { owner: state.owner }
}

export default connect(
    mapStateToProps
)(
    reduxForm({
        form: 'streamMenu',
        validate: validate
    })(PoolHome)
)