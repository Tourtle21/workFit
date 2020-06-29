import React, {Component} from 'react';
import './App.css';

import Header from './Components/HeaderFooter/Header';
import Footer from './Components/HeaderFooter/Footer';
import CreateWorkout from './Components/DisplayPage/CreateWorkout';
import WorkoutDisplay from './Components/DisplayPage/WorkoutDisplay';
import FindExercise from './Components/DisplayPage/FindExercise';
import Workout from './Components/DisplayPage/Workout';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayType: 3,
      exercises: [],
      workout: {},
      workouts: [],
      title: '',
    }
  }

  addExercise = exercise => {
    if (this.state.displayType !== 1) {
      let newExercises = this.state.exercises.slice();
      console.log(newExercises);
      newExercises.push(exercise);
      this.setState({
        exercises: newExercises
      })
    }
  }

  removeExercise = index => {
    let newExercises = this.state.exercises.slice();
    newExercises.splice(index,1);
    this.setState({
      exercises: newExercises,
    })
  }

  createWorkout = (title) => {
    if (title) {
      if (this.state.displayType === 3) {
        let newWorkout = {title, exercises:this.state.exercises}
        axios.post('/api/workouts', newWorkout)
        .then(res => {
          let newWorkouts = this.state.workouts.slice();
          newWorkouts.push(res.data)
          this.setState({displayType: 1, workout:res.data, workouts:newWorkouts, exercises:[]})
        })
        .catch(err => console.log(err))
      } else {
        console.log("HI")
        let newWorkout = {title, exercises:this.state.exercises, id:this.state.workout.id, completed:this.state.workout.completed}
        axios.put(`/api/workouts/${newWorkout.id}`, newWorkout)
        .then(res => {
          this.setState({displayType: 1, workout:res.data[newWorkout.id], workouts:res.data, exercises:[], title:''})
        })
        .catch(err => console.log(err))
      }
    }
  }

  newWorkout = () => {
    console.log("HI")
    this.setState({displayType: 3});
  }

  deleteWorkout = () => {
    axios.delete(`/api/workouts/${this.state.workout.id}`)
    .then(res => this.setState({displayType: 3, workout:{}, workouts:res.data}))
    .catch(err => console.log(err))
  }

  displayWorkout = (id) => {
    axios.get(`/api/workouts/${id}`)
    .then(res => this.setState({displayType: 1, workout:res.data, exercises:[]}))
  }

  editWorkout = () => {
    this.setState({displayType: 2, exercises:this.state.workout.exercises, title:this.state.workout.title})
  }

  completed = (id) => {
    let newWorkout = JSON.parse(JSON.stringify(this.state.workout));
    newWorkout.completed += 1;
    axios.put(`/api/workouts/${id}`, newWorkout)
    .then(res => this.setState({workouts:res.data, workout:newWorkout}))
    .catch(err => console.log(err))
  }

  render() {
    const {workouts, displayType, title, workout, exercises} = this.state;
    const mappedWorkouts = workouts.map(workout => (<Workout key={workout.id} displayWorkoutFn={this.displayWorkout} workout={workout} />))
    return (
      <div id='main-page'>
        <Header newWorkoutFn={this.newWorkout} displayType={displayType}/>
        <main id='display-page'>
          {displayType !== 1 ? 
          <CreateWorkout removeExerciseFn={this.removeExercise} title={title} createWorkoutFn={this.createWorkout} exercises={exercises} /> : 
          <WorkoutDisplay workout={workout} completedFn={this.completed} editWorkoutFn={this.editWorkout} deleteWorkoutFn={this.deleteWorkout}/>}
          <FindExercise addExerciseFn={this.addExercise} />
          <div id='workouts'>
            {mappedWorkouts}
          </div>
        </main>
        <Footer />
      </div>
    )
  };
}

export default App;
