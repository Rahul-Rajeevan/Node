const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const {productsRouter} = require('./routes/products');
const {adminRouter} = require('./routes/admin');
const {productPageRouter} = require('./routes/productPage');
// parse form using body-parser middleware

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());

app.use('/productPage', productPageRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);


app.get('/', (req, res) => {   
    res.send(`
        <h1>Welcome to the Shopping Cart</h1>
        <a href="/productPage">Products</a>
        <a href="/admin">Admin</a>
    `);
    res.send();
});

// add 404 error handling
app.use((req, res, next) => {
    res.status(404).send('Not found');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});