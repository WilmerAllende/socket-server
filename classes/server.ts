import express from "express";
import { SERVER_PORT } from "../globals/environment";
import socketIO from "socket.io";
import http from "http";
import * as socket from "../sockets/socket";

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  public httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.escucharSockets();
  }
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    console.log("Escuchando conexiones - sockets");
    this.io.on("connection", (cliente) => {
      console.log(cliente.id);

      //Conectar cliente
      socket.conectarCliente(cliente);
      //Mensaje
      socket.mensaje(cliente, this.io);
      //Configurar usuario
      socket.configurarUsuario(cliente, this.io);
      //Desconectar
      socket.desconectar(cliente);
    });
  }

  start(callback: VoidFunction) {
    this.httpServer.listen(this.port, callback);
  }
}
