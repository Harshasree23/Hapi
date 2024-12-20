const express = require('express');
const { handleGetApiBadge, handlePostApiBadge, editBadge, deleteBadge } = require('../controllers/badges');
const { handleGetApiSkill, handlePostApiSkill, editSkill, deleteSkill } = require('../controllers/skills');
const { handleGetApiproject, handlePostApiproject, handleUpdateApiproject, handleDeleteApiproject } = require('../controllers/projects');
const { handleGetApicertificate, handlePostApicertificate, editCertificate, deleteCertificate } = require('../controllers/certifications');
const { handleGetApicontact, handlePostApicontact } = require('../controllers/contacts');
const { handleGetApiachievement, handlePostApiachievement, updateAchievement ,deleteAchievement } = require('../controllers/achievements');



const path = require('path');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api,
    api_secret: process.env.cloud_api_secret,
});

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'projects', // Folder name in Cloudinary
        allowed_formats: ['jpeg', 'jpg', 'png'], // Allowed file types
    },
});

// Multer instance
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Only images (jpeg, jpg, png) are allowed!'));
        }
    },
});


const badgeStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'badges', // Folder name in Cloudinary
        allowed_formats: ['jpeg', 'jpg', 'png'], // Allowed file types
    },
});

// Multer instance for badges
const uploadBadge = multer({
    storage: badgeStorage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error('Only images (jpeg, jpg, png) are allowed!'));
        }
    },
});

const apiRoute = express.Router();

apiRoute
    .get('/achievements', handleGetApiachievement)
    .get('/badges', handleGetApiBadge)
    .get('/skills', handleGetApiSkill)
    .get('/certifications', handleGetApicertificate)
    .get('/projects', handleGetApiproject)
    .post('/projects/:id' , handleUpdateApiproject)
    .delete('/projects/:id' , handleDeleteApiproject)
    .get('/contacts', handleGetApicontact)
    .post('/achievements', handlePostApiachievement)
    .post('/achievements/:id', updateAchievement )
    .delete('/achievements/:id', deleteAchievement )
    .post('/contacts', handlePostApicontact)
    .post('/certifications', handlePostApicertificate)
    .post('/certifications/:id',editCertificate)
    .delete('/certifications/:id',deleteCertificate)
    .post('/badges', uploadBadge.single('badgeUrl'), handlePostApiBadge)
    .post('/badges/:id' , editBadge)
    .delete('/badges/:id', deleteBadge)
    .post('/skills', handlePostApiSkill)
    .post('/skills/:id' , editSkill)
    .delete('/skills/:id' , deleteSkill)
    .post(
        '/projects',
        upload.array('images', 5), // Allow up to 5 images
        handlePostApiproject
    )
    .post('/verify-password', (req, res) => {
        const { password } = req.body;
        if (password === process.env.password) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    })
    .use((req, res, next) => {
        // Handle route not found
        res.status(404).json({ error: 'Route not found' });
    });

module.exports = {
    apiRoute,
};
