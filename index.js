const express = require('express');
const axios = require('axios');
const { FB_HOST_URL } = require('./config')

const app = express();
const PORT = 3001;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


app.get('/searchProducts/:postcode/:category/:query', (req,res) => {
    const postcode = req.params.postcode
    const category = req.params.category
    const query = req.params.query 

    axios.get(`${FB_HOST_URL}/supplier-service/postcode/${postcode}/suppliers`)
        .then(response => {
            const payload = {
                category,
                "function": "findProductsBySupplierIds",
                searchString: query,
                supplierIds: response.data
            }   
         
            axios.post(`${FB_HOST_URL}/shop/findProductsBySupplierIds.php`, payload)
                .then(response => {
                    const searchResults = response.data.result.map(product => ({ name: product.pname, portion: `${product.size}${product.sizeUnit}`, productId: product.product_id, price: `$${product.price}`}))
                    res.json({shortlist: searchResults, count: response.data.count, numOfSuppliers: payload.supplierIds.length});
                })
                .catch( error => { 
                    res.status(error.status)
                    res.send(`products request failed.
                    ${error}`)
                })
        })
        .catch(response => {
            console.log(`getting into the request and failing`)
            res.json(response.data)
            console.error(response)
        })
    })

app.listen(PORT, () => console.log(`listening on ${PORT} and making requests to ${FB_HOST_URL}`));
