const express = require('express');
const axios = require('axios');
const { FB_HOST_URL } = require('./config')
const { searchShortlistOfProductsService,  
    searchSupplierCodesService,
    processSearchResultsForUi
} = require('./services/searchServices')
const { errorHandler } = require('./middleware/errorHandler')
const supertest = require('supertest')
const request = supertest(app)


const app = express();
const PORT = 3001;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });



// todo: add regex for field validation. 
app.get('/searchProducts/:postcode/:category/:query', async (req,res) => {
    const params = {
        postcode: req.params.postcode,
        category: req.params.category,
        query: req.params.query 
    }

    const supplierIds = await searchSupplierCodesService(axios, FB_HOST_URL, params.postcode)
    const productResults = await searchShortlistOfProductsService(supplierIds, params.category, params.query, axios, FB_HOST_URL)
    const processedResults = processSearchResultsForUi(productResults.result)
    
    res.json({ numOfSuppliers: supplierIds.length, shortlist: processedResults, count: productResults.count })

})
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening on ${PORT} and making requests to ${FB_HOST_URL}`));
