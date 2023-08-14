const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) =>{
    try{
        res.send([global.food, global.foodCategory]);
    }catch(err){
        console.log(err.message);
        res.send("Server Error");
    }
})
module.exports = router;