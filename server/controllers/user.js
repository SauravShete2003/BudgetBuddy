import User from "../model/User.js";

const postSignup = async (req, res) => {
  const { fullName, email, password, address } = req.body;
  const user = new User({
    fullName,
    email,
    password,
    address,
  });

  try {
    const savedUser = await user.save();

    res.json({
      success: true,
      message: "sign up successfully",
      data: savedUser,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;
     const user = await User.findOne({
        email : email,
        password : password
     })
     if (user){
        res.json({
            success : true,
            message : 'Login Successful',
            data : user
        })
     }
     else{
        res.json({
            success : false,
            message : 'Login Failed',
            data : null
        })
     }
}


export {postSignup , postLogin}