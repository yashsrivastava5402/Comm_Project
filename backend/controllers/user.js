const User = require("../models/user");
const Chat = require('../models/chat');
const user = require("../models/user");

exports.findUser = async (req, res) => {
    try {
        await User.findOne({ email: req.body.email, password: req.body.password }, (err, foundUser) => {
            if (err) {
                res.status(500).send(err);
            } else if (foundUser) {
                res.status(200).send(foundUser);
            } else {
                res.status(400).send("");
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await User.findOne({ email: email }, async (err, foundUser) => {
            if (err) {
                res.status(500).send(err);
            } else if (foundUser) {
                res.status(300).send("User already present.");
            } else {
                const newUser = {
                    username,
                    email,
                    password,
                    NativeLanguage: "",
                    LearningLanguage: "",
                    CreatedAt: Date.now(),
                    UpdatedAt: Date.now()
                }
                await User.insertMany(newUser, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // User.findOne(newUser), (err, foundUser) => {
                        //     if (err) {
                        //         res.status(500).sens(err);
                        //     } else if (foundUser) {
                        //         res.status(400).send("User already present.");
                        //     } else {
                        //         res.status(200).send(newUser);
                        //     }
                        res.status(200).send(newUser);
                    }
                });
                // res.status(200).send(newUser);
            }
            // User.insertOne(newUser, (err) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         // User.findOne(newUser), (err, foundUser) => {
            //         //     if (err) {
            //         //         res.status(500).sens(err);
            //         //     } else if (foundUser) {
            //         //         res.status(400).send("User already present.");
            //         //     } else {
            //         //         res.status(200).send(newUser);
            //         //     }
            //         }
            //     }

        });
    } catch (err) {
        console.log(err);
    }
}

exports.addUserLanguage = async (req, res) => {
    try {
        const email = req.body.email;
        const NativeLanguage = req.body.NativeLanguage;
        const LearningLanguage = req.body.LearningLanguage;
        // User.find({}, (err, users) => {
        //     if (err) {
        //         res.status(400).send(err);
        //     } else {
        //         users.forEach((user) => {
        //             User.updateOne({ email: email },
        //                 { $set: { NativeLanguage: NativeLanguage } },
        //                 { $set: { LearningLanguage: LearningLanguage } },
        //                 { $set: { UpdatedAt: Date.now() } },
        //                 (err, updatedUser) => {
        //                     res.status(200).send(updatedUser);
        //                 }, (err) => {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         console.log("Succesfully added the languages!");
        //                     }
        //                 });
        //         });
        await User.findOneAndUpdate({ email: email }, {
            $set:
            {
                NativeLanguage: NativeLanguage,
                LearningLanguage: LearningLanguage,
                UpdatedAt: Date.now()
            }
        },
            { new: true },
            (err, updatedUser) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(200).send(updatedUser);
                }
            });// (err) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log("Succesfully added the languages!");
        //     }
        // });
        //res.send(200).send(updatedUser);
        //}
        //});
    } catch (err) {
        console.log(err);
    }
}

// let previousUsers = [];
// let i = 0;

exports.getUsersList = async (req, res) => {
    try {
        const { email, NativeLanguage, LearningLanguage } = req.body;
        // const myPromise = new Promise(function(resolve, reject)){

        // }
        await User.find({ NativeLanguage: LearningLanguage, LearningLanguage: NativeLanguage }, async (err, users) => {
            if (err) {
                res.status(200).send(err);
            } else if (users.length !== 0) {
                // for(let i = 0; i < users.length; i++){
                //     await Chat.findOne({$or: [{ room: [email, users[i].email] }, {room: [users[i].email, email]}]}, async (err, foundChat) => {
                //         if(err) {
                //             console.log(err);
                //         } else if(!foundChat){
                //             flag = 1;
                //             res.status(200).send(User);
                //             //break;
                //         }
                //     });
                //     if(flag === 1){
                //         break;
                //     }
                // }
                //let userArray = [];
                for(let j = 0; j < users.length; j++){
                    if(users[j].email === email){
                        continue;
                    }
                    let flag = false;
                    for(let i = 0; i < users[j].prevUsers.length; i++){
                        if(users[j].prevUsers[i].email === email){
                            flag = true;
                            break;
                        }
                    }
                    if(flag === false){
                        res.status(200).send(users[j]);
                        console.log("Hi");
                        break;
                    }
                }
                if(!res.headersSent){
                    console.log("yup");
                    res.status(200).send('');
                }
                // const myPromise = new Promise(async (resolve, reject) => {
                //     let Users = [];
                //     for(let i = 0; i <= users.length; i++){
                //         if(i === users.length){
                //             resolve(Users);
                //         }
                //         await Chat.find({$or: [{textedUserEmail: email, receivedUserEmail: User.email},
                //             {textedUserEmail: User.email, receivedUserEmail: email}]}, async (err, foundchats) => {
                //             if(err) {
                //                 console.log(err);
                //             }else if(foundchats.length === 0){
                //                 // flag = 1;
                //                 // console.log("User is: ");
                //                 // console.log(User);
                //                 // res.status(200).send(User);
                //                 // //userArray.push(User);
                //                 // return;
                //                     Users.push(User);
                //                     resolve(Users);
                                
                //              }
                
                //             // else if(z === users.length && flag === 0){
                //             //     res.status(200).send('');
                //             //     console.log("flag ");
                //             //     console.log(flag);
                //             // }
                //         });
                //         // if(flag === 0){
                //         //     console.log('bye');
                //         //     res.status(200).send('');
                //         // }
                //     }
                    
                // });
                // myPromise.then((Users) => {
                //     if(!res.headersSent){
                //         console.log("Yo!");
                //         res.status(200).send(Users.length > 0 ? Users[0] : null);
                //     }
                // });
                // if(flag === 0){
                //     console.log('bye');
                //     res.status(200).send('');
                // }
                // }else{
                //     let rand = Math.floor(Math.random()*(userArray.length-1));
                //     console.log("rand");
                //     res.status(200).send(userArray[rand]);
                // }
                // previousUsers.push(foundUser[i]);
                // let i = 0, flag = 0;
                // while (flag === 0) {
                //     Chat.find({ room: [email, foundUser[0].email] }, (err, foundChat) => {
                //         if (err) {
                //             res.status(500).send(err);
                //         } else if (foundChat) {
                //             i += 1;
                //             //flag = 1;
                //         } else {
                //             res.status(200).send(foundUser[i]);
                //             flag = 1;
                //         }
                //     });
                //}
                // res.status(200).send(foundUser[0]);
                // i = i + 1;
            } else {
                console.log('byebye');
                res.status(200).send('');
            }
        });
        // Chat.find({ textedUserName: { $all: email } }, (req, chats) => {
        //     if (err) {
        //         res.status(500).send(err);
        //     } else if (chats) {
        //         chats.forEach((chat) => {
        //             let userlist = [];
        //             userlist.push(chat.receivedUserName);
        //         });
        //         res.status(200).send(userlist);
        //     }
        // });
    } catch (err) {
        console.log(err);
    }
}