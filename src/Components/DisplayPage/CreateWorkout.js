import React, {Component} from 'react';


class CreateWorkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput:'',
        }
    }

    componentDidMount() {
        this.setState({userInput:this.props.title})
    }

    handleInput(val) {
        this.setState({userInput:val});
    }

    render() {
        const {exercises, removeExerciseFn, createWorkoutFn} = this.props;
        const {userInput} = this.state;
        const mappedExercises = exercises.map((exercise, i) => (<div onClick={() => removeExerciseFn(i)} className='added-exercise remove-exercise' key={i}>{exercise}</div>));
        return (
            <section className='workout-display'>
                <input onChange={(e) => this.handleInput(e.target.value)} placeholder="TITLE" value={userInput} maxLength='15' className='title-input' />
                <div className='added-exercises'>
                    {mappedExercises}
                </div>
                <button onClick={() => createWorkoutFn(userInput)} className='create-button'>Create</button>
            </section>
        )
    }
}

export default CreateWorkout;