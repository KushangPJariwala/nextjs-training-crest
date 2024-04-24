import { MongoClient } from "mongodb";

export async function dbConnect() {
  const client = MongoClient.connect(
    "mongodb+srv://kush:kushang3092@cluster0.toxc152.mongodb.net/authentication?retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}
