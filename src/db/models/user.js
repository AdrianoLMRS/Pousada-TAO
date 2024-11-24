// *Dependecies
  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');

// *SCHEMAS

  // *User schema
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });
  

    // Hashing password before saving
    userSchema.pre('save', async function(next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
    });

    // Método para comparar a senha
    userSchema.methods.comparePassword = async function(password) {
      return await bcrypt.compare(password, this.password);
    };

// *Constants
  const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;