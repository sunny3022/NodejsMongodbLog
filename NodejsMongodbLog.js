const express = require("express")
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://172.21.2.236:27017/190110910804');
const schema={
    name:String,
    age:Number,
    health:String,
    hobby:String
}
const mydata = mongoose.model('cat1s', schema);
// const kitty = new mydata({ name: 'testZildjian2' });
// kitty.save().then(() => console.log('testmeow1'));
app.use('/',express.static('public'))
// app.get('/input',function(req,res,next){
//     dataA = parseFloat(req.query.fname);
//     dataB = parseFloat(req.query.fname1);
//     oper = req.query.submit1;
//     next();
// })
// app.use('/input', function (req, res, next) {
//             if(oper == 'write'){
               
//             }
//             if(oper == 'read'){
               
//             }
//   })
app.get("/input",(req,res)=>{
    res.send(req.query)
    console.log(req.query)
    const kitty = new mydata({ name: req.query.fname,health:req.query.fname1 });
    kitty.save();
})
app.listen(1804)