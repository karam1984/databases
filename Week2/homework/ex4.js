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
	const query1 = `SELECT COUNT(paper_id), COUNT(DISTINCT author_id) FROM research_papers`;

	const query2 = `SELECT COUNT(paper_title) FROM research_papers AS rp , 
                   Authors AS a WHERE a.author_no = rp.author_id AND a.gender ='f' `;
	const query3 = `SELECT AVG(h_index),university FROM Authors GROUP BY university `;

	const query4 = `SELECT AVG(h_index), university FROM authors AS a inner join research_papers 
					AS rp ON a.author_no= rp.author_id group by a.university`;
					
	const query5 = `SELECT MIN(h_index), MAX(h_index), university FROM Authors GROUP BY university`;


	try {
		console.log(await execQuery(query1));
		console.log(await execQuery(query2));
		console.log(await execQuery(query3));
		console.log(await execQuery(query4));
		console.log(await execQuery(query5));
	} catch (error) {
		console.error(error);
	}
}

seedData();