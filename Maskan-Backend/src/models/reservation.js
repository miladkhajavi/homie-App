const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReservationSchema = new Schema({
    visitor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    estate: {
        type: Schema.Types.ObjectId,
        ref: 'Estate',
        required: true
    },
    publisher:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        trim: true,
        required: true,
        enum: ['sent', 'confirmed', 'ended'],
        default: 'sent'
    },
    mobile:{
        type:String,
        trim:true,
        required:true,
    },
    fullDate: {
        date: {
            type: String,
            trim: true,
            required:true
        },
        time: {
            type: String,
            trim: true,
            required:true
        },
    }
}, {
    timestamps: true,
    virtuals:true
})

ReservationSchema.methods.toJSON = function () {
    const data = this;
    const dataObject = data.toObject();
    delete dataObject.__v;
    return dataObject;
};

// ReservationSchema.virtual('Visitor', {
//     ref: 'User',
//     localField: 'visitor',
//     foreignField: '_id'
// });

// ReservationSchema.virtual('estates', {
//     ref: 'Estate',
//     localField: 'estate',
//     foreignField: '_id'
// });
// ReservationSchema.virtual('Publisher', {
//     ref: 'User',
//     localField: 'publisher',
//     foreignField: '_id'
// });
// ReservationSchema.set('toJSON', { virtuals: true });
// ReservationSchema.set('toObject', { virtuals: true });
const Reservation = mongoose.model('Reservation', ReservationSchema)
module.exports = Reservation