module.exports.profile = (req,res) => {
    return res.render('user_Profile', {
        title:"User Profile"
    })
}


// Render the sign in page
module.exports.signIn = (req,res) => {

    return res.render('user_sign_in',{
        title:"Codeial | Sign-In"
    })
}

// Render the sign up page
module.exports.signUp = (req,res) => {

    return res.render('user_sign_up',{
        title:"Codieal | Sign-Up"
    })
}
