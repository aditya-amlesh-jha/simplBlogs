const express = require('express');
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const otpRoutes = require("./routes/otpRoutes");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();


const port = process.env.PORT

app.use(cors());
app.use(express.json());


const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const dbname = process.env.DB_NAME;

const dburl = `mongodb+srv://${username}:${password}@cluster0.barpeqe.mongodb.net/${dbname}`;
const connectionParams={
    // basically these are the options that we are passing to the mongoose.connect() function
    // newUrlParser: true means that we are passing the url in the new url parser format
    // useUnifiedTopology: true means that we are using the new server discovery and monitoring engine
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dburl,connectionParams)
.then((response)=>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log("Error connecting to database");
    console.log(err);
})

app.use(authRoutes);
app.use(blogRoutes);
app.use(otpRoutes);

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})