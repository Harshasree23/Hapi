const { achievementModel } = require("../models/achievements.js")
// const { password } = require('../config.json');


const handleGetApiachievement = async (req,res) => 
{
    try {
        const achievements = await achievementModel.find({});
        res.header('Content-Type', 'application/json');
        return res.json(achievements );
    }  
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve achievements' });
    }
}



const handleGetachievement = async (req,res) => {
    try{
        return res.render('achievements');
    }
    catch(err)
    {
        return res.json({ error:"Error in rendering home page" });
    }
}


const handlePostApiachievement = async (req,res) => {
    
    // getting achievement data from the form
    try{
        const { achievementName, achievementDescription, skills } = req.body;
        const skillArray =  skills.split(',').map(achievement => achievement.trim()); 
       
        if( req.body.password === process.env.password )
        {
            const newachievement = await achievementModel.create({
            achievementName: achievementName,
            description: achievementDescription,
            skills: skillArray, 
            });
        }
        
        return res.redirect('/api/achievements');
    }
    catch(err){
        return res.json({ error:"Error in getting achievement data", err: err });   
    }
}

const updateAchievement = async (req, res) => {
    try {
        const { id } = req.params; 
        const { achievementName, description, skills } = req.body; 
        const skillArray = skills.split(',').map(skill => skill.trim()); 
        const updatedAchievement = await achievementModel.findByIdAndUpdate( id, 
            { 
                achievementName, 
                description, 
                skills: skillArray 
            }, 
            { new: true } 
        );
        if (!updatedAchievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }
        return res.status(200).json({ message: 'Achievement updated successfully', updatedAchievement });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error updating achievement', details: err.message });
    }
};


const deleteAchievement = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAchievement = await achievementModel.findByIdAndDelete(id);
        if (!deletedAchievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }
        return res.status(200).json({ message: 'Achievement deleted successfully', deletedAchievement });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error deleting achievement', details: err.message });
    }
};


module.exports = {
    handleGetApiachievement,
    handleGetachievement,
    handlePostApiachievement,
    updateAchievement,
    deleteAchievement,
}