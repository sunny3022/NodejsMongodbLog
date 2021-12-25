const express = require("express")
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose');
const e = require("express");
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
    talent:String,
    identity:String
}
const schema1={
    title:String,
    property:String,
    content:String,
    time:String,
    author:String,
    readcount:String
}
const schema2={
    review_articleId:String,
    review_author:String,
    review_content:String,
    review_time:String
}
var usr;
var ty;
var tit1;
var ide;
var tit;
var pi;
//获取注册数据
app.post('/RegAction',function(req,res,next){
    console.log(req.body);
    usr = String(req.body.username);
    pwd = String(req.body.password);
    se = String(req.body.sex);
    bth = String(req.body.birth);
    maj = String(req.body.major);
    tal =String(req.body.talent);
    ty = String(req.body.identity);
    oper =String(req.body.submit1);
    console.log(oper)
    next();
})
//进行注册，写入数据库
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
        const kitty = new userdata({ username:usr,password:pwd,sex:se,birth:bth,major:maj,talent:tal,identity:ty});
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
//获取登陆数据
app.post('/LoginAction',function(req,res,next){
    console.log(req.body);
    usr = String(req.body.username);
    pwd = String(req.body.password);
    next();
})   
//从数据库中查找帐号密码，若正确则进入        
app.use('/LoginAction', function (req, res, next) {
    userdata.findOne({ username: usr }, 'password identity', function (err, userdata) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        if(pwd == userdata.password){
            ide=userdata.identity
            if(ide =='common user'){
                articledata.find({}, 'id title property content time author', function (err, userdata1) {
                    console.log(userdata1)
                    ejs.renderFile('public/bokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
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
            }else{
                articledata.find({}, 'id title property content time author', function (err, userdata1) {
                    console.log(userdata1)
                    ejs.renderFile('public/admin/adbokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
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
            }
            
            
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
//获取数据
app.post('/ForgetPwdAction',function(req,res,next){
    console.log(req.body);
    usr = String(req.body.username);
    oper =String(req.body.submit1)
    next();
}) 
//找寻密码          
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
//跳转到修改密码界面
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
//获取数据
app.post('/Edit',function(req,res,next){
    console.log(req.body);
    user = String(req.body.username);
    opwd = String(req.body.oldPwd);
    npwd = String(req.body.newPwd);
    next();
})   
//修改密码，对数据库进行修改
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
//查询个人信息
app.use('/MyInfo',function(req,res,next){
    if(ide == 'common user'){
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
    }else{
        userdata.findOne({ username: usr ,identity:'admin'}, 'username sex birth major talent', function (err, userdata1) {
            console.log(userdata1)
            if (err) return handleError(err);
            else{
                ejs.renderFile('public/admin/aduserInfo.html', {username:usr,author:userdata1.username,sex:userdata1.sex,birth:userdata1.birth,major:userdata1.major,talent:userdata1.talent},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.'+err)
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }
                });
            }
        
                        
        });
    }
    
})  
//进入到修改个人信息界面
app.use('/Reviseinfo',function(req,res,next){
    console.log(req.body);
    usr = usr
    ejs.renderFile('public/Reviseinfo.html', {username:usr},function(err, str){
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
//获取数据
app.post('/ReviseMyInfoAction',function(req,res,next){
    console.log(req.body);
    username = String(req.body.username);
    se = String(req.body.sex);
    bth = String(req.body.birth);
    maj = String(req.body.major);
    tal =String(req.body.talent);
    next();
})   
//修改个人信息，实现数据库修改操作
app.use('/ReviseMyInfoAction',function(req,res,next){
    userdata.findOne({ username: usr }, 'id', function (err, userdata1) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        console.log(userdata1.id)
        id = userdata1.id
        userdata.findById(id, function (err, userdata2) {
            if (err) return handleError(err);
          
            userdata2.sex = se;
            userdata2.birth = bth;
            userdata2.talent =tal;
            userdata2.major = maj;
            userdata2.save(function (err, updatedUserdata) {
              if (err) return handleError(err);
            //    res.send(updatedUserdata);
            });
          });
        ejs.renderFile('public/Reviseinfo.html', {username:usr},function(err, str){
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
    })
})   
const articledata = mongoose.model('articledatas', schema1);
//跳转到我的管理界面
app.use('/Mymanagement',function(req,res,next){
    console.log(req.body);
    usr = usr
    if(ide =='common user'){
       
            ejs.renderFile('public/Mymanagement.html', {username:usr},function(err, str){
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
        articledata.find({}, 'id title property content time author readcount', function (err, userdata1) {
            console.log(userdata1)
            ejs.renderFile('public/admin/adMymanagement.html', {username:usr,allarlist:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.'+err)
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
                            
            });
        })
    }
    
})  
//获取数据
app.post('/PublishAction',function(req,res,next){

    var myDate = new Date();
    var Y = myDate.getFullYear();
    var M = myDate.getMonth()+1;
    var D = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)  
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)  
    var s = myDate.getSeconds(); //获取当前秒数(0-59)  
    tim =  Y + '-'+ M + '-' + D +' '+h+':'+m+':'+s;
    console.log(tim)
    console.log(req.body);
    tit = String(req.body.title);
    pro = String(req.body.property);
    con = String(req.body.content);
 //   tim = String(myDate)
    next();
}) 
//发表文章，查询数据库
app.use('/PublishAction',function(req,res,next){
    const kitty = new articledata({ title:tit,property:pro,author:usr,content:con,time:tim,readcount:"0"});
        kitty.save().then(() => console.log('testmeow1'));        
        ejs.renderFile('public/Mymanagement.html',{username:usr}, function(err, str){
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
//进入到我的文章界面
app.use('/MyArticle',function(req,res,next){
    console.log(req.body);
    usr = usr
    tit = null
    articledata.find({ author: usr }, 'id title property content time', function (err, userdata1) {
        console.log(userdata1)
        ejs.renderFile('public/MyArticle.html', {username:usr,myarlist:userdata1},function(err, str){
            // str => 输出渲染后的 HTML 字符串
            if(err) {
                console.log('File is error.')
            }else{
                        //  res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                res.end(str)
            }
                        
        });
    });
}) 

//获取数据
app.post('/SearchBytitle1',function(req,res,next){
    console.log(req.body);
    tit = String(req.body.title);
    next();
})
//搜索文章，数据库查找
app.use('/SearchBytitle1',function(req,res,next){
    console.log(req.body);
    usr = usr
    articledata.find({ author: usr ,title:tit}, 'id title property content time', function (err, userdata1) {
        console.log(userdata1)
        ejs.renderFile('public/MyArticle.html', {username:usr,myarlist:userdata1},function(err, str){
            // str => 输出渲染后的 HTML 字符串
            if(err) {
                console.log('File is error.')
            }else{
                        //  res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                res.end(str)
            }
                        
        });
    });
}) 
//文章按时间排序
app.use('/OrderBytime1',function(req,res,next){
    console.log(req.body);
    usr = usr
    console.log(tit)
    if(tit == null){
        articledata.find({ author: usr }, 'id title property content time', function (err, userdata1) {
            console.log(userdata1)
            ejs.renderFile('public/MyArticle.html', {username:usr,myarlist:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.')
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }                          
            });
        }).sort({ time:1 });
    }else{
        articledata.find({ author: usr ,title:tit}, 'id title property content time', function (err, userdata1) {
            console.log(userdata1)
            ejs.renderFile('public/MyArticle.html', {username:usr,myarlist:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.')
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }                          
            });
        }).sort({ time:1 });
    }
    
}) 
//文章按性质排序
app.use('/OrderByproperty',function(req,res,next){
    console.log(req.body);
    usr = usr
    if(tit == null){
        articledata.find({ author: usr }, 'id title property content time', function (err, userdata1) {
            console.log(userdata1)
            ejs.renderFile('public/MyArticle.html', {username:usr,myarlist:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.')
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
                            
            });
        }).sort({ property:1 });
    }else{
        articledata.find({ author:usr,title:tit}, 'id title property content time', function (err, userdata1) {
            console.log(userdata1)
            ejs.renderFile('public/MyArticle.html', {username:usr,myarlist:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.')
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
            });
        }).sort({ property:1 });
    }
}) 
//获取数据
app.post('/Articledetail',function(req,res,next){
    console.log(req.query)
    arid = String(req.query.id);
    pi = String(req.query.pi)
    console.log(arid)
    next();
    
}) 
//进入文章详情界面，数据库查询
app.use('/Articledetail',function(req,res,next){
    if(ide =='common user'){
        articledata.find({ _id: arid}, 'id title property content time author readcount', function (err, userdata1) {
            console.log(userdata1)
            reviewdata.find({ review_articleId: arid}, 'id review_articleId review_author review_content review_time', function (err, userdata2) {
                console.log(userdata2)
                
                articledata.findById(arid, function (err, userdata3) {
                    if (err) return handleError(err);
                  
                    userdata3.readcount = (parseFloat(userdata3.readcount)+1).toString()
                    
                    
                    userdata3.save(function (err, updatedUserdata) {
                      if (err) return handleError(err);
                    //    res.send(updatedUserdata);
                    });
                    ejs.renderFile('public/articledetail.html', {username:usr,arid:userdata1[0].id,author:userdata1[0].author,title:userdata1[0].title,property:userdata1[0].property,content:userdata1[0].content,time:userdata1[0].time,readcount:userdata3.readcount,reviewlist:userdata2},function(err, str){
                        // str => 输出渲染后的 HTML 字符串
                        if(err) {
                            console.log('File is error.')
                        }else{
                                    //  res.statusCode = 200;
                            res.setHeader('Content-Type','text/html');
                            res.end(str)
                        }                          
                    });
                  });
                
                
            })
        })
    }else{
        articledata.find({ _id: arid}, 'id title property content time author readcount', function (err, userdata1) {
            console.log(userdata1)
            reviewdata.find({ review_articleId: arid}, 'id review_articleId review_author review_content review_time', function (err, userdata2) {
                console.log(userdata2)
                
                
                    ejs.renderFile('public/admin/adarticledetail.html', {username:usr,arid:userdata1[0].id,author:userdata1[0].author,title:userdata1[0].title,property:userdata1[0].property,content:userdata1[0].content,time:userdata1[0].time,readcount:userdata1[0].readcount,reviewlist:userdata2},function(err, str){
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
        })
    }
    
    
    
}) 
//进入博客首页
app.use('/Bokeindex',function(req,res,next){
    tit1 = null
    tit = null
    if(ide =='common user'){
        articledata.find({}, 'id title property content time author', function (err, userdata1) {
            console.log(userdata1)
            ejs.renderFile('public/bokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
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
    }else{
        articledata.find({}, 'id title property content time author', function (err, userdata1) {
            console.log(userdata1)
            ejs.renderFile('public/admin/adbokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
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
    }
    
    
  
}) 
//获取数据
app.post('/SearchBytitle',function(req,res,next){
    console.log(req.body);
    tit1 = String(req.body.title);
    next();
})
//根据标题查询文章
app.use('/SearchBytitle',function(req,res,next){
    console.log(req.body);
    usr = usr
    if(ide=="common user"){
        articledata.find({ title:tit1}, 'id title property author content time', function (err, userdata1) {
            console.log(userdata1)
            ejs.renderFile('public/bokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.')
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
                            
            });
        });
    }else{
        articledata.find({ title:tit1}, 'id title property author content time', function (err, userdata1) {
            console.log(userdata1)
            ejs.renderFile('public/admin/adbokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.')
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
                            
            });
        });
    }
    
}) 
//文章按照作者排序
app.use('/OrderByauthor',function(req,res,next){
    console.log(req.body);
    usr = usr
    if(ide =='common user'){
        if(tit1 == null){
            articledata.find({ }, 'id title property author content time', function (err, userdata1) {
                console.log(userdata1)
                ejs.renderFile('public/bokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }).sort({ author:1 });
        }else{
            articledata.find({ title:tit1}, 'id title property author content time', function (err, userdata1) {
                console.log(userdata1)
                ejs.renderFile('public/bokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }).sort({ author:1 });
        }
    }else{
        if(tit1 == null){
            articledata.find({ }, 'id title property author content time', function (err, userdata1) {
                console.log(userdata1)
                ejs.renderFile('public/admin/adbokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }).sort({ author:1 });
        }else{
            articledata.find({ title:tit1}, 'id title property author content time', function (err, userdata1) {
                console.log(userdata1)
                ejs.renderFile('public/admin/adbokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }).sort({ author:1 });
        }
    }
    
    
}) 
//文章按照时间排序
app.use('/OrderBytime',function(req,res,next){
    console.log(req.body);
    usr = usr
    if(ide=='common user'){
        if(tit1 == null){
            articledata.find({ }, 'id title property author content time', function (err, userdata1) {
                console.log(userdata1)
                ejs.renderFile('public/bokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }).sort({ time:1 });
        }else{
            articledata.find({ title:tit1}, 'id title property author content time', function (err, userdata1) {
                console.log(userdata1)
                ejs.renderFile('public/bokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }).sort({ time:1 });
        }
    }else{
        if(tit1 == null){
            articledata.find({}, 'id title property author content time', function (err, userdata1) {
                console.log(userdata1)
                ejs.renderFile('public/admin/adbokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }).sort({ time:1 });
        }else{
            articledata.find({ title:tit1}, 'id title property author content time', function (err, userdata1) {
                console.log(userdata1)
                ejs.renderFile('public/admin/adbokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }).sort({ time:1 });
        }
    }
   
    
}) 
//修改文章，数据库修改
app.use('/ModDelArticle',function(req,res,next){
    console.log(req.body);
    usr = usr
    articledata.find({ author: usr }, 'id title property content time', function (err, userdata1) {
        console.log(userdata1)
        articledata.find({author:usr,property:"原创"},function (err, userdata2){
            ejs.renderFile('public/Modify_delete_articles.html', {username:usr, myarlist:userdata1,counta:userdata2},function(err, str){
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
        
    });
}) 
//获取数据
app.post('/InvalidArticle',function(req,res,next){
    aid = String(req.query.id);
    console.log(aid)
    next();
    
}) 
//删除文章 数据库删除
app.use('/InvalidArticle',function(req,res,next){
    usr = usr
    if(ide =='common user'){
        articledata.deleteOne({ _id: aid }, function (err) {
            if (err) return handleError(err);
            articledata.find({ author: usr }, 'id title property content time', function (err, userdata1) {
                console.log(userdata1)
                articledata.find({author:usr,property:"原创"},function (err, userdata2){
                    ejs.renderFile('public/Modify_delete_articles.html', {username:usr, myarlist:userdata1,counta:userdata2},function(err, str){
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
                
            });
          });
    }else{
        articledata.deleteOne({ _id: aid }, function (err) {
            if (err) return handleError(err);
            articledata.find({ }, 'id title property author content time readcount', function (err, userdata1) {
                console.log(userdata1)            
                    ejs.renderFile('public/admin/adMymanagement.html', {username:usr, allarlist:userdata1},function(err, str){
                        // str => 输出渲染后的 HTML 字符串
                        if(err) {
                            console.log('File is error.'+err)
                        }else{
                                    //  res.statusCode = 200;
                            res.setHeader('Content-Type','text/html');
                            res.end(str)
                        }
                                    
                    });
                
                
            });
          });
    }
    
}) 
//获取数据
app.post('/ReviseArticle',function(req,res,next){
    aid = String(req.query.id);
    console.log(aid)
    next();
    
}) 
//跳转到修改文章界面
app.use('/ReviseArticle',function(req,res,next){
    usr = usr
    articledata.find({ _id: aid }, 'id title property content time', function (err, userdata1) {
            console.log(userdata1)
                ejs.renderFile('public/Revisearticle.html', {username:usr, id:userdata1[0].id,title:userdata1[0].title,content:userdata1[0].content},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }
                                
                });
            
            
        });

}) 
//获取数据
app.post('/ReviseArticleAction',function(req,res,next){

    var myDate = new Date();
    var Y = myDate.getFullYear();
    var M = myDate.getMonth()+1;
    var D = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)  
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)  
    var s = myDate.getSeconds(); //获取当前秒数(0-59)  
    tim =  Y + '-'+ M + '-' + D +' '+h+':'+m+':'+s;
    console.log(tim)
    console.log(req.body);
    tit = String(req.body.title);
    pro = String(req.body.property);
    con = String(req.body.content);
    aid = String(req.query.id);
 //   tim = String(myDate)
    next();
}) 
//修改文章
app.use('/ReviseArticleAction',function(req,res,next){
        console.log(aid)
        articledata.findById(aid, function (err, userdata2) {
            if (err) { console.log(err);return handleError(err);}
          
            userdata2.title = tit;
            userdata2.property = pro;
            userdata2.content =con;
            userdata2.time = tim;
            userdata2.save(function (err, updatedUserdata) {
              if (err) return handleError(err);
            //    res.send(updatedUserdata);
            });
          });
        ejs.renderFile('public/Revisearticle.html', {username:usr,id:aid,title:tit,content:con},function(err, str){
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
const reviewdata = mongoose.model('reviewdatas', schema2);
//获取数据
app.post('/SendReview',function(req,res,next){
    console.log(req.body);
    content = String(req.body.review);
    arid = String(req.query.id);
    console.log(arid)
    var myDate = new Date();
    var Y = myDate.getFullYear();
    var M = myDate.getMonth()+1;
    var D = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)  
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)  
    var s = myDate.getSeconds(); //获取当前秒数(0-59)  
    tim =  Y + '-'+ M + '-' + D +' '+h+':'+m+':'+s;
    oper =String(req.body.submit1)
    console.log('oper'+oper)
    next();
}) 
//发表评论 数据库插入、查询
app.use('/SendReview',function(req,res,next){
    if(oper=='返回'){
        tit1 = null
        tit = null
        if(pi =='2'){
            articledata.find({ author: usr }, 'id title property content time', function (err, userdata1) {
                console.log(userdata1)
                ejs.renderFile('public/MyArticle.html', {username:usr,myarlist:userdata1},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }
                                
                });
            });
        }else{
            if(ide =='common user'){
                articledata.find({}, 'id title property content time author', function (err, userdata1) {
                    console.log(userdata1)
                    ejs.renderFile('public/bokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
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
            }else{
                articledata.find({}, 'id title property content time author', function (err, userdata1) {
                    console.log(userdata1)
                    ejs.renderFile('public/admin/adbokeindex.html', {username:usr,allarlist:userdata1},function(err, str){
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
            }
        }
        
    
    }else{
        const kitty = new reviewdata({ review_articleId:arid,review_author:usr,review_content:content,review_time:tim});
        kitty.save().then(() => console.log('testmeow1'));        
        articledata.find({ _id: arid}, 'id title property content time author readcount', function (err, userdata1) {
            console.log(userdata1)
            reviewdata.find({ review_articleId: arid}, 'id review_articleId review_author review_content review_time', function (err, userdata2) {
                console.log(userdata2)
                ejs.renderFile('public/articledetail.html', {username:usr,arid:userdata1[0].id,author:userdata1[0].author,title:userdata1[0].title,property:userdata1[0].property,content:userdata1[0].content,time:userdata1[0].time,readcount:userdata1[0].readcount,reviewlist:userdata2},function(err, str){
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
        })
    }
    
}) 
//跳转到我的所有评论界面
app.use('/MyAllReview',function(req,res,next){    
       
    reviewdata.find({ review_author: usr}, 'id review_articleId review_author review_content review_time', function (err, userdata1) {
        console.log(userdata1)
        ejs.renderFile('public/MyAllReview.html', {username:usr,myreviewList:userdata1},function(err, str){
            // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.'+err)
                }else{
                                //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }                          
            });
        })
       
}) 
//获取数据
app.post('/InvalidReview',function(req,res,next){
    rid = String(req.query.id);
    console.log(rid)
    next();
    
}) 
//删除评论 数据库删除操作
app.use('/InvalidReview',function(req,res,next){
    usr = usr
    if(ide =='common user'){
        reviewdata.deleteOne({ _id: rid }, function (err) {
            if (err) return handleError(err);
            reviewdata.find({ author: usr }, 'id review_articleId review_author review_content review_time', function (err, userdata1) {
                console.log(userdata1)       
                    ejs.renderFile('public/MyAllReview.html', {username:usr, myreviewList:userdata1},function(err, str){
                        // str => 输出渲染后的 HTML 字符串
                        if(err) {
                            console.log('File is error.')
                        }else{
                                    //  res.statusCode = 200;
                            res.setHeader('Content-Type','text/html');
                            res.end(str)
                        }
                                    
                    });
            });
          });
    }else{
        reviewdata.deleteOne({ _id: rid }, function (err) {
            if (err) return handleError(err);
            reviewdata.find({ }, 'id review_articleId review_author review_content review_time', function (err, userdata1) {
                console.log(userdata1)       
                    ejs.renderFile('public/admin/adAllReview.html', {username:usr, allreviewList:userdata1},function(err, str){
                        // str => 输出渲染后的 HTML 字符串
                        if(err) {
                            console.log('File is error.')
                        }else{
                                    //  res.statusCode = 200;
                            res.setHeader('Content-Type','text/html');
                            res.end(str)
                        }
                                    
                    });
            });
          });
    }
    
}) 
//获取数据
app.post('/ReviseReview',function(req,res,next){
    rid = String(req.query.id);
    console.log(rid)
    next();
    
}) 
//跳转到修改评论界面
app.use('/ReviseReview',function(req,res,next){
    usr = usr
    reviewdata.find({ _id: rid }, 'id review_articleId review_author review_content review_time', function (err, userdata1) {
            console.log(userdata1)
                ejs.renderFile('public/Revisereview.html', {username:usr, review_content:userdata1[0].review_content},function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log('File is error.')
                    }else{
                                //  res.statusCode = 200;
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }
                                
                });
            
            
        });

}) 
//获取数据
app.post('/ReviseReviewAction',function(req,res,next){

    var myDate = new Date();
    var Y = myDate.getFullYear();
    var M = myDate.getMonth()+1;
    var D = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)  
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)  
    var s = myDate.getSeconds(); //获取当前秒数(0-59)  亚
    tim =  Y + '-'+ M + '-' + D +' '+h+':'+m+':'+s;
    console.log(tim)
    console.log(req.body);
    con = String(req.body.content);
    rid = String(req.query.id);
    console.log(rid)
 //   tim = String(myDate)
    next();
}) 
//评论修改 数据库修改、查询操作
app.use('/ReviseReviewAction',function(req,res,next){
  
        reviewdata.findById(rid, function (err, userdata2) {
            console.log(userdata2)
            if (err) return handleError(err);
            userdata2.review_content =con;
            userdata2.review_time= tim;
            userdata2.save(function (err, updatedUserdata) {
              if (err) return handleError(err);
            //   res.send(updatedUserdata);
            });
          });
        ejs.renderFile('public/Revisereview.html', {username:usr,review_content:con},function(err, str){
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
//跳转到所有文章界面
app.use('/DelAllArticle',function(req,res,next){ 
    articledata.find({ }, 'id title property author content time readcount', function (err, userdata1) {
        console.log(userdata1)            
            ejs.renderFile('public/admin/adMymanagement.html', {username:usr, allarlist:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.'+err)
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
                            
            });    
    });
}) 
//跳转到所有评论界面
app.use('/DelAllReview',function(req,res,next){ 
    reviewdata.find({ }, 'id review_articleId review_author review_content review_time', function (err, userdata1) {
        console.log(userdata1)            
            ejs.renderFile('public/admin/adAllReview.html', {username:usr, allreviewList:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.'+err)
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
                            
            });    
    });
}) 
//跳转到所有用户界面
app.use('/DelAllUser',function(req,res,next){ 
    userdata.find({identity:'common user' }, 'id username sex major', function (err, userdata1) {
        console.log(userdata1)            
            ejs.renderFile('public/admin/adAllauthor.html', {username:usr, alluserList:userdata1},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.'+err)
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
                            
            });    
    });
}) 
//获取数据
app.post('/AuthorDetail',function(req,res,next){
    uid = String(req.query.id);
    console.log(uid)
    next();
    
}) 
//查询用户信息 数据库查询操作
app.use('/AuthorDetail',function(req,res,next){
    userdata.findOne({ _id: uid}, 'username sex birth major talent', function (err, userdata1) {
        console.log(userdata1)
        if (err) return handleError(err);
        else{
            ejs.renderFile('public/admin/aduserInfo.html', {username:usr,author:userdata1.username,sex:userdata1.sex,birth:userdata1.birth,major:userdata1.major,talent:userdata1.talent},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log('File is error.'+err)
                }else{
                            //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
            });
        }         
    });
})  
//获取数据
app.post('/InvalidUser',function(req,res,next){
    uid = String(req.query.id);
    console.log(uid)
    next();
    
}) 
//删除用户 数据库删除操作
app.use('/InvalidUser',function(req,res,next){
   

        userdata.deleteOne({ _id: uid }, function (err) {
            if (err) return handleError(err);
            userdata.find({identity:'common user' }, 'id username sex major', function (err, userdata1) {
                console.log(userdata1)            
                    ejs.renderFile('public/admin/adAllauthor.html', {username:usr, alluserList:userdata1},function(err, str){
                        // str => 输出渲染后的 HTML 字符串
                        if(err) {
                            console.log('File is error.'+err)
                        }else{
                                    //  res.statusCode = 200;
                            res.setHeader('Content-Type','text/html');
                            res.end(str)
                        }
                                    
                    });    
            });
          });
    
}) 
app.listen(10804)