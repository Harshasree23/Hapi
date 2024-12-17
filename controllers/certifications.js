const { certificateModel } = require("../models/certifications.js")
// const { password } = require('../config.json');

const handleGetApicertificate = async (req,res) => 
{
    try {
        const certificates = await certificateModel.find({}, { _id: 0, __v: 0 });
        res.header('Content-Type', 'application/json');
        return res.json(certificates);
    }  
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve certificates' });
    }
}


const handleGetcertificate = async (req,res) => {
    try{
        return res.render('certificate');
    }
    catch(err)
    {
        return res.json({ error:"Error in rendering home page" });
    }
}


const handlePostApicertificate = async (req,res) => {
    
    // getting certificate data from the form
    try{
        const { certificateName, certificateDescription, url, skills , verify , company } = req.body;
        const skillsArray =  skills.split(',').map(certificate => certificate.trim()); 
       
        if( req.body.password === process.env.password)
        {
            const newcertificate = await certificateModel.create({
            certificateName,
            description: certificateDescription,
            url,
            skills : skillsArray,
            verify,
            company,
            });
        }
        
        return res.redirect('/api/certifications');
    }
    catch(err){
        return res.json({ error:"Error in getting certificate data", err: err });   
    }
}

// Function to edit a certificate
const editCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const { certificateName, certificateDescription,url, skills, verify, company } = req.body;
        const skillsArray = skills.split(',').map(skill => skill.trim()); // Split and trim skills

        const updatedcertificate = await certificateModel.findByIdAndUpdate(
            id,
            {
                certificateName,
                description: certificateDescription,
                url,
                skills: skillsArray,
                verify,
                company,
            },
            { new: true }
        );

        if (!updatedcertificate) {
            return res.status(404).json({ error: "certificate not found" });
        }

        return res.json({ message: "certificate updated successfully", certificate: updatedcertificate });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in updating certificate data" });
    }
};

// Function to delete a certificate
const deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedcertificate = await certificateModel.findByIdAndDelete(id);

        if (!deletedcertificate) {
            return res.status(404).json({ error: "certificate not found" });
        }

        return res.json({ message: "certificate deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in deleting certificate" });
    }
};

module.exports = {
    handleGetApicertificate,
    handleGetcertificate,
    handlePostApicertificate,
    editCertificate,
    deleteCertificate,
}