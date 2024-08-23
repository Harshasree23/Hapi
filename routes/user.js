const express = require('express');
const { handleGetBadge } = require('../controllers/badges');
const { handleGetSkill } = require('../controllers/skills');
const { handleGetproject } = require('../controllers/projects');
const { handleGetcertificate } = require('../controllers/certifications');
const { handleGetcontact } = require('../controllers/contacts');
const { handleGetachievement } = require('../controllers/achievements');


const userRoute = express.Router();


userRoute.get('/',(req,res) => {return res.render('home');})
        .get('/achievements' , handleGetachievement  )
        .get('/badges' , handleGetBadge )
        .get('/skills' , handleGetSkill )
        .get('/certifications' , handleGetcertificate )
        .get('/projects' , handleGetproject )
        .get('/contacts' , handleGetcontact )
        .use((req, res, next) => {
            // Handle route not found
            res.status(404).json({ error: 'Route not found' });
          });



module.exports = {
    userRoute,
}