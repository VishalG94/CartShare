import React from 'react'
import '../../App.css'
// import './RestaurantMenu.css'
import { Route , withRouter} from 'react-router-dom';
import axios from 'axios'
import ROOT_URL from '../../constants.js'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
// import { userOrder } from '../../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


class Cart extends React.Component {
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    // alert(this.props);
    this.state = {
      checkout: '',
      failed : '',
      success:''      
    }
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  // }
  // componentWillMount () {
  //   let cart = JSON.parse(sessionStorage.getItem('checkout'))
  //   this.setState({
  //     checkout: cart
  //   })

  //   // this.props.getrestaurantsections({ params: data }, response => {
  //   //   // console.log( this.props.user[1])
  //   //   this.setState(
  //   //     {
  //   //       sections: this.props.user
  //   //     },
  //   //     () => {
  //   //       // sessionStorage.setItem('sections', this.state.sections)
  //   //       // console.log(this.state.restaurantdetails)
  //   //       // Object.keys(this.state.restaurantdetails).map((restaurant)=>console.log(this.state.restaurantdetails[restaurant].rating))
  //   //     }
  //   //   )
  //   //   sessionStorage.setItem('sections', this.state.sections)

  //   //   // alert(sessionStorage.getItem('sections'))
  //   // })



  // }

  onSubmit = (e) => {
    e.preventDefault();

    // console.log('OnSubmit' + e.target.getAttribute('price'))
    // alert('inside')
    if( e.target.getAttribute('price')>0){
      // alert('atleast one dishes to the cart before checkouts!')

      let order_items = JSON.parse(localStorage.getItem("order_items"))
      let order = [] 
      order_items.map(item => {
        let temp = {
            product : {
              id : item.id
            },
            quantity : item.quantity,
            price : item.quantity*item.price
        }

        order.push(temp)
      })

      let data = {
        price: e.target.getAttribute('price'),        
        status: "NEW_ORDER",
        store: {
          id: sessionStorage.getItem("store") 
        },
        order_items: order,
      }

      localStorage.setItem("order",JSON.stringify(data))

      // alert(data.restaurant_name)
      axios.defaults.withCredentials = true
  
      // this.props.userOrder(data, res => {
      //   if (res.status === 200) {
      //     console.log('Order placed successfully',res.data);
      //     // this.props.history.push("/");
      //     // sessionStorage.setItem({'orderid':res.data[0].order_id})
      //     this.props.history.push("/userorder");
      //     // <Link />
      //   } 
      // })

      axios.post(`${ROOT_URL}/addorder`, data).then(response => {
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

    }else{
      alert('Add atleast one product to the cart before checkouts!')      
    }    

  }


  removeFromCart(e, obj) {
    console.log("Inside add to cart", obj);
    
    var oldOrderItems = []    

    if (localStorage.getItem("order_items")) {
      oldOrderItems = JSON.parse(localStorage.getItem("order_items"))
    }    
    
    if(oldOrderItems.length>0)
    {
      for(let i=0;i<oldOrderItems.length;i++)
      {
         if(oldOrderItems[i].id.sku == obj.id.sku)
         {
          console.log("i ",i)
          oldOrderItems.splice(i,1)          
         }         
      }
    }

    localStorage.setItem("order_items", JSON.stringify(oldOrderItems))
    window.location.reload()
  }


  
  render () {
    let itemslist = null
    // let items = this.props.data
    
    let items = []
    if(localStorage.getItem("order_items"))
    {
       items = JSON.parse(localStorage.getItem("order_items"))
    }
    
    let total = 0;
    
    itemslist = (items).map(item => {
      console.log("Item ",item)
      // console.log('List',list)
       total = total + (item.price*item.quantity) 
      // total = total.toFixed();
      return (
        <div>
          <div className='col-sm-5'>
            <div>{item.name}</div>
          </div>
          <div className='col-sm-3'>
            {/* <div>*{items[item][0]}</div> */}
            <div>{item.quantity}</div>
          </div>
          <div className='col-sm-3'>
            {/* <div>{items[item][1] * items[item][0]}</div> */}
            <div>
              {item.price * item.quantity}                            
            </div>              
          </div>
          <div className='col-sm-1'>
          <button type="submit" class="btn btn-link" id={JSON.stringify(item)}   >
              <i onClick={(e) => { this.removeFromCart(e,item) }}  style={{ color: 'red' }} class="fas fa-minus-circle fa-lg"></i>           
              </button>
          </div>                    
        </div>
      )
    })
    // this.setState({sum: total})
    // alert(total)

    // console.log(this.props)
    return (
      <div>
        <div className='row'>{itemslist}</div>
        <br/>
        <div>
          <div className='col-sm-6'>
            <label>Total</label>
          </div>
          <div className='col-sm-3'>
            {/* <div>*{items[item][0]}</div> */}
          </div>
          <div className='col-sm-3'>
          <label>$ {total}</label>
          </div>
        </div>
        <br />
        <div className='row'>
          <a
            href='/userorder'
            //   style={{ marginLeft: '537px' }}
            className='btn btn-primary'
            type='submit'
            price={total}
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

export default connect( mapStateToProps)(withRouter(Cart));
