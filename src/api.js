import { console_message, get_domain, get_data } from './helpers/collection';
import { ADD_DOC, DELETE_DOC, UPDATE_DOC, GET_DOC, TEST } from './helpers/constant';
import { resolve_request } from './helpers/internet';


let _domain, _email, _sid, _name;
export class FrappeNode {
	constructor(site_name, email, password) {
		if (site_name && email && password) {
			const domain = get_domain(site_name);
			
			const url = `${domain}/api/method/login?usr=${email.toLowerCase()}&pwd=${password}`;
			resolve_request(domain, url)
				.then(json => {
					_domain = domain;
					_email = email;
					_sid = json['headers']['set-cookie'].filter(x => x.includes('sid'))[0];
					_name = JSON.parse(json['body']).full_name;
				}).catch((rej) => console_message(rej));
		} else {
			console_message('Site_name, email and password required.');
		}
	}
	
	add_doc(doctype, data) {
		return this.process_request(doctype, data, _domain + ADD_DOC);
	}

	delete_doc(doctype, data) {
		return this.process_request(doctype, data, _domain + DELETE_DOC);
	}

	update_doc(doctype, data) {
		return this.process_request(doctype, data, _domain + UPDATE_DOC);
	}

	get_doc(doctype, data) {
		return this.process_request(doctype, data, _domain + GET_DOC);
	}

	process_request(doctype, data, url) {
		return new Promise((resolve, reject) => {
			data = get_data(doctype, data);
			resolve_request(_domain, url, data, _sid)
				.then((json) => resolve(json))
				.catch((rej) => reject(rej));
		});
	}
}