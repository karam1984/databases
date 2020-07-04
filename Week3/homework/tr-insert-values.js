const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
	database: 'data_w3'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedData() {
	const insertValuesToAccountT = `
    INSERT INTO account VALUES(101, 2000)`;

	const insertValuesToAccount_changes = `
    INSERT INTO account_changes VALUES(0, 102,150,'2020-01-01','Gift')`;

	connection.connect();

	try {
		await execQuery(insertValuesToAccountT);
		await execQuery(insertValuesToAccount_changes);
		console.log('Going to run ', 'Success');
	} catch (error) {
		console.error(error);
	}
	connection.end();
}
seedData();
