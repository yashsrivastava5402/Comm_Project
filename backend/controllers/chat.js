const User = require("../models/user");
const Chat = require('../models/chat');

exports.findChat = async (req, res) => {
    try {
        //res.send("Connected!");
        const { email1, email2 } = req.body;
        await Chat.find({$or:[{textedUserEmail: email1, receivedUserEmail: email2},{textedUserEmail: email2, receivedUserEmail: email1}]}, (err, chats) => {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.status(200).send(chats);

            }
        });
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
                    await User.findOne({$or:[{email: chat.receivedUserEmail},{email: chat.textedUserEmail}]}, (err, foundUser) => {
                        if(err){
                            console.log(err);
                        }else{
                            z++;
                            // console.log(z);
                            // console.log(length);
                            if(foundUser.email !== email){
                                var flag = 0;
                                // let obj = userArray[z-1];
                                // console.log(obj);
                                for(var i = 0; i < userArray.length; i++){
                                    if(foundUser.email === userArray[i].email){
                                        //console.log(userArray[i]);
                                        flag = 1;
                                        break;
                                    }
                                }
                                if(flag === 0){
                                    userArray.push(foundUser);
                                }
                                // console.log(userArray[0]);
                            }
                            if(z === length){
                                console.log(userArray);
                                res.status(200).send(userArray);
                            }
                            //console.log(userArray);
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