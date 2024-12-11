const express = require('express');
const { handleGetBadge } = require('../controllers/badges');
const { handleGetSkill } = require('../controllers/skills');
const { handleGetproject } = require('../controllers/projects');
const { handleGetcertificate } = require('../controllers/certifications');
const { handleGetcontact } = require('../controllers/contacts');
const { handleGetachievement } = require('../controllers/achievements');


const multer = require('multer');
const path = require('path');


// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: './uploads/projects',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Multer instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size per file
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

const userRoute = express.Router();


userRoute.get('/',(req,res) => {return res.render('home');})
        .get('/achievements' , handleGetachievement  )
        .get('/badges' , handleGetBadge )
        .get('/skills' , handleGetSkill )
        .get('/certifications' , handleGetcertificate )
        .get('/projects' , upload.array('images', 5) , handleGetproject )
        .get('/contacts' , handleGetcontact )
        .use((req, res, next) => {
            // Handle route not found
            res.status(404).json({ error: 'Route not found' });
          });



module.exports = {
    userRoute,
}