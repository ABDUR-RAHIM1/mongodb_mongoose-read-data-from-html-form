const express = require('express')
const mongoose = require("mongoose")
const mongoURL = `mongodb+srv://abrar:3NUfKV42ivL3fxNm@cluster0.ekd31bu.mongodb.net/admin1?retryWrites=true&w=majority`

const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
const port = 8000;

//  create schema for mongodb atlas 

const productSchema = new mongoose.Schema({
    
    name: {
        type: String, 
        required : true
    },
    price: {
        type: Number, 
        required : true
    },
    quantity: {
        type: Number, 
        required : true
    },
    cretedAt: {
        type: Date,
        default: Date.now
    }
})

//   create modal
const Product = mongoose.model("Products", productSchema)


//  connect database 

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL)
        console.log("Databse is Connected")
    } catch (error) {
        console.log("db not connected ", error)
        process.exit(1)
    }
}


app.listen(port, async () => {
    console.log(`server is running at http://localhost:${port}`)
    await connectDB()
})

//  send request from server 

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
 

//  post method 

app.post("/addProduct",  (req, res)=>{
     const pInfo = req.body 
     const newProduct = new Product({
        name : pInfo.name,
        price : pInfo.price,
        quantity : pInfo.quantity
     })
     newProduct.save()
     .then(result => {
        res.send("successfull")
     })
})

app.get('/products', (req, res)=>{
     Product.find()
     .then(products => {
          res.send(products)
     })
     .catch((error)=>{
         console.log("error", error)
     })
})