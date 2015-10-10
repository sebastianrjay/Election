# Election

Election is an interactive browser game that parodies US elections, and features
a soundtrack and sound effects. It uses no external JavaScript libraries,
relying on direct DOM manipulation.

PLAY IT LIVE [HERE](sebastianrjay.github.io/Election)


Architecture:

- constants.js: sets global constants, such as framerate
- game.js: runs game
  - initializes, renders and removes views in order: startView, gameView, finishView
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
