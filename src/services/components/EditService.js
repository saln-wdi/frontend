import React, {Component} from 'react'
import {update, show} from '../api'
import { withRouter } from 'react-router-dom'
import './Services.css'

class EditService extends Component {

    state = {
        name: '',
        description: ''
    }

    componentDidMount = () => {
        show(this.props.user, this.props.match.params.cid, this.props.match.params.sid)
        .then(
            response => {
                console.log(response)
                this.setState({
                name: response.data.service[0].name,
                description: response.data.service[0].description
            })
        }
        )
        .catch(error => console.log(error))
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
          })
    }

    handleSubmit = event => {
        event.preventDefault()

        update(this.props.user, this.props.match.params.cid, this.props.match.params.sid, this.state)
        .then(
            updated => {
                this.props.history.goBack();
            }
                        
        )
        .catch(error => console.error(error))
    }


    render(){
        return (
            <div className="card">
                <h5 class="card-header info-color white-text text-center py-4">
        <strong id ="head-color">Edit post</strong>
    </h5>
                <form className="text-center" id ="eds" onSubmit={this.handleSubmit}>
                <div className="md-form mt-3">
                    <label htmlFor="name" id="nlabel">Name</label>
                    <input  className="form-control" id="formGroupExampleInput" type="text" name="name" value={this.state.name}  
                    onChange={this.handleChange}/></div>
                    <div className="md-form mt-3">
                    <label htmlFor="description" id="dlabel">Description</label>
                    <textarea className="form-control" id="formGroupExampleInput" type=" text" name="description" value={this.state.description} 
                    onChange={this.handleChange}></textarea></div>
                    <input id ="ser" className="btn btn-secondary" type="submit" value="update" />
                </form>
            </div>
        )
    }
}

export default withRouter(EditService)