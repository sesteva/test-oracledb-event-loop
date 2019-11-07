const express = require("express");
const Billing = require("./db");

const app = express();
const port = 3000;
const ALL_CLIENTS_QUERY = `SELECT CLIENT_ID, SECURITY_TOKEN, AIRLINE_CODE
FROM CLIENT_AIRLINE`;

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/clients", async (req, res) => {
  const results = await Billing.execute({ ALL_CLIENTS_QUERY });
  res.send(results);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
