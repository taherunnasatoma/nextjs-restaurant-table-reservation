// src/lib/dbConnect.js
import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  userCollection: "test_user",
  restaurantCollection: "restaurants",
};

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use a global variable to preserve value across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

export default async function dbConnect(collectionName) {
  const client = await clientPromise;
  return client.db(process.env.DB_NAME).collection(collectionName);
}


// import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// let cachedDb = null;

// export const collectionNameObj = {
//   userCollection: "test_user",
//   restaurantCollection: "restaurants",
// };

// export default async function dbConnect(collectionName) {
//   if (!cachedDb) {
//     await client.connect();
//     cachedDb = client.db(process.env.DB_NAME);
//   }
//   return cachedDb.collection(collectionName);
// }
