const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const BASE_URL = 'https://shop.circlesportswear.com/collections/collection-homme?page=';

const parse = data => {
  const $ = cheerio.load(data);
  
  return $('.grid__item')
    .map((i, element) => {
      const brand = "Circle Sportswear";
      const name = $(element)
        .find('h3.card__heading a')
        .first()
        .text()
        .trim()
        .replace(/\s/g, ' ');
      // Vérifier si la caractéristique existe
      const characteristicElement = $(element)
      .find('.card__characteristic');
      const characteristic = characteristicElement.length > 0 ? characteristicElement
      .text()
      .trim()
      .replace(/\s/g, ' ') : '';

      const price = parseFloat(
        $(element)
            .find('.money')
            .first()
            .text()
            .replace(/\D/g, ''));
         
    // Vérifier que les champs requis existent avant de créer l'objet produit
    if (characteristic.length > 0) {
        return {brand, name, characteristic, price};
      } else {
        return null;
      }

    })
    .get()
    .filter(product => product !== null); // Exclure les produits nuls;
};

const scrape = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const scrapeAllPages = async (startPage, endPage) => {
  const allProducts = [];

  for (let i = startPage; i <= endPage; i++) {
    const url = BASE_URL + i;
    console.log(`🕵️‍♀️  browsing ${url}`);

    const products = await scrape(url);

    if (products && products.length > 0) {
      allProducts.push(...products);
    } else {
      break;
    }
  }

  return allProducts;
};

const scrapeAllDataCS = async () => {
    const scrapedData = await scrapeAllPages(1, 1);
    console.log(scrapedData);

    return scrapedData;
  }
  
  const writeDataToFile = async () => {
  try {
    const cs_products = await scrapeAllDataCS();
    const csjson = JSON.stringify(cs_products);

    fs.writeFile('cs_products.json', csjson, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  } catch (error) {
    console.error(error);
  }
}

writeDataToFile();


