import http from 'http';
import url from 'node:url';
import { getUsers, addUser, deleteUser, updateUser } from './fs.mjs';

const server = http.createServer((req, res) => {
	let body = '';
	let reqUrl = url.parse(req.url, true);
	let path = reqUrl.pathname;
	let query = reqUrl.query;
	// console.log(path, typeof query);

	req.on('data', (chunk) => {
		body += chunk;
	});
	req.on('end', () => {
		try {
			if (path === '/user' && req.method === 'GET') {
	
				// get request
				let user = getUsers();
				let response = {
					status: 200,
					message: 'users fetched successfully',
					data: user,
				};
				res.write(user);
				// res.write(response);
				res.end();

			} else if (path === '/user' && req.method === 'POST') {
	
				// post request
				let id = addUser(JSON.parse(body));
				if (id) {
					res.write(`id: ${id}`);
				} else {
					res.write('email already exists');
				}
				res.end();
	
			} else if (path === '/user' && req.method === 'DELETE') {
				// delete user
				deleteUser(+query.id);
				res.end('user deleted successfully');

			} else if (path === '/user' && req.method === 'PUT') {
				updateUser(+query.id, JSON.parse(body));
				res.end('updated');

			} else {
				res.end('path not found');

			}
		} catch (err) {
			console.log(err.message);

		}
	});
});

port = 9000;

server.listen(port, () => {
	console.log(`listening at ${port}`);
});
