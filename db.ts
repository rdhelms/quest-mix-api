import { Db, MongoClient } from 'mongodb'

let client: MongoClient
let db: Db

const connectToDatabase = async () => {
    const databaseURI = process.env.DATABASE_URI
    if (databaseURI) {
        client = new MongoClient(databaseURI)
        await client.connect()

        // eslint-disable-next-line no-console
        console.log('Connected to database')

        db = client.db('questmix')
    } else {
        throw new Error('Could not find DATABASE_URI')
    }
}

export {
    connectToDatabase,
    client,
    db,
}
