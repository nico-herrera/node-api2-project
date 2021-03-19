// require your server and launch
require("dotenv").config();
const server = require("./api/server");

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`**** server running on http://localhost:${port} ****`);
});
