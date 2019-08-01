import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import './Dashboard.css'

class Dashboard extends Component {
    handleClick = event => {
        const {history} =  this.props
        event.target.value.length ? history.push('/categroies') : history.push('/requests/services')
    }
    render(){
        return (
            <div>
                <div className="display-1 img-fluid">
                <h2 >My Dashboard</h2>
                <button id="first" className="btn btn-secondary" value="c" onClick={this.handleClick}>Categroies</button>
                <button id ="first" className="btn btn-secondary" onClick={this.handleClick}>Request</button></div>
            </div>
        )
    }
}

export default withRouter(Dashboard)