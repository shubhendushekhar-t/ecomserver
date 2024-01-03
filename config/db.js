const { Pool } = require("pg");

const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "mydb",
  password: "mypassword",
  port: 5432,
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});
