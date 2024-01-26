const app = require("./src/app");

const HOST_PORT = process.env.PORT || 1999;

const server = app.listen(HOST_PORT, () => {
  console.log(`server start with port: ${HOST_PORT}`);
});
//co the co hoac khong can dong ket noi mongo
process.on("SIGINT", () => {
  server.close(() => console.log("Exit server success"));
});
