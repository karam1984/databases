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
	const authersConf = `SELECT a.author_name AS Name , b.author_name AS Collaborator FROM Authors a, 
                         Authors b where a.author_no = b.Collaborator`;

	const printAllCol = `SELECT * FROM Authors AS A LEFT JOIN research_papers
                         AS B on b.author_id= a.author_no`;

	connection.connect();

	try {
		console.log(await execQuery(authersConf));
		console.log(await execQuery(printAllCol));
	} catch (error) {
		console.error(error);
	}
	connection.end();
}

seedData();