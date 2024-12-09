exports={}
const jwt=require("jsonwebtoken");
const User=require( "../models/User");

exports.getToken= async ()=>{
 const token=jwt.sign({identifier: User._id},"secret");
 return token;
}

module.exports=exports;