const mongoose = require("mongoose");
const validator = require("validator");
const Unique = require("./unique");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    trim: true,
    required: true
  },
  PhoneNumber: {
    type: Number,
    trim: true,
    // required:true,
    // validate(value) {
    //   if (value.toString().length != 10) {
    //     throw new Error("Number should contain 10 digits");
    //   }
    // }
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
   // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Invalid Email");
    //   }
    // }
  },
  Password: {
    type: String,
    trim: true,
    required: true
  },
  SignupID: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  level: {
    type: Number,
    default: 1
  },
  score: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 5
  },

  attempts: {
    type: Number,
    default: 3
  },
  freeze: {
    type: Boolean,
    default: false
  },
  lucky:{
      type:Number,
      default:3
  }
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisisdiv");
  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;
};

UserSchema.statics.verifysignupid = async (SignupID, UserName) => {
  const verifyuser = await Unique.findOne({ stringId: SignupID });
  if (verifyuser.used !== true) {
    verifyuser.used = true;
    await verifyuser.save();
    return verifyuser;
  } else {
    throw new Error("User Exist");
  }
};

UserSchema.statics.getAuthentication = async (SignupID, Password) => {
  const user = await User.findOne({ SignupID });
  if (!user) {
    throw new Error("Unable to Login");
  }
  if (user.Password != Password) {
    throw new Error("Unable to login");
  }
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
