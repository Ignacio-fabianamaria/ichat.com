import http from 'http';
import express, { Application, NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';
import { UserRoutes } from './routes/user.routes';
import { connect } from './infra/database';
import dotenv from 'dotenv';
import fs from 'fs';
import { errorMiddleware } from './middlewares/error.middleware';
import { RoomsRoutes } from './routes/rooms.routes';
import { MessageRoutes } from './routes/message.routes';

const PORT = 3333;
dotenv.config();

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;
  private userRoutes = new UserRoutes();
  private roomsRoutes = new RoomsRoutes();
  private messageRoutes = new MessageRoutes();
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
      userSoket.on('join_room', (room)=>{
        userSoket.join(room);
      })
      userSoket.on('message', (data)=>{
        userSoket.to(data.room.id).emit('room_message', data.message)
      })

    })
  }
  private initHtml() {
    this.app.get('/index', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    })
  }
  private initRoutes() {
    this.app.use('/users', this.userRoutes.router);
    this.app.use('/rooms', this.roomsRoutes.router);
    this.app.use('/message', this.messageRoutes.router);
  }
  private middlewaresInit() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    fs.accessSync('.env', fs.constants.F_OK)
  }
  private interceptionError(){
    this.app.use(errorMiddleware)
  }
}

export { App };