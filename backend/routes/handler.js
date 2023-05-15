const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas')


router.get('/courses', async (req, res) => {
    /* const randomCourse = {course_name:'Economy',course_id:'777',topic_1:'money',probability_1:0.94,topic_2:'theory',probability_2:0.91,topic_3:'capitalism',probability_3:0.74,topic_4:'liberal',probability_4:0.12,topic_5:'marx',probability_5:0.01}
    const newCourse = new schemas.Courses(randomCourse)
    const saveCourse = await newCourse.save() */
    
    const courses = schemas.Courses;
    const allCourses = await courses.find()
        res.end(JSON.stringify(allCourses));
    
    //console.log(allCourses)
    
    /*const str = [
        {
            "name": "AllCourses",
            "msg": "This is my first tweet!",
            "username": "codrkai"
        }];
    res.end(JSON.stringify(str));*/

});


module.exports = router;