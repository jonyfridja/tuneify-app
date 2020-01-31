import { MongoClient, Db } from 'mongodb';

// Connection URL
const url =
  process.env.NODE_ENV === 'production'
    ? 'mongodb+srv://theDbUser:camay2019@cluster0-klgzh.mongodb.net/test?retryWrites=true&w=majority'
    : 'mongodb://localhost:27017';

// Database Name
const dbName = 'tuneify_db';
// throw new Error('set db name!');

var dbConn = null;

async function connect(): Promise<Db> {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    console.log('Cannot Connect to DB', err);
    throw err;
  }
}

async function getCollection(collectionName) {
  const db = await connect();
  return db.collection(collectionName);
}

export default {
  collections: {
    tune: 'tune',
    user: 'user'
  },
  getCollection
};
