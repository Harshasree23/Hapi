const { badgeModel } = require("../models/badges");

// Function to fetch all badges (API)
const handleGetApiBadge = async (req, res) => {
    try {
        const badges = await badgeModel.find({});
        res.header('Content-Type', 'application/json');
        return res.json(badges);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve badges' });
    }
};

// Function to render the badges page
const handleGetBadge = async (req, res) => {
    try {
        return res.render('badges');
    } catch (err) {
        return res.json({ error: "Error in rendering home page" });
    }
};

// Function to create a new badge (API)
const handlePostApiBadge = async (req, res) => {
    try {
        const { badgeName, badgeDescription, skills, verify, company, password } = req.body;
        const skillsArray = skills.split(',').map(skill => skill.trim()); // Split and trim skills
        const badgeUrl = req.file ? req.file.path : null;

        if (password === process.env.password) {
            const newBadge = await badgeModel.create({
                badgeName,
                badgeDescription,
                badgeUrl,
                skills: skillsArray,
                verify,
                company,
            });
            return res.redirect('/api/badges');
        } else {
            return res.status(403).json({ error: 'Unauthorized: Incorrect password' });
        }
    } catch (err) {
        console.error(err);
        return res.json({ error: "Error in storing badge data" });
    }
};

// Function to edit a badge
const editBadge = async (req, res) => {
    try {
        const { id } = req.params;
        const { badgeName, badgeDescription, skills, verify, company } = req.body;
        const skillsArray = skills.split(',').map(skill => skill.trim()); // Split and trim skills

        const updatedBadge = await badgeModel.findByIdAndUpdate(
            id,
            {
                badgeName,
                badgeDescription,
                skills: skillsArray,
                verify,
                company,
            },
            { new: true }
        );

        if (!updatedBadge) {
            return res.status(404).json({ error: "Badge not found" });
        }

        return res.json({ message: "Badge updated successfully", badge: updatedBadge });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in updating badge data" });
    }
};

// Function to delete a badge
const deleteBadge = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBadge = await badgeModel.findByIdAndDelete(id);

        if (!deletedBadge) {
            return res.status(404).json({ error: "Badge not found" });
        }

        return res.json({ message: "Badge deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in deleting badge" });
    }
};

module.exports = {
    handleGetApiBadge,
    handleGetBadge,
    handlePostApiBadge,
    editBadge,
    deleteBadge,
};
