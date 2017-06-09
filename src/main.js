import { console_message, get_domain, get_data } from './helpers/collection';
import { _authenticate, _resolve_request } from './api';
import { ADD_DOC, DELETE_DOC, UPDATE_DOC, GET_DOC } from './helpers/constant';

let _domain, _email, _sid, _name;

export class FrappeNode {

	constructor(site_name, email, password) {
		if (site_name && email && password) {
			const domain = get_domain(domain);
			const url = `${domain}/api/method/login?usr=${email.toLowerCase()}&pwd=${password}`;
			_authenticate(domain, url, (res) => {
				_domain = domain;
				_email = email;
				_sid = res.getHeaders('set-cookie').filter(x => x.includes('sid'))[0];
				_name = res.getBody().full_name
			});
		} else {
			console_message('Site_name, email and password required.');
		}
	}

	add_doc(doctype, data) {
		return process_request(doctype, data, _domain + ADD_DOC);
	}

	delete_doc(doctype, data) {
		return process_request(doctype, data, _domain + DELETE_DOC);
	}

	update_doc(doctype, data) {
		return process_request(doctype, data, _domain + UPDATE_DOC);
	}

	get_doc(doctype, data) {
		return process_request(doctype, data, _domain + GET_DOC);
	}

	process_request(doctype, data, url) {
		return new Promise((resolve, reject) => {
			data = get_data(doctype, data);
			_resolve_request(_domain, url, (res) => {
				
				//show data on console
				console_message(res);
				resolve(res);
			}, data, _sid);
		});
	}
}