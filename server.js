const express = require('express');
const app = express();
const PORT = 9000;

require(`./routes.js`)(app);

app.listen(PORT, () => console.log(`port listening on port ${PORT}, app directory = ${appDir}`));

