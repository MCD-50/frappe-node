'use strict'
import { console_message, get_domain, get_data } from './helpers/collection';
import {
	ADD_DOC, DELETE_DOC, UPDATE_DOC,
	GET_DOC, GET_LIST, GET_META
} from './helpers/constant';
import { resolve_request } from './helpers/internet';


let _domain, _email, _password, _sid, _name;

const login = (callback = null) => {
	const url = `${_domain}/api/method/login?usr=${_email.toLowerCase()}&pwd=${_password}`;
	resolve_request(_domain, url)
		.then(json => {
			_sid = json['headers']['set-cookie'].filter(x => x.includes('sid'))[0];
			_name = JSON.parse(json['body']).full_name;
			callback && callback();
		}).catch((rej) => console_message(rej));
}

const process_request = (doctype, data, url) => {
	return new Promise((resolve, reject) => {
		data = get_data(doctype, data);
		resolve_request(_domain, url, data, _sid)
			.then((json) => resolve(json))
			.catch((rej) => reject(rej));
	});
}

const process_on_no_sid = (doctype, data, url) => {
	return new Promise((resolve, reject) => {
		login(() => {
			process_request(doctype, data, url)
				.then((res) => resolve(res))
				.catch((rej) => reject(rej))
		})
	});
}

export class FrappeNode {

	authenticate(site_name, email, password) {
		/**
		* @description Frappe node client.
		* @param site_name format[yoursite.erpnext.com]
		* @param email format[someone@provider.com] ex: ayz@gmail.com
		* @param password
		*/
		if (site_name && email && password) {
			const domain = get_domain(site_name);
			_domain = domain;
			_email = email;
			_password = password;
			login();
		} else {
			console_message('Site_name, email and password required.');
		}
	}

	add_doc(doctype, data) {
		/**
		* @description add a new document of given doctype
		* @param doctype ex: Note
		* @param data dict ex: {description:'des1', title:'t1'} // for note
		* make sure to pass all mandatory details in dict
		*/
		if (_sid) {
			return process_request(doctype, data, _domain + ADD_DOC);
		} else {
			return process_on_no_sid(doctype, data, _domain + ADD_DOC);
		}
	}

	delete_doc(doctype, data) {
		/**
		* @description delete a document of given doctype
		* @param doctype ex: Note
		* @param data dict ex: {name:'t1', filters:{owner:'ayz'} } for note
		* name is required. filters is optional
		*/
		if (_sid) {
			return process_request(doctype, data, _domain + DELETE_DOC);
		} else {
			return process_on_no_sid(doctype, data, _domain + DELETE_DOC);
		}

	}

	update_doc(doctype, data) {
		/**
		* @description update a document of given doctype
		* @param doctype ex: Note
		* @param data dict ex: {name:'t1', owner:'ayz' } for note
		* name is required and pass key value pairs you you want to update
		* In this case owner will be updated and new values will be ayz
		*/
		if (_sid) {
			return process_request(doctype, data, _domain + UPDATE_DOC);
		} else {
			return process_on_no_sid(doctype, data, _domain + UPDATE_DOC);
		}

	}

	get_doc(doctype, data) {
		/**
		* @description return a document of given doctype
		* @param doctype ex: Note
		* @param data dict ex: {name:'t1', filters:{name:'t1', owner:'ayz'} } for note
		* pass either name or filters or both
		*/
		if (_sid) {
			return process_request(doctype, data, _domain + GET_DOC);
		} else {
			return process_on_no_sid(doctype, data, _domain + GET_DOC);
		}
	}

	get_list(doctype, data) {
		/**
		* @description return list of document of given doctype
		* @param doctype ex: Note
		* @param data dict ex: {filters:{owner:'ayz'}, fields=["name", "creation"]
		 , order_by:'creation desc', limit_start:0, limit_page_length:20, 
		 ignore_permission:false } for note
		* All fields are optional.
		*/
		if (_sid) {
			return process_request(doctype, data, _domain + GET_LIST);
		} else {
			return process_on_no_sid(doctype, data, _domain + GET_LIST);
		}
	}

	get_meta(doctype) {
		/**
		* @description return meta of given doctype
		* @param doctype ex: Note
		*/
		if (_sid) {
			return process_request(doctype, null, _domain + GET_META);
		} else {
			return process_on_no_sid(doctype, null, _domain + GET_META);
		}
	}
}