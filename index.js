const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {port} = process.env;
// Syncing all the models at once.
conn.sync({ force: false}).then(() => {


  server.listen(3001, () => {

    console.log(`escuchando de dieeeegooo papaaaa`); // eslint-disable-line no-console


  });
});
 