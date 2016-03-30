module.exports = function(grunt) {

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

    uglify: {
	    my_target: {
	      files: {
	        'app.min.js': [
	        	'lib/constants.js',
            'lib/util.js',
            'lib/falling-object.js',
            'lib/hand.js',
            'lib/bill.js',
            'lib/newspaper.js',
            'lib/start-view.js',
            'lib/game-view.js',
            'lib/finish-view.js',
            'lib/game.js',
            'lib/preloader.js'
	        ]
	      }
	    }
	  }
  });

	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};
