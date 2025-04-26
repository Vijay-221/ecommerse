const userModel=require("../../models/userModel")


async function allUsers(req,res){
    try{
        console.log("userid all users",req.userId)
        const allUsers=await userModel.find()
        res.json({
            message:"All Users",
            data:allUsers,
            success:true,
            error:false
        })

    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success: false
        })
    }
}

module.exports=allUsers