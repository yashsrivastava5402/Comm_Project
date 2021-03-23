const express = require('express');
const userController = require('../controllers/user');
const chatController = require('../controllers/chat'); 
const router = express.Router();

router.post('/findUser', userController.findUser);
router.post('/addUser',userController.addUser);
router.post('/addUserLanguage', userController.addUserLanguage);
router.post('/getUsersList', userController.getUsersList);
router.post('/findChat', chatController.findChat);
router.post('/getPreviousUsers', chatController.getPreviousUsers);
//router.post('/saveChat', chatController.saveChat);

module.exports = router;