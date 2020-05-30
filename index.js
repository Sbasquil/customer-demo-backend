const express = require('express');
const axios = require('axios');
const { FB_HOST_URL } = require('./config');
const { postcodeValidator,
    categoryValidator,
    searchShortlistOfProductsService,  
    searchSupplierCodesService,
    processSearchResultsForUi } = require('./services/searchServices');
const { errorHandler } = require('./middleware/errorHandler');


const app = express();
const PORT = 3001;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.get('/searchProducts/:postcode/:category/:query', async (req,res) => {
    const params = {
        postcode: req.params.postcode,
        category: req.params.category,
        query: req.params.query 
    }

    if (postcodeValidator(params.postcode) && categoryValidator(params.category)) {
        const supplierIds = await searchSupplierCodesService(axios, FB_HOST_URL, params.postcode)
        const productResults = await searchShortlistOfProductsService(supplierIds, params.category, params.query, axios, FB_HOST_URL)
        const processedResults = processSearchResultsForUi(productResults.result)
        
        res.json({ numOfSuppliers: supplierIds.length, shortlist: processedResults, count: productResults.count })
    } else {
        res.status(400).json({detail: "Invalid category or Postcode"})
    }

})
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening on ${PORT} and making requests to ${FB_HOST_URL}`));

module.exports = app;