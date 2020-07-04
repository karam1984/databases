const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedData() {
	const dropData = `DROP DATABASE IF EXISTS data_w3`;
	const createData = `CREATE DATABASE IF NOT EXISTS data_w3`;
	const useData = `use data_w3`;

	const createAccountTable = `
	CREATE TABLE IF NOT EXISTS account
	(account_number INT NOT NULL PRIMARY KEY, 
    balance FLOAT
      )`;

	const createAccountChangesTable = `
      CREATE TABLE IF NOT EXISTS account_changes
      (change_number INT ,
        account_number INT NOT NULL PRIMARY KEY, 
        amount FLOAT ,
        changed_date DATE ,
        remark VARCHAR(50)
        )`;

	connection.connect();

	try {
		await execQuery(dropData);
		await execQuery(createData);
		await execQuery(useData);
		await execQuery(createAccountTable);
		await execQuery(createAccountChangesTable);

		console.log('Going to run ', 'Succes');
	} catch (error) {
		console.error(error);
	}
	connection.end();
}

seedData();
