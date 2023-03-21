const fs = require('fs');

// Lecture des fichiers JSON
const dedicatedProducts = JSON.parse(fs.readFileSync('dedicated_products.json', 'utf-8'));
const montlimartProducts = JSON.parse(fs.readFileSync('montlimart_products.json', 'utf-8'));
const csProducts = JSON.parse(fs.readFileSync('cs_products.json', 'utf-8'));

// Fusion des données
const products = [...dedicatedProducts, ...montlimartProducts, ...csProducts];

// Ecriture dans un fichier JSON
const allProducts = JSON.stringify(products);
fs.writeFileSync('products.json', allProducts, 'utf-8');