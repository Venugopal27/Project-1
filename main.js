var express=require('express')
var app=express();

app.use(express.static(__dirname+'/public'))

app.set('port',process.env.PORT||5000)

var Data=require('nedb')

var db=new Data({filename:'DataStore.db',autoload:true});

app.set('view engine','ejs')

app.get('/',function(req,res) {
	res.render('Signup3')
	// body...
})

app.get('/Login',function(req,res) {
	res.render('Login1')
	// body...
})

app.get('/Signup',function(req,res) {
	res.render('Signup3')
	// body...
})

app.get('/formsubmit',function(req,res) {
	var n={
		"Name":req.query.Name,
		"Email":req.query.Email,
		"Password":req.query.Password,
		"Username":req.query.Username
	}
	db.insert(n,function(err,NewDoc) {
		res.render('Login1')
		// body...
	})
	// body...
})

app.get('/getinfo',function(req,res) {
	var e=req.query.Email1;
	var p=req.query.Password1;
	db.find({'Email':e,'Password':p},function(err,result) {
		if(result.length>0)
		{
			db.find({},function (err,result2) {
              res.render('Profile1',{result1:result2})
           })
		}
		else{
			res.send('Username & Password wrong.Please TryAgain')
		}
		// body...
	})
	// body...
})

app.get('/Profilename:num',function(req,res) {
	var t=req.params.num
   
	db.find({},function (err,result3) {
              res.render('Infoname',{result4:result3,i:req.params.num})
	// body...
})

})

app.listen(app.get('port'),function(req,res) {
	console.log('Listening to port 5000')
	// body...
})