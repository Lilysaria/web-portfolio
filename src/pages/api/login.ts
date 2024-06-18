import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    const client = await MongoClient.connect(process.env.DATABASE_URL!);
    const db = client.db();
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      await client.close();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      await client.close();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET!, { expiresIn: '1h' });
    await client.close();
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'An error occurred during login.' });
  }
}
