const express = require('express');
const path = require('path');

const adminRouter = express.Router();

const filePath = path.join(__dirname,'..', 'view', 'index.html');
adminRouter.get('/', (req, res) => {
    res.sendFile(filePath);
})

module.exports = {adminRouter};