const { writeFile } = require( 'fs' );
const path = require( 'path' );
const { stringify } = require( 'csv-stringify/sync' );

/**
 * Write processed data to new CVS.
 *
 * @param {}
 *
 * @returns {}
 */
module.exports.writeData = ( file, users ) => {

	const data = stringify( users, {
		header: true,
		columns: [
			{ key: 'Account ID' },
			{ key: 'Account Name' },
			{ key: 'First Name' },
			{ key: 'Created On' },
			{ key: 'Status' },
			{ key: 'Status Created On' },
		],
	} );

	writeFile(
		path.resolve( path.dirname( require.main.filename ), '..', 'dist/user-data.csv' ),
		data,
		( error ) => error ? console.log( error ) : console.log( 'File written.' )
	);
}
