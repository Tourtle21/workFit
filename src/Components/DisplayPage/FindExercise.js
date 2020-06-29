import React, {Component} from 'react';
import axios from 'axios';

import Exercise from './Exercise';

class FindExercise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allExercises: [],
            exercises: [],
            userInput: '',
        }
    }

    componentDidMount() {
        axios.get('/api/exercises')
        .then(res => this.setState({allExercises:res.data, exercises:this.checkList(this.state.userInput, res.data)}))
        .catch(err => console.log(err))
    }

    deleteExercise = text => {
        axios.delete(`/api/exercises/${text}`)
        .then(res => this.setState({allExercises:res.data, exercises:this.checkList(this.state.userInput, res.data)}))
        .catch(err => console.log(err));
    }

    addExercise = () => {
        if (!this.state.allExercises.includes(this.state.userInput)) {
            axios.post(`/api/exercises/${this.state.userInput}`)
            .then(res => this.setState({allExercises:res.data, exercises:this.checkList(this.state.userInput, res.data), userInput:''}))
            .catch(err => console.log(err));
        }
    }

    handleInput = val => {
        this.setState({
            userInput: val,
            exercises: this.checkList(val, this.state.allExercises)
        })
    }

    resetExercise = () => this.setState({exercises:this.checkList(this.state.userInput, this.state.allExercises)});

    checkList = (val, exercises) => val !== '' ? exercises.filter(exercise => exercise.toLowerCase().includes(val.toLowerCase())) : exercises;

    render() {
        const {exercises, userInput} = this.state;
        const mappedExercises = exercises.map((exercise, i) => (<Exercise key={i} deleteExerciseFn={this.deleteExercise} addExerciseFn={this.props.addExerciseFn} exercise={exercise} />))
        return (
            <section id='find'>
                <div className='add-exercise-cont'>
                    <input onClick={this.resetExercise} onChange={(e) => this.handleInput(e.target.value)} placeholder="Add" value={userInput} className='find-input'/>
                    <button onClick={this.addExercise} className="add-exercise-button">+</button>
                </div>
                <div className='placeholder-text'>Chicken</div>
                {mappedExercises}
            </section>
        )
    }
}

export default FindExercise;