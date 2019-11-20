const express = require('express');
const axios = require('axios');

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

    axios.get(`https://www.foodbomb.com.au/supplier-service/postcode/${postcode}/suppliers`)
        .then(response => {
            const payload = {
                category,
                "function": "findProductsBySupplierIds",
                searchString: query,
                supplierIds: response.data
            }   
         
            axios.post(`https://www.foodbomb.com.au/shop/findProductsBySupplierIds.php`, payload)
                .then(response => {
                    res.json({shortlist: response.data, supplierIds: payload.supplierIds});
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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
