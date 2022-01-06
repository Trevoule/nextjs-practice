// MongoDB - noSQL db, documents - entries in the tables
// collections hold multiple documents
// single document - single meetup
// collection - multiple meetups

import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    //code not to be run on the client side
    const client = await MongoClient.connect(
      "mongodb+srv://mongo_test:mongodb@cluster0.cfxnj.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
