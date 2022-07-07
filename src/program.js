const { readData } = require( './helpers/file/read.js' );
const { writeData } = require( './helpers/file/write.js' );
const { processData } = require( './helpers/data/process.js' );

/**
 * Runs our program.
 *
 * @param {array} files WPE_FILES input data from user.
 *
 * @returns {}
 */

module.exports.runProgram = ( files ) => {
	readData( files[0] ).then( users => {
		processData( users ).then( users => {
			writeData( files[1], users );
		} );
	} );
}
