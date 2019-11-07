import express from 'express'
import axios from 'axios'

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.get('/search/:postcode/:category/:query', (req,res) => {
    axios.get('https://www.foodbomb.com.au/supplier-service/postcode/${postcode}/suppliers')
        .then(supplierIds => {
            axios.post(`https://www.foodbomb.com.au/shop/findProductsBySupplierIds.php`, 
                {
                    category: category,
                    "function": "findProductsBySupplierIds",
                    searchString: searchString,
                    supplierIds: supplierIds
                })
            .then(search => res.json(search))
        })
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
