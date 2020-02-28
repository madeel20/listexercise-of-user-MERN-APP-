import React, { Component } from 'react';
import axios from 'axios';

export class CreateUsers extends Component {
    constructor(props){
        super(props);
        this.state = { 
            username : '',
        }
    }
    onChangeUsername=(e)=>{
        this.setState({username:e.target.value})
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const user = {
            username: this.state.username
        }
         axios.post('http://localhost:5000/users/add',user)
        .then( (response) =>{
            console.log(response.data);
            window.location = "/";
        });
        
        //window.location ="/"
    }
    render() {
        return (
           
                <div>
                <h3>Create User </h3>
                <form  onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Username: </label>
                        <input 
                        type="text"
                        value={this.state.username}
                        required
                        className="form-control"
                        onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <input 
                            required
                            className="btn btn-primary"
                            type="Submit"
                            /> 
                        
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUsers
