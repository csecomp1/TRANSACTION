const express=require('express');
const ejs=require('ejs');
const app=express();
const mysql=require('mysql');
const PORT=1900 || process.env.PORT;
const bodyParser=require('body-parser');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views','./views');
app.set('view engine','ejs');
app.get('/',(req,res,next)=>{ 
    var sql = "SELECT * FROM customer_details";
    connection.query(sql, function (err, data, fields) {
        if (err) throw err;
        else {
            res.render('show',{title:'CUSTOMER LIST',action:'add',sampleData:data});
        }
    })
});
app.post('/viewdetails',(req,res)=>{
    
    var sql="SELECT * FROM customer_details,balance_det where customer_details.accid="+req.body.ACC_ID+" and balance_det.accid="+req.body.ACC_ID;
    connection.query(sql,function(err,data,fields){
        if(err)throw err;
        else res.render('index',{title:"Bank Details",bdata:data});
    })
    
});
app.post('/transfer',(req,res)=>{
    const from=req.body.TRANSFER;
    var sql="select * from customer_details,balance_det where customer_details.accid=balance_Det.accid"
    connection.query(sql,function(err,data,fields){
        if(err)throw err;
        else {        
            res.render('transfer',{data:data,from:from});}
    })
    
})
app.post('/checktransfer',(req,res)=>{
   var sql4="insert into transaction_history values("+req.body.from+","+req.body.recid+","+req.body.amt+",current_timestamp())";
   var sql1="update balance_det set bal=bal-"+req.body.amt+" where accid="+req.body.from;
   var sql2="update balance_det set bal=bal+"+req.body.amt+" where accid="+req.body.recid;
   connection.query(sql1);
   connection.query(sql2);
   connection.query(sql4);
   res.render('transaction',{from:req.body.from,to:req.body.recid,amt:req.body.amt});
});

app.post('/showtransaction',(req,res)=>{
var sql="select * from transaction_history";
connection.query(sql,function(err,data,fields                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ){
if(err)throw err;
else res.render('transtable',{tdata:data});
})
})
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'BANK',
    multivalue: true
});
connection.connect((err) => {
    if (!err)
        console.log("Database is connected!!");
    else
        console.log(`Database connection is failed : ` + JSON.stringify(err, undefined, 2));
});

app.listen(1000,()=>{
    console.log(`listening to port 1000`);
});

