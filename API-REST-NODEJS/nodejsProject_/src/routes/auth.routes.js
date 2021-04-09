//Modules
const express = require('express');
const router = express.Router();

//Import class
const Users = require('../controllers/auth.controller');
const userController = new Users();

//Middleware 
const { verifyRol } = require('../middlewares/ve.singup');

//Routes 
//Sing-up
router.post('/singup', verifyRol, async (req, res) => {
   const user = await userController.singup(req.body);
   res.status(200).json(user);
});

//Sing-in
router.post('/singin', async (req, res) => {
   const user = await userController.singin(req.body);
   res.json(user);
});

//Export
module.exports = router;