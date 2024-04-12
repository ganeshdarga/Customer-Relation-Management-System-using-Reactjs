const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'root123',
    database:'my_crm'
});

//From here it is related to Login panel
//For Signup purpose
app.post('/signup',(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const contactnumber = req.body.contactnumber
    const gender = req.body.gender
    db.query('INSERT INTO user (name,email,password,mobile,gender) VALUES (?,?,?,?,?)',
    [name,email,password,contactnumber,gender],
    (err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send("Values Inserted")
        }
    });
})

//For Admin Login Purpose
app.post('/adminLogin',(req,res)=>{
    const adminname = req.body.adminname
    const adminpassword = req.body.adminpassword
    db.query('select * from admin where name = ? AND password =?',[adminname,adminpassword],
    (err,result)=>{
        if(err){
            req.setEncoding({err: err});
        }else{
            if(result.length > 0){
                res.send(result)
            }else{
                res.send({message:"wrong details"})
            }
        }
    }
     )
})

//For User Login Purpose
app.post('/userLogin',(req,res)=>{
    const useremail = req.body.useremail
    const userpassword = req.body.userpassword
    db.query('select * from user where email = ? AND password =?',[useremail,userpassword],
    (err,result)=>{
        if(err){
            req.setEncoding({err: err});
        }else{
            if(result.length > 0){
                res.send(result)
            }else{
                res.send({message:"Incorrect Email or Password"})
            }
        }
    }
     )
})

//Now from here it is related to user panel data
//for creating quote it is related to (QuoteRequest.js component)
app.post('/submitservice',(req,res)=>{
    const serviseUser=req.body.serviseUser
    const serviceEmail=req.body.serviceEmail
    const serviceContact = req.body.serviceContact
    const serviceCompany = req.body.serviceCompany
    const serviceMessage = req.body.serviceMessage
    const typesofservices=req.body.typesofservices
    const status = parseInt(0)
    const postingdata = new Date()
    db.query("insert into prequest (name,email,contactno,company,services,query,status,posting_date) values (?,?,?,?,?,?,?,?)",
    [serviseUser,serviceEmail,serviceContact,serviceCompany,typesofservices,serviceMessage,status,postingdata],
    (err,result)=>{
        if(err){
            res.send(err)
            console.log(err)
        }else{
            res.send("Ok")
        }
    }
    )
})

//For creating userticket and it is related to (createticket.js component)
app.post('/submitticket',(req,res)=>{
    const UserName = req.body.UserName
    const subject = req.body.subject 
    const tasktype = req.body.tasktype
    const Prioritys = req.body.Prioritys
    const Discriptions =  req.body.Discriptions
    const Emails = req.body.Emails
    const status = "active"
    const adminremark="pending"
    const posting_date = new Date();
    db.query("insert into ticket (User_Name,email_id,subject,task_type,prioprity,ticket,status,admin_remark,posting_date) values (?,?,?,?,?,?,?,?,?)",
    [UserName,Emails,subject,tasktype,Prioritys,Discriptions,status,adminremark,posting_date],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Ok")
        }
    }
    )
})

