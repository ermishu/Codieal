const User = require('../models/user')



module.exports.profile = (req, res) => {
    return res.render('user_Profile', {
        title: "User Profile"
    })
}


// Render the sign in page
module.exports.signIn = (req, res) => {

    return res.render('user_sign_in', {
        title: "Codeial | Sign-In"
    })
}

// Render the sign up page
module.exports.signUp = (req, res) => {

    return res.render('user_sign_up', {
        title: "Codieal | Sign-Up"
    })
}


// get the sign up data
module.exports.create = (req, res) => {
    //Todo later
    console.log(req.body)
    if (req.body.password != req.body.confirm_password) {
        console
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                User.create(req.body)
                    .then(user => {
                        console.log("User Created Successfully", req.body.name)
                        return res.redirect('/users/sign-in');
                    })
                    .catch(err => {
                        console.log("Error in Finding user in Signing up",err);
                        return;
                    })
            }else{
                return res.redirect('back');
            }
        })
        .catch(err => {
            console.log("Error in Finding user in Signing up",err);
            return res.redirect('back');
        })
}

//Sign-In and create a session for the user
module.exports.createSession = (req, res) => {
    //find the user
    User.findOne({email:req.body.email})
    //handle user forund
    .then(user => {
        //handle user password which don't match
        if(user){
            if(user.password !=req.body.password){
                return res.redirect('back');
            }
            //handle session create
            res.cookie('user_id',user.id);
            console.log("User LogedIn Successfully", req.body.name)
            return res.redirect('/users/profile');
        }else{
            //handle user not found
            return res.redirect('back');
        }

    })
    
    .catch(err => {
        console.log("Error in Finding user in sigining in",err);
        return res.redirect('back');
    })

    

    
    
}