import User from "../models/user.js";
import bcrypt from "bcryptjs";
const saltRounds = 10;
import jwt from "jsonwebtoken";
const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    //step 1:  check if username or email exists
        const existingEmail = await User.findOne({ email });
        // yes: send error message that username or email already exists
          if (existingEmail) {
            return res.status(409).send({ message: "Email already exists" });
          }
        // no :
        // Step 2: 
            const hashPassword = await bcrypt.hash(password, saltRounds);
            req.body.password = hashPassword;
          // hash the password
        // Step 3:
          // create user 
          const user =  await User.create(req.body)
          res.send({message: "Signup successful"})
 
  } catch (err) {

  }
};

const verifyCode = async (req, res) => {
  try {

  } catch (err) {
  
  }
};


const login = async (req, res) => {
  try {
  // step 1: check if email exists
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  // no :
    if(!user){
      return res.status(404).send({ message: "Email does not exist" });
    }
    // send error message that email does not exist
  // yes
    
  // step 2: compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
  // no:  send error message that password is incorrect
    if(!passwordMatch){
      return res.status(401).send({ message: "Incorrect password" });
    }
  // yes:
  // step 3: 
      const token = await jwt.sign({ email }, '13erfdbvosahibdvfksda');
      res.send({ token, message: "Login successful", user });

  } catch (err) {
    console.log(err)
  }
};

export { signup, verifyCode, login };
