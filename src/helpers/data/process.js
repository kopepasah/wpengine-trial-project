const { processUsers } = require( './request.js' );

/**
 * Processes data from WPEngine API.
 *
 * @param {}
 *
 * @returns {}
 */
 module.exports.processData = ( users ) => {
	return new Promise( resolve => {
		processUsers( users ).then( users => {
			resolve( users );
		} );
	} );
}
