import { getSession, useSession } from "next-auth/react";
import { dbConnect } from "../../../db/db";
import { hashPassword, verifyPassword } from "../../../db/auth";

async function handler(req, res) {
  try {
    if (req.method !== "PATCH") {
      return;
    }
    const session = await getSession({ req: req });
    
    console.log("session", session);
    if (!session) {
      console.log("first");
      res.status(401).json({ error: "not authenticated" });
      return;
    }
    console.log("session--", session);

    const userEmail = session.user.email;
    console.log("userEmail", userEmail);
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await dbConnect();
    const usersCollection = client.db().collection("users");
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      client.close();
      return;
    }

    const passwordsAreEqual = await verifyPassword(oldPassword, user.password);
    if (!passwordsAreEqual) {
      res.status(403).json({ error: "Invalid password." });
      client.close();
      return;
    }
    const hashedPswd = await hashPassword(newPassword);
    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPswd } }
    );

    client.close();
    res.json({ success: "password updated" });
  } catch (err) {}
}

export default handler;
