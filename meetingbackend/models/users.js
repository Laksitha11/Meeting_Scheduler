var mbd=require('mongoose')
var UserSchema=mbd.Schema({
    FirstName:String,
    LastName:String,
    Email:String,
    Password:String
})
var user_Schema=mbd.model("log",UserSchema)
module.exports=user_Schema;