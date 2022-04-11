const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "logindata",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (username,password) VALUES (?,?)",
    [username, password],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Please enter correct username and password" });
      }
    }
  );
});
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
const dbpersonal = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "personaldetails",
});

app.post("/personaldetailsbankdetails", (req, res) => {
  const pancardno = req.body.pancardno;
  const accountno = req.body.accountno;
  const bankname = req.body.bankname;

  dbpersonal.query(
    "INSERT INTO bankdetails (pancardno,accountno,bankname) VALUES (?,?,?)",
    [pancardno, accountno, bankname],
    (err, result) => {
      console.log(err);
    }
  );
});
app.get("/personaldetailsgetbankdetails",(req,res)=>{
  dbpersonal.query("SELECT * FROM bankdetails",(err,result)=>{
    res.send(result)
  })
})
//---------------------------------------------------------------------------------------------
app.post("/personaldetailsemergencycontact", (req, res) => {
  const firstpersonname = req.body.firstpersonname;
  const firstpersonno = req.body.firstpersonno;
  const secondpersoname = req.body.secondpersoname;
  const secondpersonno = req.body.secondpersonno;

  dbpersonal.query(
    "INSERT INTO emergencycontact (firstpersonname,firstpersonno,secondpersoname,secondpersonno) VALUES (?,?,?,?)",
    [firstpersonname, firstpersonno, secondpersoname, secondpersonno],
    (err, result) => {
      console.log(err);
    }
  );
});
app.get("/personaldetailsgetemergencycontact",(req,res)=>{
  dbpersonal.query("SELECT * FROM emergencycontact",(err,result)=>{
    res.send(result)
  })
})
//--------------------------------------------------------------------------------------------------
app.post("/personaldetailsinfogendetails", (req, res) => {
  const skillexp = req.body.skillexp;
  const skillknow = req.body.skillknow;
  const yearofexp = req.body.yearofexp;
  const certificate = req.body.certificate;

  dbpersonal.query(
    "INSERT INTO infogendetails (skillexp,skillknow,yearofexp,certificate) VALUES (?,?,?,?)",
    [skillexp, skillknow, yearofexp, certificate],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/personaldetailsgetinfogendetails",(req,res)=>{
  dbpersonal.query("SELECT * FROM infogendetails",(err,result)=>{
    res.send(result)
  })
})
//--------------------------------------------------------------------------------------------
app.post("/personaldetailspersonalinformation", (req, res) => {
  const employeecode = req.body.employeecode;
  const firstname = req.body.firstname;
  const middlename = req.body.middlename;
  const lastname = req.body.lastname;
  const gender = req.body.gender;
  const dateofbirth = req.body.dateofbirth;
  const mobileno = req.body.mobileno;
  const emailid = req.body.emailid;
  const address = req.body.address;
  const passportno = req.body.passportno;
  const bloodgroup = req.body.bloodgroup;

  dbpersonal.query(
    "INSERT INTO personalinformation (employeecode,firstname,middlename,lastname,gender,dateofbirth,mobileno,emailid,address,passportno,bloodgroup) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      employeecode,
      firstname,
      middlename,
      lastname,
      gender,
      dateofbirth,
      mobileno,
      emailid,
      address,
      passportno,
      bloodgroup,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/personaldetailsgetpersonalinformation",(req,res)=>{
  dbpersonal.query("SELECT * FROM personalinformation",(err,result)=>{
    res.send(result)
  })
})
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
const dbleave = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "leavedetails",
});

app.post("/leavedetailsapply", (req, res) => {
  const approver = req.body.approver;
  const date = req.body.date;
  const checkin = req.body.checkin;
  const checkout = req.body.checkout;
  const reason = req.body.reason;

  dbleave.query(
    "INSERT INTO applyforregulaization (approver,date,checkin,checkout,reason) VALUES (?,?,?,?,?)",
    [approver, date, checkin, checkout,reason],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/leavedetailsgetapply",(req,res)=>{
  dbleave.query("SELECT * FROM applyforregulaization",(err,result)=>{
    res.send(result)
  })
})

app.get("/leavedetailsalreadyapplied",(req,res)=>{
  dbleave.query("SELECT * FROM applyforregulaization",(err,result)=>{
    res.send(result)
  })
})
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
const dbemployee = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employeedetails",
});
  
app.post("/employeedetailsdailytask", (req, res) => {
  const project = req.body.project;
  const task = req.body.task;
  const time = req.body.time;
  const status = req.body.status;
  const blockingissue = req.body.blockingissue;
  const responsibleperson = req.body.responsibleperson;
  dbemployee.query(
    "INSERT INTO dailytask (project,task,time,status,blockingissue,responsibleperson) VALUES (?,?,?,?,?,?)",
    [project, task, time, status,blockingissue,responsibleperson],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/employeedetailsgetdailytask",(req,res)=>{
  dbemployee.query("SELECT * FROM dailytask",(err,result)=>{
    res.send(result)
  })
})
//--------------------------------------------------------------------------------------------------------
app.post("/employeedetailsemployeeappraisalform", (req, res) => {
  const duration = req.body.duration;
  const goals = req.body.goals;
  const skills = req.body.skills;
  dbemployee.query(
    "INSERT INTO employeeappraisalform (duration,goals,skills) VALUES (?,?,?)",
    [duration, goals, skills],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/employeedetailsgetemployeeappraisalform",(req,res)=>{
  dbemployee.query("SELECT * FROM employeeappraisalform",(err,result)=>{
    res.send(result)
  })
})
//------------------------------------------------------------------------------------------------------
app.post("/employeedetailsleavedetails", (req, res) => {
  const date = req.body.date;
  const reason = req.body.reason;
  dbemployee.query(
    "INSERT INTO leavedetails (date,reason) VALUES (?,?)",
    [date, reason],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/employeedetailsgetleavedetails",(req,res)=>{
  dbemployee.query("SELECT * FROM leavedetails",(err,result)=>{
    res.send(result)
  })
})
//-------------------------------------------------------------------------------------------
app.post("/employeedetailsdailyattendance", (req, res) => {
  const checkin = req.body.checkin;
  const checkout = req.body.checkout;
  const status = req.body.status;
  dbemployee.query(
    "INSERT INTO dailyattendance (checkin,checkout,status) VALUES (?,?,?)",
    [checkin, checkout,status],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/employeedetailsgetdailyattendance",(req,res)=>{
  dbemployee.query("SELECT * FROM dailyattendance",(err,result)=>{
    res.send(result)
  })
})

app.listen(3001, () => {
  console.log("running server");
});
