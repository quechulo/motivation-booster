import { MongoClient } from 'mongodb';

uri = `mongodb+srv://dbAdmin:<password>@cluster23.w305vlv.mongodb.net/?retryWrites=true&w=majority`

function handler(req, res) {
    if (req.method === "POST") {
      const email = req.body.email;
      const name = req.body.name;
  
      const newUser = {
        email: email,
        name: name,
      };
  
      data.push(newUser);
      updateData(data);
      res.status(201).json({ message: "Success", user: newUser });
    }

    if (req.method === "GET") {
      
      res.status(200).json({ users: data });
    }
  }
  


  async function connectDatabase() {
    return await MongoClient.connect(
      `mongodb+srv://dbAdmin:${password}@cluster23.w305vlv.mongodb.net/newsletter?retryWrites=true&w=majority`
    );
  }
  
  async function insertDocument(client, document) {
    const db = client.db();
  
    const documents = await db
      .collection("emails")
      .find({ email: document.email })
      .toArray();
  
    if (documents.length < 1) {
      await db.collection("emails").insertOne(document);
    } else {
      throw Error( "Email already in use: " + document.email );
    }
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
        res.status(500).json({ message: "Connection to database failed!" });
        return;
      }
  
      try {
        await insertDocument(client, newUser);
        res.status(201).json({ message: 'Signed up!' })
        
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
        res.status(500).json({ message: "Connection to database failed!" });
        return;
      }
      try {
        const db = client.db();
        const documents = await db.collection("emails").find().toArray();
        res.status(201).json({ emails: documents });
      } catch (error) {
        res.status(500).json({ message: "Reading from database failed!" });
        return;
      }
  
      client.close();
    }
  }
  
  export default handler;