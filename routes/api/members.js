const express = require ('express');
const router = express.Router();
const members = require('../../members')
const uuid = require("uuid")



// Dealing with API
// getting all members
router.get('/',(req,res)=>{
    res.json(members)
})

// Dealing with API
// get single member
router.get('/:id',(req,res)=>{

    const found = members.some(member=>member.id === parseInt(req.params.id))

    if (found){
        res.json(members.filter(member=>member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg: `member ${req.params.id} not found `})
    }
   
})

// creating or add a member 
router.post("/",(req,res)=>{

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:"please include a name and email"});
    }

    members.push(newMember)
    res.json(members)
})




// update member
router.put('/:id',(req,res)=>{

    const found = members.some(member=>member.id === parseInt(req.params.id))

    if (found){
        const updMember =req.body;
        members.forEach(member =>{

            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name
                member.email = updMember.email ? updMember.email : member.email

                res.json({msg: `member  updated ` , member})

            }
        })

    }else{
        res.status(400).json({msg: `member ${req.params.id} not found `})
    }
   
})


// delete member
router.delete('/:id',(req,res)=>{


    const found = members.some(member=>member.id == parseInt(req.params.id))

    if (found){
        res.json({ msg: "Member deleted",
        members: members.filter(member=>member.id !== parseInt(req.params.id))})
    }else{
        res.status(400).json({msg: `member ${req.params.id} deleted `})
    }

   
})
module.exports = router