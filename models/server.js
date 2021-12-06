const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            search:     '/api/search',
            posts:  '/api/posts',
            users:   '/api/users',
        }

        this.connectToDatabase();

        this.middlewares();

        this.routes();
    }

    async connectToDatabase() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.search, require('../routes/search'));
        this.app.use( this.paths.posts, require('../routes/posts'));
        this.app.use( this.paths.users, require('../routes/users'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor running on: ', this.port );
        });
    }

}

module.exports = Server;
