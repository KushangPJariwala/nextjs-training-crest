import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const email = req.body.email;
      const client = await MongoClient.connect(
        "mongodb+srv://kush:kushang3092@cluster0.toxc152.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
      );
      
      const db = client.db()
      await db.collection("newsletter").insertOne({ email });
      client.close();
      res.status(201).json({ msg: "email registered" });
    } catch(err) {
      console.log(err)
      res.json({ err: "email could not be registered",'e': err });
    }
  }
}
