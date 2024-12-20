const { projectModel } = require("../models/projects.js")
// const { password } = require('../config.json');



const handleGetApiproject = async (req,res) => 
{
    try {
        const projects = await projectModel.find({}, { _id: 0, __v: 0 });
        res.header('Content-Type', 'application/json');
        return res.json(projects);
    }  
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve projects' });
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


const handlePostApiproject = async (req, res) => {
    try {
        // Extract project data from the request
        const { projectName, projectDescription, usedTechnologies, link, git, video, password } = req.body;
        const techArray = usedTechnologies.split(',').map((tech) => tech.trim());

        // Validate password
        if (password !== process.env.password) {
            return res.status(403).json({ error: "Unauthorized access. Incorrect password." });
        }

        // Handle image file uploads
        const imageUrls = req.files.map((file) => file.path);

        // Create a new project document
        const newProject = await projectModel.create({
            projectName,
            description: projectDescription,
            usedTechnologies: techArray,
            link,
            git,
            video,
            images:imageUrls, // Save image paths in the database
        });

        // Redirect or respond with success
        return res.redirect('/api/projects');
    } catch (err) {
        return res.status(500).json({ error: "Error in processing project data", details: err.message });
    }
};
// Handle updating a project
const handleUpdateApiproject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, projectDescription, usedTechnologies, Link, git, video , images} = req.body;
        const techArray = usedTechnologies.split(",").map((tech) => tech.trim());

        const updatedProject = await projectModel.findByIdAndUpdate(
            id,
            {
                projectName : name,
                description: projectDescription,
                usedTechnologies: techArray,
                link:Link,
                git,
                video,
                images,
            },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.json({ message: "Project updated successfully", project: updatedProject });
    } catch (err) {
        return res.status(500).json({ error: "Error in updating project", details: err.message });
    }
};

// Handle deleting a project
const handleDeleteApiproject = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProject = await projectModel.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.json({ message: "Project deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error in deleting project", details: err.message });
    }
};

module.exports = {
    handleGetApiproject,
    handleGetproject,
    handlePostApiproject,
    handleUpdateApiproject,
    handleDeleteApiproject,
};
