//import express
const express = require("express");

//import cors
const cors = require("cors");

//import MongoClient
const { MongoClient } = require("mongodb");

//create Rest Object
const App = express();
//App object used to create GET, POST, PUT, DELETE........ Requests

//Enable cors policy
App.use(cors());

//set JSON as MIME type
App.use(express.json());

//create Client
const ExcelrClient = new MongoClient("mongodb+srv://admin:admin@excelr.jxjno5w.mongodb.net/?retryWrites=true&w=majority&appName=ExcelR");
//where ExcelrClient is used to connect to database

//create GET Request
App.get("/products", async(req, res) => {
    await ExcelrClient.connect();
    let arr = await ExcelrClient.db("fsd").collection("products").find().toArray();
    res.json(arr);
});

//create POST Request
App.post("/insert", async(req, res) => {
    await ExcelrClient.connect();
    const result = await ExcelrClient.db("fsd").collection("products").insertOne({
                                                                                    "p_id":parseInt(req.body.p_id), 
                                                                                    "p_name":req.body.p_name, 
                                                                                    "p_cost":parseInt(req.body.p_cost), 
                                                                                    "p_image":req.body.p_image
                                                                                });
    const {acknowledged} = result;
    if(acknowledged){
        res.json({"message":"record inserted succssfully....!!!"});
    }else{
        res.json({"message":"record not inserted succssfully....!!!"});
    }
    
});

//create PUT Request
App.put("/update", async(req, res) => {
    await ExcelrClient.connect();
    const result = await ExcelrClient.db("fsd").collection("products").updateOne({"p_id":parseInt(req.body.p_id)}, 
                                                                                    {$set:{
                                                                                        "p_name":req.body.p_name, 
                                                                                        "p_cost":parseInt(req.body.p_cost), 
                                                                                        "p_image":req.body.p_image
                                                                                    }});
    const {acknowledged} = result;
    if(acknowledged){
        res.json({"message":"record updated succssfully....!!!"});
    }else{
        res.json({"message":"record not updated succssfully....!!!"});
    }
    
});

//create DELETE Request
App.delete("/delete", async(req, res) => {
    await ExcelrClient.connect();
    const result = await ExcelrClient.db("fsd").collection("products").deleteOne({"p_id":parseInt(req.body.p_id)});
    const {acknowledged} = result;
    if(acknowledged){
        res.json({"message":"record deleted succssfully....!!!"});
    }else{
        res.json({"message":"record not deleted succssfully....!!!"});
    }
    
});

//assign the port number
App.listen(8080, () => {
    console.log("Server listening the port no - 8080");
});