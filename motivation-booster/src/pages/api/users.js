import { MongoClient } from "mongodb";
import { user, password } from "../../../passwords";

async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://${user}:${password}@cluster0.qmg88hz.mongodb.net/?retryWrites=true&w=majority`
  );
}

async function insertDocument(client, document) {
  const db = client.db();

  // const documents = await db
  //   .collection("users")
  //   .find({ email: document.email })
  //   .toArray();

  await db.collection("users").insertOne(document);
  // if (documents.length < 1) {
  //   await db.collection("users").insertOne(document);
  // } else {
  //   throw Error( "Email already in use: " + document.email );
  // }
}

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;

    const newUser = {
      email: email,
      name: name,
    };

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connection to database failed!", error: error });
      return;
    }

    try {
      await insertDocument(client, newUser);
      res.status(201).json({ message: "Signed up!" });
    } catch (error) {
      if (error.message) {
        res.status(500).json({ message: error.message });
      }
      res.status(500).json({ message: "Inserting failed!" });
      return;
    }
    client.close();
  }

  if (req.method === "GET") {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connection to database failed!", error: error });
      return;
    }
    try {
      const db = client.db();
      const documents = await db.collection("users").find().toArray();
      res.status(201).json({ users: documents });
    } catch (error) {
      res.status(500).json({ message: "Reading from database failed!" });
      return;
    }

    client.close();
  }
}

export default handler;
