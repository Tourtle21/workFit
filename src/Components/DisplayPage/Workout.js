import React from 'react';

const Workout = (props) => {
    const {id, title, completed} = props.workout;
    return (
        <div onClick={() => props.displayWorkoutFn(id)} className='workout'>
            <p className='workout-title'>{title}</p>
            <p className='times-completed'>Times Completed</p>
            <div className='completed-number'>{completed}</div>
        </div>
    )
}

export default Workout;