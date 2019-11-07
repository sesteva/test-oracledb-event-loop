const oracledb = require("oracledb");

let dbConfig = {
  user: process.env.BILLING_DB_USER,
  password: process.env.BILLING_DB_PASS,
  connectString: process.env.BILLING_DB_CONNECTIONSTRING
};

class BillingUtil {
  constructor() {
    this.connection = null;
  }

  async closeConnection() {
    if (this.connection) {
      try {
        await this.connection.close();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async execute() {
    try {
      this.connection = await oracledb.getConnection(dbConfig);
      if (this.connection) {
        const result = await this.connection.execute(
          `SELECT CLIENT_ID, SECURITY_TOKEN, AIRLINE_CODE FROM CLIENT_AIRLINE`
        );
        return result;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   if (this.connection) {
    //     try {
    //       await this.connection.close();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }
  }
}

module.exports = new BillingUtil();
