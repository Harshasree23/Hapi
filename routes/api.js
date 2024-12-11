const express = require('express');
const { handleGetApiBadge, handlePostApiBadge } = require('../controllers/badges');
const { handleGetApiSkill, handlePostApiSkill } = require('../controllers/skills');
const { handleGetApiproject, handlePostApiproject } = require('../controllers/projects');
const { handleGetApicertificate, handlePostApicertificate } = require('../controllers/certifications');
const { handleGetApicontact, handlePostApicontact } = require('../controllers/contacts');
const { handleGetApiachievement, handlePostApiachievement } = require('../controllers/achievements');


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
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size per file
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


apiRoute.get('/achievements' , handleGetApiachievement  )
        .get('/badges' , handleGetApiBadge )
        .get('/skills' , handleGetApiSkill )
        .get('/certifications' , handleGetApicertificate )
        .get('/projects' , handleGetApiproject )
        .get('/contacts' , handleGetApicontact )
        .post('/achievements', handlePostApiachievement)
        .post('/contacts', handlePostApicontact )
        .post('/certifications', handlePostApicertificate)
        .post('/badges' , handlePostApiBadge)
        .post('/skills', handlePostApiSkill )
        .post('/projects', upload.array('images', 5) , handlePostApiproject)
        .use((req, res, next) => {
            // Handle route not found
            res.status(404).json({ error: 'Route not found' });
          });

module.exports = {
    apiRoute,
}