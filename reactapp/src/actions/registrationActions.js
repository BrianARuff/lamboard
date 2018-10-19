/*
Basic registration actions using jwt for authentication
 todo:
	- Return a message for duplicate username
	- Switch to auth0?
*/

import axios from 'axios';

// Constants
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

// Test loading messages
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const getNotes = () => {
	return dispatch => {
		dispatch({ type: SIGNUP_REQUEST });

		axios
			.get('/api/register')

			.then(async ({ data }) => {
				await sleep(1000);
				if (data.token) {
					localStorage.setItem('jwt', res.data.token);
					dispatch({ type: SIGNUP_SUCCESS });
				} else {
					alert(
						'Oops! Something went wrong. That username might already be taken.'
					); // todo: check response for sql constraint error
					dispatch({
						type: SIGNUP_ERROR,
						payload: data
					});
				}
			})

			.catch(error => dispatch({ type: SIGNUP_ERROR, payload: error }));
	};
};
