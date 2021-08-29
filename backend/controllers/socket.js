const io = require('../app').io;
const User = require('../models/user');
const Chat = require('../models/chat');
//const saveChat = require('./chat');

const saveChat = async (data, err) => {
    try{
        if(err){
            console.log(err);
        }
        const payload = data;
        // await Chat.find(
        //     {
        //         $or: 
        //     [
        //         {
        //             User1: data.textedUserEmail, 
        //             User2: data.receivedUserEmail
        //         },
        //         {
        //             User2: data.textedUserEmail, 
        //             User1: data.receivedUserEmail
        //         }
        //     ]
        // }, 
        // (err, chats) => {
        //     if(err){
        //         console.log(err);
        //     }
        //     else if(chats.length === 0){
        //         const payload = {
        //             User1: data.textedUserEmail,
        //             User2: data.receivedUserEmail,
        //             Messages: [data]
        //         };
        //         Chat.insertMany((payload), (err) => {
        //             if(err){
        //                 res.status(400).send(err);
        //             }else{
        //                 console.log(payload);
        //             }
        //         });
        //     }else{
        //         Chat.upda
        //     }
        // });
        await Chat.insertMany(payload),( (err) => {
            if(err){
                res.status(400).send(err);
            }else{
                console.log(payload);
            }
        });
        await User.find({email: payload.textedUserEmail}, async (err, users) => {
            if(err){
                res.status(400).send(err);
            }
            else{
                let flag = false;
                for(let i = 0; i < users[0].prevUsers.length; i++){
                    if(users[0].prevUsers[i].email === payload.receivedUserEmail){
                        console.log("Mai Pohocha");
                        flag = true;
                        break;
                    }
                }
                if(flag === false){
                    await User.find({email: payload.receivedUserEmail}, async (err, newUsers) => {
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Agar mai pohocha to mai gadha hoon");
                            User.findOneAndUpdate({email: payload.textedUserEmail},{$push: {prevUsers: newUsers[0]}}, (err) => {
                                if(err){
                                    console.log(err);
                                }
                            });
                        }
                    });
                }
            }
        });

        await User.find({email: payload.receivedUserEmail}, async (err, users) => {
            if(err){
                res.status(400).send(err);
            }
            else{
                let flag = false;
                for(let i = 0; i < users[0].prevUsers.length; i++){
                    if(users[0].prevUsers[i].email === payload.textedUserEmail){
                        console.log("Mai Pohocha");
                        flag = true;
                        break;
                    }
                }
                if(flag === false){
                    await User.find({email: payload.textedUserEmail}, async (err, newUsers) => {
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Agar mai pohocha to mai gadha hoon");                            
                            User.findOneAndUpdate({email: payload.receivedUserEmail},{$push: {prevUsers: newUsers[0]}}, async (err) => {
                                if(err){
                                    console.log(err);
                                }
                            });
                        }
                    });
                }
            }
        });
        
    }catch(err){
        console.log(err);
    }
};

module.exports = async (socket) => {
    try{
        const sessionId = socket.handshake.query.token;
        await socket.join(sessionId);
        console.log(sessionId);
        socket.on('join-user', async (data, callback) => {
            const { email, /*sessionId,*/ CreatedAt, UpdatedAt } = data;
            const newuser = {
                email,
                //sessionID,
                CreatedAt,
                UpdatedAt: Date.now()
            }; 
            await User.findOneAndUpdate({email: email}, {$set: { UpdatedAt: Date.now() }}, (err, updatedUser) => {
                if(err){
                    console.log(err);
                }
            })
            // socket.sessionId = email;
            // socket.join(email);
            await socket.broadcast.emit("new-user-joined", newuser);
            if(callback){
                callback(data);
            }
        });
        socket.on('send-msg', async (data, callback) => {
            const { Message, textedUserEmail, receivedUserEmail, textedUserName, receivedUserName, time } = data;
            // var textedUserName;
            // var receivedUserName;
            // await User.findOne({email: email1}, (err, foundUser) => {
            //     if(err){
            //         console.log(err);
            //     } else{
            //         textedUserName = foundUser.username;
            //     }
            // });
            // await User.findOne({email: email2}, (err, foundUser) => {
            //     if(err){
            //         console.log(err);
            //     } else{
            //         receivedUserName = foundUser.username;
            //     }
            // });
            // await console.log(textedUserName);
            const chatObj = {
                Message,
                textedUserEmail,
                receivedUserEmail,
                textedUserName,
                receivedUserName,
                room: [textedUserEmail, receivedUserEmail],
                time
            };
            await io.to(receivedUserEmail).emit('send-msg', data);
            await saveChat(chatObj);
            if(callback){
                //console.log(data);
                callback(data);
            }
        });
        socket.on('typing',async  (data, callback) => {
            const userlistening = data.userlistening;
            console.log(userlistening);
            // const chatObj = {
            //     Message,
            //     textedUserName: email1,
            //     receivedUserName: email2,
            //     room: [email1, email2],
            //     time: Date.now()
            // };
             await io.to(userlistening.email).emit('typing', data.usertyping);
            if(callback){
                callback(data);
            }
        });
        socket.on('disconnect', async ( data, callback ) => {
            //socket.broadcast.emit("new offline-user", )
            const { email, /*sessionId*/ CreatedAt, UpdatedAt } = data;
            const newuser = {
                email,
                //sessionID,
                CreatedAt,
                UpdatedAt: Date.now()
            };
            await User.findOneAndUpdate({email: email}, {$set: { UpdatedAt: Date.now() }}, (err, updatedUser) => {
                if(err){
                    console.log(err);
                }
            })
            // socket.sessionId = sessionId;
            // socket.join(sessionId);
            await socket.broadcast.emit("new offline-user", newuser);
            if(callback){
                callback(data);
            }
        });
    } catch(err){
        console.log(err);
    }
}