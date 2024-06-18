import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';

dotenv.config();

async function createUser() {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Connect to the database
  const client = await MongoClient.connect(process.env.DATABASE_URL!);
  const db = client.db();

  // Create the user
  const user = { username, password: hashedPassword };
  await db.collection('users').insertOne(user);

  // Close the database connection
  await client.close();

  console.log('User created successfully');
}

createUser();
