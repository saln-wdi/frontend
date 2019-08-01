import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/dashboard'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="card">
         <h3 className="card-header info-color white-text text-center py-4">
    <strong>Login</strong>
  </h3>
  <div className="card-body px-lg-5 pt-0">
      <form className='auth-form text-center' onSubmit={this.onSignIn}>
     
      <div class="md-form">
        <label htmlFor="email">Email</label>
        <input  id="materialLoginFormEmail" 
        className="form-control"
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleChange}
        /></div>
        <div class="md-form">
        <label htmlFor="password">Password</label>
        <input id="materialLoginFormPassword" className="form-control"
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        /></div>
        <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" id = "change" type="submit" >Sign In</button>
      </form>
      </div>
      </div>
    )
  }
}

export default withRouter(SignIn)