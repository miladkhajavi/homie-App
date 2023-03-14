const mongoose = require('mongoose')
const Schema = mongoose.Schema

const realEstateDeveloperSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    address:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:String,
        trim:true,
        required:true,
    },

},{
    timestamps:true
})

realEstateDeveloperSchema.virtual('owner', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id'
  });

const RealEstateDeveloper = mongoose.model('RealEstateDeveloper' , realEstateDeveloperSchema)

module.exports =RealEstateDeveloper