const User = require("../models/user");
const Chat = require('../models/chat');

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
        await User.find({ NativeLanguage: LearningLanguage, LearningLanguage: NativeLanguage }, async (err, users) => {
            if (err) {
                res.status(200).send(err);
            } else if (users.length !== 0) {
                let flag = 0;
                users.forEach( async (User) => {
                    await Chat.findOne({ room: [email, User.email] }, async (err, foundChat) => {
                        if(err) {
                            console.log(err);
                        } else if(!foundChat){
                            flag = 1;
                            res.status(200).send(User);
                        }
                    });
                    if(flag === 0){
                        console.log('bye');
                        res.status(200).send('');
                    }
                });
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