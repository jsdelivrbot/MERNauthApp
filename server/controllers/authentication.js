const User = require('../models/user');

exports.signup = function(req, res, next) {
  // See if a user with the given email exists
  const email = req.body.email;
  const password = req.body.password;
   
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }
  User.findOne({ email: email }, function(error, existingUser) {
    // If a user with email does exist, return an error
    if (error) {
      return next(error);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){
      if (err) {
        return next(err);
        // Respond to request indicating the user was created
        res.json({ success: true });
      }
    });
  });
}                                                               