// Dependencies.
const https = require( 'https' );

// Our constants.
const WPE_DATA = {
	hostname : 'interview.wpengine.io',
	path     : '/v1/accounts/',
}

/**
 * Processes user data, merging new user data.
 *
 * @param {string} accountID Account ID of requested data.
 *
 * @returns {mixed} Requested account data (object), or false if no accountID provided.
 */
const processUsers = ( users ) => {
	return new Promise( resolve => {
		const processedUsers = [];

		(async () => {
			for ( const user of users ) {
				let currentUserID = user['Account ID'];

				await requestData( currentUserID ).then( userData => {
					userData = JSON.parse( userData );

					processedUsers.push( {
						...user,
						'Status': userData.status,
						'Status Created On': userData.created_on,
					} );
				} );
			}

			resolve( processedUsers )
		})();
	} );
}

/**
 * Handles data request from WPEngine API.
 *
 * @param {string} accountID Account ID of requested data.
 *
 * @returns {mixed} Requested account data (object), or false if no accountID provided.
 */
const requestData = async ( accountID ) => {
	return new Promise( resolve => {
		if ( ! accountID ) {
			resolve( false );
		}

		const req = https.request( {
			hostname : WPE_DATA.hostname,
			port     : 443,
			path     : WPE_DATA.path + accountID,
			method   : 'GET'
		}, ( res ) => {
			res.on( 'data', ( chunk ) => {
				resolve( chunk.toString('utf8') );
			} );
		} );

		req.on(  'error', ( e ) => {
			console.error( e );
		} );

		req.end();
	} );
}

module.exports = { processUsers, requestData };
