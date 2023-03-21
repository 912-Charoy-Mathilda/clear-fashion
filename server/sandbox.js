const dedicated_products = require('C:\\Users\\mathi\\OneDrive - De Vinci\\ESILV\\A4\\S8\\Web application architectures\\workshop1\\clear-fashion\\server\\eshops\\dedicatedbrand.js');
const montlimart_products = require('C:\\Users\\mathi\\OneDrive - De Vinci\\ESILV\\A4\\S8\\Web application architectures\\workshop1\\clear-fashion\\server\\eshops\\montlimartbrand.js');
const cs_products = require('C:\\Users\\mathi\\OneDrive - De Vinci\\ESILV\\A4\\S8\\Web application architectures\\workshop1\\clear-fashion\\server\\eshops\\circle_sportswear.js');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

//WRITTING FILE
const execPromise = promisify(exec);

(async () => {
  try {
    // Execute the first file
    const { stdout: stdout1 } = await execPromise('node eshops/dedicatedbrand.js');
    console.log(stdout1);
  
    // Execute the second file
    const { stdout: stdout2 } = await execPromise('node eshops/montlimartbrand.js');
    console.log(stdout2);

    // Execute the third file
    const { stdout: stdout3 } = await execPromise('node eshops/circle_sportswear.js');
    console.log(stdout3);

    // All in one
    const { stdout: stdout4 } = await execPromise('node eshops/all_data.js');
    console.log(stdout4);
      
    // All files have been executed
    console.log('Done!');
  } catch (err) {
    console.error(`Error executing JavaScript files: ${err}`);
  }
})();

// MongoDB Collection
const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://mathilda:azerty@cluster0.lfnildu.mongodb.net/test/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

async function connectAndInsert() {
  const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
  const db = client.db(MONGODB_DB_NAME);

  const products = JSON.parse(fs.readFileSync('products.json'));

  const collection = db.collection('products');
  const result = await collection.insertMany(products);

  console.log(`${result.insertedCount} documents were inserted`);
  client.close();
}

connectAndInsert();