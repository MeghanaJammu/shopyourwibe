const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//handling uncaught exception
process.on("uncaughtException", (error) => {
  console.log(error.message);
  console.log("shutting the server down due to uncaught exception");

  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

//connecting to DB
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection non api routes errors, when server crashes or smtg like that
process.on("unhandledRejection", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("shutting the server down due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
