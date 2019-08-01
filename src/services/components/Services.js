import React,{Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import {index, create, destroy} from '../api'

class Services extends Component {
    state = 
    {
        services: [],
        service: 
        {
            name: '',
            description: ''
        }
    }

    componentDidMount = () => {
        index(this.props.user, this.props.match.params.id)
        .then(
            response => this.setState({
                services: response.data.services
            })            
        )
        .catch(error => console.error(error))
    }

    handleChange = event => {
        const copyService = Object.assign(this.state.service);
        copyService[event.target.name] = event.target.value;
        this.setState({
            service: copyService
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const id = this.props.match.params.id
        create(this.props.user, id, this.state.service)
        .then(service => {
            this.setState({
                service: {
                    name: '',
                    description: ''
                }
            })
            this.componentDidMount()
        })
    }

    destroy = sid => {
        destroy(this.props.user, this.props.match.params.id, sid)
        .then(
            deleted => this.componentDidMount()
        )
        .catch(error => console.error(error))
    }

    render(){
        const {name, description} = this.state.service
        return (
            <div>
                {this.state.services.map(service => 
                    <div className=" list-group-item justify-content-between align-items-center" key={service._id}>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <Link className="btn btn-secondary" to={`/categroies/${this.props.match.params.id}/edit/services/${service._id}`} >
                            Edit
                        </Link>
                        &nbsp;
                        <Link className="btn btn-danger" to={`/categroies/${this.props.match.params.id}`} onClick={() => this.destroy(service._id)}>
                        Destroy
                        </Link> 
                        <hr/>
                    </div>
                )}
                <details>
                        <summary>Add Service</summary>
                            <form className='auth-form text-center' onSubmit={this.handleSubmit}>
                                <label htmlFor="name">Name</label>
                                <input
                                required
                                name="name"
                                value={name}
                                type="text"
                                onChange={this.handleChange}
                                />
                                <label htmlFor="description">Description</label>
                                <textarea rows="4" cols="50"
                                required
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                                />
                               
                               <button type="submit" className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" id ="serv">Add Service</button>
                            </form>
                        </details>
            </div>
        )
    }
}

export default withRouter(Services)