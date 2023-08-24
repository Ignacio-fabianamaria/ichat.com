import http from 'http';
import express, { Application } from 'express';
import { Server } from 'socket.io';
import { UserRoutes } from './routes/user.routes';
import { connect } from './infra/database';
import dotenv from 'dotenv'

const PORT = 3333;
dotenv.config();

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;
  private userRoutes = new UserRoutes();
  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = new Server(this.http);
    this.middlewaresInit();
    this.initRoutes();
    this.initHtml();
  }

  listen() {
    this.http.listen(PORT, async () => {
      try {
        await connect();
        console.log(`Server is running in ${PORT}`);
        console.log('Database connection was successful');
      } catch (error) {
      console.log("Error connecting to the server", error)
      }
    });
  }
  listenSocket() {
    this.io.on('connection', (userSoket) => {
      console.log('a user connected');

    })
  }
  private initHtml() {
    this.app.get('/index', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    })
  }
  private initRoutes() {
    this.app.use('/users', this.userRoutes.router)
  }
  private middlewaresInit() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }
}

export { App };