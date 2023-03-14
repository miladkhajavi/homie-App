const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  SECRET_JWT_CODE
} = require("../database/dbConfig");
const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    trim: true,
    required: true,
    enum: ["user", "admin", "realestate", "support"],
    default: "user",
  },
  password: {
    type: String,
    trim: true,
    minlength: 5
  },
  tokens: [{
    token: {
      type: String,
      require: true,
    },
  }, ],
  avatar: {
    type: String,
    trim: true, 
    default:'user.png'
  },
}, {
  timestamps: true
});

// get public profile data
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};
// generate token when user Login
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const jsonWebToken = jwt.sign({
    _id: user._id.toJSON()
  }, SECRET_JWT_CODE, {
    expiresIn: "5h",
  });
  let token = `jwt ${jsonWebToken}`;
  user.tokens = user.tokens.concat({
    token
  });
  await user.save();

  return token;
};

// handle login user with email and password
UserSchema.statics.findOneCredential = async (email, password) => {
  const user = await User.findOne({
    email
  });
  if (!user) {
    throw new Error("user not found, login failed");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  return user;
  // console.log(user);
};

// hash the plain text password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
// hash the plain text password before update
UserSchema.pre("findOneAndUpdate", async function (next) {
  const user = this;
  if(user.getUpdate().$set.password){
   const Hash = await bcrypt.hash(user.getUpdate().$set.password, 8);
   user.getUpdate().$set.password = Hash
  }
  next();
});

  // UserSchema.virtual('otherschema', {
//   ref: 'otherschema',
//   localField: '_id',
//   foreignField: 'otherschemaUserID'
// });

// delete other model when user removed (Cascade delete)

// UserSchema.pre("remove", async function (next) {
//   const user = this;
//   await Place.deleteMany({creator:user._id})
//   next()
// });


//  no needed
// UserSchema.methods.comparePassword = function (Password, callback) {
//   bcrypt.compare(Password, this.password, function (error, isMatch) {
//     if (error) {
//       return callback(error);
//     }
//     callback(null, isMatch);
//   });
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;