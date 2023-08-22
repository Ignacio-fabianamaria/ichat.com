import http from 'http';
import express, { Application } from 'express';
import { Server } from 'socket.io';

const PORT = 3333;

class App {
    private app: Application;
    private http: http.Server;
    private io: Server
    constructor(){
        this.app = express();
        this.http = new http.Server(this.app);
        this.io = new Server(this.http);
        this.initHtml();
    }
    listen(){
        this.http.listen(PORT, ()=>console.log(`Server is running in ${PORT}`))
    }
    listenSocket(){
        this.io.on('connection', (userSoket)=>{
            console.log('a user connected');
            
        })
    }
    initHtml(){
        this.app.get('/index', (req, res)=>{
            res.sendFile(__dirname + '/index.html'); 
        })
    }
}

export {App};