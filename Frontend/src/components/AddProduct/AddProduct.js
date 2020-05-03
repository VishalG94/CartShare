import React, { Component } from 'react'
import '../../App.css'
// import './AddStore.css'
import axios from 'axios'
import AdminNavbar from '../LeftNavbar/AdminNavbar'
import { Field, reduxForm } from 'redux-form'
import ROOT_URL from '../../constants.js'

import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import DropdownList from 'react-widgets/lib/DropdownList'
import 'react-widgets/dist/css/react-widgets.css'
import Multiselect from 'react-widgets/lib/Multiselect'

// Define a Login Component
class AddProduct extends Component {
  // call the constructor method
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props) // maintain the state required for this component
    this.state = {
      name: '',
      storeId: '',
      sku: '',
      name: '',
      description: '',
      imageurl: '',
      brand: '',
      units: ['Piece', 'Pound', 'Oz'],
      price: '',
      store: [],
      storeDetails: [],
      authFlag: false,
      failed: false,
      success: false
    } // Bind the handlers to this class // this.usernameChangeHandler = this.usernameChangeHandler.bind(this) // this.passwordChangeHandler = this.passwordChangeHandler.bind(this) // this.submitLogin = this.submitLogin.bind(this)
  } // Call the Will Mount to set the auth Flag to false

  componentWillMount() {

    axios.defaults.withCredentials = true
    axios
      .get(`${ROOT_URL}/getstores`, { params: '' })
      .then(response => {
        // console.log(response)
        // console.log("Inside Product Creation" + JSON.stringify(response.data));
        this.setState({ storeDetails: response.data });
        console.log(response.data);
        let data1 = (response.data).map(store => {
          return store.name;
        })
        console.log(data1);
        this.setState({
          store: data1
        })
      })
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderDropdownList = ({ input, ...rest }) =>
    <DropdownList {...input} {...rest} />

  renderMultiselect = ({ input, ...rest }) =>
    <Multiselect {...input}
      onBlur={() => input.onBlur()}
      value={input.value || []} // requires value to be an array
      {...rest} />

  // renderSelectList = ({ input, ...rest }) =>
  //   <SelectList {...input} onBlur={() => input.onBlur()} {...rest} />


  onSubmit = formValues => {

    console.log("Inside Product Creation" + JSON.stringify(formValues));
    let storeNameList = formValues.stores;
    console.log("storeNameList: " + storeNameList);
    let storesSelected = (this.state.storeDetails).filter(storeName => {
      return storeNameList.includes(storeName.name);
    })
    console.log("storesSelected: " + JSON.stringify(storesSelected));
    let store_id = storesSelected.map((store) => { return store.id });
    // var bodyFormData = new FormData();
    // bodyFormData.set('name', formValues.name);
    // bodyFormData.set('description', formValues.description);
    // bodyFormData.set('brand', formValues.brand);
    // bodyFormData.set('price', formValues.price);
    // bodyFormData.set('unit', formValues.unit);
    // bodyFormData.set('storeId', formValues.store);
    // bodyFormData.set('store', formValues.store);
    let data = {
      id: {
        storeId: 1,
        sku: 1
      },
      name: formValues.name,
      description: formValues.description,
      brand: formValues.brand,
      imageurl: formValues.imageUrl,
      price: formValues.price,
      unit: formValues.unit,
      // storeId: 1,
      // store: 1
      // storeId: formValues.store,
      // store: formValues.store
    }
    // console.log(data)
    axios.defaults.withCredentials = true;
    axios.post(`${ROOT_URL}/addproduct`, data).then(response => {
      // update the state with the response data
      this.setState({
        failed: false,
        success: true
      })
      console.log('Axios post:', response.data);
    }).catch(error => {
      console.log(error);
      this.setState({
        failed: true,
        success: false
      })
    });
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
    const { handleSubmit, pristine, submitting } = this.props
    let redirectVar = null
    let invalidtag = null

    if (this.state.failed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Product already exists!</label>
      )
    }

    if (this.state.success) {
      invalidtag = (
        <label style={{ color: 'green' }}>Successfully created new Product</label>
      )
    }

    const units = ['Piece', 'Pound', 'Oz']

    return (
      < div >
        {/* {redirectVar} */}
        <div>
          <div className='row'>
            <div className='col-sm-2'>
              <AdminNavbar />
            </div>
            <div class='split-center_home'>
              <div class='login-form'>
                <div class='panel'>
                  <br></br>
                  <h2 style={{ marginLeft: '20px' }}>Add new Product</h2>
                  <br></br>
                </div>
                <div className='row'>
                  <div className='col-sm-6'>
                    <form
                      className='ui form error'
                      onSubmit={this.props.handleSubmit(this.onSubmit)}
                    >
                      <div style={{ marginLeft: '10%' }}>
                        {/* <br /> */}
                        <Field
                          name='name'
                          type='text'
                          component={this.renderInput}
                          label='Name'
                        />
                        <br />
                        <Field
                          name='imageUrl'
                          type='text'
                          component={this.renderInput}
                          label='ImageUrl'
                        />
                        <br />
                        <Field
                          name='description'
                          type='text'
                          component={this.renderInput}
                          label='Description'
                        />
                        <br />
                        <Field
                          name='brand'
                          type='text'
                          component={this.renderInput}
                          label='Brand'
                        />
                        <br />
                        <Field
                          name='price'
                          type='number'
                          component={this.renderInput}
                          label='price'
                        />
                        <br />
                        <div style={{ color: '#6b6b83' }}>
                          Unit
                        </div>

                        <Field
                          name="unit"
                          component={this.renderDropdownList}
                          data={units}
                          style={{
                            width: "100%",
                            border: "solid #ffffff",
                            borderRadius: "4px",
                            fontSize: "14px",
                            // height: "50px",
                            // lineHeight: "50px",
                            fontFamily: "graphik"
                          }}
                          valueField="value"
                          textField="unit" />
                        <br />
                        <div style={{ color: '#6b6b83' }}>
                          Available Stores
                        </div>
                        <Field
                          name="stores"
                          component={this.renderMultiselect}
                          defaultValue={[]}
                          // onBlur={() => this.props.onBlur()}
                          style={{
                            // width: "100%",
                            border: "solid #ffffff",
                            borderRadius: "4px",
                            fontSize: "14px",
                            // height: "50px",
                            // lineHeight: "50px",
                            fontFamily: "graphik"
                          }}
                          data={this.state.store} />
                        <br />
                        {invalidtag}
                        <br />
                        <button type='submit' class='btn btn-info'>
                          Create Product
                        </button>

                        <br />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
// export Login Component
// export default BuyerProfile

const validate = formValues => {
  const error = {}
  if (!formValues.name) {
    error.name = 'Enter a valid name'
  }
  if (!formValues.description) {
    error.description = 'Enter a valid description'
  }
  if (!formValues.price) {
    error.price = 'Enter a valid price'
  }
  if (!formValues.unit) {
    error.unit = 'Enter a valid unit'
  }
  if (!formValues.brand) {
    error.drand = 'Enter a valid brand'
  }
  return error
}


AddProduct = reduxForm({
  form: 'reactWidgets'  // a unique identifier for this form
})(AddProduct)

export default AddProduct

