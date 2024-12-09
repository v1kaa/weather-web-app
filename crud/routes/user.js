const express = require('express');
const User = require('./model/userModel');

const route = express.Router();





route.get('/first',(req,res)=>
{
    res.send('hello world');
})
route.post('/create', async (req, res) => {
    try {
        const userData = new User(req.body); 
        const  email = userData.email;

        const userExist = await User.findOne( {email} );
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const savedUser = await userData.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

route.get('/allUsers',async (req,res)=>{
    try {
        const users= await User.find();
        if(users.length===0){
            res.status(404);
            res.send('user not found');
        }
        res.status(200);
        res.send(users);

    } catch (error) {
        
    }
})

route.put('/update/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        const userExist = await User.findOne({_id:id})
        if(!userExist){
           res.status(404);
           res.send ('user dont exist');
        }
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201);
        res.send(updateUser);
    } catch (error) {
        
    }
}) 

route.delete('/delete/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        console.log(req.body);
        const userExist = await User.findOne({_id:id})
        if(!userExist){
           res.status(404);
           res.send ('user dont exist');
        }
        await User.findByIdAndDelete(id);
        res.status(201);
        res.send('user has been deleted successfuly');
    } catch (error) {
        
    }
})


module.exports= route;
