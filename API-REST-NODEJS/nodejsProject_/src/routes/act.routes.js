//Modules
const express = require('express');
const router = express.Router();

//Import class
const Acts = require('../controllers/act.controller');
const actController = new Acts();

//Middleware
const { veToken, Admin } = require('../middlewares/auth.token');

//Routes 
//Get all 
router.get('/', async (req, res) => {
    const act = await actController.allAct()
    res.json(act);
});

//Get by ID
router.get('/:actId', async (req, res) => {
    const act = await actController.getByIdAct(req.params.actId);
    res.status(200).json(act);
});

//Add
router.post('/', [veToken, Admin], async (req, res) => {
    const act = await actController.addAct(req.body); 
    res.status(201).json(act);
});

//Update
router.put('/:actId', [veToken, Admin], async (req, res) => {
    const act = await actController.updateAct(req.body, req.params.actId);
    res.status(200).json(act);
});

//Delete 
router.delete('/:actId', [veToken, Admin], async (req, res) => {
    await actController.deleteAct(req.params.actId); 
    res.status(204).json();
}); 

//Export 
module.exports = router;

