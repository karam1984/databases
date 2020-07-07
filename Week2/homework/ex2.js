const util = require('util');
const mysql = require('mysql');
const authors = require('./author');
const papers = require('./papers');
const authors_papers = require('./Authors_Papers');

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
    conference VARCHAR(50), publish_date DATE  )`;

	const Authors_Papers = `
	CREATE TABLE IF NOT EXISTS Authors_Papers (
		paper_id int NOT NULL,
		author_id int NOT NULL,
		CONSTRAINT author_id FOREIGN KEY (author_id) REFERENCES Authors (author_no),
		CONSTRAINT paper_id FOREIGN KEY (paper_id) REFERENCES Research_Papers (paper_id)
	  )`;

	connection.connect();

	try {
		await execQuery(createResPTable);
		await execQuery(Authors_Papers);
		authors.forEach(async (author) => {
			await execQuery('INSERT INTO Authors SET ?', author);
		});
		papers.forEach(async (paper) => {
			await execQuery('INSERT INTO Research_Papers SET ?', paper);
		});
		authors_papers.forEach(async (authors_paper) => {
			await execQuery('INSERT INTO Authors_Papers ?', authors_paper);
		});
		console.log('Going to run ', 'Succes');
	} catch (error) {
		console.error(error);
	}
	connection.end();
}
seedData();