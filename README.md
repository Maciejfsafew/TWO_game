##Project Overview

### How to run the application:

 * install http://nodejs.org/
 * `$ npm install` to install all libraries
 * `$ npm start` to start app
 * Go to: http://localhost:8080/, open javaScript console.
 
### Project structure:

 * `public` - all assets
 * `public/js` - js scripts available in client part of the applicatoin 
 * `views` - ejs templates and pure html files (default expressjs catalog for views)
 * `app.js` - application entry point

 Other components may be placed in module subdirectories e.g. modules/map. Please take a look at http://nodejs.org/api/modules.html to get more information about how to load and use modules.

### Technologies used in the project:

 * http://nodejs.org/ - javaScript web platform.
 * http://www.embeddedjs.com/ - template engine.
 * http://expressjs.com/ - web framework - provides templating engine, allows to build REST API etc. Probably we can get rid of this part and use only real-time communication once we decided we don't need any of features provided by the Express.
 * https://github.com/primus/primus - web-socket wrapper used to facilitate real-time communication.
 
### Technologies evaluated, but not used:

 * http://socket.io/ - WebSocket library, probably the oldest and most popular web-socket wrapper. Unfortunately in its newest version it doesn't really cooperate with expressjs, so we decided to use primus instead.

### Functionality already merged to master:

 * Example of client-server application with real-time communication. The application also serves static content and dynamic templates created using ejs.
