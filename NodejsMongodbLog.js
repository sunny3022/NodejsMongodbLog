const express = require("express")
const app = express()
const ejs = require('ejs')
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://172.21.2.236:27017/190110910804');
// const schema={
//     name:String,
//     age:Number,
//     health:String,
//     hobby:String
// }
// const mydata = mongoose.model('cat1s', schema);
// const kitty = new mydata({ name: 'testZildjian2' });
// kitty.save().then(() => console.log('testmeow1'));
app.use('/',express.static('public'))
app.use('/public',express.static('favicon.ico'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
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
    // res.send(req.query)
    console.log(req.query)
    const kitty = new mydata({ name: req.query.fname,health:req.query.fname1 });
    kitty.save();
    ejs.renderFile('result.html', {result:"成功写入"}, function(err, str){
        // str => 输出渲染后的 HTML 字符串
        
        res.end(str)
        
        
    })
})
app.listen(1804)