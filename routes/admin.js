const  Router  = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const{ Admin , Course } = require("../db/index")
const jwt = require("jsonwebtoken");


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
   const admin =  Admin.create({username , password})
    res.status(200).json({
        Message:"Admin Created Succesfully", 
        AdminName : username,
    });
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const valid = await Admin.find({
        username,
        password
    })
    if(valid){
        const token = jwt.sign(username , "123");
        res.json({
            Token: token,
        })
         
    } else {
        res.json({
            message: "invalid admin"
        })
    }
    

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const course = await Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
    })
    res.json({
        message: "Course Created sucessfully",
        courseId:course._id
    })
    
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find();
    res.json({
        course : courses,
    })



});

module.exports = router;