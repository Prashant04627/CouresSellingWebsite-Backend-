const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const { Course, User } = require("../db");
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({username , password})
    res.json({
        message: "User created Successfully"
    })
});

    
    
router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    
    const token = jwt.sign(username, "secret")
    res.json({token : token})

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
   const course = await Course.find();
   res.json({
    course: course
   })
    
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const id = req.params.courseId;
    const username = req.username;
   await User.updateOne({username:username},{
    "$push":{purchasedCourses: id}
   });
   res.json({
    message: "Course purchased successfully",
   })


});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const purchasedCourses = await User.find();
    
    res.json({"purchased Courses" : purchasedCourses})


});


module.exports = router;