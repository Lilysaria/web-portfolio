import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await MongoClient.connect(process.env.DATABASE_URL!);
  const db = client.db();

  if (req.method === 'GET') {
    try {
      const projects = await db.collection('projects').find({}).toArray();
      return res.status(200).json(projects);
    } catch (err) {
      return res.status(500).json({ error: 'An error occurred' });
    } finally {
      await client.close();
    }
  }

  if (req.method === 'POST') {
    const projectData = req.body;

    try {
      const result = await db.collection('projects').insertOne(projectData);
      if (result.acknowledged) {
        return res.status(201).json({ ...projectData, _id: result.insertedId });
      }
      return res.status(500).json({ error: 'No document was inserted' });
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        return res.status(500).json({ error: 'An error occurred', message: err.message });
      }
      return res.status(500).json({ error: 'An error occurred' });
    } finally {
      await client.close();
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Missing id for deletion' });
    }

    try {
      const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        return res.status(200).json({ message: 'Project deleted successfully' });
      }
      return res.status(404).json({ error: 'No document found to delete' });
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        return res.status(500).json({ error: 'An error occurred', message: err.message });
      }
      return res.status(500).json({ error: 'An error occurred' });
    } finally {
      await client.close();
    }
  }

  return res.status(405).end();
}
