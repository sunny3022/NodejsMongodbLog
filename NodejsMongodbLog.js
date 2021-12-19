const express = require("express")
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose');
mongoose.connect('mongodb://172.21.2.236:27017/190110910804');
// const mydata = mongoose.model('cat1s', schema);
// const kitty = new mydata({ name: 'testZildjian2' });
// kitty.save().then(() => console.log('testmeow1'));
app.use('/',express.static('logo'))
app.use('/',express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const schema={
    username:String,
    password:String,
    sex:String,
    birth:String,
    major:String,
    talent:String
}

app.post('/RegAction',function(req,res,next){
    console.log(req.body);
    usr = String(req.body.username);
    pwd = String(req.body.password);
    se = String(req.body.sex);
    bth = String(req.body.birth);
    maj = String(req.body.major);
    tal =String(req.body.talent);
    next();
})
const userdata = mongoose.model('userdatas', schema);
app.use('/RegAction', function (req, res, next) {
    const kitty = new userdata({ username:usr,password:pwd,sex:se,birth:bth,major:maj,talent:tal});
    kitty.save().then(() => console.log('testmeow1'));        
    ejs.renderFile('public/reg.html', function(err, str){
                    // str => 输出渲染后的 HTML 字符串
        if(err) {
            console.log('File is error.')
        }else{
                      //  res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            res.end(str)
        }
                    
    });
})
            
app.listen(1804)