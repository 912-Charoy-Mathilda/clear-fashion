const dedicated_products = require('C:\\Users\\mathi\\OneDrive - De Vinci\\ESILV\\A4\\S8\\Web application architectures\\workshop1\\clear-fashion\\server\\eshops\\dedicatedbrand.js');
const montlimart_products = require('C:\\Users\\mathi\\OneDrive - De Vinci\\ESILV\\A4\\S8\\Web application architectures\\workshop1\\clear-fashion\\server\\eshops\\montlimartbrand.js');
const cs_products = require('C:\\Users\\mathi\\OneDrive - De Vinci\\ESILV\\A4\\S8\\Web application architectures\\workshop1\\clear-fashion\\server\\eshops\\circle_sportswear.js');
const fs = require('fs');

//console.log(dedicated_products);
//console.log(montlimart_products);
//console.log(cs_products);

all_products = dedicated_products + montlimart_products + cs_products;

console.log(all_products);