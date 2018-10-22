// DEPENDENCIES
const express = require('express');

// SERVER
const server = express();

// MIDDLEWARE
const configureMiddleware = require('./middleware/middleware');

configureMiddleware(server);

// ROUTES
const exampleRoutes = require('./routes/exampleRoutes.js');
const postRoutes = require('./routes/postRoutes');

server.use('/api/example', exampleRoutes);
server.use('/api/posts', postRoutes);

// PORT
const port = 5000;
server.listen(port, () => {
	console.log(`\n=== Listening on http://localhost:${port} ===\n`);
});
