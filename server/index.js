const express = require('express')
const dotEnv = require('dotenv')
dotEnv.config();
const app = express();
const mongoose = require('mongoose')
const DB = process.env.DB;
const port = process.env.PORT || 5000;
const cors = require('cors')
require('./model/users.js')

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(DB, connectionParams)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });

app.use(express.json())
app.use(cors());
// app.use(require('./routes/formDataRoute'))
app.use(require('./routes/user.js'))

app.listen(port, () => {
    console.log(`server listening at ${port}`)
})