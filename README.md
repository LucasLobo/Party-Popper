# Party Popper
- This repository contains the code of Party Popper - A realtime multiplayer board (drinking) game.

## Note

The front-end has been developed as a mobile prototype, and it is meant to be viewed using a mobile view. It was not optimized for desktop (mobile first approach). This application is a proof of concept and is not ready for production.

## Screenshots

<div>
  <img src="https://user-images.githubusercontent.com/22732776/114276861-6d668b80-9a20-11eb-8f70-c7e519e2b6ef.jpg" width="230" style="margin-right: 1em;"/>
  <img src="https://user-images.githubusercontent.com/22732776/114276860-6ccdf500-9a20-11eb-812f-ad9fc04c3038.jpg" width="230"/>
  <img src="https://user-images.githubusercontent.com/22732776/114276864-6dff2200-9a20-11eb-98c1-ad460764167d.jpg" width="230"/>
  <img src="https://user-images.githubusercontent.com/22732776/114276862-6d668b80-9a20-11eb-935a-cfb49a9cd056.jpg" width="230"/>
</div>


## Inspiration

The main inspiration behind Party popper is to provide an interactive and fun experience in boring parties

## What it does

Party popper is a realtime multiplayer board game consists of many fun challenges. It makes boring parties/events fun and enjoying.

## How we built it

* The whole game consists of 2 components, the frontend and the backend.
* All of the operations happen in real-time and asynchronously.
* The backend has been built with Node.js and express.js and communicating with frontend via web sockets . This component listens to different events and responds accordingly.
* The frontend has been built using React.js. Players can register via the home screen, choose their avatar and nick name of thier choice and can play with their friends.


## Development Setup
- Clone the repository and go to `web` directory for the client-side and `server` directory for the server and run `npm install` to install the necessary dependencies.
- Run `npm start` to get the server and client up and running.
