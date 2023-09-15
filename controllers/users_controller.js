const User = require('../models/user')


// Create action controller to show the profile page 
module.exports.profile = (req, res) => {

    //check the user_id is present or not
    if(req.cookies.user_id){

        //find the user_id
        User.findById(req.cookies.user_id)
        .then(user => {

            //handle the user profile
            if(user){
                return res.render('user_Profile', {
                    title: "User Profile",
                    user
                })

            //handle if doesn't render profile
            }else{
                return res.redirect('/users/sign-in');
            }
        })

    //handle user not found
    }else{
        return res.redirect('/users/sign-in');
    }
    
}


// Render the sign in page
module.exports.signIn = (req, res) => {

    //render the sign in page
    return res.render('user_sign_in', {
        title: "Codeial | Sign-In"
    })
}

// Render the sign up page
module.exports.signUp = (req, res) => {

    //render the sign up page
    return res.render('user_sign_up', {
        title: "Codieal | Sign-Up"
    })
}


// get the sign up datare
module.exports.create = (req, res) => {
    //handle confirmation password
    if (req.body.password != req.body.confirm_password) {
        console
        return res.redirect('back');
    }

    //handle the duplicate user email created
    User.findOne({ email: req.body.email })
        .then(user => {

            //handle if user is unique
            if (!user) {

                //handle the user creation
                User.create(req.body)
                    .then(user => {

                        //handle the sign in after created
                        console.log("Created Successfully", req.body.email)
                        return res.redirect('/users/sign-in');
                    })

                    //handle the sign in error 
                    .catch(err => {
                        console.log("Error in Finding user in Signing up",err);
                        return;
                    })

                //handle the error in creation
                }else{
                    return res.redirect('back');
                }
        })

        //handle error in finding email
        .catch(err => {
            console.log("Error in Finding user in Signing up",err);
            return res.redirect('back');
        })
}

//Sign-In and create a session for the user
module.exports.createSession = (req, res) => {
    console.log(req.cookies)

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
            console.log("LogedIn Successfully", req.body.email)
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

module.exports.signOut = (req,res) => {
    console.log("in sign-out",req.cookies)
    // req.cookies=undefined
    res.clearCookie('user_id')
    return res.redirect('/users/sign-in');
}