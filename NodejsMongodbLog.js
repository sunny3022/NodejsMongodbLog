const express = require("express")
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1');
const schema={
    name:String,
    age:Number,
    health:String,
    hobby:String
}
const mydata = mongoose.model('cat1s', schema);
const kitty = new mydata({ name: 'testZildjian2' });
kitty.save().then(() => console.log('testmeow1'));
app.use('/',express.static('public'))
app.get("/input",(req,res)=>{
    res.send(req.query)
    console.log(req.query)
})
app.listen(1804)