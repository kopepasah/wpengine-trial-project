// Dependencies.
const fs = require( 'fs' );
const path = require( 'path' );

/**
 * Validate input CSV file.
 *
 * @param {string} file First argument of user's input.
 *
 * @returns {}
 */
module.exports.validateInput = ( file ) => {
	inputFileExists( file );
	inputFileIsCSV( file );

	return file;
}

/**
 * Check the input file exists, either in the current working director, or
 * relative to the root of the project.
 *
 * @param {string} file The input file.
 *
 * @return {mixed} Throws Error if file is not found, otherwise boolean true.
 */
const inputFileExists = ( file ) => {
	if ( ! fs.existsSync( file ) ) {
		// File not found in current directory, so let's check the project.
		const projectFile = path.resolve( path.dirname( require.main.filename ), '..', file );

		if ( ! fs.existsSync( projectFile ) ) {
			throw new Error( `Input file (${ file }) not found in project or current working directory.` );
		}
	}

	return true;
};

/**
 * Check the input type is CSV format.
 *
 * @param {string} file The input file.
 *
 * @return {mixed} Throws Error if file is not a CSV, otherwise boolean true.
 */
 const inputFileIsCSV = ( file ) => {
	if ( '.csv' !== path.extname( file ) ) {
		throw new Error( `Expected file type is .csv, but found ${ path.extname( file ) } from file (${ file }).` );
	}

	return true;
};
