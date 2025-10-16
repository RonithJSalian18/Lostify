import { Pool } from "pg";

const pool = new Pool({
  user: "postgres", // your PostgreSQL username
  host: "localhost", // your host
  database: "lostfound", // your DB name
  password: "ronith@123", // your PostgreSQL password
  port: 5432, // default port
});

export default pool;
