import mongoose from "mongoose";
import User from "../modal/userModal";

const nodemailer = require('nodemailer');

const signUp = async(req, res, next) => {
    const user = await new User({userName: req.body.u_name, password: req.body.password, email: req.body.email, mobile: req.body.mobile});
    user.save();
    console.log(user);
    if (user) {
        res
            .status(200)
            .json({user, message: "user created"});
    }

}

const getAllUsers = async(req, res, next) => {
    const users = await User.find();
    console.log(users);
    if (users.length >= 1) {
        res
            .status(200)
            .json({users, message: "users get successfully"});
    }
}

const login = async(req, res, next) => {
    const user = await User.find({email: req.body.email, password: req.body.password});
    if (user.length >= 1) {
        res
            .status(200)
            .json({user, message: "user login successfully"})
    } else {
        res.json({message: "please check userName and password"})
    }
}

const sendMail = async (req,res,next)=>{
    const user = await User.find({email: req.body.email, password: req.body.password});
    if(user){
        console.log(user[0].email);
        nodemailer.createTestAccount((err, user) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                // service:'gmail',
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "sathishyuvaraj007@gmail.com", // generated ethereal user
                    pass: "xxxx" // generated ethereal password
                }
            });
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'sathishyuvaraj007@gmail.com', // sender address
                to: 'ptsathish2016@gmail.com, mohanasundaram.rk@gmail.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
            };
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    
    }
}
export default {
    signUp,
    getAllUsers,
    login,
    sendMail
}