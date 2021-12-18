const express = require("express")
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose');
mongoose.connect('mongodb://172.21.2.236:27017/190110910804');
const schema={
     name:String,
     age:Number,
     health:String,
     hobby:String
}
const mydata = mongoose.model('cat1s', schema);
const kitty = new mydata({ name: 'testZildjian2' });
kitty.save().then(() => console.log('testmeow1'));
app.use('/',express.static('logo'))
app.use('/',express.static('public'))
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
app.post('/input',function(req,res,next){
    username = parseFloat(req.body.username);
    password = parseFloat(req.body.password);
    next();
})
app.use('/input', function (req, res, next) {
            if(oper == '+'){
                ejs.renderFile('result.html', {result:cal.add_ab(parseFloat(dataA),parseFloat(dataB))}, function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                      //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }
                    
                });
            }
            

      })
app.listen(1804)