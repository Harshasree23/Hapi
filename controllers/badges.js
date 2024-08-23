const { badgeModel } = require("../models/badges")
const { password } = require('../config.json');


const handleGetApiBadge = async (req,res) => 
{
    try {
        const badges = await badgeModel.find({}, { _id: 0, __v: 0 });
        res.json(badges);
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve badges' });
    }
}



const handleGetBadge = async (req,res) => {
    try{
        return res.render('badges');
    }
    catch(err)
    {
        return res.json({ error:"Error in rendering home page" });
    }
}


const handlePostApiBadge = async (req,res) => {
    
    // getting badge data from the form
    try{
        const { badgeName, badgeDescription, badgeUrl, skills, verify, company } = req.body;
        skillsArray =  skills.split(',').map(skill => skill.trim()); // Split and trim skills
        
        if( req.body.password === password )
        {
            const newBadge = await badgeModel.create({
            badgeName,
            badgeDescription,
            badgeUrl,
            skills: skillsArray,
            verify,
            company,
            });
        }
        
        return res.redirect('/api/badges');
    }
    catch(err){
        return res.json({ error:"Error in storing badge data" });
    }
    
}

module.exports = {
    handleGetApiBadge,
    handleGetBadge,
    handlePostApiBadge,
}