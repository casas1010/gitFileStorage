const scraper = require('./scraper');

test('get info on barcode 9421021461303, should return https://barcodesdatabase.org/wp-content/themes/bigdb/lib/registration/registration-image-uploads/9421021461303.jpg', () => {
    expect(scraper(9421021461303)).toBe('https://barcodesdatabase.org/wp-content/themes/bigdb/lib/registration/registration-image-uploads/9421021461303.jpg');
});