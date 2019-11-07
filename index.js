const express = require("express");
const Billing = require("./db");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/clients", async (req, res) => {
  const results = await Billing.execute();
  res.send(results);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

async function closeConnectionAndExit() {
  console.log("\nTerminating");
  try {
    await Billing.closeConnection();
    console.log("Connection closed");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

process
  .once("SIGTERM", closeConnectionAndExit)
  .once("SIGINT", closeConnectionAndExit);
