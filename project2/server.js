const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

// parse form using body-parser middleware

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());


// read products.json if it exists otherwise create it
fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
        fs.writeFileSync('products.json', '[]');
    }
});

app.post('/', (req, res) => {
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products);
    products.push(req.body.product);
    fs.writeFile('products.json',JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.redirect('http://127.0.0.1:5500/project2/frontend/products.html');
});

// delete a product based on params http://localhost:3000/${product} . product is name of the product
app.delete('/:product', (req, res) => {
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products);
    products = products.filter(product => product !== req.params.product);
    fs.writeFile('products.json',JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log('Product deleted successfully!');
    });
    res.json(products);
})

app.put('/:product', (req, res) => {
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

app.get('/:id', (req, res) => {
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products);
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
})


app.get('/', (req, res) => {
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products);
    res.json(products);
})

// add 404 error handling
app.use((req, res, next) => {
    res.status(404).send('Not found');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});