# Election

Rough architecture:

- resources.js: handles loading/getting of files
- game.js: runs game
  - initializes, renders and removes views in order: startView, gameView, finishView
  - defines keystrokes
  - globally defines constants: framerate, object counts, dimensions of canvas
  - processes user input and view states to switch between views
  - processes user input to repeatedly update gameView
- startView.js: renders start of game, with directions
- gameView.js: renders main game
  - renders and updates all objects
- finishView: renders end of game, providing user feedback
- movingObject.js: defines moving object
- hand.js: defines hand object, controlled by player
- bill.js: inherits from movingObject.js
- newspaper.js: inherits from movingObject.js
