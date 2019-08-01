import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link className="btn btn-primary" to="/change-password">Change Password</Link>
    <Link className="btn btn-primary" to="/sign-out">Sign Out</Link>
  </React.Fragment>
)
 
const unauthenticatedOptions = (
  <React.Fragment>
    <Link className="btn btn-primary" to="/sign-up">Sign Up</Link>
    <Link className="btn btn-primary" to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link className="btn btn-primary" to="/">Home</Link>
  </React.Fragment>
)


const divStyle = {
  margin:'0px 20px',
  color: 'white'



  
};

const Header = ({ user }) => (
  <header className="navbar navbar-dark bg-dark"  >
     <h1 className ="display-4" style={divStyle}>Servex</h1>
    <nav className="navbar navbar-expand-lg" id ="mainNav">
   
      { user && <span className="badge badge-pill badge-primary">Welcome, {user.name}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)


export default Header

