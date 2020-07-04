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
	const updateAccountT = `
    update account SET balance = 1000 WHERE account_number = 101 `;
	const updateAccountChanges = `
	update account_changes SET change_number = 1000 WHERE account_number = 102 `;
	const updateAmountAccountChanges = `
	update account_changes SET amount = 1150 WHERE account_number = 102 `;

	try {
		await execQuery(updateAccountT);
		await execQuery(updateAccountChanges);
		await execQuery(updateAmountAccountChanges);
		console.log('Going to run ', 'Succes');
	} catch (error) {
		console.error(error);
	}
	connection.end();
}
seedData();
