const express = require('express');
const fs = require('fs');
const path = require('path');

const productPageRouter = express.Router();


const filePath = path.join(__dirname,'..', 'view', 'products.html');
productPageRouter.get('/', (req, res) => {
    res.sendFile(filePath);
})

module.exports = {productPageRouter};