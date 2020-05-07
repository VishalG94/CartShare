import React, { Component } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'

// create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  // handle logout to destroy the cookie
  handleLogout = () => {
    sessionStorage.clear()
  }
  render() {
    // if Cookie is set render Logout Button
    let navLogin = null
    if (sessionStorage.getItem('email')) {
      console.log('Able to read Session')
      navLogin = (
        <ul class='nav navbar-nav navbar-right'>
          {/* <li><Link to="/buyerprofile"><span class="glyphicon glyphicon-log-in"></span> Profile</Link></li> */}
          <li>
            <Link to='/' onClick={this.handleLogout}>
              <span class='glyphicon glyphicon-user' />Logout
            </Link>
          </li>
        </ul>
      )
    } else {
      // Else display login button
      console.log('Not Able to read cookie')
      navLogin = (
        <ul class='nav navbar-nav navbar-right'>
          <li style={{float:"right"}}>
            <Link to='/signup' >
              <span class='glyphicon glyphicon-log-in' style={{ color: "rgb(29, 161, 242)" }} />  &nbsp;<span style={{ color: 'rgb(29, 161, 242)' }}>Sign up</span>
            </Link>
          </li>
          <li style={{float:"right"}}>
            <Link to='/login'>
            {/* <i class="fas fa-sign-in-alt">Login</i> */}
            <i style={{ color: "rgb(29, 161, 242)"}} class='fas fa-sign-in-alt' />
              &nbsp;&nbsp;
              <span style={{ color: "rgb(29, 161, 242)"}} className='tab'>Login</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {/* <span class='glyphicon glyphicon-log-in' style={{ color: "rgb(29, 161, 242)" }} /> &nbsp; <span style={{ color: 'rgb(29, 161, 242)' }}>Login</span> */}
            </Link>
          </li>
        </ul>
      )
    }
    let redirectVar = null
    // let disableFeatures=null;
    if (sessionStorage.getItem('email')) {
      redirectVar = <Redirect to='/home' />
    }

    return (
      <div>
        {redirectVar}
        <nav
          class='navbar navbar-default'
          style={{ backgroundColor: '#fafafa' }}
        >
          <div class='container-fluid'>
            <div class='navbar-header'>
            {navLogin}
              <a href='/home'>
                <img
                  src={require('../img/favicon.ico')}
                  style={{ marginLeft: "30px", marginBottom: "5px", marginTop: "5px" }}
                  alt='Preview Image'
                  width='40'
                  height='40'
                />
              </a>
              
            </div>
          </div>
        </nav>
              </div>
    )
  }
}

export default Navbar
