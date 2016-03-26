# Election

Election is an interactive browser game that parodies US elections, and features
a soundtrack and sound effects. It uses no external JavaScript libraries,
relying on direct DOM manipulation.

PLAY IT LIVE [HERE](sebastianrjay.github.io/Election)


Architecture:

- preloader.js: ensures that all images are loaded before game is instantiated
- constants.js: sets global constants, such as framerate
- game.js: runs game
  - initializes, renders and removes views in order: start-view, game-view, finish-view
  - adds and removes document event listeners to handle user input
  - runs gameplay and gameplay audio
  - updates objects
  - continuously updates game states, to switch between views
  - processes user input to repeatedly update gameView
- start-view.js: renders start of game, with directions
- game-view.js: renders main game
  - renders gameplay objects
- finish-view: renders end of game, providing user feedback
- moving-object.js: defines moving object
- hand.js: defines hand object, controlled by player
- bill.js: inherits from moving-object.js
- newspaper.js: inherits from moving-object.js
