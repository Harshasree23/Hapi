const { projectModel } = require("../models/projects.js");

// Handle fetching all projects
const handleGetApiproject = async (req, res) => {
    try {
        const projects = await projectModel.find({}, { __v: 0 });
        res.header("Content-Type", "application/json");
        return res.json(projects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve projects" });
    }
};

// Handle rendering project page
const handleGetproject = async (req, res) => {
    try {
        return res.render("project");
    } catch (err) {
        return res.json({ error: "Error in rendering home page" });
    }
};

// Handle adding a new project
const handlePostApiproject = async (req, res) => {
    try {
        const { projectName, projectDescription, usedTechnologies, link, git, video, password } = req.body;
        const techArray = usedTechnologies.split(",").map((tech) => tech.trim());

        if (password !== process.env.PASSWORD) {
            return res.status(403).json({ error: "Unauthorized access. Incorrect password." });
        }

        const imageUrls = req.files.map((file) => file.path);

        const newProject = await projectModel.create({
            projectName,
            description: projectDescription,
            usedTechnologies: techArray,
            link,
            git,
            video,
            images: imageUrls,
        });

        return res.redirect("/api/projects");
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
