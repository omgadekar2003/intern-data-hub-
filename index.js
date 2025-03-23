const express = require('express');
const path = require('path');
const app = express();
const usermodel = require("./models/user")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine','ejs');

//base
app.get("/",(req,res)=>{
res.render('index.ejs')
})

//create:
app.post("/create", async (req,res)=>{
    let {name,internp,phone,image} = req.body;
   let createduser =  await usermodel.create({
    // name: name,// internp: internp, // phone: phone, // image:image // we can diretly write
           name,internp,phone,image
   });
   //res.send(createduser);
   res.redirect("/read");   
 })


//read
app.get("/read", async (req,res)=>{
    let users = await usermodel.find()
     res.render('read',{users})
    })

//edit: to go on edit page page 
app.get("/edit/:id", async (req,res)=>{
    let user =  await usermodel.findOne({ _id: req.params.id});
    res.render("edit",{user});   
})

//Update : for Updation this route we've to give
app.post("/update/:id", async (req,res)=>{
    let {name,internp,phone,image} = req.body;
    let updateduser =  await usermodel.findOneAndUpdate({ _id: req.params.id},{image,name,internp,phone},{new:true});
    res.redirect("/read");   
})


//delete
app.get("/delete/:id", async (req,res)=>{
        let deleteduser =  await usermodel.findOneAndDelete({ _id: req.params.id});
       res.redirect("/read");   
})

app.listen(3000);
