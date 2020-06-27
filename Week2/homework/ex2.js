const util = require('util');
const mysql = require('mysql');
const authors = require('./author');
const papers = require('./papers');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
	database: 'mydata'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedData() {
	const createResPTable = `
    CREATE TABLE IF NOT EXISTS Research_Papers
    ( paper_id INT NOT NULL PRIMARY KEY, paper_title VARCHAR(50),
    conference VARCHAR(50), publish_date DATE , author_id INT )`;

	const addForeign = `
    ALTER TABLE Research_Papers ADD CONSTRAINT 
    fk_Authors_Res_Papers FOREIGN KEY (author_id) 
    REFERENCES Authors (author_no) `;

	connection.connect();

	try {
		await execQuery(createResPTable);
		await execQuery(addForeign);
		authors.forEach(async (author) => {
			await execQuery('INSERT INTO Authors SET ?', author);
		});
		papers.forEach(async (paper) => {
			await execQuery('INSERT INTO Research_Papers SET ?', paper);
		});
		console.log('Going to run ', 'Succes');
	} catch (error) {
		console.error(error);
	}
	connection.end();
}
seedData();