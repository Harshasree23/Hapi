const { skillModel } = require("../models/skill.js")
// const { password } = require('../config.json');


const handleGetApiSkill = async (req,res) => 
{
    try {
        const Skills = await skillModel.find({}, { _id: 0, __v: 0 });
        res.header('Content-Type', 'application/json');
        return res.json(Skills);
    }  
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve Skills' });
    }
}



const handleGetSkill = async (req,res) => {
    try{
        return res.render('skills');
    }
    catch(err)
    {
        return res.json({ error:"Error in rendering home page" });
    }
}


const handlePostApiSkill = async (req,res) => {
    
    // getting Skill data from the form
    try{
        const { SkillName, SkillDescription, learnedFrom, projects, certifications } = req.body;
       
        if( req.body.password === process.env.password )
        {
            const newSkill = await skillModel.create({
            skillName:SkillName,
            description:SkillDescription,
            });
        }
        
        return res.redirect('/api/skills');
    }
    catch(err){
        return res.json({ error:"Error in getting Skill data", err: err });   
    }
}

module.exports = {
    handleGetApiSkill,
    handleGetSkill,
    handlePostApiSkill,
}