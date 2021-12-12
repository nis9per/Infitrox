
var userDB=require('../model/model')

//Create and Save New User

exports.create=(req,res)=>{
    //validate the request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty."})
        return;
    }

    //new user
    const user=new userDB({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status,
    })
    if(req.file){
        user.avatar=req.file.path
    }
    

    //save user in the database.
    user
        .save(user)
        .then(data=>{
            //res.send(data)
            res.redirect('/add_user')
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Some error occured while creating the object"
            });
        });
}

//retrieve all the users/single user

exports.find=(req,res)=>{
    
    if(req.query.id){
        const id=req.query.id;
        userDB.findById(id)
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"The user was not found!"
            })
        })

    }else{

    userDB.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"The user was not found!"
        })
    })}
}


//update a new user by user email
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}
//Delete a user with user id in the request
exports.delete=(req,res)=>{
    const id=req.params.id;
    userDB.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
        res.status(404).send({message:"Cannot Delete the specified Records!"})}
        else{
            res.send({message:"User was deleted successfully!"})
        }
    })
    .catch(err=>{
        res.status(500).send({ message : "Error Update user information"})
    })
               
    }

