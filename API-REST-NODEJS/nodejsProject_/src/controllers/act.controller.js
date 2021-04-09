//Import
const Act = require('../models/Act');

//Controller 
class Acts {
    //Add 
    async addAct (body) {
        try {
            const { name, date, type, area, description } = body;
            const newAct = new Act({name, date, type, area, description});
            const actSaved = await newAct.save();
            return actSaved;
        } catch (err) {
            console.error(err);            
        };
    };
    //Get by ID
    async getByIdAct (id) {
        try {
            const act = await Act.findById(id);
            return act; 
        } catch (err) {
            console.error(err); 
        };
    };
    //Update 
    async updateAct (body, id) {
        try {
            const act = await Act.findByIdAndUpdate(id, body, {
                new: true
            });
            return act; 
        } catch (err) {
            console.error(err); 
        };
    };
    //Delete 
    async deleteAct (id) {
        try {
            await Act.findByIdAndDelete(id);
        } catch (err) {
            console.error(err); 
        };
    };
    //Get all activities 
    async allAct () {
        try {
            const act = await Act.find();
            return act;
        } catch (err) {
            console.error(err); 
        };
    };
};

//Export
module.exports = Acts;
