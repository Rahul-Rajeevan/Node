const express = require('express');
const fs = require('fs');
const path = require('path');

const productsRouter = express.Router();

// read products.json if it exists otherwise create it
fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
        fs.writeFileSync('products.json', '[]');
    }
});


productsRouter.post('/', (req, res) => {
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products);
    products.push(req.body.product);
    fs.writeFile('products.json',JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.redirect('/productPage');
});

// delete a product based on params http://localhost:3000/${product} . product is name of the product
productsRouter.delete('/:product', (req, res) => {
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products);
    products = products.filter(product => product !== req.params.product);
    fs.writeFile('products.json',JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log('Product deleted successfully!');
    });
    res.json(products);
})

productsRouter.put('/:product', (req, res) => {
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products);
    products = products.map(product => {
        if (product === req.params.product) {
            product = req.body.product;
        }
        return product;
    });
    fs.writeFile('products.json',JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log('Product updated successfully!');
    });
    res.json(products);
})



productsRouter.get('/', (req, res) => {
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products);
    res.json(products);
})

module.exports = {productsRouter};