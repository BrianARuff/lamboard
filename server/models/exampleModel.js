const db = require('../config/database');

module.exports = {
	getExamples
};

function getExamples() {
	return db('exampleTable');
}
