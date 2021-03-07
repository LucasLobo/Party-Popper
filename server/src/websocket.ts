/* eslint-disable no-console */
import * as http from 'http';

import * as express from 'express';

const app = express();

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(9091, () => console.log('Listening on http port 9091'));
const websocketServer = require('websocket').server;

const httpServer = http.createServer();
httpServer.listen(9090, () => console.log('Listening.. on 9090'));

// hashmap clients
const clients = {};
const games = {};

const wsServer = new websocketServer({
  httpServer
});
wsServer.on('request', request => {
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
      games[gameId] = {
        id: gameId,
        // total no of position
        position: 20,
        clients: []
      };

      // payload
      const payLoad = {
        method: 'create',
        game: games[gameId]
      };

      const con = clients[clientId].connection;
      con.send(JSON.stringify(payLoad));
    }

    // a client want to join
    if (result.method === 'join') {
      const { clientId } = result;
      const { gameId } = result;
      const game = games[gameId];
      if (game.clients.length >= 100) {
        // sorry max players reach
        return;
      }
      game.clients.push({
        clientId
      });
      // start the game
      if (game.clients.length === 2) updateGameState();

      const payLoad = {
        method: 'join',
        game
      };
      // loop through all clients and inform that people has joined
      game.clients.forEach(c => {
        clients[c.clientId].connection.send(JSON.stringify(payLoad));
      });
    }
    // a user plays
    if (result.method === 'play') {
      const { gameId } = result;

      let { state } = games[gameId];
      if (!state) state = {};

      games[gameId].state = state;
    }
  });

  // generate a new clientId add metadata
  const clientId = guid();
  clients[clientId] = {
    connection,
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
    const game = games[g];
    const payLoad = {
      method: 'update',
      game
    };

    game.clients.forEach(c => {
      clients[c.clientId].connection.send(JSON.stringify(payLoad));
    });
  }

  setTimeout(updateGameState, 500);
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (`${S4() + S4()}-${S4()}-4${S4().substr(0, 3)}-${S4()}-${S4()}${S4()}${S4()}`).toLowerCase();
