const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const path = require("path");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:merntest123@cluster0.ulx3k.mongodb.net/?retryWrites=true&w=majority");

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result);
        }
    })
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
  
    res.json(user);
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('../clinet/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});