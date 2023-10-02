
import express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';
import Cors from 'cors';

const app = express();
const port = process.env.PORT || 8001;

const uri = "mongodb+srv://medu0603:pw@cluster0.ivq9f1r.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "mydatabase"; 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.json());
app.use(Cors());

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Set the current database context
    const database = client.db(databaseName);

    // Define your routes
    app.get("/", (req, res) => res.status(200).send("Hello Ganesha"));

    app.post('/dating/cards', async (req, res) => {
      try {
        if (!Array.isArray(req.body)) {
          return res.status(400).send("Bad Request: Request body should be an array.");
        }

        const collection = database.collection('cards');
        const dbcards = req.body;
        const result = await collection.insertMany(dbcards);
        res.status(201).send(result.ops); // Send the inserted documents back as the response
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get('/dating/cards', async (req, res) => {
              try {
                const collection = database.collection('cards');
                const data = await collection.find({}).toArray();
                res.status(200).send(data);
              } catch (error) {
                res.status(500).send(error.message);
              }
            });
        

    // Start the Express server
    app.listen(port, () => console.log(`Listening on localhost : ${port}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();
