import http from 'http';
import express, { Application } from 'express';
import { Server } from 'socket.io';
import { UserRoutes } from './routes/user.routes';

const PORT = 3333;

class App {
    private app: Application;
    private http: http.Server;
    private io: Server;
    private userRoutes = new UserRoutes();
    constructor(){
        this.app = express();
        this.http = new http.Server(this.app);
        this.io = new Server(this.http);
        this.middlewaresInit();
        this.initRoutes();
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
    private initHtml(){
        this.app.get('/index', (req, res)=>{
            res.sendFile(__dirname + '/index.html'); 
        })
    }
    private initRoutes(){
        this.app.use('/users', this.userRoutes.router)
    }
    private middlewaresInit(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
    }
}

export {App};