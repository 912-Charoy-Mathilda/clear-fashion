const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const PORT = 8092;
const MONGO_URL = 'mongodb+srv://mathilda:azerty@cluster0.lfnildu.mongodb.net/clearfashion?retryWrites=true&w=majority';
const DB_NAME = 'clearfashion';

const app = express();

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  db = client.db(DB_NAME);
  console.log('Connected to MongoDB');
});

module.exports = app;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({ 'ack': true });
});

// GET /products/:id --> ok
app.get('/products/:id', async (request, response) => {
  try {
    const id = request.params.id;
    if (!ObjectId.isValid(id)) {
      response.status(404).json({ error: 'Product not found' });
      return;
    }

    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    if (product) {
      response.json(product);
    } else {
      response.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// GET /products --> ok
app.get('/products', async (request, response) => {
  try {
    const products = await db.collection('products').find().toArray();
    response.json(products);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});



// GET/products/:brand --> no
app.get('/products/:brand', async (request, response) => {
  try {
    const brand = request.params.brand;
    const products = await db.collection('products').find({ brand }).toArray();
    response.json(products);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// GET products/search --> no
app.get('/products/search', async (req, res) => {
  try {
  var limit = parseInt(req.query.limit) || 12;
  var brand = req.query.brand;
  var price = req.query.price;
  // Build the query object based on provided filters
  var query = {};
  if (brand) query.brand = brand;
  if (price) query.price = { $lte: price };

  // Fetch the products using the query object, limit, and sort by price
  var products = await db.collection('products')
    .find(query)
    .limit(limit)
    .sort({ price: 1 })
    .toArray();

  res.status(200).json(products);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: error.message });
  }
  });


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
