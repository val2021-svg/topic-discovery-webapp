//const { Int32, Double } = require('mongodb/mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    //_id: {type:mongoose.ObjectId},
    course_name: {type:String},
    course_id: {type:Number},
    topic_1: {type:String},
    probability_1: {type: Number},
    topic_2: {type:String},
    probability_2: {type: Number},
    topic_3: {type:String},
    probability_3: {type: Number},
    topic_4: {type:String},
    probability_4: {type: Number},
    topic_5: {type:String},
    probability_5: {type: Number},
})


const Courses = mongoose.model('Courses', courseSchema, 'courses');
const mySchemas = {'Courses':Courses}

module.exports = mySchemas