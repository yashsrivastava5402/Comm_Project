const mongoose = require('mongoose');

// const Message = {
//     chat : String,
//     timestamp : 
// };

const Schema = mongoose.Schema;

const chatSchema = new Schema({
        Message: {
            type: String,
            required: [true]
        },
        // timestamp : {
        //     type : true,
        //     required : [true]
        // },
        textedUserEmail: {
            type: String,
            //ref: 'User',
            required: [true]
        },
        receivedUserEmail: {
            type: String,
            //ref: 'User',
            required: [true]
        },
        textedUserName: {
            type: String,
            //ref: 'User',
            required: [false]
        },
        receivedUserName: {
            type: String,
            //ref: 'User',
            required: [false]
        },
        room: [{
            type: String,
            //ref: 'User',
            required: [true]
        }, {
            type: String,
            //ref: 'User',
            required: [true]
        }],
        time: {
            type: Number,
            required: [true]
        }
    }
    //{ timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);