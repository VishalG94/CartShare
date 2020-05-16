import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login/Login'
import Home from './Home/Home'
import SignUp from './SignUp/SignUp'
import Navbar from './LandingPage/Navbar'
import Pool from './Pool/Pool'

import AddStore from './AddStore/AddStore'
// import PrivateRoute from '../lib/PrivateRoute'
import VerifyAccount from './SignUp/VerifyAccount';
import SignupDetails from './SignUp/SignupDetails'
import AddProduct from './AddProduct/AddProduct'
import AdminHome from './AdminHome/AdminHome'
import ProductsDisplay from './AdminHome/ProductsDisplay'
import SearchProducts from './Orders/SearchProducts'
import PoolHome from './Pool/PoolHome'
import CreatePool from './Pool/CreatePool'
import JoinPool from './Pool/JoinPool'
import SearchPool from './Pool/SearchPool'
import SearchPoolData from './Pool/SearchPoolData'
import RequestHome from './Request/RequestHome'
import Orders from './Orders/Orders'
import UserProfile from './Profile/UserProfile'
import MessagePooler from './Pool/MessagePooler'
// Create a Main Component

class Main extends Component {
  render() {
    return (
      <div>
        {/* Render Different Component based on Route */}
        <Route path='/' component={Navbar} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/home' component={Home} />
        <Route path="/verifyaccount/:ID" render={(match) => (<VerifyAccount {...match} />)} />
        <Route path='/signupdetails/:email' component={SignupDetails} />
        <Route path='/addstore' component={AddStore} />
        <Route path='/addproduct' component={AddProduct} />
        <Route path='/stores' component={AdminHome} />
        <Route path='/products/:id' component={ProductsDisplay} />
        <Route path='/search/:id' component={SearchProducts} />
        <Route path='/poolhome' component={PoolHome} />
        <Route path='/createpool' component={CreatePool} />
        <Route path='/joinpool/:poolId' component={JoinPool} />
        <Route path='/searchpool' component={SearchPool} />
        <Route path='/searchpooldata/:unit/:value' component={SearchPoolData} />
        <Route path='/requesthome' component={RequestHome} />
        <Route path='/orders' component={Orders} />
        <Route path='/profile' component={UserProfile} />
        <Route path='/messagepooler' component={MessagePooler} />

      </div>
    )
  }
}
// Export The Main Component
export default Main
