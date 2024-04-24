import { hashPassword } from "../../../db/auth";
import { dbConnect } from "../../../db/db";

export default async function handler(req, res) {
  try {
    const client = await dbConnect();
    const db = client.db();

    const { email, password } = req.body;

    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ warning: "Invalid input" });
      return;
    }

    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if(existingUser){
      res.status(422).json({ warning: "user already exists..... try to login" });
      return
    }

    const pswd = await hashPassword(password);
    await users.insertOne({ email, password: pswd });
    res.status(201).json({ success: "user registered" });
    
  } catch (err) {
    console.log("err", err);
    res.status(401).json({ err: err.message, error: "could not signup" });
  }
}
