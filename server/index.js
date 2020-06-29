const express = require('express');
const exerciseCtrl = require('./controllers/exerciseCtrl');
const workoutCtrl = require('./controllers/workoutCtrl');

const app = express();
const port = 3030;

app.use(express.json());
app.get('/api/exercises', exerciseCtrl.getExercises);
app.delete('/api/exercises/:text', exerciseCtrl.deleteExercise);
app.post('/api/exercises/:text', exerciseCtrl.addExercise);

app.post('/api/workouts', workoutCtrl.createWorkout);
app.delete('/api/workouts/:id', workoutCtrl.deleteWorkout);
app.get('/api/workouts/:id', workoutCtrl.getWorkout);
app.put('/api/workouts/:id', workoutCtrl.updateWorkout);

app.listen(port, () => console.log(`Server is running on port ${port}`));