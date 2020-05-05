import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login/Login'
import Home from './Home/Home'
import SignUp from './SignUp/SignUp'
import Navbar from './LandingPage/Navbar'
import Pool from './Pool/Pool'

import AddStore from './AddStore/AddStore'
import PrivateRoute from '../lib/PrivateRoute'
import AddProduct from './AddProduct/AddProduct'
import AdminHome from './AdminHome/AdminHome'
import ProductsDisplay from './AdminHome/ProductsDisplay'
import SearchProducts from './Orders/SearchProducts'
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
        <Route path='/pool' component={Pool} />
        
        <Route path='/addstore' component={AddStore} />
        <Route path='/addproduct' component={AddProduct} />
        <Route path='/stores' component={AdminHome} />
        <Route path='/products/:id' component={ProductsDisplay} />
        <Route path='/search/:id' component={SearchProducts} />
      </div>
    )
  }
}
// Export The Main Component
export default Main
