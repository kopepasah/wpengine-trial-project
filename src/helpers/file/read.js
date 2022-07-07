const { createReadStream } = require( 'fs' );
const { parse } = require( 'csv' );

/**
 * Read static data from input CVS.
 *
 * @param {}
 *
 * @returns {}
 */

module.exports.readData = ( file ) => {
	return new Promise( resolve => {
		const users = [];

		createReadStream( file )
			.pipe( parse( { columns: true } ) )
			.on( 'data', (data) => {
				users.push( data );
			} )
			.on( 'end', () => {
				resolve( users );
			} );
	});
}
