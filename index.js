const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const courses = [
    {id: 1, name: 'geology'},
    {id: 2, name: 'software engineer'},
    {id: 3, name: 'biology'},
    {id: 4, name: 'paleontology'},
    {id: 5, name: 'zoology'}
]

app.get('/api/courses', (req, res) => {
        res.send(courses);
});

app.post('/api/courses', (req,res) => {
    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('the course with the given id was not found')
}
 
    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    course.name = req.body.name;
    res.send(course);
    
})

app.get('/api/courses/:id', (req,res) => {
   const course =  courses.find(c => c.id === parseInt(req.params.id));
   if (!course) 
   res.status(404).send('the course with the given id was not found')
   res.send(course) // 404
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
        
    };

     return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req,res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('the course with the given id was not found')

    const index = courses.indexOf(course)
    courses.splice(index, 1);
})


const port = process.env.PORT || 3000
app.listen(3000,() => console.log(`listening on port ${port}.....`) )