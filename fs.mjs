import { error, log } from 'node:console';
import fs from 'node:fs';

export function getUsers() {
	try {
		return fs.readFileSync('db/user.json');
	} catch (err) {
		throw error('some error occurd');
	}
}

const generateId = (data) => {
	if (data.length === 0) {
		return 1;
	}
	const maxId = Math.max(...data.map((item) => item.id));
	return maxId + 1;
};

export function addUser(newUser) {
	try {
		let users = fs.readFileSync('db/user.json', 'utf-8');
		users = JSON.parse(users);
		newUser['id'] = generateId(users.data);
		// console.log("length is ", users.data.length);
		if (!users.data.find((user) => user.email === newUser.email)) {
			users.data.push(newUser);
			fs.writeFileSync('db/user.json', JSON.stringify(users));
			return newUser['id'];
		} else {
			return false;
		}
	} catch (err) {
		console.log(err);
	}
}

export function deleteUser(id) {
	let users = fs.readFileSync('db/user.json', 'utf-8');
	users = JSON.parse(users);
	// console.log(typeof id);
	let index = users.data.findIndex((user) => user.id === id);
	// console.log("index:", index);
	if (index !== -1) {
		users.data = users.data
			.slice(0, index)
			.concat(users.data.slice(index + 1));
		fs.writeFileSync('db/user.json', JSON.stringify(users));
		return id;
	}
	return 'not found';
}

export function updateUser(id, user) {
	let users = fs.readFileSync('db/user.json', 'utf-8');
	user['id'] = id;
	users = JSON.parse(users);
	let index = users.data.findIndex((user) => user.id === id);
	users.data[index] = user;
	fs.writeFileSync('db/user.json', JSON.stringify(users));
}
