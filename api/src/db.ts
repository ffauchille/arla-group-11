import { allHelpRequests, HelpRequest } from "./fake-data/help-requests";
import { allUserProfiles, UserProfile } from "./fake-data/user-profiles";
import { Pool, QueryResult } from "pg";
import { FilterQuery, MongoClient } from "mongodb";

/**
 * Fake database, since we don't want to set any real database yet.
 * This will be subject of next workshop
 */
export namespace FakeDB {
  // Private base help requests. This is restore
  // on each start of the API.
  var helpRequests: HelpRequest[] = allHelpRequests;
  var userProfiles: UserProfile[] = allUserProfiles;

  const getPage = <T>(arr: T[]) => (page: number, limit: number) => {
    const start = (page - 1) * limit;
    const end = start + limit;

    return arr.slice(start, end);
  };

  // takes a slice of the help requests, based on page and limit offsets
  export const getHelpRequest = (page: number, limit: number) => {
    return getPage<HelpRequest>(helpRequests)(page, limit);
  };

  export const getUserProfiles = (page: number, limit: number) => {
    return getPage<UserProfile>(userProfiles)(page, limit);
  };
}

export type UserHelpRequest = {
  help_request_id: number;
  owner_id: number;
  owner_username: string;
  title: string;
  details: string;
  city: string;
  country: string;
}

/**
* Connects to your Postgres database.
* RDS stands for Relational Database System, which is a common designation
* for SQL database like Postgres.
*/
export namespace RDS {
  // Create a pool of connection;
  // to control number of concurrent connections.
  // We leave default values for now.
  console.log("process.env.RDS_HOST: ", process.env.RDS_HOST);
  const pool = new Pool({
      host: process.env.RDS_HOST || "localhost",
      port: +(process.env.RDS_PORT || 5432),
      database: process.env.RDS_NAME || "arlaide",
      user: process.env.RDS_USER || "sigl2021",
      password: process.env.RDS_PASSWORD || "sigl2021"
  });

  // Handler method to perform any kind of query 
  // to your database
  const query = async <T>(sql: string): Promise<T[]> => {
      let result: QueryResult<T>;
      
      // Get the next connection available in the pool
      const client = await pool.connect()
     
      result = await client.query<T>(sql)
      
      // release the connection
      client.release();
      return result.rows;
  }
  
  /**
   * Get next 
   * @param page page number of help requests we want to query
   * @param limit the size of the page of help requests we want to query
   */
  export const getHelpRequests = async (page: number, limit: number) => {
      const helpRequests: UserHelpRequest[] = await query<UserHelpRequest>(`
          SELECT * FROM help_requests_owners
          LIMIT ${limit} OFFSET ${page};
      `)

      return helpRequests;
  }
}

export type Comment = {
  _id: string;
  text: string;
  help_request_id: number;
  user_id: number;
  timestamp: number;
}

export namespace DocumentDB {

  const MONGO_HOST = process.env.DOC_DB_HOST || 'localhost';
  const MONGO_PORT = process.env.DOC_DB_PORT || 27017; 
  const MONGO_DB_NAME = process.env.DOC_DB_NAME || 'arlaide';
  const MONGO_USER = process.env.DOC_DB_USER || 'sigl2021';
  const MONGO_PASSWORD = process.env.DOC_DB_PASSWORD || 'sigl2021';

  const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}?authSource=${MONGO_DB_NAME}`;

  const find = <T>(collectionName: string) => async (findQuery: FilterQuery<T>) => {
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const database = client.db(MONGO_DB_NAME);
        const collection = database.collection<T>(collectionName);
        const documents = await collection.find(findQuery);
        return documents.toArray();
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
  }

  export const getHelpRequestComments = async (helpRequestId: number) => {
      const comments: Comment[] = await find<Comment>("comments")({"help_request_id": helpRequestId});
      return comments;
  }
}