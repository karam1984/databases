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
	const query1 = `SELECT  RP.paper_title,Count(AP.author_id) from Research_Papers RP 
	inner join Authors_Papers AP ON AP.paper_id = RP.paper_id
	group by RP.paper_title`;

	const query2 = `SELECT COUNT(paper_title) FROM research_papers AS rp , 
                   Authors AS a WHERE a.author_no = rp.author_id AND a.gender ='f' `;
	const query3 = `SELECT AVG(h_index),university FROM Authors GROUP BY university `;

	const query4 = `SELECT university, SUM(author_no) as Num_Of_Papers FROM authors AS a inner join research_papers 
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