const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
	database: 'mydata'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedData() {
	const dropData = `DROP DATABASE IF EXISTS mydata`;
	const createData = `CREATE DATABASE IF NOT EXISTS mydata`;
	const useData = `use mydata`;

	const CREATE_Authors_TABLE = `
    CREATE TABLE IF NOT EXISTS Authors (
      author_no INT PRIMARY KEY,
      author_name VARCHAR(50),
      university VARCHAR(50),
      date_of_birth DATE,
      h_index INT,
      gender ENUM('m', 'f')
    );`;

	const addFriendCol = `
    ALTER TABLE Authors ADD Collaborator INT `;
	const addForeign = `ALTER TABLE Authors ADD CONSTRAINT fk_Authors FOREIGN KEY (Collaborator) 
    REFERENCES Authors (author_no) `;

	connection.connect();
	console.log('Going to run ', 'Succes');

	try {
		await execQuery(dropData);
		await execQuery(createData);
		await execQuery(useData);
		await execQuery(CREATE_Authors_TABLE);
		await execQuery(addFriendCol);
		await execQuery(addForeign);
		
	} catch (error) {
		console.error(error);
	}
	connection.end();
}

seedData();