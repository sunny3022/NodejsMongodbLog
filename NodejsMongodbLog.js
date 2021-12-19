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
var usr;

app.post('/RegAction',function(req,res,next){
    console.log(req.body);
   
// userdata.deleteMany({ sex: 'boy' }, function (err) {
//     if (err) return handleError(err);
//     // removed!
//   });
  
    usr = String(req.body.username);
    pwd = String(req.body.password);
    se = String(req.body.sex);
    bth = String(req.body.birth);
    maj = String(req.body.major);
    tal =String(req.body.talent);
    oper =String(req.body.submit1)
    console.log(oper)
    next();
})

const userdata = mongoose.model('userdatas', schema);
app.use('/RegAction', function (req, res, next) {
    if(oper == 'return'){
        ejs.renderFile('public/index.html', function(err, str){
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
    else{
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
    }
    
})
app.post('/LoginAction',function(req,res,next){
    console.log(req.body);
    usr = String(req.body.username);
    pwd = String(req.body.password);
    next();
})           
app.use('/LoginAction', function (req, res, next) {
    userdata.findOne({ username: usr }, 'password', function (err, userdata) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        if(pwd == userdata.password){
            ejs.renderFile('public/bokeindex.html', {username:usr},function(err, str){
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
        else{
            console.log("your password is wrong");
            ejs.renderFile('public/index.html', function(err, str){
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
    });
});
app.post('/ForgetPwdAction',function(req,res,next){
    console.log(req.body);
    usr = String(req.body.username);
    oper =String(req.body.submit1)
    next();
})           
app.use('/ForgetPwdAction', function (req, res, next) {
    userdata.findOne({ username: usr }, 'password', function (err, userdata) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        if(oper=='find'){
            ejs.renderFile('public/forgetPwd.html', {password:userdata.password},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.')
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
                            
            });
        }else{
            ejs.renderFile('public/index.html', function(err, str){
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
            
      
        
    });
});

app.use('/EditPwd',function(req,res,next){
    console.log(req.body);
    usr = usr
    ejs.renderFile('public/editPwd.html', {username:usr},function(err, str){
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
app.post('/Edit',function(req,res,next){
    console.log(req.body);
    user = String(req.body.username);
    opwd = String(req.body.oldPwd);
    npwd = String(req.body.newPwd);
    next();
})   
app.use('/Edit', function (req, res, next) {
    
    userdata.findOne({ username: user }, 'id password', function (err, userdata1) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
    console.log(userdata1.password)
    console.log(userdata1.id)
    id = userdata1.id
    if(opwd==userdata1.password){
        console.log(npwd)
        console.log(user)
        userdata.findById(id, function (err, userdata2) {
            if (err) return handleError(err);
          
            userdata2.password = npwd;
            userdata2.save(function (err, updatedUserdata) {
              if (err) return handleError(err);
            //   res.send(updatedUserdata);
            });
          });
          ejs.renderFile('public/editPwd.html', {username:usr},function(err, str){
            // str => 输出渲染后的 HTML 字符串
            if(err) {
                console.log('File is error.')
            }else{
                        //  res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                res.end(str)
            }
      
        }); 
            // userdata.update({ "username": user }, { $set: { "password": npwd }});
            console.log("修改成功")
        }else{
            ejs.renderFile('public/editPwd.html', {username:usr},function(err, str){
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
            
      
        
    });
});
app.use('/MyInfo',function(req,res,next){
    userdata.findOne({ username: usr }, 'sex birth major talent', function (err, userdata1) {
        console.log(userdata1)
        if (err) return handleError(err);
        else{
            ejs.renderFile('public/userInfo.html', {username:usr,sex:userdata1.sex,birth:userdata1.birth,major:userdata1.major,talent:userdata1.talent},function(err, str){
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
    
                    
    });
})  
app.listen(1804)