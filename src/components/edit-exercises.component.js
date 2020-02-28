import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export class EditExercise extends Component {
    constructor(props){
        super(props);
        this.state = { 
            username : '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }
    componentDidMount(){
        axios.get("http://localhost:5000/exercises/"+this.props.match.params.id)
        .then((res)=>{
             this.setState({
                username : res.data.username,
                description: res.data.description,
                duration: Number(res.data.duration),
                date: new Date(res.data.date)
             })
             console.log(this.state)
         } )


         axios.get("http://localhost:5000/users/").then((res)=>{
             if(res.data.length>0){
                 this.setState({
                 users: res.data.map(user=> user.username),
                })
             }
         } )
    }
    onChangeUsername=(e)=>{
        this.setState({username:e.target.value})
    }
    onChangeDescription=(e)=>{
        this.setState({description:e.target.value})
    }
    onChangeDuration=(e)=>{
        this.setState({duration:e.target.value})
    }
    onChangeDate=(date)=>{
        this.setState({date:date})
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const exercise = {
            username : this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        axios.post("http://localhost:5000/exercises/update/"+this.props.match.params.id,exercise)
        .then(res=>console.log(res.data))

        window.location ="/"
    }
    render() {
        return (
            <div>
                <h3>Edit Exercie </h3>
                <form  onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Username: </label>
                        <select ref="userInput" 
                        required  
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                            {this.state.users.map((user)=> <option value={user} key={user} >{user} </option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label> Description: </label>
                        <input 
                        type="text"
                        value={this.state.description}
                        required
                        className="form-control"
                        onChange={this.onChangeDescription}/>
                        
                    </div>
                    <div className="form-group">
                        <label> Duration (in minutes): </label>
                        <input 
                        type="text"
                        value={this.state.duration}
                        required
                        className="form-control"
                        onChange={this.onChangeDuration}/>
                        
                    </div>
                    <div className="form-group">
                        <label> Date:  </label>
                        <DatePicker 
                        className="form-control"
                            selected={this.state.date}
                        onChange={this.onChangeDate}/>

                        
                    </div>
                    <div className="form-group">
                        <input 
                            required
                            className="btn btn-primary"
                            type="Submit"
                            value="Save"
                            />
                        
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExercise
