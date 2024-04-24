import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const eid = req.query.eid;
      const { email, name, text } = req.body;
      const newComment = {
        email,
        name,
        text,
        eventId: eid,
      };
      const client = await MongoClient.connect(
        "mongodb+srv://kush:kushang3092@cluster0.toxc152.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
      );

      const db = client.db();
      const result = await db
        .collection("comments")
        .insertOne( newComment );
      newComment.id = result.insertedId;
      res.status(201).json({ msg: "comment submitted", comment: newComment });
      client.close();
    } catch (err) {
      // console.log("err", err);
      res.json({ err: "comment not submitted" });
    }
  }

  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://kush:kushang3092@cluster0.toxc152.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
      );
      const db = client.db();
      const comments = await db
        .collection("comments")
        .find()
        .sort({ _id: -1 })
        .toArray();
      console.log("comments", comments);
      res.json({ comments });
    } catch (err) {
      console.log("err", err);
    }
  }
}
