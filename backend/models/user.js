const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    },
    NativeLanguage: {
        type: String,
        required: [false]
    },
    LearningLanguage: {
        type: String,
        required: [false]
    },
    CreatedAt: {
        type: Number,
        required: [true]
    },
    UpdatedAt: {
        type: Number,
        required: [true]
    },
    prevUsers: {
        type : Array,
        required : [false]
    }
    // Chats: [
    //     {
    //         type : Schema.Types.ObjectId,
    //         ref : 'Chat'
    //     }
    // ],
    // UsersContacted : [
    //     {
    //         type : Schema.Types.ObjectId,
    //         ref : 'User'
    //     }
    // ]
});

module.exports = mongoose.model('User', userSchema);