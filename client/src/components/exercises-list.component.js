import React, { Component } from 'react'
import axios from 'axios';
import Exercise from './Exercise';

export class ExercisesList extends Component {
    state= { exercises: []}
    componentDidMount(){
        axios.get("http://localhost:5000/exercises")
         .then(res => {
        this.setState({exercises:res.data})
        console.log(this.state.exercises)
    }    );

    }
    deleteExercise=(id)=>{
        axios.delete(`http://localhost:5000/exercises/${id}`)
        .then(res=>console.log(res.data))
        this.setState({exercises: this.state.exercises.filter(ex => ex._id!==id)})
    }
    renderExerciseList(){
        return this.state.exercises.map(ex => {
            return <Exercise exercise={ex} deleteExercise={this.deleteExercise} key={ex._id} />
        })
    }
    render() {
        
        return (
            <div>
                <h3> Logged exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderExerciseList()}
                    </tbody>
                </table>
              
            </div>
        )
    }
}

export default ExercisesList
