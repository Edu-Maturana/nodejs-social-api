const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { MongoDBConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            search:     '/api/search',
            post:       '/api/post',
            user:       '/api/user',
            comment:    '/api/comment',
        }

        this.connectToDatabase();

        this.middlewares();

        this.routes();

    }
    
    async connectToDatabase() {
        await MongoDBConnection();
    }
    
    middlewares() {
        
        // CORS
        this.app.use( cors() );
        
        // Lectura y parseo del body
        this.app.use( express.json() );
        
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        
    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use( this.paths.user, require('../routes/user'));
    this.app.use( this.paths.post, require('../routes/post'));
    this.app.use( this.paths.comment, require('../routes/comment'));
   // this.app.use( this.paths.search, require('../routes/search'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running - Port:', this.port);
        });
    }

}

module.exports = Server;
