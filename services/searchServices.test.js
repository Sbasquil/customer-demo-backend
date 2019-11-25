// const postcodeList = require('../postcodeList.json');
// const { categories } = require('../utils/Constants');
const { processSearchResultsForUi, postcodeValidator, categoryValidator } = require('./searchServices');

describe('Process Search Results for UI', function() {
    it('should take raw data from the api and then return it in the form to be consumed by the UI', () => {
        const input = [ { product_id: 64605,
            pname: 'Beef Bones',
            price: '2.00',
            unit: 'kg',
            size: '10',
            sizeUnit: 'kg' },
          { product_id: 54326,
            pname: 'Beef Bones',
            price: '2.50',
            unit: 'kg',
            size: '10',
            sizeUnit: 'kg' },
          { product_id: 64686,
            pname: 'Beef Neck  Bones',
            price: '2.70',
            unit: 'kg',
            size: '10',
            sizeUnit: 'kg' } ];

        const output = [
            {"name":"Beef Bones","portion":"10kg","productId":64605,"price":"$2.00"},
            {"name":"Beef Bones","portion":"10kg","productId":54326,"price":"$2.50"},
            {"name":"Beef Neck  Bones","portion":"10kg","productId":64686,"price":"$2.70"}];
        expect(processSearchResultsForUi(input)).toStrictEqual(output)
    })   
})

describe('Parameter field validation', () => {
  it('should validate a correct postcode', () => {
    const validPostcode = 2000; 

    expect(postcodeValidator(validPostcode)).toBeTruthy();
  })
  it('should invalidate an invalid postcode', () => {
    const invalidPostcode = 157;
    expect(postcodeValidator(invalidPostcode)).toBeFalsy();
  })
  it('should validate the category matches a category from the main category list', () => {
    const validCategory = 'fruit & veg';
    expect(categoryValidator(validCategory)).toBeTruthy();
  })
  it('should return false if no matching category is found', () => {
    const invalidCategory = 'testing suite';
    expect(categoryValidator(invalidCategory)).toBeFalsy();
  })
})



