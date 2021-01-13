const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstateSchema = new Schema({
    rsd: {
        type: mongoose.Types.ObjectId,
        ref: 'RealEstateDeveloper',
        required: true
    },
    publisher: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true,
        enum: ["sell", "buy", "rent", "fullrent"],
        default: 'house'
    },
    propertyType: {
        type: String,
        trim: true,
        required: true,
        enum: ["house", "apartment", "piot", "garden"],
        default: 'house'
    },
    price: {
        type: String,
        trim: true,
        required: true,
    },
    
    bedRooms: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
    bathRooms: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
    },
    star: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 5
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    location: {
        lat: {
            type: String,
            trim: true,
        },
        lng: {
            type: String,
            trim: true,
        }
    },
    meter: {
        type: String,
        trim:true,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    images: [{
        type: String,
        trim: true,       
    }],
    expire: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    virtuals: true
})


// EstateSchema.virtual('Publisher', {
//     ref: 'User',
//     localField: 'publisher',
//     foreignField: '_id'
// });
// EstateSchema.set('toJSON', { virtuals: true });

const Estate = mongoose.model('Estate', EstateSchema)

module.exports = Estate;