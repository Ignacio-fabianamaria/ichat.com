import http from 'http';
import express, { Application, NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';
import { UserRoutes } from './routes/user.routes';
import { connect } from './infra/database';
import dotenv from 'dotenv';
import fs from 'fs';

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
    this.interceptionError();
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
    fs.accessSync('.env', fs.constants.F_OK)
  }
  private interceptionError(){
    this.app.use((err: Error, req:Request, res:Response, next:NextFunction)=>{
      if(err instanceof Error){
        return res.status(400).json({message: err.message})
      }
      return res.status(500).json({message: 'Internal Server Error'})
    })
  }
}

export { App };