import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Username must be at least 3 characters long'],
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be minimum 8 character long']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });



// Password hashing middleware (pre-save)
userSchema.pre('save', async function (next) {
  // we need 'this' to refer to the document
  if (!this.isModified('password')) return next(); // Only hash if password is new or changed

  const salt = await bcrypt.genSalt(12); // Generate a salt (random string to strengthen hash)
  this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt

  next(); // Continue saving the document
});


// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  // 'function' is needed to access 'this.password'
  return await bcrypt.compare(enteredPassword, this.password);
};



const User = mongoose.model('User', userSchema);
export default User;