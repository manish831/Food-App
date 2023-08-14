const express = require("express");
const app = express();
var cors = require("cors");

const mongoDB= require("./db");
const dotenv = require("dotenv");
dotenv.config(); 
app.use(cors()); //  Calling use(cors()) will enable the express server to respond to requests(put ,post ,delete,get).

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })
mongoDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use('/api/', require("./Routes/CreateUser"));
app.use('/api/', require("./Routes/DisplayData"));
app.use('/api/', require("./Routes/OrderData"));
// ----------------production -----------------
if (process.env.NODE_ENV === 'production') 
 {
    //*Set static folder up in production
    app.use(express.static('frontend/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html')));
  }
// ------------------production---------------

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
