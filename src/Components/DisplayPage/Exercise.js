import React from 'react';

const Exercise = (props) => (
    <div className='exercise'>
        <div onClick={() => props.addExerciseFn(props.exercise)} className='exercise-text'>
            {props.exercise}
        </div>
        <button onClick={() => props.deleteExerciseFn(props.exercise)} className='exercise-button'><div className='disappear'>-</div></button>
    </div>
)
export default Exercise;