const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


// const url = `mongodb+srv://afrin:code-b@cluster0.kijruwx.mongodb.net/posts?retryWrites=true&w=majority`;mongodb://afrin:code-b@ac-l0ameik-shard-00-00.kijruwx.mongodb.net:27017,ac-l0ameik-shard-00-01.kijruwx.mongodb.net:27017,ac-l0ameik-shard-00-02.kijruwx.mongodb.net:27017/posts?ssl=true&replicaSet=atlas-z70j6v-shard-0&authSource=admin&retryWrites=true&w=majority

 const url =
 "mongodb://afrin:code-b@ac-l0ameik-shard-00-00.kijruwx.mongodb.net:27017,ac-l0ameik-shard-00-01.kijruwx.mongodb.net:27017,ac-l0ameik-shard-00-02.kijruwx.mongodb.net:27017/posts?ssl=true&replicaSet=atlas-z70j6v-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  };
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let allUser = [];
let allContact=[];

const userSchema = {
  fname: String,
  lname: String,
  dob: Date,
  gender: String,
  address: String,
  district: String,
  contact: String,
  email: String,
  qualification: String,
  bpl: String,
  description: String,

  injuryYear: String,
  injuryReason: String,
  injuryType: String,
  injuryLevel: String,
  implantFixation: String,
  injuryStatus: String,
  physicalStatus: String,
  financialStatus: String,
};

const contactSchema = {
  // id: autoIncrement,
  mobile: Number,
  email: String,
  description: String,
};
const Contact = mongoose.model("ContactDetail", contactSchema);
app.post("/contact", function (req, res) {
  const ContactDetail = new Contact({
    mobile: req.body.mobile,
    email: req.body.email,
    description: req.body.description,
  });
  ContactDetail.save();
});



mongoose.model("user", contactSchema);



const User = mongoose.model("User", userSchema);
app.post("/users", async function  execute(req, res) {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
    district: req.body.district,
    contact: req.body.contact,
    email: req.body.email,
    qualification: req.body.qualification,
    bpl: req.body.bpl,
    description: req.body.description,

    injuryYear: req.body.injuryYear,
    injuryReason: req.body.injuryReason,
    injuryType: req.body.injuryType,
    injuryLevel: req.body.injuryLevel,
    implantFixation: req.body.implantFixation,
    injuryStatus: req.body.injuryStatus,
    physicalStatus: req.body.physicalStatus,
    financialStatus: req.body.financialStatus,
  });
  await user.save();
  console.log("User", user);
  return res.send("data saved");
});

app.get("/users", async (req, res) => {
   let posts = await User.find();
   res.json({
      data: posts,
    });
});

app.get("/contact", async (req, res) => {
  let posts = await Contact.find();
  res.json({
    data: posts,
  });
});



app.listen(5000, () => {
  console.log("Server Listening on port 5000");
});


