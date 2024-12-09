const express=require("express");
const app=express();
require("dotenv").config();
const dotenv = require('dotenv');
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const passport=require("passport");
const User = require( "./models/User") ; 
const authRoutes=require("./routes/auth");
const songRoutes=require("./routes/song");
const playlistRoutes=require("./routes/playlist"); 

const port=5000;
const DATABASE_URL = process.env.DATABASE_URL;
require("dotenv").config();
const cors = require("cors"); 
const mongoose=require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect(DATABASE_URL)
.then((x)=>{
  console.log("Connected...!!!");
})
.catch((err)=>{
  console.log("Not Connected....!!!")
})

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
app.get( "/", (req,res) => {
  res.send("Hello World!");    
});
app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);


app.listen(port, ()=>{
    console.log("Server is running at "+ port);
});