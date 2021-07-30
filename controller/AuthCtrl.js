const User = require('../models/User'); 
exports.signup = async (req, res) => {
    console.log(req.body);
    try {
        const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) return res.status(400).json({ msg: 'User with same email already exist' }) //checks is already exist 
    const newUser = new User(req.body);
    newUser.save()
        .then(success => {
            return res.status(200).json(success) // user saved success fully so 200-ok 
        })
        .catch(failed => {
            return res.status(404).json({ msg: "Unable to save user" }); 
    })
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}

exports.login = async (req, res) => { 
     try {
         const foundUser = await User.findOne({ email: req.body.email });
         if (foundUser) { //checks if that user with the email passed in request body exist 
             if (foundUser.password === req.body.password) { // now checks the password matches
                 return res.status(200).json(foundUser); 
             }
         }
         return res.status(404).json({ msg: "User doesnot exists" }); 
     } catch (error) {
         console.log(error);
        res.status(404).send(error);
     }
}