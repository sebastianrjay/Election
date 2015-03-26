# Election

Rough architecture:

- resources.js: handles loading/getting of files
- game.js: runs game
  - globally defines framerate
  - initializes, renders and removes views in order: startView, gameView, finishView
  - processes user input and view states to switch between views
  - processes user input to repeatedly update gameView
- startView.js: renders start of game, with directions
- gameView.js: renders main game
  - renders and updates all objects
- finishView: renders end of game, providing user feedback
- movingObject.js: defines moving object
- hand.js: defines hand object, controlled by player (may inherit from movingObject.js)
- bill.js: inherits from movingobject.js
- newspaper.js: inherits from movingobject.js
