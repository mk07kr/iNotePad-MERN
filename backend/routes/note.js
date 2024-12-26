const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
obj={
    "id":"Hello MK",
    num:77
}
res.json(obj);
})

module.exports=router