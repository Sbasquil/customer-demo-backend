const postcodeList = require('../postcodeList.json');
const { categories } = require('../utils/Constants');

const postcodeValidator = (postcode) => {
    return postcodeList.some(elem => elem.postcode.toString() === postcode.toString());
}

const categoryValidator = (category) => {
    return categories.some(elem => elem.value === category)    
}

const searchSupplierCodesService = async (axios, URL, postcode) => {
    const supplierIds = await axios.get(`${URL}/supplier-service/postcode/${postcode}/suppliers`) 
    return supplierIds.data;
}

const searchShortlistOfProductsService = async (supplierIds, category, query, axios, URL) => {
    const payload = {
        category,
        "function": "findProductsBySupplierIds",
        searchString: query,
        supplierIds,
    }   
    const shortlist = await axios.post(`${URL}/shop/findProductsBySupplierIds.php`, payload)

    return shortlist.data;
}

const processSearchResultsForUi = (searchData) => {
    return searchData.map(product => ({ name: product.pname, portion: `${product.size}${product.sizeUnit}`, productId: product.product_id, price: `$${product.price}`}))
}

module.exports = {
    postcodeValidator,
    categoryValidator,
    searchSupplierCodesService,
    searchShortlistOfProductsService,
    processSearchResultsForUi
}