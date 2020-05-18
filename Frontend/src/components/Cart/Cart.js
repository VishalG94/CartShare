import React from 'react'
import '../../App.css'
// import './RestaurantMenu.css'
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios'
import ROOT_URL from '../../constants.js'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
// import { userOrder } from '../../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


class Cart extends React.Component {
  constructor(props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    // alert(this.props);
    this.state = {
      checkout: '',
      failed: '',
      success: '',
      count: 0,
      pickupOption: false,
      selectedOption: "self",
      redirect: false
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (e.target.getAttribute('price') > 0) {

      if (this.state.count == 0) {
        this.setState({
          pickupOption: true
        })
        this.state.count++
      }
      else {
        let order_items = JSON.parse(sessionStorage.getItem("order_items"))
        let order = []
        order_items.map(item => {
          let temp = {
            product: {
              id: item.id
            },
            quantity: item.quantity,
            price: item.quantity * item.price
          }

          order.push(temp)
        })

        let data = {
          price: e.target.getAttribute('price'),
          status: "PENDING",
          store: {
            id: sessionStorage.getItem("store")
          },
          pickupOption: this.state.selectedOption,
          order_items: order,
        }

        sessionStorage.setItem("order", JSON.stringify(data))

        if(this.state.selectedOption == "self")
        {
          this.setState({
            redirect:true
          }) 
        }
        else
        {
          axios.post(`${ROOT_URL}/addorder`, data, { 
            params: 
            {
                userId : localStorage.getItem("ID")                
            } 
        }).then(response => {
          // update the state with the response data
          this.setState({
            failed: false,
            success: true            
          })
          alert("Order succesfully placed")
          sessionStorage.removeItem("order_items")
          sessionStorage.removeItem("order")
          window.location.reload()
          console.log('Axios post:', response.data);
        }).catch(error => {
          console.log(error);
          this.setState({
            failed: true,
            success: false
          })
        });         
       
        }
        

        // axios.defaults.withCredentials = true
        // let userId = localStorage.getItem("ID")
        // axios.post(`${ROOT_URL}/addorder`, data, { params: { userId } }).then(response => {
        //   // update the state with the response data
        //   this.setState({
        //     failed: false,
        //     success: true,
        //     redirect:true
        //   })
        //   alert("Order succesfully placed")
        //   sessionStorage.removeItem("order_items")
        //   sessionStorage.removeItem("order")
        //   window.location.reload()
        //   console.log('Axios post:', response.data);
        // }).catch(error => {
        //   console.log(error);
        //   this.setState({
        //     failed: true,
        //     success: false
        //   })
        // });
      }
    }
    else {
      alert('Add atleast one product to the cart before checkouts!')
    }
  }

  handleOptionChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  }

  removeFromCart(e, obj) {
    console.log("Inside add to cart", obj);

    var oldOrderItems = []

    if (sessionStorage.getItem("order_items")) {
      oldOrderItems = JSON.parse(sessionStorage.getItem("order_items"))
    }

    if (oldOrderItems.length > 0) {
      for (let i = 0; i < oldOrderItems.length; i++) {
        if (oldOrderItems[i].id.sku == obj.id.sku) {
          console.log("i ", i)
          oldOrderItems.splice(i, 1)
        }
      }
    }

    sessionStorage.setItem("order_items", JSON.stringify(oldOrderItems))

    window.location.reload()
  }

  render() {
    let itemslist = null
    let pickupField = null
    let redirectVar = null

    if(this.state.redirect)
    {
      redirectVar = <Redirect to='/checkout' />
    }
    else{
      redirectVar=null
    }

    if (this.state.pickupOption) {
      pickupField =
        <div>
          <div className="row">
            <label>
              How do you want to pick up your order?
          </label>
          </div>
          <div className="row">
            <div className="radio">
              <label>
                <input type="radio" value="self" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'self'} />
                  Self
              </label>
            </div>
          </div>
          <div className="row">
            <div className="radio">
              <label>
                <input type="radio" onChange={this.handleOptionChange} value="others" checked={this.state.selectedOption === 'others'} />
                  Other Pool Members
              </label>
            </div>
          </div>
        </div>
    }
    let items = []
    if (sessionStorage.getItem("order_items")) {
      items = JSON.parse(sessionStorage.getItem("order_items"))
    }

    let total = 0;

    itemslist = (items).map(item => {
      console.log("Item ", item)
      // console.log('List',list)
      total = total + (item.price * item.quantity)
      return (
        <div>
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            <div>{item.name}</div>
          </div>
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            {/* <div>*{items[item][0]}</div> */}
            <div>{item.quantity}</div>
          </div>
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            <div>
              {item.price * item.quantity}
              {/* <button type="submit" class="btn btn-link" id={JSON.stringify(item)}   >
                <i onClick={(e) => { this.removeFromCart(e, item) }} style={{ color: 'red' }} class="fas fa-minus-circle fa-lg"></i>
              </button> */}
            </div>
          </div>          
        </div>
      )
    })

    let grossTotal = total + total*0.0975
  
    return (
      <div>
        {redirectVar}
        <div className='row'>{itemslist}</div>
        <br />
        <div className="row">
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            <label>Tax</label>
          </div>
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            {/* <div>*{items[item][0]}</div> */}
          </div>
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            <label>$ {0.0925 * total}</label>
          </div>
        </div>
        <div className="row">
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            <label>Convenience fee</label>
          </div>
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            {/* <div>*{items[item][0]}</div> */}
          </div>
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            <label>$ {0.005 * total}</label>
          </div>
        </div>
        <div className="row">
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            <label>Total</label>
          </div>
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            {/* <div>*{items[item][0]}</div> */}
          </div>
          <div style={{ textAlign: "center" }} className='col-sm-4'>
            <label>$ {grossTotal}</label>
          </div>
        </div>
        <br />
        <div style={{textAlign:"center"}} className="row">
          {pickupField}
        </div>

        <div className='row'>
          <a
            href='/userorder'
            style={{ marginLeft: '35%' }}
            className='btn btn-primary'
            type='submit'
            price={grossTotal}
            onClick={this.onSubmit}
          >
            Checkout
          </a>
        </div>
      </div>
    )
  }
}
// console.log("Inside search: ",this.props);

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(withRouter(Cart));
