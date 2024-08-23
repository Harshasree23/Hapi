const { projectModel } = require("../models/projects.js")
const { password } = require('../config.json');


const handleGetApiproject = async (req,res) => 
{
    try {
        const projects = await projectModel.find({}, { _id: 0, __v: 0 });
        res.json(projects);
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
}



const handleGetproject = async (req,res) => {
    try{
        return res.render('project');
    }
    catch(err)
    {
        return res.json({ error:"Error in rendering home page" });
    }
}


const handlePostApiproject = async (req,res) => {
    
    // getting project data from the form
    try{
        const { projectName, projectDescription, usedTechnologies, link ,git ,video } = req.body;
        const techArray =  usedTechnologies.split(',').map(project => project.trim()); 
       
        if( req.body.password === password )
        {
            const newproject = await projectModel.create({
            projectName,
            description: projectDescription,
            usedTechnologies: techArray,
            link,
            git,
            video,
            });
        }
        
        return res.redirect('/api/projects');
    }
    catch(err){
        return res.json({ error:"Error in getting project data", err: err });   
    }
}

module.exports = {
    handleGetApiproject,
    handleGetproject,
    handlePostApiproject,
}