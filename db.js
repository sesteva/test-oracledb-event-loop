const oracledb = require("oracledb");

class BillingUtil {
  constructor() {}

  async execute() {
    let connection;
    try {
      connection = await oracledb.getConnection();
      if (connection) {
        const result = await connection.execute(
          `SELECT CLIENT_ID, SECURITY_TOKEN, AIRLINE_CODE FROM CLIENT_AIRLINE`
        );
        return result;
      }
      return [];
    } catch (error) {
      console.log(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}

module.exports = new BillingUtil();
