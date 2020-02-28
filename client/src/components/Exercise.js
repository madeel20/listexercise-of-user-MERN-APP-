import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Exercise extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.exercise.username}</td>
                <td>{this.props.exercise.description}</td>
                <td>{this.props.exercise.duration}</td>
                <td>{this.props.exercise.date.substring(0,10)}</td>
                <td>
                    <Link to={"/edit/"+this.props.exercise._id}> Edit </Link> |
                    <button onClick={()=>this.props.deleteExercise(this.props.exercise._id)}  > delete </button>
                </td>
            </tr>
        )
    }
}

export default Exercise
