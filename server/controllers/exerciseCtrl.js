let exercises = ['Curls', 'Dips', 'Pull Ups', 'Push Ups', 'Sit Ups', 'Crunches', 'Squats', 'Calf Ups', 'Bicycle'];
const axios = require('axios');
module.exports = {
    getExercises: (req, res) => {
        for (let i = 8; i < 15; i++) {
            
        axios.get(`https://wger.de/api/v2/exercise?category=${i}&ordering=id&limit=80`)
        .then(response => {
            response.data.results.forEach(item => {
                if (item.language === 2 && item.name.length < 23 && item.name !== '' && !exercises.includes(item.name)) {
                    exercises.push(item.name);
                }
            });
            if (i === 8) {
                exercises = exercises.sort().slice(2);
                res.status(200).send(exercises)
            }
        }).catch(err => console.log('failed'))
        
    }
    },
    deleteExercise: (req, res) => {
        const index = exercises.indexOf(req.params.text);
        exercises.splice(index, 1);
        res.status(200).send(exercises);
    },
    addExercise: (req, res) => {
        exercises.push(req.params.text);
        exercises = exercises.sort();
        res.status(200).send(exercises);
    },
}