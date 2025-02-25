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
    res.redirect('http://127.0.0.1:5500/frontend/products.html');
});


app.get('/', (req, res) => {
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products);
    res.json(products);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});