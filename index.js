const express = require("express");
const Billing = require("./db");
const oracledb = require("oracledb");
let dbConfig = {
  user: process.env.BILLING_DB_USER,
  password: process.env.BILLING_DB_PASS,
  connectString: process.env.BILLING_DB_CONNECTIONSTRING
};

const init = async () => {
  await oracledb.createPool(dbConfig);
  const app = express();
  const port = 3000;
  app.get("/", (req, res) => res.send("Hello World!"));
  app.get("/clients", async (req, res) => {
    const results = await Billing.execute();
    console.log(results);
    res.send("pepe");
  });

  await app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
  );
};

async function closePoolAndExit() {
  console.log("\nTerminating");
  try {
    await oracledb.getPool().close(10);
    console.log("Pool closed");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

process.once("SIGTERM", closePoolAndExit).once("SIGINT", closePoolAndExit);

init();
