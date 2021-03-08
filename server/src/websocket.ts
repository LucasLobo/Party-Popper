/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-bitwise */
/* eslint-disable no-console */
import * as http from 'http';

import * as express from 'express';

const app = express();

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(9091, () => console.log('Listening on http port 9091'));
const WebsocketServer = require('websocket').server;

const httpServer = http.createServer();
httpServer.listen(9090, () => console.log('Listening.. on 9090'));

// hashmap clients
// const clients = {};
interface Game {
  gameId: {
      id: string,
      // total no of position
      position?: number,
      clients: string[],
      state?: {},
  }
}
const games = {} as Game;
interface Client {
  clientId: {
      connection?: {},
  }
}

const clients = {} as Client;

const wsServer = new WebsocketServer({
  httpServer
});
wsServer.on('request', (request: { accept: (arg0: null, arg1: any) => any; origin: any; }) => {
  // connect
  const connection = request.accept(null, request.origin);
  connection.on('open', () => console.log('opened!'));
  connection.on('close', () => console.log('closed!'));
  connection.on('message', (message: { utf8Data: string; }) => {
    const result = JSON.parse(message.utf8Data);
    // Received a message from the client
    // a user want to create a new game
    if (result.method === 'create') {
      const { clientId } = result;
      const gameId = guid();
      games.gameId = {
        id: gameId,
        // total no of position
        position: 20,
        clients: []
      };

      // payload
      const payLoad = {
        method: 'create',
        game: games.gameId
      };
      clients.clientId.connection = connection;
      clients.clientId.connection.send(JSON.stringify(payLoad));
      // con.send(JSON.stringify(payLoad));
    }

    // a client want to join
    if (result.method === 'join') {
      const { clientId } = result;
      const { gameId } = result;
      // const game = games.gameId;
      if (games.gameId.clients.length >= 100) {
        // sorry max players reach
        return;
      }
      games.gameId.clients.push(
        clientId
      );
      // start the game
      if (games.gameId.clients.length === 2) updateGameState();

      const payLoad = {
        method: 'join',
        game: games.gameId
      };
      // loop through all clients and inform t hat people has joined
      games.gameId.clients.forEach(el => {
        const con = clients[el].clientId.connection = connection; 
        con.send(JSON.stringify(payLoad));
      });
    }
    // a user plays
    if (result.method === 'play') {
      const { gameId } = result;

      let { state } = games.gameId;
      if (!state) state = {};

      games.gameId.state = state;
    }
  });

  // generate a new clientId add metadata
  const clientId = guid();
  clients.clientId = {
    connection
  };

  const payLoad = {
    method: 'connect',
    clientId
  };
  // send back the client connect
  connection.send(JSON.stringify(payLoad));
});

function updateGameState() {
  // {"gameid", fsfhgdjh}
  for (const g of Object.keys(games)) {
    // const game = games.g;
    const payLoad = {
      method: 'update',
      game: games[g]
    };

    games[g]clients.forEach(c => {
      clients.c.clientId.connection.send(JSON.stringify(payLoad));
    });
  }

  setTimeout(updateGameState, 500);
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (`${S4() + S4()}-${S4()}-4${S4().substr(0, 3)}-${S4()}-${S4()}${S4()}${S4()}`).toLowerCase();
