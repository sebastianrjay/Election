# Election

PLAY IT LIVE HERE: 

Architecture:

- game.js: runs game
  - initializes, renders and removes views in order: startView, gameView,               finishView
  - adds and removes document event listeners to handle user input
  - runs gameplay and gameplay audio
  - updates objects
  - continuously updates game states, to switch between views
  - processes user input to repeatedly update gameView
- startView.js: renders start of game, with directions
- gameView.js: renders main game
  - renders gameplay objects
- finishView: renders end of game, providing user feedback
- movingObject.js: defines moving object
- hand.js: defines hand object, controlled by player
- bill.js: inherits from movingObject.js
- newspaper.js: inherits from movingObject.js
