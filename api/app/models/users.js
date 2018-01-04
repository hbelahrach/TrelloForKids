var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

// define the schema for our user model
var userSchema = mongoose.Schema({
    email: String,
    password: String
});

// generate hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
