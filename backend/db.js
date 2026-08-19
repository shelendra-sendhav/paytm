const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://shelensinghsendhav:zdt2PjcAP7U5pvGS@cluster0.raj2fsh.mongodb.net/paytm"
);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minLength: 3,
    maxLength: 30,
    lowercase: true,
    trim: true,
    required: true,
  },
  firstName: {
    type: String,
    maxLength: 50,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    maxLength: 50,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
});

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account
};

