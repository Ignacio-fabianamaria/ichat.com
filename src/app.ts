import http from 'http';
import express, { Application } from 'express';
import { Server } from 'socket.io';

const PORT = 3333;

class App {
    public app: Application;
    public http: http.Server;
    public io: Server
    constructor(){
        this.app = express();
        this.http = new http.Server(this.app);
        this.io = new Server(this.http);
        this.initHtml();
    }
    listen(){
        this.http.listen(PORT, ()=>console.log(`Server is running in ${PORT}`))
    }
    initHtml(){
        this.app.get('/index', (req, res)=>{
            console.log('HTML is running');
            
            res.sendFile(__dirname + '/index.html'); 
        })
    }
}

export {App};