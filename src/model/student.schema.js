const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    age: {
        type: Number
    }
},
{
    versionKey: false,
    timestamps: true
})

const Student = mongoose.model('student', studentSchema);

module.exports = Student