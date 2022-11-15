const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {port} = process.env;
// Syncing all the models at once.
conn.sync({ force: false}).then(() => {


  server.listen(3001, () => {

    console.log(`Listening at Port `); // eslint-disable-line no-console


  });
});
 