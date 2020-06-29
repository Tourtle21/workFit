import React from 'react';

const WorkoutDisplay = (props) => {
    const {deleteWorkoutFn, editWorkoutFn, workout, completedFn} = props;
    const mappedExercises = workout.exercises.map((exercise, i) => (<div className='checkbox-exercise' key={i}><input className='checkbox' id={i} type='checkbox'/><label htmlFor={i}>{exercise}</label></div>));
    return (
        <section className='workout-display'>
            <h1 className='title'>{workout.title} <span id='check-box'><span onClick={completedFn} id='check'>&#x2713;</span></span></h1>
            <div className='added-exercises'>
                {mappedExercises}
            </div>
            <div className='buttons'>
                <button onClick={deleteWorkoutFn} className='create-button'>Delete</button>
                <button onClick={editWorkoutFn} className='create-button'>Edit</button>
            </div>
        </section>
    )
}

export default WorkoutDisplay;