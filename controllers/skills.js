const { skillModel } = require("../models/skill.js")
// const { password } = require('../config.json');


const handleGetApiSkill = async (req,res) => 
{
    try {
        const Skills = await skillModel.find({});
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
        const { SkillName, SkillDescription} = req.body;
       
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

// Function to edit a Skill
const editSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedSkill = await SkillModel.findByIdAndUpdate(
            id,
            {
                skillName:name,
                description : description,
            },
            { new: true }
        );

        if (!updatedSkill) {
            return res.status(404).json({ error: "Skill not found" });
        }

        return res.json({ message: "Skill updated successfully", Skill: updatedSkill });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in updating Skill data" });
    }
};

// Function to delete a Skill
const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSkill = await SkillModel.findByIdAndDelete(id);

        if (!deletedSkill) {
            return res.status(404).json({ error: "Skill not found" });
        }

        return res.json({ message: "Skill deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in deleting Skill" });
    }
};

module.exports = {
    handleGetApiSkill,
    handleGetSkill,
    handlePostApiSkill,
    editSkill,
    deleteSkill,
}