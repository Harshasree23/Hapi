const { certificateModel } = require("../models/certifications.js")
const { password } = require('../config.json');

const handleGetApicertificate = async (req,res) => 
{
    try {
        const certificates = await certificateModel.find({}, { _id: 0, __v: 0 });
        res.json(certificates);
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve certificates' });
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
       
        if( req.body.password === password )
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

module.exports = {
    handleGetApicertificate,
    handleGetcertificate,
    handlePostApicertificate,
}