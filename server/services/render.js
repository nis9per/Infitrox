const axios=require('axios')

exports.homeRoutes=(req,res)=>{

    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('index',{users:response.data})
    })
    .catch(err=>{
        response.status(500).send({message:"No data could be found !"})
    })
    
}

exports.addUser=(req,res)=>{
    res.render('add_user')

}


exports.updateUser= (req, res) =>{
    axios.get(`http://localhost:3000/api/users`,{params:{id:req.query.id}})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

