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
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/elite_music";
const cors = require("cors"); 
const mongoose=require("mongoose");

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());

// Database connection with improved error handling
if (!DATABASE_URL) {
    console.error("DATABASE_URL is not defined in environment variables");
    process.exit(1);
}

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => {
    console.log("Successfully connected to MongoDB.");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("\nTo fix this error:");
    console.log("1. If using local MongoDB: Make sure MongoDB is installed and running");
    console.log("2. If using MongoDB Atlas: Check your connection string in .env file");
    console.log("3. Verify your network connection and firewall settings");
    process.exit(1);
});

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