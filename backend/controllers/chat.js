const User = require("../models/user");
const Chat = require('../models/chat');

exports.findChat = async (req, res) => {
    try {
        //res.send("Connected!");
        console.log("hi");
        {
        const { email1, email2 } = req.body;
        await Chat.find({ room: { $all: [email1, email2] } }), (err, chats) => {
            if (err) {
                return res.status(400).send(err);
            }
            else {
                console.log(chats);
                return res.status(200).send(chats.toArray());

            }
        }
    }
    } catch (err) {
        console.log(err);
    }
};

// exports.saveChat = async (req,res) => {
//     try{
//         const payload = req.body;
//         Chat.insertOne(payload), (err) => {
//             if(err){
//                 res.status(400).send(err);
//             }else{
//                 console.log('Chat succesfully saved!');
//             }
//         }
//     }catch(err){
//         console.log(err);
//     }
// };

exports.getPreviousUsers = async (req, res) => {
    try {
        const { email } = req.body;
        let userArray = [];
        await Chat.find({$or:[{textedUserEmail: email},{receivedUserEmail: email}]}, (err, chats) => {
            if (err) {
                res.status(500).send(err);
            } else {
                let length = chats.length;
                let z = 0;
                chats.forEach( async (chat) => {
                    //userArray.push(chat.receivedUserName);
                    await User.findOne({email: chat.receivedUserEmail}, (err, foundUser) => {
                        if(err){
                            console.log(err);
                        }else{
                            z++;
                            console.log(z);
                            console.log(length);
                            if(foundUser.email !== email){
                                userArray.push(foundUser);
                            }
                            if(z === length){
                                res.status(200).send(userArray);
                            }
                            console.log(userArray);
                        }
                    });
                });
                //console.log(userArray);
                // res.status(200).send(userArray);
            }
        })
    } catch (err) {
        console.log(err);
    }
}

// module.exports = saveChat;