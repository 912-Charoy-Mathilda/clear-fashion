const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const scrapeProducts = async (url) => {
  const products = [];

  try {
    const response = await fetch(url);

    if (response.ok) {
      const html = await response.text();
      const $ = cheerio.load(html);

      $('.product-miniature').each((i, element) => {
        const brand = "Montlimart";
        const name = $(element)
        .find('.product-miniature__title')
        .text()
        .trim()
        .toLowerCase()
        .replace(/^\w/, c => c.toUpperCase());;
        const price = parseFloat($(element)
        .find('.price')
        .text()
        .replace(',', '.'));
        const color = $(element)
        .find('.product-miniature__color')
        .text()
        .trim()
        .toLowerCase()
        .replace(/^\w/, c => c.toUpperCase());

        products.push({ brand, name, price, color });
      });
    } else {
      console.error(`Error fetching products. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error scraping products: ${error}`);
  }

  return products;
};

const writeDataToFileMontlimart = async () => {
  try {
    const montlimart_products = await scrapeProducts('https://www.montlimart.com/99-vetements');
    console.log(montlimart_products);

    const jsonData = JSON.stringify(montlimart_products);

    fs.writeFile('montlimart_products.json', jsonData, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  } catch (error) {
    console.error(error);
  }
};

writeDataToFileMontlimart();