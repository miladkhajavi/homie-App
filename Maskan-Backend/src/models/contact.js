const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    mobile: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
});



const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;