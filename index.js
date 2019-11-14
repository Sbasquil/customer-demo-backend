const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.get('/', (req,res) => {
    console.log("recived a request")
    res.send("The simple request worked")
})

app.get('/searchProducts/:postcode/:category/:query', (req,res) => {
    let numOfSuppliers = 0; 
    const postcode = req.params.postcode
    const category = req.params.category
    const query = req.params.query    
    axios.get(`https://www.foodbomb.com.au/supplier-service/postcode/${postcode}/suppliers`)
        .then(response => {
            console.log(`its getting into the axios request and succeeding`)
            res.json(response)
            console.log(JSON.stringify(response))
        })
        .catch(response => {
            console.log(`getting into the request and failing`)
            res.send(response)
            console.error(response)
        })
    })
            // numOfSuppliers = response.data.length; // need to extract numOfSuppliers to the response to the client somehow. 


        //         this.setState({ numOfSuppliers: response.data.length })
        //         this.getProductsFromCategoryForSearchQuery(response.data, selectedCategory, searchString).then(response => {
        //             const results = response.result;
        //             const searchResults = results.map(product => ({ name: product.pname, portion: `${product.size}${product.sizeUnit}`, productId: product.product_id, price: `$${product.price}` }))
        //             this.setState({ searchResults, count: response.count }, () => this.setState({fetching: false, searchComplete: true, postcodeSubmitted: postcode}));
        //         }).catch(err => {
        //             this.setState({fetching: false, searchComplete: false, requestError: JSON.stringify(err)})
        //             console.error(err)
        //         })
        //     }).catch(err => { 
        //         console.error(err) 
        //         this.setState({fetching: false, searchComplete: false, requestError: JSON.stringify(err)})
        //     })
    
    
    
//     axios.get('https://www.foodbomb.com.au/supplier-service/postcode/${postcode}/suppliers')
//         .then(supplierIds => {
//             axios.post(`https://www.foodbomb.com.au/shop/findProductsBySupplierIds.php`, 
//                 {
//                     category: category,
//                     "function": "findProductsBySupplierIds",
//                     searchString: searchString,
//                     supplierIds: supplierIds.data
//                 })
//             .then(search => res.json(search))
//         })
// })

app.listen(PORT, () => console.log(`listening on ${PORT}`));
