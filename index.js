// require your server and launch
const server = require("./api/server");

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`**** server running on http://localhost:${PORT} ****`);
});
