import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../Models/User.Schema.js";
import jwt from "jsonwebtoken";
import { SendConfirmationMail, SendResetMail } from "../Services/SendMail.js";

dotenv.config();

// Register

export const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const emailid = await User.findOne({ email });

        if (emailid) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        res.status(200).json({ message: "Register Successful", data: newUser });
    } catch (error) {

        res.status(500).json({ error: "Register Failed" });
    }
};

// Login

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User not Found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        user.token = token;
        await user.save();
        res.status(200).json({
            message: "Login Successfull",
            token: token,
            data: user,
            Status: "Success",
        });
    } catch (error) {

        res.status(500).json({ error: "Login Failed", Status: "Failed" });
    }
};

export const AllUsers = async (req, res) => {
    try {
        const UserList = await User.find();

        res.status(200).json({
            message: "Users List Fetched Successfully",
            data: UserList,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        let userExists = await User.findOne({ email: req.body.email });
        if (userExists && req.body.email !== "") {
            const tokenString = userExists.token;
            const mailId = req.body.email;

            const resetLink = `${process.env.Reset_Link}?token=${tokenString}&email=${mailId}`;

            const message = `
            <p>Hello ${userExists.username},</p>
            <p>You have requested to reset your password for Movie Ticket Booking Website. Click the button below to reset it:</p>
            <a href="${resetLink}">
              <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Reset Your Password
              </button>
            `;
            SendResetMail(req.body.email, message);

            // Update the DB with Token
            await User.updateOne({ email: req.body.email }, { token: tokenString });

            res.status(201).send({
                message: "Reset Link sended to your mail-id",
            });
        } else {
            res.status(400).send({ message: "User does not Exists" });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const ResetPassword = async (req, res) => {
    try {
        let user = await User.find({ email: req.body.email });
        if (user) {
            const password = req.body.password;
            const confirmPassword = req.body.confirmPassword;
            const eqaulPassword = password === confirmPassword;
            const hashedPassword = await bcrypt.hash(password, 10);

            if (eqaulPassword && password != "" && confirmPassword !== "") {
                await User.updateOne(
                    { email: req.body.email },
                    { password: hashedPassword }
                );
                res.status(200).json({ message: "Password Changed Successfully" });
            } else {
                res
                    .status(400)
                    .json({ message: "Password and confirm password doesn't match" });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const handleLogout = async (req, res) => {
    try {
        setTimeout(() => {
            res.status(200).json({ message: "Logged out Sucessful" });
        }, 500);
    } catch (error) {
        console.log("Error while logging out:", error);
        res.status(500).send("Internal Serer Error");
    }
};

export const handleBooking = async (req,res) =>{
    let {email, movieName, theaterName, date, time, seatNumbers} = req.body
    
    try{
        let user = await User.findOne({"email" : email});
        
         if(!user){
            res.status(404).send("User Not Found");
         }
         
         if (user.bookedMovies[movieName] && user.bookedMovies[movieName].date === date && user.bookedMovies[movieName].timing === time) {
            const existingSeat = user.bookedMovies[movieName].seatNumber;
            user.bookedMovies[movieName].seatNumber.push(...seatNumbers);
            await user.save();
            return res.status(400).send({message:"Movie Already Exists in Database"});
        }

        let existingMovies = user.bookedMovies
        user.bookedMovies ={
            ...existingMovies,
            [movieName]:{
                theaterName,
                date,
                timing: time,
                seatNumber: seatNumbers,
            }
        };
        await user.save();

        return res.status(200).send({ message: "Booked Successfully", data: user.bookedMovies[movieName] });
    }catch(error){
        return res.status(500).send({message: error || "Internal Server Error"})
    }
}
