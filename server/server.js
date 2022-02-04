const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
mongoose.connect("mongodb://localhost:27017/mern-to-do");

const itemSchema = new mongoose.Schema({
    item: String
}, {
    versionKey: false
});
const Item = mongoose.model('listItems', itemSchema);

app.get("/", (req, res) => {
    Item.find({}, (err, foundResults) => {
        if (err) res.json(err);
        res.json(foundResults);
    });
});

app.post("/", async (req, res) => {
    const listItem = req.body;
    const newListItem = new Item(listItem);
    await newListItem.save();

    res.json(listItem);
});
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Item.findOneAndDelete({
        _id: id
    });
    res.end();
});

app.listen(3001, () => {
    console.log("Server is running Successfully on http://localhost:3001");
});