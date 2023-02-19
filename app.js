const { response } = require("express");
const express=require("express");
const mongoose=require("mongoose");
const adminRoute = require("./routes/adminroute");
const userRoute = require("./routes/userroute");

mongoose.set('strictQuery',false);





const app=express();
app.use(express.json())

mongoose.connect("mongodb+srv://kalpana123:kalpana123@cluster0.dovrsuc.mongodb.net/food_order?retryWrites=true&w=majority",{
   useNewUrlParser:true,
   useUnifiedTopology:true,
},
(err)=>{
    if(!err)
    {
      console.log("Database connected successfully");
    }
    else
     
      console.log("Error occured" + err);
  }
  )

  app.use('/api/admin',adminRoute);
  app.use('/api/user',userRoute);

  app.listen(3000,()=> {

    console.log("Server is running on port no. 3000")
  })  
  
  