//for creating viewticket and it is related to (ViewTickets.js component)
app.post('/viewticket',(req,res)=>{
    myEmail = req.body.userEmail
    db.query("select * from ticket where email_id = ? ",[myEmail],(err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//for creating viewprofile' and it is related to (Profile.js component)
app.post('/viewprofile',(req,res)=>{
    myEmail = req.body.userEmail
    db.query("select * from user where email = ? ",[myEmail],(err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//for creating submiteditdata and it is related to (profile.js component)
app.post('/submiteditdata/:id',(req,res)=>{
    const accountID = parseInt(req.params.id)
    const userName =req.body.userName
    const userEmail_id=req.body.userEmail_id
    const useAlterEmail=req.body.useAlterEmail
    const userMobile=req.body.userMobile
    const UserGender=req.body.UserGender
    const userAddress=req.body.userAddress
    db.query("update user set name = ?, email = ?, alt_email = ?, mobile = ? ,gender = ? ,address = ? where id = ? ",[userName,userEmail_id,useAlterEmail,userMobile,UserGender,userAddress,accountID],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Ok")
        }
    }
    )
})

//for creating setpassword and it is related to (changepassword.js)
app.post('/setpassword', (req, res) => {
    const userEmail = req.body.userEmail;
    const currentPassword = req.body.currentpassword; // assuming the key is currentpassword in your request
    const newPassword = req.body.newpassword; // assuming the key is newpassword in your request
    
    // First, you need to verify the current password before updating it
    db.query("SELECT id, password FROM user WHERE email = ?", [userEmail], (err, rows) => {
        if (err) {
            console.error("Error selecting user:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        // Check if a user with the provided email exists
        if (rows.length === 0) {
            console.log("User not found.");
            res.status(404).send("User not found.");
            return;
        }

        const userId = rows[0].id;
        const storedPassword = rows[0].password;

        // Compare the provided current password with the stored password
        if (currentPassword !== storedPassword) {
            console.log("Incorrect current password.");
            res.status(401).send("Incorrect current password.");
            return;
        }

        // If the current password is correct, proceed to update the password
        db.query("UPDATE user SET password = ? WHERE id = ?", [newPassword, userId], (updateErr, result) => {
            if (updateErr) {
                console.error("Error updating password:", updateErr);
                res.status(500).send("Internal Server Error");
                return;
            }
            
            console.log("Password updated successfully.");
            res.send("Password updated successfully.");
        });
    });
});



//Now from here it is related to admin panel

app.get('/tickets',(req,res)=>{
    db.query("select * from ticket",(err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})







app.get('/getuserdata',(req,res)=>{
    db.query("select * from user",(err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})


app.post('/setupdatestatus/:id',(req,res)=>{
    const accountID = parseInt(req.params.id)
    const textarea = req.body.textarea
    const status = "closed"
    db.query("update ticket set status = ?, admin_remark = ? where id = ?",[status,textarea,accountID],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})

app.post('/submitedit/:Id',(req,res)=>{
    const accountID = parseInt(req.params.Id)
    const Username =req.body.Username
    const userEmail=req.body.userEmail
    const useAlterEmail=req.body.useAlterEmail
    const userMobile=req.body.userMobile
    const UserGender=req.body.UserGender
    const userAddress=req.body.userAddress
    const userPassword = req.body.userPassword
    db.query("update user set name = ?, email = ?, alt_email = ?, mobile = ? ,gender = ? ,address = ?, password = ? where id = ? ",[Username,userEmail,useAlterEmail,userMobile,UserGender,userAddress,userPassword,accountID],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Ok")
        }
    }
    )
})

app.delete('/detetedata',(req,res)=>{
    const Id1=req.body.Id1
    db.query("delete from user where id = ?",[Id1],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("ok")
        }
    }
    )
})

app.get('/getactivities',(req,res)=>{
    db.query("select * from activities",
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})

app.post('/addactivity',(req,res)=>{
    const addDate=req.body.addDate
    const addDay = req.body.addDay
    const addStarttime = req.body.addStarttime
    const addEndtime= req.body.addEndtime
    const addDis = req.body.addDis
    db.query("insert into activities(dates, days, starttime, endtime, Discription)values(?,?,?,?,?)",[addDate,addDay,addStarttime,addEndtime,addDis],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})

app.delete('/deteteactivitydata',(req,res)=>{
    const deleteId =req.body.deleteId
    db.query("delete from activities where id = ?",[deleteId],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("ok")
        }
    }
    )
})
app.post('/subactivityedit/:id',(req,res)=>{
    const accountID = parseInt(req.params.id)
    const addDate =req.body.addDate
    const addDay=req.body.addDay
    const addStarttime=req.body.addStarttime
    const addEndtime=req.body.addEndtime
    const addDis=req.body.addDis
    db.query("update activities set dates = ?, days = ?, starttime = ?, endtime = ? ,Discription = ?  where id = ? ",[addDate,addDay,addStarttime,addEndtime,addDis,accountID],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})


app.get('/getcompanydata',(req,res)=>{
    db.query("select * from companies",
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})

app.post('/addcompany',(req,res)=>{
    const companyname = req.body.companyname
    const companyemail = req.body.companyemail
    const comapanymobile= req.body.comapanymobile
    const companymanage = req.body.companymanage
    const companystatus = req.body.companystatus
    db.query("insert into companies (companyName,Email,mobile,manage,statuss) values(?,?,?,?,?)",[companyname,companyemail,comapanymobile,companymanage,companystatus],
    (err,result)=>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    }
    )
})

app.delete('/detetecompanydata',(req,res)=>{
    const deleteId = req.body.deleteId
    db.query("delete from companies where id = ?",[deleteId],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("ok")
        }
    }
    )
})

app.post('/subcompanyedit/:id',(req,res)=>{
    const accountID = parseInt(req.params.id)
    const companyname =req.body.companyname
    const companyemail=req.body.companyemail
    const comapanymobile=req.body.comapanymobile
    const companymanage=req.body.companymanage
    const companystatus=req.body.companystatus
    db.query("update companies set companyName = ?, Email = ?, mobile = ?, manage = ? ,statuss = ?  where id = ? ",[companyname,companyemail,comapanymobile,companymanage,companystatus,accountID],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})

//invoice
app.get('/getinvoicedata',(req,res)=>{
    db.query("select * from invoice",
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})

app.post('/addinvoice',(req,res)=>{
    const accountnumber = req.body.accountnumber
    const account = req.body.account
    const amount= req.body.amount
    const invoicedate = req.body.invoicedate
    const duedate = req.body.duedate
    const type = req.body.type
    const status = req.body.status
    db.query("insert into invoice (accountNumber,account,Amount,invoiceDate,dueDate,type,status) values(?,?,?,?,?,?,?)",[accountnumber,account,amount,invoicedate,duedate,type,status],
    (err,result)=>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    }
    )
})

app.delete('/deteteinvoicedata',(req,res)=>{
    const deleteId = req.body.deleteId
    db.query("delete from invoice where id = ?",[deleteId],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("ok")
        }
    }
    )
})

app.post('/subinvoiceedit/:id',(req,res)=>{
    const accountID = parseInt(req.params.id)
    const accountnumber = req.body.accountnumber
    const account = req.body.account
    const amount= req.body.amount
    const invoicedate = req.body.invoicedate
    const duedate = req.body.duedate
    const type = req.body.type
    const status = req.body.status
    db.query("update invoice set accountNumber = ?, account = ?, Amount = ?, invoiceDate = ? ,dueDate = ?, type=?,status=?  where id = ? ",[accountnumber,account,amount,invoicedate,duedate,type,status,accountID],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})


//Tasks component

app.get('/gettaskdata',(req,res)=>{
    db.query("select * from tasks",
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})

app.post('/addtask',(req,res)=>{
    const taskname = req.body.taskname
    const deadline = req.body.deadline
    const taskstatus= req.body.taskstatus
    const taskassignee = req.body.taskassignee

    db.query("insert into tasks (Taskname,deadLine,status,Asignee) values(?,?,?,?)",[taskname,deadline,taskstatus,taskassignee],
    (err,result)=>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    }
    )
})

app.delete('/detetetaskdata',(req,res)=>{
    Id1=req.body.Id1
    db.query("delete from tasks where id = ?",[Id1],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("ok")
        }
    }
    )
})

app.post('/subtaskedit/:id',(req,res)=>{
    const accountID = parseInt(req.params.id)
    const taskname = req.body.taskname
    const deadline = req.body.deadline
    const taskstatus= req.body.taskstatus
    const taskassignee = req.body.taskassignee
    db.query("update tasks set Taskname = ?, deadLine = ?, status = ?, Asignee = ? where id = ? ",[taskname,deadline,taskstatus,taskassignee,accountID],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    )
})


//admin quotes components

app.get('/getquotes',(req,res)=>{
    db.query("select * from prequest",(err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post('/getcustondata/:id',(req,res)=>{
    const accountID = parseInt(req.params.id)
    db.query("select * from prequest where id = ?",[accountID],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
    
})

app.post('/submitcustomdata/:id',(req,res)=>{
    const accountID = parseInt(req.params.id)
    status1= req.body.status1
    adminremark = req.body.adminremark
    db.query("update prequest set status = ?, remark = ? where id = ? ",[status1,adminremark,accountID],
(err,result)=>{
    if (err){
        console.log(err)
    }else{
        res.send(result)
    }
})
})

app.post('/sendnotification/:email',(req,res)=>{
    const Email = req.params.email
    status2=0
    statusquote= req.body.statusquote
    adminremark = req.body.adminremark
    db.query("insert into usernotification(email,status,statusdata,remark) values(?,?,?,?)",[Email,status2,statusquote,adminremark],
(err,result)=>{
    if (err){
        console.log(err)
    }else{
        res.send(result)
    }
})
})


app.post('/getNotification',(req,res)=>{
    userEmail = req.body.userEmail
    db.query("select * from usernotification where email =?",[userEmail],(err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post('/changestatus/:id',(req,res)=>{
    const accountID = parseInt(req.params.id)
    status1 = 1
    db.query("update usernotification set status = ? where id = ? ",[status1,accountID],
(err,result)=>{
    if (err){
        console.log(err)
    }else{
        res.send(result)
    }
})
})





app.listen(3002,()=>{
    console.log("running 3002")
})