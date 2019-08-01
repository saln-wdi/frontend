import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


import { signUp, signIn } from '../api'
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      phone: '',
      address: {
        city: '',
        district: ''
      },
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => {
    if(event.target.name.includes('address')){
      const copyAddress = Object.assign(this.state.address)
      const name = event.target.name.substring(8);
      copyAddress[name] =  event.target.value
      this.setState({
        address: copyAddress
      })
  }
    else
    this.setState({
    [event.target.name]: event.target.value
  })
}

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props
    
    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/dashboard'))
      .catch(error => {
        console.error(error)
        this.setState({ 
          email: '', 
          password: '', 
          passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { name, phone, address, email, password, passwordConfirmation } = this.state

    return (
      <div className="card input-group-prepend">
         <h5 className="card-header info-color white-text text-center py-4">
        <strong>Sign up</strong>
    </h5>
    <div className="card-body px-lg-5 pt-0">
      <form className="text-center auth-form" style={{color: '#757575'}} onSubmit={this.onSignUp}>
        {/* <h3>Sign Up</h3> */}
        
          
        <div className="form-row">
                <div className="col">
                <div class="md-form">
        <label htmlFor="name">Name</label>
        <input id="materialRegisterFormFirstName" className="form-control"
          required
          name="name"
          value={name}
          type="text"
          placeholder="Name"
          onChange={this.handleChange}
        />
        </div>
        </div>
        <div className="col">
        <div className="md-form">
        <label htmlFor="phone">Phone</label>
        <input className="form-control"
          required
          name="phone"
          value={phone}
          type="text"
          placeholder="05xxxxxxxx"
          onChange={this.handleChange}
        /></div></div></div>

                <div className="form-row">
                <div className="col">
                <div className="md-form">
        <label htmlFor="address">City</label>
        {/* <label>City</label> */}
        <input className="form-control"
          required
          name="address city"
          value={address.city}
          type="text"
          placeholder="Jeddah"
          onChange={this.handleChange}
        /></div></div>
        <div className="col">
                <div class="md-form">
         <label>District</label>
        <input className="form-control"
          required
          name="address district"
          value={address.district}
          type="text"
          placeholder="Alrawda"
          onChange={this.handleChange}
        />
</div></div></div>
                <div className="form-row">
                  <div className="col">
                    <div className="md-form">
                    <label htmlFor="passwordConfirmation">Password</label>
                    <input id="materialRegisterFormPassword" className="form-control" aria-describedby="materialRegisterFormPasswordHelpBlock"
          required
          name="password"
          value={password}
          type="password"
          placeholder="xxxxxx"
          onChange={this.handleChange}
        />
       
                </div></div>
                <div class="col">
                <div class="md-form mt-0">
        <label htmlFor="password">Confirm Password</label>
        <input className="form-control"
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="xxxxxx"
          onChange={this.handleChange}
        />
       </div></div></div>

<div className="form-row">
                  <div className="col" id="last">
                    <div className="md-form">
        <label htmlFor="email">Email</label>
          <center><input id="materialRegisterFormEmail" className="form-control" id="conf"
                  required
                  name="email"
                  value={email}
                  type="email"
                  placeholder="example@example.example"
                  onChange={this.handleChange}
                /></center>
        
        
        
        </div></div></div>
        <button type="submit" className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">Sign Up</button>
       
      </form>
      </div>
      </div>
      
      
    )
  }
}

export default withRouter(SignUp)
