let workouts = [];
let id = 0;
module.exports = {
    createWorkout: (req, res) => {
        const newWorkout = {
            id:id,
            completed:0,
            exercises:req.body.exercises,
            title:req.body.title
        }
        workouts.push(newWorkout);
        id++;
        res.status(200).send(newWorkout);    
    },
    deleteWorkout: (req, res) => {
        let index = workouts.findIndex(e => e.id === +req.params.id);
        workouts.splice(index, 1);
        res.status(200).send(workouts);
    },
    getWorkout: (req, res) => {
        let workout = workouts.find(e => e.id === +req.params.id);
        res.status(200).send(workout);
    },
    updateWorkout: (req,res) => {
        let index = workouts.findIndex(e => e.id === +req.body.id);
        workouts[index] = req.body;
        res.status(200).send(workouts);
    },
}