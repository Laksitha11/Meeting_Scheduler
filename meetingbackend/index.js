var express =require("express");
var path = require("path");
var app=express();
var mbd=require("mongoose");
var User=require("./models/users");
const { error } = require("console");
const PORT =3002;
app.use(express.json())
mbd.connect("mongodb://localhost:27017/").then(()=>{   
  console.log("Mongodb connected");
}).catch(()=>{
  console.log("check connection");
});
app.get("/",(req,res)=>{
  res.send("welcome to backend server");
});
app.post("/signup", (req, res) => {
  console.log(req.body);
  var { FirstName, LastName, Email,Password } = req.body;
  console.log(FirstName, LastName, Email);
  try {
    var newUser = new User({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password:Password
    });
    newUser.save();
    console.log("UserAdded Successfully");
    res.status(200).send("User added successfully");
  } catch (err) {
    console.log(err);
  }
});
app.get('/getsignup',async(req,res)=>
{
    try{
        var allSignUpRecords = await User.find()
        res.json(allSignUpRecords)
        console.log("All Data Fetched");
    }
    catch(err)
    {
        console.log("cannot able to read the records");
    }
})
app.post("/login", async (req, res) => {
  var { Email, Password } = req.body;
  try {
    var existinguser = await User.findOne({ Email: Email });
    console.log(existinguser);
    if (existinguser) {
      if (existinguser.Password === Password) {
        res.json({ message: "Login successful", loggedIn: true });
      } else {
        res.json({ message: "Invalid Password", loggedIn: false });
      }
    } else {
      res.json({ message: "Invalid Email or Password", loggedIn: false });
    }
  } catch (err) {
    console.log("Login Failure");
  }
});

app.listen(PORT,()=>{
  console.log(`backend server started\nUrl: http://localhost:${PORT}`);
});