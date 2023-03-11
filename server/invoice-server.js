var mongoclient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");
const { response } = require("express");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

app.get("/invoicedb", (req,res)=>{
    mongoclient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("invoice-generator");
        database.collection("invoicedb").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})



app.post("/storeinvoice", (request,response)=>{
    var invoice = {
        "InvoiceNumber":parseInt(request.body.InvoiceNumber),
        "CashierName":request.body.CashierName,
        "Customer" :request.body.Customer,
        "ItemName":request.body.ItemName,
        "Qty":parseInt(request.body.Qty),
        "Price":parseFloat(request.body.Price),
        "Tax":parseFloat(request.body.Tax),
        "Discount":parseFloat(request.body.Discount)
    }
    mongoclient.connect(connectionString).then(clientObject =>{
        var database = clientObject.db("invoice-generator");
        database.collection("invoicedb").insertOne(invoice).then(result =>{
            console.log("Record Inserted");
            response.end();
        })
    })
});

app.listen(5000);
console.log("Server Started: http://127.0.0.1:5000");