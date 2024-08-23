const { achievementModel } = require("../models/achievements.js")
// const { password } = require('../config.json');


const handleGetApiachievement = async (req,res) => 
{
    try {
        const achievements = await achievementModel.find({}, { _id: 0, __v: 0 });
        res.header('Content-Type', 'application/json');
        res.send(achievements );
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve achievements' });
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

module.exports = {
    handleGetApiachievement,
    handleGetachievement,
    handlePostApiachievement,
}