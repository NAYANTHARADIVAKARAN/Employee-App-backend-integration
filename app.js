// Task1: initiate app and run server at 3000
const express = require('express');
const app =  new express();
const mongoose = require('mongoose');
app.use(express.json());

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
const employees = require('./models/employee')
// Task2: create mongoDB connection 
mongoose.connect('mongodb+srv://Nayan:chuchu@cluster0.djvqorn.mongodb.net/employesApp?retryWrites=true&w=majority')
.then(()=>{
    console.log("MongoDB is connected succesfully!!!")
})
.catch(error=>{
    console.log('Connection Error '+ error)
})


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get("/api/employeelist",(req,res)=>{
    employees.find().then(function(data){
        res.send(data) 
    })
})



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get("/api/employeelist/:id",(req,res)=>{
    const id=req.params.id
    employees.findOne({"_id":id}).then(function(data){
        res.send(data)
    })
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async(req,res)=>{
    try {
        const newdata= new employees({
            name :req.body.name,
            location: req.body.location,
            position :req.body.position,
            salary : req.body.salary
          });
        
          const employee = new employees(newdata)
          const newEmployee = await employee.save() 
          res.send("employee added"+newEmployee)
  
     } catch (error) {
  
        res.send(error);
      
     }
  })





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id", async (req, res) => {
    try {
        const id=req.params.id
        const data = await employees.deleteOne({ "_id":id})
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', async (req, res) => {

    try {
        const id= req.body._id;
        const data = await employees.updateOne({"_id":id,},
            {
            $set: {
                "name": req.body.name,
                "location": req.body.location,
                "position": req.body.position,
                "salary": req.body.salary
            }
            }
        );

        res.send("updated employee"+data);
    }
    catch (error) {
        console.log(error);
    }
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



app.listen(3000,()=>{console.log("listening at 3000")})