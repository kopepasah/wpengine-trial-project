#! /usr/bin/env node

const { validateInput } = require( './helpers/file/validate.js' );
const { runProgram } = require( './program.js' );

/**
 * Grab the user arguments.
 *
 * @note These inputs are supplied by the user and are grabbed from the node
 *       process arguments. We only care about the first two inputs, but also
 *       need to remove the default inputs provided by node.
 */
const WPE_FILES = process.argv.slice( 2, 4 );

try {
	// Verify we have two arguments supplied.
	if ( 2 !== WPE_FILES.length ) {
		throw new Error( `Expected two files names (e.g. wpe_merge input.csv output.csv), but found ${ WPE_FILES.length }.` );
	}

	// Run a quick input file validation, to be sure the program will run.
	validateInput( WPE_FILES.slice( 0, 1 ).toString() );

	// Everything looks good, so let's run the program. 😎
	runProgram( WPE_FILES );
} catch ( error ) {
	console.log( error );
}
