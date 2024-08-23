const express = require('express');
const { handleGetApiBadge, handlePostApiBadge } = require('../controllers/badges');
const { handleGetApiSkill, handlePostApiSkill } = require('../controllers/skills');
const { handleGetApiproject, handlePostApiproject } = require('../controllers/projects');
const { handleGetApicertificate, handlePostApicertificate } = require('../controllers/certifications');
const { handleGetApicontact, handlePostApicontact } = require('../controllers/contacts');
const { handleGetApiachievement, handlePostApiachievement } = require('../controllers/achievements');


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
        .post('/projects', handlePostApiproject)
        .use((req, res, next) => {
            // Handle route not found
            res.status(404).json({ error: 'Route not found' });
          });

module.exports = {
    apiRoute,
}