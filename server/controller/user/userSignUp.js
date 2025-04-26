const userModel = require("../../models/userModel")
const bcrypt=require('bcryptjs')
async function userSignUpController(req,res){
    try{
        const {email,password,name}=req.body

        const user = await userModel.findOne({email})

        if(user){
            throw new Error("already exist")
        }

        // console.log("user",user)
        if(!email){
            throw new Error("please provide email")
        }

        if(!password){
            throw new Error("please provide password")
        }

        if(!name){
            throw new Error("please provide name")
        }

        const salt=bcrypt.genSaltSync(10);
        const hashPassword=bcrypt.hashSync(password,salt);


        if(!hashPassword){
            throw new Error("Something wrong")
        }

        const payload={
            ...req.body,
            role:"GENERAL",
            password:hashPassword
        }

        const userData=new userModel(payload)
        const saveUser= await userData.save()

        res.status(201).json({
            data:saveUser,
            success:true,
             message : "user created successfully"
        })

    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success: false
        })
    }
}

 module.exports=userSignUpController