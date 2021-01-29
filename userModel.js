const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tours");
const User = mongoose.model("User", {
    _id: mongoose.Schema.Types.ObjectId,
    company: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true,
        //  match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
    password: { type: String, required: true, unique: true }
    
});
module.exports = User;
