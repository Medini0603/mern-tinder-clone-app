// // // import express from "express";
// // // import mongoose from "mongoose";
// // // import cards from "./dbcards.js"
// // // import Cors from 'cors'

// // // const app=express()
// // // const port=process.env.PORT || 8001
// // // const connection_url="mongodb+srv://medu0603:uIKCGrm04RdwOnS0@cluster0.ivq9f1r.mongodb.net/dbcards?retryWrites=true&w=majority"
// // // app.use(express.json())
// // // app.use(Cors())
// // // mongoose.connect(connection_url,{
// // //     useNewUrlParser: true,
// // //     // useCreateIndex: true,
// // //     // useUnifiedTopology:true
// // // })

// // // app.get("/",(req,res)=>res.status(200).send("Hello Ganesha"))
// // // app.post('/dating/cards',(req,res)=>{
// // //     const dbcard=req.body
// // //     cards.create(dbcard,(err,data)=>{
// // //         if(err){
// // //             res.status(500).send(err)
// // //         }
// // //         else{
// // //             res.status(201).send(data)
// // //         }
// // //     })
// // // })
// // // app.get('/dating/cards',(req,res)=>{
// // //     // const dbcard=req.body
// // //     cards.find({}).exec(function(err,data){
// // //         if(err){
// // //             res.status(500).send(err)
// // //         }
// // //         else{
// // //             res.status(201).send(data)
// // //         }
// // //     })
// // // })
// // // app.listen(port,()=>console.log(`Listening on localhost : ${port}`))

// // import { MongoClient, ServerApiVersion } from 'mongodb';
// // import express from "express";
// // import Cors from 'cors';

// // const app = express();
// // const port = process.env.PORT || 8001;

// // const uri = "mongodb+srv://medu0603:uIKCGrm04RdwOnS0@cluster0.ivq9f1r.mongodb.net/?retryWrites=true&w=majority";

// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });

// // app.use(express.json());
// // app.use(Cors());

// // async function startServer() {
// //   try {
// //     // Connect to MongoDB
// //     await client.connect();
// //     console.log("Connected to MongoDB");

// //     // Routes and other middleware setup
// //     app.get("/", (req, res) => res.status(200).send("Hello Ganesha"));
    
// //     // Define your other routes here
// //     app.post('/dating/cards', async (req, res) => {
// //       // Your post route logic
// //       const dbcard=req.body
// //           cards.create(dbcard,(err,data)=>{
// //               if(err){
// //                   res.status(500).send(err)
// //               }
// //               else{
// //                   res.status(201).send(data)
// //               }
// //             })
// //     });
    
// //     app.get('/dating/cards', async (req, res) => {
// //       // Your get route logic
// //       cards.find({}).exec(function(err,data){
// //               if(err){
// //                   res.status(500).send(err)
// //               }
// //               else{
// //                   res.status(201).send(data)
// //               }
// //             })
// //     });

// //     // Start the Express server
// //     app.listen(port, () => console.log(`Listening on localhost : ${port}`));
// //   } catch (error) {
// //     console.error("Error connecting to MongoDB:", error);
// //   }
// // }

// // startServer();

// import express from "express";
// import { MongoClient, ServerApiVersion } from 'mongodb';
// import Cors from 'cors';

// const app = express();
// const port = process.env.PORT || 8001;

// const uri = "mongodb+srv://medu0603:uIKCGrm04RdwOnS0@cluster0.ivq9f1r.mongodb.net/?retryWrites=true&w=majority";
// const databaseName = "mydatabase"; // Replace 'mydatabase' with your actual database name

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// app.use(express.json());
// app.use(Cors());

// async function startServer() {
//   try {
//     // Connect to MongoDB
//     await client.connect();
//     console.log("Connected to MongoDB");

//     // Set the current database context
//     const database = client.db(databaseName);

//     // Define your routes
//     app.get("/", (req, res) => res.status(200).send("Hello Ganesha"));

//     app.post('/dating/cards', async (req, res) => {
//       try {
//         const collection = database.collection('cards');
//         const dbcard = req.body;
//         const result = await collection.insertMany(dbcard);
//         res.status(201).send(result.ops[0]); // Send the inserted document back as the response
//       } catch (error) {
//         res.status(500).send(error.message);
//       }
//     });

//     app.get('/dating/cards', async (req, res) => {
//       try {
//         const collection = database.collection('cards');
//         const data = await collection.find({}).toArray();
//         res.status(200).send(data);
//       } catch (error) {
//         res.status(500).send(error.message);
//       }
//     });

//     // Start the Express server
//     app.listen(port, () => console.log(`Listening on localhost : ${port}`));
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// startServer();

import express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';
import Cors from 'cors';

const app = express();
const port = process.env.PORT || 8001;

const uri = "mongodb+srv://medu0603:uIKCGrm04RdwOnS0@cluster0.ivq9f1r.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "mydatabase"; // Replace 'mydatabase' with your actual database name

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
